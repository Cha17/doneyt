import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function DriveCardSkeleton() {
  return (
    <Card className="w-full sm:w-80 md:w-96 rounded-lg overflow-hidden shadow-md bg-white border border-gray-500 pt-0 pb-4 sm:pb-6">
      {/* Image skeleton */}
      <div className="relative w-full h-40 sm:h-44 bg-gray-200 animate-pulse rounded-t-lg" />

      <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-4" />
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        </div>
      </CardHeader>

      <CardContent className="px-4 sm:px-6">
        {/* Progress text skeleton */}
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
        </div>
        {/* Progress bar skeleton */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3 mt-2 mb-2">
          <div className="h-2.5 sm:h-3 bg-gray-300 rounded-full animate-pulse w-3/4" />
        </div>
      </CardContent>

      <CardFooter className="px-4 sm:px-6">
        {/* Button skeleton */}
        <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}

