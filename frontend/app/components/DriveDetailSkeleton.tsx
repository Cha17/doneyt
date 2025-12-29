export default function DriveDetailSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
      <main className="flex-1 pt-24 mx-6 sm:mx-8 md:mx-12 lg:mx-12">
        {/* Hero Banner Skeleton */}
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] mb-8 sm:mb-10 md:mb-12 bg-gray-200 rounded-full animate-pulse" />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-4 sm:gap-6 z-10">
              {/* Circular Progress Card Skeleton */}
              <div className="bg-white rounded-full shadow-lg p-4 sm:p-6 md:p-8">
                <div className="flex flex-col items-center justify-center gap-4">
                  {/* Circular Progress Skeleton */}
                  <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72">
                    <div className="w-full h-full rounded-full bg-gray-200 animate-pulse" />
                  </div>
                  {/* Button Skeleton */}
                  <div className="w-full md:w-auto h-12 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Drive Info Card Skeleton */}
              <div className="bg-white rounded-full shadow-lg p-4 sm:p-6">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-4">
                  <div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-20" />
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-32" />
                  </div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-16" />
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-12" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="lg:col-span-2">
            {/* About Section Skeleton */}
            <div className="bg-white rounded-full shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-48" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
              </div>
            </div>

            {/* Gallery Skeleton */}
            <div className="bg-white rounded-full shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-32" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-full bg-gray-200 animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
