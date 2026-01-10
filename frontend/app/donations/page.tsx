"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DonationReceiptModal from "../components/DonationReceiptModal";
import Footer from "../components/Footer";
import { fetchUserDonations, Donation, transformDrive } from "@/lib/api";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DonationsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<{
    donation: { driveId: string; amount: number; date: string };
    drive: { driveId: number; title: string; organization: string; imageUrl: string };
  } | null>(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isAuthenticated) {
      loadDonations();
    }
  }, [isAuthenticated, authLoading, router]);

  async function loadDonations() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchUserDonations({ 
        take: 1000, // Fetch all donations for pagination
        includeDrive: true 
      });
      setDonations(response.donations);
      setCurrentPage(1); // Reset to first page when loading new data
    } catch (err: any) {
      console.error("Error loading donations:", err);
      setError(err.message || "Failed to load donations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleOpen = (donation: Donation) => {
    if (!donation.drive || !donation.driveId) return;
    
    const transformedDrive = transformDrive(donation.drive);
    setSelected({
      donation: {
        driveId: donation.driveId.toString(),
        amount: donation.amount,
        date: formatDate(donation.dateDonated),
      },
      drive: transformedDrive,
    });
    setOpen(true);
  };

  const totalDonations = donations.reduce<number>(
    (sum, donation) => sum + donation.amount,
    0
  );
  const donationCount = donations.length;

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(donationCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedDonations = donations.slice(startIndex, endIndex);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
        <Header />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <div className="text-white text-center">
            <p className="text-xl">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
      <Header />
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 w-full space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">All Donations</h1>
            <p className="text-gray-200 mt-2">
              Your full giving history in one place.
            </p>
          </div>

          <Card className="bg-linear-to-tr from-[#032040] via-[#1C7D91] to-[#7BAC6B] rounded-lg shadow-md p-6 border border-none text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-full px-2">
                <h2
                  className="text-center font-extrabold text-white max-w-full overflow-hidden truncate text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                  style={{
                    fontSize:
                      totalDonations > 999999999
                        ? "clamp(1.25rem, 4vw, 2rem)"
                        : totalDonations > 999999
                        ? "clamp(1.5rem, 5vw, 2.5rem)"
                        : undefined,
                    lineHeight: 1.1,
                  }}
                  title={formatCurrency(totalDonations)}
                >
                  {formatCurrency(totalDonations)}
                </h2>
              </div>
              <p className="text-sm text-gray-200 uppercase tracking-wide">
                TOTAL DONATED
              </p>
              <p className="text-sm text-gray-100">
                You have {donationCount} donation
                {donationCount === 1 ? "" : "s"}.
              </p>
            </div>
          </Card>

          <Card className="bg-gray-200 rounded-lg shadow-md p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-black uppercase">
                Donation History
              </h2>
              <Link
                href="/profile"
                className="text-[#1C7D91] font-semibold hover:underline text-sm"
              >
                Back to Profile
              </Link>
            </div>

            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            ) : donations.length === 0 ? (
              <p className="text-gray-600 text-center py-10">
                You have not made any donations yet.
              </p>
            ) : (
              <>
                <div className="space-y-4">
                  {paginatedDonations.map((donation) => {
                    if (!donation.drive || !donation.driveId) return null;
                    
                    const transformedDrive = transformDrive(donation.drive);
                    const donationDate = formatDate(donation.dateDonated);

                    return (
                      <button
                        key={donation.id}
                        type="button"
                        onClick={() => handleOpen(donation)}
                        className="w-full text-left"
                      >
                        <div className="bg-white rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow border border-gray-300">
                          {/* Mobile: Two rows, Desktop: Three columns */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            {/* First Row (Mobile) / Left Column (Desktop): Image and Drive Info */}
                            <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0">
                                <Image
                                  src={transformedDrive.imageUrl}
                                  alt={transformedDrive.title}
                                  width={80}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              {/* Drive Name and Organization */}
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                                  {transformedDrive.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  {transformedDrive.organization}
                                </p>
                              </div>
                            </div>
                            {/* Second Row (Mobile) / Right Column (Desktop): Amount and Date */}
                            <div className="flex sm:flex-col sm:items-end items-center justify-between sm:justify-end shrink-0">
                              <span className="text-xs sm:text-sm text-gray-500 sm:order-2">
                                {donationDate}
                              </span>
                              <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#032040] sm:mb-1 sm:order-1">
                                {formatCurrency(donation.amount)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Pagination */}
                {donations.length > ITEMS_PER_PAGE && (
                  <>
                    <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                      <Button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeftIcon className="w-4 h-4" />
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .slice(
                          Math.max(
                            0,
                            Math.min(totalPages - 5, currentPage - 3)
                          ),
                          Math.max(5, Math.min(totalPages, currentPage + 2))
                        )
                        .map((pageNumber) => (
                          <Button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={
                              currentPage === pageNumber
                                ? "bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                : "px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            }
                          >
                            {pageNumber}
                          </Button>
                        ))}
                      <Button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRightIcon className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex justify-center items-center gap-2 mb-8 text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </div>
                  </>
                )}
              </>
            )}
          </Card>
        </div>
      </main>
      <Footer />

      {selected && (
        <DonationReceiptModal
          open={open}
          onOpenChange={setOpen}
          donation={selected.donation}
          drive={selected.drive as any}
        />
      )}
    </div>
  );
}
