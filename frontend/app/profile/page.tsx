"use client";

import { Card } from "@/components/ui/card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import DonationReceiptModal from "../components/DonationReceiptModal";
import { useState, useEffect } from "react";
import { fetchUserDonations, Donation, transformDrive } from "@/lib/api";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        take: 100, 
        includeDrive: true 
      });
      setDonations(response.donations);
    } catch (err: any) {
      console.error("Error loading donations:", err);
      setError(err.message || "Failed to load donations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const totalDonations = donations.reduce<number>(
    (sum, donation) => sum + donation.amount,
    0
  );

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
            Profile
          </h1>
        </div>
        {/* <div className="max-w-7xl mx-auto px-6  w-full">
         */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
          {/* Main Profile Card */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
            <div className="flex-1 w-full">
              <Card className="bg-linear-to-tr from-[#032040] via-[#1C7D91] to-[#7BAC6B] rounded-lg shadow-md p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-none">
                <div className="flex flex-col items-center">
                  <div className="mb-4 w-full px-2">
                    <h1
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
                    </h1>
                  </div>
                  <div className="flex flex-col items-center">
                    <h4 className="text-sm sm:text-md font-bold text-gray-200 uppercase">
                      TOTAL DONATED
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 text-center px-2">
                      Cumulative amount you&apos;ve given across all drives.
                    </p>
                  </div>
                </div>
              </Card>
              <UserDonations donations={donations} error={error} />
            </div>
            <Card className="bg-gray-200 rounded-lg shadow-md mb-6 sm:mb-8 p-8 sm:p-4 md:p-6 w-full lg:w-auto">
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12">
                {/* Left Column - Personal Information */}
                <div className="flex-1 space-y-4 sm:space-y-6">
                  {/* PERSONAL INFORMATION Section */}
                  <h2 className="text-base sm:text-lg font-bold text-black uppercase mb-3 sm:mb-4">
                    PERSONAL INFORMATION
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="flex-1">
                      <Label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </Label>
                      <Input
                        type="text"
                        placeholder="First Name"
                        className="bg-[#1C7D91] text-white rounded-lg placeholder:text-gray-300"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        className="bg-[#1C7D91] text-white rounded-lg placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                  <Button className="bg-[#032040] text-white rounded-lg uppercase px-4 py-2 text-sm font-normal w-full sm:w-auto">
                    SAVE
                  </Button>
                  <div className="space-y-2">
                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </Label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                      <Input
                        type="email"
                        placeholder="Email"
                        readOnly
                        className="bg-[#1C7D91] text-white rounded-lg placeholder:text-gray-300 flex-1"
                      />
                      <Link
                        href="/sample"
                        className="text-black text-sm font-semibold hover:underline text-center sm:text-left whitespace-nowrap"
                      >
                        Change Email
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-black uppercase mb-3 sm:mb-4">
                      SIGN IN METHODS
                    </h2>
                    <Button className="bg-[#032040] text-white rounded-lg px-4 py-2 text-sm font-normal w-full sm:w-auto">
                      <span className="text-white font-bold text-lg">G</span>
                      <span className="text-white text-xs sm:text-sm">
                        qiuyuan@gmail.com
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-center">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-gray-300 rounded-full overflow-hidden mb-4 sm:mb-6 md:mb-8">
                    <Image
                      src="/images/sample.png"
                      alt="Profile"
                      width={224}
                      height={224}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <Button className="bg-[#032040]  text-white rounded-lg uppercase px-4 py-2 text-sm font-normal w-full md:w-auto">
                    CHANGE PHOTO
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface UserDonationsProps {
  donations: Donation[];
  error: string | null;
}

export function UserDonations({ donations, error }: UserDonationsProps) {
  const [open, setOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<{
    donation: { driveId: string; amount: number; date: string };
    drive: { driveId: number; title: string; organization: string; imageUrl: string };
  } | null>(null);

  const handleOpenModal = (donation: Donation) => {
    if (!donation.drive || !donation.driveId) return;
    
    const transformedDrive = transformDrive(donation.drive);
    setSelectedDonation({
      donation: {
        driveId: donation.driveId.toString(),
        amount: donation.amount,
        date: formatDate(donation.dateDonated),
      },
      drive: transformedDrive,
    });
    setOpen(true);
  };

  if (error) {
    return (
      <Card className="bg-gray-200 rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h2 className="text-lg font-bold text-black uppercase mb-4">
          MY DONATIONS
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-gray-200 rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h2 className="text-lg font-bold text-black uppercase mb-4">
          MY DONATIONS
        </h2>

        {donations.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            You have not made any donations yet.
          </p>
        ) : (
          <div className="space-y-4">
            {donations.slice(0, 3).map((donation) => {
              if (!donation.drive || !donation.driveId) return null;
              
              const transformedDrive = transformDrive(donation.drive);
              const donationDate = formatDate(donation.dateDonated);

              return (
                <button
                  key={donation.id}
                  type="button"
                  onClick={() => handleOpenModal(donation)}
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
        )}
        {/* View All Link */}
        {donations.length > 0 && (
          <div className="mt-4 sm:mt-6 text-center">
            <Link
              href="/donations"
              className="text-[#1C7D91] font-semibold hover:underline text-sm sm:text-base"
            >
              View All Donations →
            </Link>
          </div>
        )}
      </Card>

      {/* Receipt Modal */}
      {selectedDonation && (
        <DonationReceiptModal
          open={open}
          onOpenChange={setOpen}
          donation={selectedDonation.donation}
          drive={selectedDonation.drive as any}
        />
      )}
    </>
  );
}
