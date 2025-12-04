## Checkpoint 2: Filter Buttons and Drive Grid Display ✓ (Ask "Check my work")

### Step 1: Add Filter Buttons and Display Drives

1. **Add filter functionality and drive listing**

   1.1 Open: `frontend/app/drives/page.tsx`

   1.2 Add necessary imports:

   - Import `useState` from 'react' for managing filter state
   - Import `DriveCard` from `../components/DriveCard`
   - Import sample drives data (we'll create this)

   1.3 Create sample drives data:

   - Create a constant array `allDrives` with at least 9-12 drive objects
   - Each drive should have: `id`, `title`, `shortDescription`, `currentAmount`, `targetAmount`, `imageUrl`
   - Include variety in progress percentages (some active, some ending soon, some popular)
   - Place this above the component function

   1.4 Add state management:

   - Use `useState` to track the selected filter: `const [filter, setFilter] = useState<string>("Active")`
   - Use `useState` to track search query: `const [searchQuery, setSearchQuery] = useState<string>("")`

   1.5 Update search input:

   - Add `value={searchQuery}` prop to the input
   - Add `onChange` handler: `onChange={(e) => setSearchQuery(e.target.value)}`

   1.6 Create filter buttons container:

   - Add a `<div>` below the search bar with classes: `flex flex-wrap justify-center gap-4 mb-8`
   - This centers the buttons and allows wrapping on mobile

   1.7 Create filter buttons:

   - Create three buttons: "Active", "Ending Soon", "Popular"
   - For each button:
     - Use a `<button>` element
     - Add `onClick` handler to set the filter state
     - Style with conditional classes based on active state
     - Active button: `bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors`
     - Inactive button: `bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors`
     - Check if `filter === "Active"` (or respective filter name) to apply active styles

   1.8 Add drives grid container:

   - Create a `<div>` with classes: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center`
   - This creates a responsive grid layout

   1.9 Implement filtering and search logic:

   - Create a function to filter drives based on search query and selected filter
   - Filter by search: check if `title` or `shortDescription` includes the search query (case-insensitive)
   - Filter by type:
     - "Active": drives with progress < 100%
     - "Ending Soon": drives with progress between 80-99%
     - "Popular": drives sorted by highest currentAmount

   1.10 Map and display filtered drives:

   - Use `.map()` to render `DriveCard` components for each filtered drive
   - Pass all required props: `driveId`, `title`, `shortDescription`, `currentAmount`, `targetAmount`, `imageUrl`
   - Add `key` prop using the drive `id`

   1.11 Add empty state:

   - If no drives match the filters, display a message: "No drives found matching your criteria"
   - Style with: `text-center text-gray-500 py-12`

**Code to add:**

```typescript
"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DriveCard from "../components/DriveCard";

const allDrives = [
  {
    id: "1",
    title: "School Books for 100 Kids",
    shortDescription: "Providing educational materials for underprivileged children",
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
    shortDescription: "Supporting families in need with essential food supplies",
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
    shortDescription: "Supporting after-school programs for disadvantaged youth",
    currentAmount: 2500,
    targetAmount: 8000,
    imageUrl: "/images/sample.png",
  },
  {
    id: "7",
    title: "Disaster Relief Fund",
    shortDescription: "Emergency assistance for communities affected by natural disasters",
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

export default function DrivesPage(): JSX.Element {
  const [filter, setFilter] = useState<string>("Active");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getFilteredDrives = () => {
    let filtered = allDrives;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (drive) =>
          drive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          drive.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
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
      filtered = [...filtered].sort((a, b) => b.currentAmount - a.currentAmount);
    }

    return filtered;
  };

  const filteredDrives = getFilteredDrives();

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
          {filteredDrives.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              No drives found matching your criteria
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {filteredDrives.map((drive) => (
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

**Expected Result:**

- Search bar filters drives as you type (searches title and description)
- Three filter buttons: "Active", "Ending Soon", "Popular"
- Active filter button is highlighted in blue
- Filter buttons change the displayed drives based on selection:
  - Active: Shows drives that haven't reached 100% progress
  - Ending Soon: Shows drives between 80-99% progress
  - Popular: Shows drives sorted by highest amount raised
- Drives displayed in a responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
- Each drive card shows image, title, description, progress bar, and "View Drive" button
- Empty state message appears when no drives match the filters
- All functionality works smoothly with proper state management

**Common Errors:**

- If "use client" directive is missing, add it at the top since we're using useState hooks
- If filter buttons don't work, ensure onClick handlers are properly set
- If search doesn't filter, check that value and onChange are connected to state
- If drives don't display, verify DriveCard component is imported correctly
- Ensure grid layout uses `justify-items-center` to center cards properly

