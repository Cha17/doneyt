"use client";

import { allDrives, userDonations } from "@/data/allDrives";
import { useState } from "react";
import Header from "../components/Header";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import NoDrivesFound from "../components/NoDrivesFound";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DonationReceiptModal from "../components/DonationReceiptModal";
import Footer from "../components/Footer";

export default function DonationsPage() {
  const totalDonations = userDonations.reduce<number>(
    (sum, donation) => sum + donation.amount,
    0
  );
  const donationCount = userDonations.length;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<{
    donation: (typeof userDonations)[number];
    drive: (typeof allDrives)[number];
  } | null>(null);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(donationCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedDonations = userDonations.slice(startIndex, endIndex);

  const handleOpen = (donation: (typeof userDonations)[number]) => {
    const drive = allDrives.find((d) => d.driveId === donation.driveId);
    if (!drive) return;
    setSelected({ donation, drive });
    setOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
      <Header />
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

            <Card className="bg-linear-to-tr from-[#032040] via-[#1C7D91] to-[#7BAC6B] rounded-lg shadow-md p-8 border border-none text-center">
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white truncate max-w-full">
                  {formatCurrency(totalDonations)}
                </h2>
                <p className="text-sm text-gray-200 uppercase tracking-wide">
                  TOTAL DONATED
                </p>
                <p className="text-sm text-gray-100">
                  You have {donationCount} donation
                  {donationCount === 1 ? "" : "s"}.
                </p>
              </div>
            </Card>

            <Card className="bg-gray-200 rounded-lg shadow-md p-8">
              <div className="flex items-center justify-between mb-6">
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

              {userDonations.length === 0 ? (
                <p className="text-gray-600 text-center py-10">
                  You have not made any donations yet.
                </p>
              ) : (
                <>
                  <div className="space-y-4">
                    {paginatedDonations.map((donation) => {
                      const drive = allDrives.find(
                        (d) => d.driveId === donation.driveId
                      );
                      if (!drive) return null;

                      return (
                        <button
                          key={donation.driveId}
                          type="button"
                          onClick={() => handleOpen(donation)}
                          className="w-full text-left"
                        >
                          <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-300">
                            <div className="flex items-center gap-4">
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={drive.imageUrl}
                                  alt={drive.title}
                                  width={80}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">
                                  {drive.title}
                                </h3>
                                <p className="text-sm text-gray-600 truncate">
                                  {drive.organization}
                                </p>
                              </div>

                              <div className="flex flex-col items-end gap-1">
                                <span className="text-lg font-bold text-[#032040]">
                                  {formatCurrency(donation.amount)}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {donation.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {userDonations.length > ITEMS_PER_PAGE && (
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

        {userDonations.length > 0 && selected && (
          <DonationReceiptModal
            open={open}
            onOpenChange={setOpen}
            donation={selected.donation}
            drive={selected.drive}
          />
        )}
      </div>
      <Footer />
      {userDonations.length > 0 && selected && (
        <DonationReceiptModal
          open={open}
          onOpenChange={setOpen}
          donation={selected.donation}
          drive={selected.drive}
        />
      )}
    </div>
  );
}
