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

interface DriveCardProps {
  driveId: string;
  title: string;
  organization: string;
  description: string;
  currentAmount: number;
  targetAmount?: number;
  imageUrl: string;
}

export default function DriveCard({
  driveId,
  title,
  organization,
  description,
  currentAmount,
  targetAmount = 0,
  imageUrl,
}: DriveCardProps) {
  const progress = ({ currentAmount, targetAmount = 0 }: DriveCardProps) => {
    return Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
  };

  const formattedCurrent = ({ currentAmount }: DriveCardProps) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(currentAmount);
  };

  const formattedTarget = ({ targetAmount }: DriveCardProps) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(targetAmount || 0);
  };
  return (
    <Card className="w-96 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white border border-gray-200 pt-0 pb-6">
      <div className="relative w-full h-44 bg-gray-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover object-center rounded-t-lg"
          sizes="340px"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {title}
          <div className="text-gray-600 text-sm">{organization}</div>
        </CardTitle>
        <CardDescription className="text-gray-600 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2 text-sm text-gray-700">
          <span>
            {formattedCurrent({ currentAmount } as DriveCardProps)} /{" "}
            {formattedTarget({ targetAmount } as DriveCardProps)}
          </span>
          <span>
            {progress({ currentAmount, targetAmount } as DriveCardProps)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2 mb-2">
          <div
            className="bg-linear-to-r from-[#032040] via-[#1C7D91] to-[#7BAC6B] h-3 rounded-full transition-all"
            style={{
              width: `${progress({
                currentAmount,
                targetAmount,
              } as DriveCardProps)}%`,
            }}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/drives/${driveId}`} className="w-full">
          <Button className="w-full">View Drive</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
