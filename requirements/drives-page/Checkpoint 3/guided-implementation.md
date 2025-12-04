## Checkpoint 3: Pagination Component ✓ (Ask "Check my work")

### Step 1: Add Pagination to the Drives Page

1. **Implement pagination functionality**

   1.1 Open: `frontend/app/drives/page.tsx`

   1.2 Add pagination state:

   - Add a new state for current page: `const [currentPage, setCurrentPage] = useState<number>(1)`
   - Define items per page constant: `const ITEMS_PER_PAGE = 9`
   - This will show 9 drives per page (3 rows × 3 columns)

     1.3 Update filtered drives logic:

   - Modify `getFilteredDrives()` to return all filtered drives (don't slice yet)
   - Calculate total pages: `const totalPages = Math.ceil(filteredDrives.length / ITEMS_PER_PAGE)`
   - Calculate paginated drives: slice the filtered array based on current page
   - Use: `const startIndex = (currentPage - 1) * ITEMS_PER_PAGE`
   - Use: `const endIndex = startIndex + ITEMS_PER_PAGE`
   - Slice: `const paginatedDrives = filteredDrives.slice(startIndex, endIndex)`

     1.4 Reset page when filters change:

   - Add a `useEffect` hook to reset to page 1 when `filter` or `searchQuery` changes
   - Import `useEffect` from 'react'
   - Add: `useEffect(() => { setCurrentPage(1); }, [filter, searchQuery])`

     1.5 Create pagination container:

   - Add a `<div>` below the drives grid with classes: `flex justify-center items-center gap-2 mt-12 mb-8`
   - This centers the pagination controls

     1.6 Add "Previous" button (optional, can be hidden on first page):

   - Create a `<button>` element
   - Add text: "← Previous" or just "←"
   - Disable when `currentPage === 1`
   - Add onClick: `onClick={() => setCurrentPage(currentPage - 1)}`
   - Style: `px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`

     1.7 Add page number buttons:

   - Create buttons for each page number (1, 2, 3, etc.)
   - Use a loop or map to generate buttons for pages up to `totalPages`
   - For each page button:

     - Show the page number as text
     - Highlight active page: if `currentPage === pageNumber`, use `bg-blue-600 text-white`
     - Inactive pages: use `bg-white text-gray-700 border border-gray-300`
     - Add onClick: `onClick={() => setCurrentPage(pageNumber)}`
     - Style: `px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors`
     - Limit to showing max 5-7 page numbers (you can show ellipsis for more pages later)

     1.8 Add "Next" button:

   - Create a `<button>` element
   - Add text: "Next →" or just "→"
   - Disable when `currentPage === totalPages` or `totalPages === 0`
   - Add onClick: `onClick={() => setCurrentPage(currentPage + 1)}`
   - Use same styling as Previous button

     1.9 Update drives display:

   - Change the map to use `paginatedDrives` instead of `filteredDrives`
   - This ensures only the current page's drives are displayed

     1.10 Add page info (optional):

   - Display current page info: "Page {currentPage} of {totalPages}"
   - Style with: `text-sm text-gray-600`
   - Place it near the pagination buttons

**Code to add:**

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DriveCard from "../components/DriveCard";

const allDrives = [
  {
    id: "1",
    title: "School Books for 100 Kids",
    shortDescription:
      "Providing educational materials for underprivileged children",
    currentAmount: 4500,
    targetAmount: 6000,
    imageUrl: "/images/sample.png",
  },
  {
    id: "2",
    title: "Clean Water Initiative",
    shortDescription: "Bringing clean and safe drinking water to communities",
    currentAmount: 3200,
    targetAmount: 5000,
    imageUrl: "/images/sample.png",
  },
  {
    id: "3",
    title: "Emergency Food Relief",
    shortDescription:
      "Supporting families in need with essential food supplies",
    currentAmount: 7800,
    targetAmount: 10000,
    imageUrl: "/images/sample.png",
  },
  {
    id: "4",
    title: "Medical Supplies Drive",
    shortDescription: "Providing essential medical equipment to rural clinics",
    currentAmount: 9200,
    targetAmount: 10000,
    imageUrl: "/images/sample.png",
  },
  {
    id: "5",
    title: "Shelter for Homeless Families",
    shortDescription: "Building safe housing for families in need",
    currentAmount: 15000,
    targetAmount: 20000,
    imageUrl: "/images/sample.png",
  },
  {
    id: "6",
    title: "Youth Education Program",
    shortDescription:
      "Supporting after-school programs for disadvantaged youth",
    currentAmount: 2500,
    targetAmount: 8000,
    imageUrl: "/images/sample.png",
  },
  {
    id: "7",
    title: "Disaster Relief Fund",
    shortDescription:
      "Emergency assistance for communities affected by natural disasters",
    currentAmount: 12000,
    targetAmount: 15000,
    imageUrl: "/images/sample.png",
  },
  {
    id: "8",
    title: "Animal Rescue Initiative",
    shortDescription: "Caring for abandoned and injured animals",
    currentAmount: 6800,
    targetAmount: 10000,
    imageUrl: "/images/sample.png",
  },
  {
    id: "9",
    title: "Community Garden Project",
    shortDescription: "Creating sustainable food sources in urban areas",
    currentAmount: 3500,
    targetAmount: 5000,
    imageUrl: "/images/sample.png",
  },
];

const ITEMS_PER_PAGE = 9;

export default function DrivesPage(): JSX.Element {
  const [filter, setFilter] = useState<string>("Active");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getFilteredDrives = () => {
    let filtered = allDrives;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (drive) =>
          drive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          drive.shortDescription
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected filter type
    if (filter === "Active") {
      filtered = filtered.filter((drive) => {
        const progress = (drive.currentAmount / drive.targetAmount) * 100;
        return progress < 100;
      });
    } else if (filter === "Ending Soon") {
      filtered = filtered.filter((drive) => {
        const progress = (drive.currentAmount / drive.targetAmount) * 100;
        return progress >= 80 && progress < 100;
      });
    } else if (filter === "Popular") {
      filtered = [...filtered].sort(
        (a, b) => b.currentAmount - a.currentAmount
      );
    }

    return filtered;
  };

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

  const filteredDrives = getFilteredDrives();
  const totalPages = Math.ceil(filteredDrives.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedDrives = filteredDrives.slice(startIndex, endIndex);

  // Generate page numbers to display (show up to 5 pages)
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 w-full">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            All Donation Drives
          </h1>
          <div className="max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search drives by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-base"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setFilter("Active")}
              className={
                filter === "Active"
                  ? "bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  : "bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              }
            >
              Active
            </button>
            <button
              onClick={() => setFilter("Ending Soon")}
              className={
                filter === "Ending Soon"
                  ? "bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  : "bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              }
            >
              Ending Soon
            </button>
            <button
              onClick={() => setFilter("Popular")}
              className={
                filter === "Popular"
                  ? "bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  : "bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              }
            >
              Popular
            </button>
          </div>
          {paginatedDrives.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              No drives found matching your criteria
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {paginatedDrives.map((drive) => (
                  <DriveCard
                    key={drive.id}
                    driveId={drive.id}
                    title={drive.title}
                    shortDescription={drive.shortDescription}
                    currentAmount={drive.currentAmount}
                    targetAmount={drive.targetAmount}
                    imageUrl={drive.imageUrl}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Previous
                  </button>
                  {pageNumbers.map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={
                        currentPage === pageNum
                          ? "px-4 py-2 rounded-lg bg-blue-600 text-white font-medium transition-colors"
                          : "px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      }
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

**Expected Result:**

- Pagination controls appear at the bottom of the drives grid
- Shows page numbers (1, 2, 3, etc.) based on total pages needed
- Current page is highlighted in blue
- "Previous" button is disabled on page 1
- "Next" button is disabled on the last page
- Clicking page numbers navigates to that page
- Only 9 drives are shown per page (3 rows × 3 columns)
- Page resets to 1 when filters or search query changes
- Pagination only appears when there's more than 1 page
- Smooth transitions and hover effects on all buttons
- Responsive design that works on all screen sizes

**Common Errors:**

- If pagination doesn't reset when filters change, ensure useEffect dependencies include `filter` and `searchQuery`
- If wrong drives show on each page, verify the slice calculation (startIndex and endIndex)
- If page numbers don't update, check that `totalPages` is calculated correctly
- If pagination shows when it shouldn't, add condition `{totalPages > 1 && (...)}`
- Ensure page numbers array is generated correctly based on current page

**Next Steps:**

- Test pagination with different filter combinations
- Verify that search and filters work correctly with pagination
- Consider adding "Go to page" input for large page counts
- Style adjustments can be made to match your brand colors
