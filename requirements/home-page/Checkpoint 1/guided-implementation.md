## Checkpoint 1: Header Component (Fixed Top Navigation) ✓ (Ask "Check my work")

### Step 1: Create the Header Component

1. **Create the Header component**

   1.1 Create: `frontend/app/components/Header.tsx`

   1.2 Set up basic component structure with TypeScript:

   - Import `React` from 'react'
   - Import `Link` from 'next/link'
   - Create a functional component named `Header`
   - Add TypeScript type annotation: `export default function Header(): JSX.Element`

     1.3 Structure the header container:

   - Create a `<header>` element with fixed positioning classes
   - Add `fixed top-0 left-0 right-0` for full-width fixed positioning
   - Add `z-50` to ensure it stays above other content
   - Add background color: `bg-white` with shadow: `shadow-sm`
   - Add padding: `px-6 py-4`

     1.4 Add the logo section (left side):

   - Create a `<div>` container for logo
   - Add text content: "Doneyt" (or use an Image component if you have a logo)
   - Style with: `text-xl font-bold text-gray-900`
   - Wrap in a `Link` component pointing to "/"

     1.5 Add navigation buttons container:

   - Create a flex container with `flex items-center gap-4`
   - Position it on the right side with `ml-auto`

     1.6 Create "Browse Drives" button:

   - Use `Link` component from Next.js pointing to "/drives"
   - Style with: `px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors`
   - Add text: "Browse Drives"

     1.7 Create "Donate" CTA button:

   - Use `Link` component pointing to "/donate"
   - Style with bright green: `bg-green-500 hover:bg-green-600`
   - Add text color: `text-white`
   - Add padding: `px-6 py-2`
   - Add rounded corners: `rounded-lg`
   - Add transition: `transition-colors`
   - Add font weight: `font-semibold`

     1.8 Export as default export

**Code to add:**

```typescript
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 hover:opacity-80 transition-opacity"
        >
          Doneyt
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/drives"
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Browse Drives
          </Link>
          <Link
            href="/donate"
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-semibold"
          >
            Donate
          </Link>
        </div>
      </div>
    </header>
  );
}
```

**Expected Result:**

- Fixed header at the top of the page that stays visible when scrolling
- Logo "Doneyt" on the left that links to home
- "Browse Drives" button in the middle-right (gray text, hover effect)
- Bright green "Donate" button on the far right
- Header has white background with subtle shadow
- All buttons have smooth hover transitions
