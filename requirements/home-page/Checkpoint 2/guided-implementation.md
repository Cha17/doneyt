## Checkpoint 2: Hero Section ✓ (Ask "Check my work")

### Step 1: Create the Hero Section Component

1. **Create the Hero section component**

   1.1 Create: `frontend/app/components/Hero.tsx`

   1.2 Set up basic component structure with TypeScript:

   - Import `React` from 'react'
   - Import `Link` from 'next/link'
   - Create a functional component named `Hero`
   - Add TypeScript type annotation: `export default function Hero(): JSX.Element`

     1.3 Structure the hero container as a 2-column layout:

   - Create a `<section>` element as the main container
   - Add padding top to account for fixed header: `pt-24` (or `pt-28`)
   - Add vertical padding: `py-16` or `py-20`
   - Constrain max width and center: `max-w-7xl mx-auto px-6`
   - Inside the section, use a flex layout for columns: `flex flex-col md:flex-row items-center gap-12`

     - On small screens stack vertically, on medium+ screens render as two columns.

     1.4 Left Column: Title, Subtitle, CTA Button

   - Create a `<div>` for the left column (`flex-1 w-full md:w-1/2`)

     - Add text alignment left for medium+ screens: `md:text-left`
     - Add vertical centering if needed: `flex flex-col justify-center`
     - Add an `<h1>`:
       - Text: "Make an Impact Today"
       - Style: `text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight`
     - Add a `<p>`:
       - Text: "Support causes you care about. Every donation counts."
       - Style: `text-xl text-gray-600 mb-8 max-w-xl`
     - Add the CTA button:
       - Use the `Link` component to point to "/drives"
       - Style: `inline-block px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-lg transition-colors`
       - Text: "Browse All Drives"

     1.5 Right Column: Image

   - Create a `<div>` for the right column (`flex-1 w-full md:w-1/2 flex justify-center`)

     - Add an `<img>` or `<Image>` (using `next/image` if desired)
       - Use a relevant placeholder, e.g. `/hero-image.png`
       - Add `alt` text: "Children and volunteers helping in a donation drive"
       - Style: `w-full max-w-md rounded-xl shadow-lg object-cover`

     1.6 (Optional) Move stats below or outside of the row flex for wide hero

   - You may place the stats section below the hero row, centered
   - Use a container `<div>` with `flex flex-wrap justify-center gap-8 mt-12 mb-10`
   - Each stat in a flex column as previous. Optionally, keep the stat block as is.

     1.9 Export as default export as before.

**Code to add:**

```typescript
import Link from 'next/link';

export default function Hero(): JSX.Element {
  return (
    <section className="pt-24 py-20 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
        {/* Left Column */}
        <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Make an Impact Today
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl">
            Support causes you care about. Every donation counts.
          </p>
          <Link
            href="/drives"
            className="inline-block px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-lg transition-colors"
          >
            Browse All Drives
          </Link>
        </div>
        {/* Right Column */}
        <div className="flex-1 w-full md:w-1/2 flex justify-center">
          <img
            src="/hero-image.png"
            alt="Children and volunteers helping in a donation drive"
            className="w-full max-w-md rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-8 mt-12 mb-10 text-gray-400">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-900">50+</span>
          <span className="text-gray-600">Drives</span>
        </div>
        <span className="hidden sm:block">|</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-900">₱1.2M</span>
          <span className="text-gray-600">Raised</span>
        </div>
        <span className="hidden sm:block">|</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-900">10K</span>
          <span className="text-gray-600">Donors</span>
        </div>
      </div>
    </section>
    </section>
  );
}
```

**Expected Result:**

- Hero section appears below the fixed header
- Large, bold title "Make an Impact Today" centered
- Subtitle text below the title
- Three stats displayed horizontally: "50+ Drives" | "₱1.2M Raised" | "10K Donors"
- Large green "Browse All Drives" button centered below stats
- All elements are centered and visually balanced
- Responsive layout that adapts to mobile screens
