import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Drive } from "@/data/allDrives";
import {
  formattedCurrent,
  formattedTarget,
  getDriveProgress,
} from "@/utils/formatCurrency";

export default function DriveCard({
  driveId,
  title,
  organization,
  description,
  currentAmount,
  targetAmount,
  imageUrl,
}: Drive) {
  return (
    <Card className="w-full sm:w-80 md:w-96 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white border border-gray-500 pt-0 pb-4 sm:pb-6">
      <div className="relative w-full h-40 sm:h-44 bg-gray-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover object-center rounded-t-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 320px, 384px"
        />
      </div>
      <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
        <CardTitle className="text-lg sm:text-xl font-semibold">
          {title}
          <div className="text-gray-600 text-xs sm:text-sm mt-1">
            {organization}
          </div>
        </CardTitle>
        <CardDescription className="text-gray-600 line-clamp-2 text-sm sm:text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="flex justify-between items-center mb-2 text-xs sm:text-sm text-gray-700">
          <span className="pr-2 min-w-0">
            {formattedCurrent({ currentAmount } as Drive)}
            {formattedTarget({ targetAmount } as Drive) && (
              <> / {formattedTarget({ targetAmount } as Drive)}</>
            )}
          </span>
          <span className="shrink-0">
            {getDriveProgress(currentAmount, targetAmount) !== null ? (
              <>{getDriveProgress(currentAmount, targetAmount)}%</>
            ) : (
              <span className="text-gray-500">Ongoing</span>
            )}
          </span>
        </div>
        {getDriveProgress(currentAmount, targetAmount) !== null ? (
          <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3 mt-2 mb-2">
            <div
              className="bg-linear-to-r from-[#032040] via-[#1C7D91] to-[#7BAC6B] h-2.5 sm:h-3 rounded-full transition-all"
              style={{
                width: `${getDriveProgress(currentAmount, targetAmount)}%`,
              }}
            />
          </div>
        ) : (
          <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3 mt-2 mb-2 relative overflow-hidden">
            <div className="bg-linear-to-r from-[#032040] via-[#1C7D91] to-[#7BAC6B] h-2.5 sm:h-3 rounded-full w-full opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 sm:px-6">
        <Link href={`/drives/${driveId}`} className="w-full">
          <Button className="w-full text-sm sm:text-base">View Drive</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
