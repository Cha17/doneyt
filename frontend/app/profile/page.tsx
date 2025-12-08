import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { allDrives, userDonations } from "@/data/allDrives";
import { formatCurrency } from "@/utils/formatCurrency";

export default function ProfilePage() {
  const totalDonations = userDonations.reduce<number>(
    (sum, donation) => sum + donation.amount,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
      <Header />
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 w-full">
          <h1 className="text-4xl font-bold text-white text-center">Profile</h1>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          {/* Main Profile Card */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 w-full">
              <Card className="bg-linear-to-tr from-[#032040] via-[#1C7D91] to-[#7BAC6B] rounded-lg shadow-md p-8 mb-8 border border-none">
                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    <h1
                      className="
                    text-center font-extrabold text-white
                    text-4xl
                    sm:text-5xl
                    md:text-5xl
                    max-w-full
                    overflow-hidden
                    truncate
                    "
                      style={{
                        fontSize:
                          totalDonations > 999999999
                            ? "2rem"
                            : totalDonations > 999999
                            ? "2.5rem"
                            : "",
                        lineHeight: 1.1,
                      }}
                      title={formatCurrency(totalDonations)}
                    >
                      {formatCurrency(totalDonations)}
                    </h1>
                  </div>
                  <div className="flex flex-col items-center">
                    <h4 className="text-md font-bold text-gray-200 uppercase">
                      TOTAL DONATED
                    </h4>
                    <p className="text-sm text-gray-300">
                      Cumulative amount you’ve given across all drives.
                    </p>
                  </div>
                </div>
              </Card>
              <UserDonations />
            </div>
            <Card className="bg-gray-200 rounded-lg shadow-md mb-8 p-8">
              <div className="flex flex-col md:flex-row gap-12">
                {/* Left Column - Personal Information */}
                <div className="flex-1 space-y-6">
                  {/* PERSONAL INFORMATION Section */}
                  <h2 className="text-lg font-bold text-black uppercase mb-4">
                    PERSONAL INFORMATION
                  </h2>

                  {/* Profile Pic & Change Photo Button */}
                  <div className="flex flex-col items-center md:items-center">
                    <div className="w-56 h-56 bg-gray-300 rounded-full overflow-hidden mb-8">
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

                  {/* Personal Information Form */}
                  <div className="flex flex-row gap-8">
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
                  {/* <Button className="bg-[#032040]  text-white rounded-lg uppercase px-4 py-2 text-sm font-normal">
                    SAVE
                  </Button> */}
                  <div className="space-y-2">
                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </Label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="email"
                        placeholder="Email"
                        readOnly
                        className="bg-[#1C7D91] text-white rounded-lg placeholder:text-gray-300 flex-1"
                      />
                      <Link
                        href="/sample"
                        className="text-black text-sm font-semibold hover:underline"
                      >
                        Change Email
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-black uppercase mb-4">
                      SIGN IN METHODS
                    </h2>
                    <Button className="bg-[#032040]  text-white rounded-lg px-4 py-2 text-sm font-normal">
                      <span className="text-white font-bold text-lg">G</span>
                      <span className="text-white">qiuyuan@gmail.com</span>
                    </Button>
                  </div>
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

export function UserDonations() {
  return (
    <Card className="bg-gray-200 rounded-lg shadow-md mb-8 p-8">
      <h2 className="text-lg font-bold text-black uppercase">MY DONATIONS</h2>
      {/* <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-400">
        <span className="text-sm font-semibold text-gray-700">
          Total Donated
        </span>
        <span className="text-2xl font-bold text-black">
          {formatCurrency(totalDonations)}
        </span>
      </div> */}
      {userDonations.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          You have not made any donations yet.
        </p>
      ) : (
        <div className="space-y-4">
          {userDonations.map((donation) => {
            const drive = allDrives.find((d) => d.driveId === donation.driveId);
            if (!drive) return null;
            return (
              <Link
                key={donation.driveId}
                href={`/drives/${donation.driveId}`}
                className="block"
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
              </Link>
            );
          })}
        </div>
      )}
      {/* View All Link */}
      <div className="mt-6 text-center">
        <Link
          href="/donations"
          className="text-[#1C7D91] font-semibold hover:underline"
        >
          View All Donations →
        </Link>
      </div>
    </Card>
  );
}
