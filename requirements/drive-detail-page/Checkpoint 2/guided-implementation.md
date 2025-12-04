## Checkpoint 2: Create Dynamic Route Page Structure ✓ (Ask "Check my work")

### Step 1: Create the Drive Detail Page Route

1. **Create the dynamic route page**

   1.1 Create: `frontend/app/drives/[id]/page.tsx`

   1.2 Set up basic page structure with TypeScript:

   - Import `React` from 'react'
   - Import `useParams` from 'next/navigation'
   - Import `Header` from `../../components/Header`
   - Import `Footer` from `../../components/Footer`
   - Import `allDrives` from `@/data/allDrives`
   - Create a functional component named `DriveDetailPage`
   - Add TypeScript type annotation: `export default function DriveDetailPage(): JSX.Element`

   1.3 Add "use client" directive at the top:

   - Add `"use client";` as the first line (required for using hooks like useParams)

   1.4 Get the drive ID from URL parameters:

   - Use `const params = useParams();` to get route parameters
   - Extract the id: `const driveId = params?.id as string;`

   1.5 Find the drive from the data:

   - Use `allDrives.find((d) => d.id === driveId)` to find the matching drive
   - Store it in a variable named `drive`

   1.6 Handle drive not found:

   - If drive is not found, return a simple "Drive Not Found" message with Header and Footer
   - Create a wrapper div with `min-h-screen flex flex-col bg-gray-50`
   - Add Header and Footer components
   - Display a centered message: "Drive Not Found"

   1.7 Create page wrapper structure:

   - Create a wrapper `<div>` with `min-h-screen flex flex-col bg-gray-50`
   - Add `<Header />` as the first element
   - Create a `<main>` element with `flex-1 pt-24` classes
   - Add `<Footer />` at the end

   1.8 Export as default export

**Code to add:**

```typescript
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { allDrives } from "@/data/allDrives";

export default function DriveDetailPage(): JSX.Element {
  const params = useParams();
  const driveId = params?.id as string;

  const drive = allDrives.find((d) => d.id === driveId);

  if (!drive) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 pt-24">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Drive Not Found
            </h1>
            <p className="text-gray-600">
              The donation drive you're looking for doesn't exist.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 pt-24">
        {/* Content will go here */}
      </main>
      <Footer />
    </div>
  );
}
```

**Expected Result:**

- Dynamic route page created at `frontend/app/drives/[id]/page.tsx`
- Page can access the drive ID from the URL
- Page finds and displays the correct drive data
- Shows "Drive Not Found" message for invalid drive IDs
- Fixed header at the top with proper padding
- Footer at the bottom
- No TypeScript or runtime errors

**Common Errors:**

- If page doesn't load, ensure the file is in `frontend/app/drives/[id]/page.tsx` (Next.js requires this exact path structure)
- If `useParams` doesn't work, ensure "use client" directive is at the top
- If drive is always undefined, check that the id from params matches the id in allDrives
- Ensure all imports use correct relative paths from the [id] folder location

