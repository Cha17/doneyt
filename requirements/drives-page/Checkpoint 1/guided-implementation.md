## Checkpoint 1: Drives Page Structure with Search Bar ✓ (Ask "Check my work")

### Step 1: Create the Drives Page Route and Basic Structure

1. **Create the Drives page route**

   1.1 Create: `frontend/app/drives/page.tsx`

   1.2 Set up basic page structure with TypeScript:

   - Import `React` from 'react'
   - Import `Header` from `../components/Header`
   - Import `Footer` from `../components/Footer`
   - Create a functional component named `DrivesPage`
   - Add TypeScript type annotation: `export default function DrivesPage(): JSX.Element`

     1.3 Create page wrapper structure:

   - Create a wrapper `<div>` with `min-h-screen flex flex-col bg-gray-50`
   - This ensures the page takes full height and footer stays at bottom

     1.4 Add Header component:

   - Place `<Header />` as the first element inside the wrapper
   - This will render at the top with fixed positioning

     1.5 Add main content wrapper:

   - Create a `<main>` element with `flex-1 pt-24` classes
   - The `pt-24` adds top padding to account for the fixed header
   - Add max width container: `max-w-7xl mx-auto px-6 py-12 w-full`

     1.6 Add page title section:

   - Create a `<h1>` element with text: "All Donation Drives"
   - Style with: `text-4xl font-bold text-gray-900 mb-8`
   - Center align: `text-center`

     1.7 Create search bar container:

   - Create a `<div>` wrapper for the search input
   - Add max width: `max-w-2xl mx-auto mb-8`
   - This centers the search bar and limits its width

     1.8 Add search input field:

   - Create an `<input>` element with type "text"
   - Add placeholder: "Search drives by title or description..."
   - Style with: `w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`
   - Add background: `bg-white`
   - Add text size: `text-base`

     1.9 Add Footer component:

   - Place `<Footer />` after the main closing tag
   - This will render at the bottom of the page

     1.10 Export as default export

**Code to add:**

```typescript
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DrivesPage(): JSX.Element {
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-base"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

**Expected Result:**

- Complete drives page route accessible at `/drives`
- Fixed header at the top that stays visible when scrolling
- Page title "All Donation Drives" centered at the top
- Search bar centered below the title with proper styling
- Search input has focus states (blue ring when focused)
- Footer at the bottom with copyright and links
- Proper spacing and padding throughout
- Responsive design that works on mobile and desktop

**Common Errors:**

- If page doesn't load, ensure the file is in `frontend/app/drives/page.tsx` (Next.js App Router requires this exact path)
- If header overlaps content, verify `pt-24` is added to the main element
- If search bar is too wide, check that `max-w-2xl mx-auto` classes are applied
- Ensure all imports use correct relative paths from the drives page location
