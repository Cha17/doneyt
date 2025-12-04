## Checkpoint 3: Build Hero Banner Section ✓ (Ask "Check my work")

### Step 1: Create the Hero Banner with Image and Overlay

1. **Add the hero banner section**

   1.1 Import Image component:

   - Add `import Image from "next/image";` at the top of the file

   1.2 Create hero banner container:

   - Inside the `<main>` element, create a `<div>` with classes: `relative w-full h-[500px] mb-12`
   - This creates a full-width container with fixed height

   1.3 Add the main hero image:

   - Use Next.js `<Image>` component with `fill` prop
   - Set `src={drive.imageUrl}`
   - Set `alt={drive.title}`
   - Add className: `object-cover`
   - Add `priority` prop for faster loading
   - Add `sizes="100vw"` for responsive sizing

   1.4 Add dark overlay:

   - Create a `<div>` with classes: `absolute inset-0 bg-black/40 flex items-center justify-center`
   - This creates a semi-transparent dark overlay

   1.5 Add title and organizer text:

   - Inside the overlay, create a centered container: `max-w-4xl mx-auto px-6 text-center text-white`
   - Add an `<h1>` with classes: `text-5xl font-bold mb-4` displaying `{drive.title}`
   - Add a `<p>` with classes: `text-2xl mb-6` displaying `{drive.organization}`

### Step 2: Create Hero Info Card with Progress and Donate Button

1. **Add the hero info card**

   1.6 Create container for hero info:

   - After the hero banner, create a `<div>` with classes: `max-w-7xl mx-auto px-6 pb-12`
   - This centers the content and adds padding

   1.7 Create the info card:

   - Create a `<div>` with classes: `bg-white rounded-lg shadow-lg p-8 mb-12 -mt-20 relative z-10`
   - The `-mt-20` creates an overlapping effect with the hero banner

   1.8 Add raised amount and end date section:

   - Create a flex container: `flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6`
   - Add a "Raised" section showing formatted current and target amounts
   - Format amounts using `Intl.NumberFormat` with PHP currency
   - Conditionally show end date if `drive.endDate` exists

   1.9 Add progress bar:

   - Create a progress bar container with classes: `w-full bg-gray-200 rounded-full h-6 mb-2`
   - Calculate progress percentage: `Math.min(Math.round((drive.currentAmount / drive.targetAmount) * 100), 100)`
   - Add a colored progress fill with gradient: `bg-gradient-to-r from-[#032040] via-[#1C7D91] to-[#7BAC6B]`
   - Set width dynamically using inline style: `style={{ width: \`${progress}%\` }}`
   - Display progress percentage inside the bar

   1.10 Add DONATE NOW button:

   - Import `Button` from `@/components/ui/button`
   - Create a button with text "DONATE NOW"
   - Style with classes: `w-full md:w-auto px-8 py-6 text-lg font-semibold`
   - Add gradient background: `bg-gradient-to-r from-[#032040] via-[#1C7D91] to-[#7BAC6B]`
   - Add hover effect: `hover:opacity-90`
   - Use `size="lg"` prop

**Code to add:**

```typescript
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Inside the component, after finding the drive:

const progress = Math.min(
  Math.round((drive.currentAmount / drive.targetAmount) * 100),
  100
);

const formattedCurrent = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 0,
}).format(drive.currentAmount);

const formattedTarget = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 0,
}).format(drive.targetAmount);

return (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <main className="flex-1 pt-24">
      {/* Hero Banner */}
      <div className="relative w-full h-[500px] mb-12">
        <Image
          src={drive.imageUrl}
          alt={drive.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{drive.title}</h1>
            <p className="text-2xl mb-6">{drive.organization}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Hero Info Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-2">Raised</div>
              <div className="text-3xl font-bold text-gray-900">
                {formattedCurrent} / {formattedTarget}
              </div>
            </div>
            {drive.endDate && (
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-2">End Date</div>
                <div className="text-xl font-semibold text-gray-900">
                  {drive.endDate}
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
              <div
                className="bg-gradient-to-r from-[#032040] via-[#1C7D91] to-[#7BAC6B] h-6 rounded-full transition-all flex items-center justify-end pr-2"
                style={{ width: `${progress}%` }}
              >
                <span className="text-white text-xs font-semibold">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Donate Button */}
          <Button
            className="w-full md:w-auto px-8 py-6 text-lg font-semibold bg-gradient-to-r from-[#032040] via-[#1C7D91] to-[#7BAC6B] hover:opacity-90"
            size="lg"
          >
            DONATE NOW
          </Button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);
```

**Expected Result:**

- Full-width hero banner image at the top
- Dark overlay with white title and organizer text centered
- White info card overlapping the hero banner
- Raised amount displayed in PHP currency format
- End date shown on the right (if available)
- Large, colorful progress bar showing percentage
- Prominent "DONATE NOW" button with gradient background
- Responsive design that works on mobile and desktop
- Proper spacing and visual hierarchy

**Common Errors:**

- If image doesn't load, check that the imageUrl path is correct
- If progress bar doesn't show, verify the calculation and inline style syntax
- If currency formatting fails, ensure Intl.NumberFormat is used correctly
- If button doesn't style properly, check that Button component is imported correctly

