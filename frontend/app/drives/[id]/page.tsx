"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NoDrivesFound from "@/app/components/NoDrivesFound";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import {
  formattedCurrent,
  formattedTarget,
  getDriveProgress,
} from "@/utils/formatCurrency";
import { Button } from "@/components/ui/button";
import {
  DonationReviewModal,
  DonationSuccessModal,
} from "@/app/components/DonationModal";
import DonationFormModal from "@/app/components/DonationModal";
import { fetchDriveById, transformDrive } from "@/lib/api";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function DriveDetailPage() {
  const params = useParams();
  const driveId = params?.id as string;

  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewData, setReviewData] = useState<{
    amount: number;
    donorName: string;
    email: string;
    message: string;
  } | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [drive, setDrive] = useState<{
    driveId: string;
    title: string;
    organization: string;
    description: string;
    currentAmount: number;
    targetAmount?: number;
    imageUrl: string;
    endDate?: string;
    gallery?: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    async function loadDrive() {
      try {
        setIsLoading(true);
        const driveIdNum = Number.parseInt(driveId, 10);
        if (Number.isNaN(driveIdNum)) {
          // Invalid ID, drive will stay null
          setIsLoading(false);
          return;
        }
        const response = await fetchDriveById(driveIdNum);
        const transformedDrive = transformDrive(response.drive);
        setDrive({
          ...transformedDrive,
          driveId: String(transformedDrive.driveId),
        });
      } catch (error) {
        console.error("Failed to load drive:", error);
        // Drive will stay null, showing NoDrivesFound
      } finally {
        setIsLoading(false);
      }
    }

    if (driveId) {
      loadDrive();
    }
  }, [driveId]);

  // Reset gallery index when drive changes
  useEffect(() => {
    if (drive?.gallery) {
      setGalleryIndex(0);
    }
  }, [drive?.gallery]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen || !drive?.gallery) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex(
          lightboxIndex === 0 ? drive.gallery!.length - 1 : lightboxIndex - 1
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex(
          lightboxIndex === drive.gallery!.length - 1 ? 0 : lightboxIndex + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, lightboxIndex, drive?.gallery]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
        <Header />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <div className="text-white text-xl">Loading drive...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!drive) {
    return <NoDrivesFound />;
  }

  const reloadDrive = async () => {
    try {
      const driveIdNum = Number.parseInt(driveId, 10);

      if (Number.isNaN(driveIdNum)) {
        return;
      }

      const response = await fetchDriveById(driveIdNum);
      const transformedDrive = transformDrive(response.drive);

      setDrive({
        ...transformedDrive,
        driveId: String(transformedDrive.driveId),
      });
    } catch (error) {
      console.error("Failed to reload drive:", error);
      <NoDrivesFound />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
      <Header />
      <main className="flex-1 pt-24 mx-6 sm:mx-8 md:mx-12 lg:mx-12">
        {/* Hero Banner */}
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] mb-8 sm:mb-10 md:mb-12">
          <Image
            src={drive.imageUrl}
            alt={drive.title}
            fill
            className="object-cover rounded-lg "
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                {drive.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">
                {drive.organization}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-4 sm:gap-6 z-10">
              {/* Circular Progress Card */}
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
                <div className="flex flex-col items-center justify-center gap-4">
                  {/* Circular Progress + Raised */}
                  <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72">
                    <svg
                      className="absolute top-0 left-0 w-full h-full"
                      viewBox="0 0 100 100"
                      aria-hidden="true"
                      style={{ transform: "rotate(90deg)" }}
                    >
                      <defs>
                        <linearGradient
                          id="progressGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#032040" />
                          <stop offset="50%" stopColor="#1C7D91" />
                          <stop offset="100%" stopColor="#7BAC6B" />
                        </linearGradient>
                      </defs>
                      {/* Background ring */}
                      <circle
                        cx="50"
                        cy="50"
                        r="44"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      {/* Progress ring */}
                      {(() => {
                        const progress = getDriveProgress(
                          drive.currentAmount,
                          drive.targetAmount
                        );
                        const radius = 44;
                        const circumference = 2 * Math.PI * radius;
                        const offset = circumference * (1 - progress / 100);
                        return (
                          <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth="8"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            style={{
                              transition: "stroke-dashoffset 0.7s ease-out",
                            }}
                          />
                        );
                      })()}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center px-2 sm:px-4">
                      <span className="text-2xl sm:text-3xl font-bold text-[#032040]">
                        {getDriveProgress(
                          drive.currentAmount,
                          drive.targetAmount
                        )}
                        %
                      </span>
                      <span className="text-xs sm:text-sm font-normal text-gray-600">
                        {formattedCurrent({
                          currentAmount: drive.currentAmount,
                        })}{" "}
                        /{" "}
                        {formattedTarget({ targetAmount: drive.targetAmount })}
                      </span>
                    </div>
                  </div>
                  {/* Donate Button */}
                  <Button
                    className="w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-linear-to-r from-[#032040] via-[#1C7D91] to-[#7BAC6B] hover:opacity-90"
                    onClick={() => setIsDonateOpen(true)}
                  >
                    DONATE NOW
                  </Button>
                  <DonationFormModal
                    open={isDonateOpen}
                    onOpenChange={setIsDonateOpen}
                    driveName={drive.title}
                    onReview={(data) => {
                      setReviewData({
                        amount: data.amount,
                        donorName: data.donorName,
                        email: data.email,
                        message: data.message || "",
                      });
                      setIsReviewOpen(true);
                    }}
                  />
                  <DonationReviewModal
                    open={isReviewOpen}
                    onOpenChange={setIsReviewOpen}
                    driveId={Number.parseInt(drive.driveId, 10)}
                    driveName={drive.title}
                    amount={reviewData?.amount || 0}
                    donorName={reviewData?.donorName || ""}
                    email={reviewData?.email || ""}
                    message={reviewData?.message || ""}
                    onGoBack={() => {
                      setIsReviewOpen(false);
                      setIsDonateOpen(true);
                    }}
                    onComplete={async () => {
                      await reloadDrive();
                      setIsSuccessOpen(true);
                    }}
                  />
                  {reviewData && (
                    <DonationSuccessModal
                      open={isSuccessOpen}
                      onOpenChange={setIsSuccessOpen}
                      donorName={reviewData?.donorName || ""}
                    />
                  )}
                </div>
              </div>

              {/* Drive Info Card */}
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex justify-center">
                  Drive Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Organizer
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {drive.organization}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Progress</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {getDriveProgress(
                          drive.currentAmount,
                          drive.targetAmount
                        )}
                        %
                      </div>
                    </div>
                  </div>
                  {drive.endDate && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">End Date</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {drive.endDate
                          ? new Date(drive.endDate).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : ""}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                About This Drive
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {drive.description}
              </p>
            </div>

            {/* Gallery */}
            {drive.gallery && drive.gallery.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Gallery
                </h2>
                <div className="relative">
                  {/* Carousel Container */}
                  <div className="relative overflow-hidden rounded-lg">
                    <div
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{
                        transform: `translateX(-${galleryIndex * 100}%)`,
                      }}
                    >
                      {drive.gallery.map((imageUrl, index) => (
                        <div
                          key={index}
                          className="relative w-full shrink-0 aspect-video"
                        >
                          <Image
                            src={imageUrl}
                            alt={`${drive.title} - Image ${index + 1}`}
                            fill
                            className="object-cover cursor-pointer"
                            sizes="100vw"
                            onClick={() => {
                              setLightboxIndex(index);
                              setLightboxOpen(true);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  {drive.gallery.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setGalleryIndex(
                            galleryIndex === 0
                              ? drive.gallery!.length - 1
                              : galleryIndex - 1
                          )
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setGalleryIndex(
                            galleryIndex === drive.gallery!.length - 1
                              ? 0
                              : galleryIndex + 1
                          )
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Dots Indicator */}
                  {drive.gallery.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {drive.gallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setGalleryIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === galleryIndex
                              ? "bg-[#032040]"
                              : "bg-gray-300"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Thumbnail Grid */}
                {drive.gallery.length > 1 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-4">
                    {drive.gallery.map((imageUrl, index) => (
                      <div
                        key={index}
                        className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                          index === galleryIndex
                            ? "border-[#032040]"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        onClick={() => setGalleryIndex(index)}
                      >
                        <Image
                          src={imageUrl}
                          alt={`${drive.title} - Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 25vw, 16vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Lightbox Modal */}
            {lightboxOpen && drive.gallery && (
              <div
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                onClick={() => setLightboxOpen(false)}
              >
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2 transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="w-6 h-6" />
                </button>

                {drive.gallery.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(
                          lightboxIndex === 0
                            ? drive.gallery!.length - 1
                            : lightboxIndex - 1
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-3 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(
                          lightboxIndex === drive.gallery!.length - 1
                            ? 0
                            : lightboxIndex + 1
                        );
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-3 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                <div
                  className="relative max-w-7xl max-h-[90vh] w-full h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={drive.gallery[lightboxIndex]}
                    alt={`${drive.title} - Image ${lightboxIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>

                {drive.gallery.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                    {lightboxIndex + 1} / {drive.gallery.length}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
