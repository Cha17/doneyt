"use client";
import React from "react";
import { useParams } from "next/navigation";
import { allDrives, Drive } from "@/data/allDrives";
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

export default function DriveDetailPage() {
  const params = useParams();
  const driveId = params?.id as string;

  const drive = allDrives.find((d) => d.driveId === driveId);

  if (!drive) {
    return <NoDrivesFound />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
      <Header />
      <main className="flex-1 pt-24 mx-12">
        {/* Hero Banner */}
        <div className="relative w-full h-[400px] mb-12">
          <Image
            src={drive.imageUrl}
            alt={drive.title}
            fill
            className="object-cover rounded-lg "
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
            <div className="max-w-4xl mx-auto px-6 text-center text-white">
              <h1 className="text-5xl font-bold mb-4">{drive.title}</h1>
              <p className="text-2xl mb-6">{drive.organization}</p>
            </div>
          </div>
        </div>

        <section>
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  About This Drive
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {drive.description}
                </p>
              </div>

              {/* Gallery */}
              {drive.gallery && drive.gallery.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {drive.gallery.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden"
                      >
                        <Image
                          src={imageUrl}
                          alt={`${drive.title} - Image ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform cursor-pointer"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 flex flex-col gap-6 z-10">
                {/* Circular Progress Card */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex flex-col items-center justify-center gap-4">
                    {/* Circular Progress + Raised */}
                    <div className="relative flex items-center justify-center w-72 h-72">
                      <svg
                        className="absolute top-0 left-0 w-full h-full"
                        viewBox="0 0 100 100"
                        aria-hidden="true"
                      >
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
                              stroke="#204378"
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
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center px-4">
                        <span className="text-3xl font-bold text-[#032040]">
                          {getDriveProgress(
                            drive.currentAmount,
                            drive.targetAmount
                          )}
                          %
                        </span>
                        <span className="text-sm font-normal text-gray-600">
                          {formattedCurrent({
                            currentAmount: drive.currentAmount,
                          } as Drive)}{" "}
                          /{" "}
                          {formattedTarget({
                            targetAmount: drive.targetAmount,
                          } as Drive)}
                        </span>
                      </div>
                    </div>
                    {/* Donate Button */}
                    <Button className="w-full md:w-auto px-8 py-4 text-lg font-semibold bg-linear-to-r from-[#032040] via-[#1C7D91] to-[#7BAC6B] hover:opacity-90">
                      DONATE NOW
                    </Button>
                  </div>
                </div>

                {/* Drive Info Card */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex justify-center">
                    Drive Information
                  </h3>
                  <div className="space-y-4">
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
                    {drive.endDate && (
                      <div>
                        <div className="text-sm text-gray-600 mb-1">
                          End Date
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {drive.endDate}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
