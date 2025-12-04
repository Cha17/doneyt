## Checkpoint 3: Featured Drives Cards Component ✓ (Ask "Check my work")

### Step 1: Create the Featured Drive Card Component

1. **Create the individual Drive Card component**

   1.1 Create: `frontend/app/components/DriveCard.tsx`

   1.2 Set up basic component structure with TypeScript:
   - Import `React` from 'react'
   - Import `Link` from 'next/link'
   - Import `Image` from 'next/image'
   - Create an interface for props: `interface DriveCardProps`
   - Define props: `title: string`, `currentAmount: number`, `targetAmount: number`, `imageUrl: string`, `driveId: string`
   - Create a functional component named `DriveCard` that accepts these props
   - Add TypeScript type annotation: `export default function DriveCard({ title, currentAmount, targetAmount, imageUrl, driveId }: DriveCardProps): JSX.Element`

   1.3 Calculate progress percentage:
   - Create a const: `const progress = Math.min((currentAmount / targetAmount) * 100, 100)`
   - Round to nearest integer: `Math.round(progress)`

   1.4 Format currency:
   - Create a helper function or inline formatting for PHP currency
   - Format currentAmount: `new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 0 }).format(currentAmount)`
   - Format targetAmount similarly

   1.5 Structure the card container:
   - Create a `<div>` with card styling:
     - Background: `bg-white`
     - Border: `border border-gray-200`
     - Rounded corners: `rounded-lg`
     - Overflow hidden: `overflow-hidden`
     - Shadow: `shadow-md`
     - Hover effect: `hover:shadow-lg transition-shadow`

   1.6 Add the image section:
   - Use Next.js `Image` component
   - Set width: `200`, height: `150`
   - Add className: `w-full h-48 object-cover`
   - Add alt text using the title prop
   - Use a placeholder if imageUrl is not available

   1.7 Add card content section:
   - Create a container with padding: `p-6`
   - Add title with: `text-xl font-semibold text-gray-900 mb-4`

   1.8 Create progress bar section:
   - Create a container div with `mb-4`
   - Add progress text showing "75% ($4,500 / $6,000)" format
   - Style the text: `text-sm text-gray-600 mb-2`
   - Create progress bar background: `w-full bg-gray-200 rounded-full h-3`
   - Add progress fill: `bg-green-500 h-3 rounded-full transition-all`
   - Set width dynamically: `style={{ width: `${progress}%` }}`

   1.9 Add "View Drive" button:
   - Use `Link` component pointing to `/drives/${driveId}`
   - Style with: `w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors text-center font-medium`
   - Add text: "View Drive"

   1.10 Export as default export

### Step 2: Create the Featured Drives Container

1. **Create the Featured Drives section component**

   2.1 Create: `frontend/app/components/FeaturedDrives.tsx`

   2.2 Set up basic component structure with TypeScript:
   - Import `React` from 'react'
   - Import the `DriveCard` component you just created
   - Create a functional component named `FeaturedDrives`
   - Add TypeScript type annotation: `export default function FeaturedDrives(): JSX.Element`

   2.3 Create mock data for 3 featured drives:
   - Create a const array with 3 drive objects
   - Each object should have: `id`, `title`, `currentAmount`, `targetAmount`, `imageUrl`
   - Example: "School Books for 100 Kids" with 4500/6000 progress

   2.4 Structure the section container:
   - Create a `<section>` element
   - Add max width and centering: `max-w-7xl mx-auto px-6 py-16`
   - Add section title: "Featured Drives" with styling `text-3xl font-bold text-gray-900 mb-8 text-center`

   2.5 Create cards grid:
   - Create a container with: `grid grid-cols-1 md:grid-cols-3 gap-6`
   - Map over the drives array and render `DriveCard` for each

   2.6 Pass props to each DriveCard:
   - Pass all required props: `title`, `currentAmount`, `targetAmount`, `imageUrl`, `driveId`

   2.7 Export as default export

**Code to add:**

**DriveCard.tsx:**
```typescript
import Link from 'next/link';
import Image from 'next/image';

interface DriveCardProps {
  title: string;
  currentAmount: number;
  targetAmount: number;
  imageUrl: string;
  driveId: string;
}

export default function DriveCard({
  title,
  currentAmount,
  targetAmount,
  imageUrl,
  driveId,
}: DriveCardProps): JSX.Element {
  const progress = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
  const formattedCurrent = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
  }).format(currentAmount);
  const formattedTarget = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
  }).format(targetAmount);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{progress}%</span>
            <span>{formattedCurrent} / {formattedTarget}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <Link
          href={`/drives/${driveId}`}
          className="block w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors text-center font-medium"
        >
          View Drive
        </Link>
      </div>
    </div>
  );
}
```

**FeaturedDrives.tsx:**
```typescript
import DriveCard from './DriveCard';

export default function FeaturedDrives(): JSX.Element {
  const featuredDrives = [
    {
      id: '1',
      title: 'School Books for 100 Kids',
      currentAmount: 4500,
      targetAmount: 6000,
      imageUrl: '/placeholder-drive-1.jpg',
    },
    {
      id: '2',
      title: 'Clean Water Initiative',
      currentAmount: 3200,
      targetAmount: 5000,
      imageUrl: '/placeholder-drive-2.jpg',
    },
    {
      id: '3',
      title: 'Emergency Food Relief',
      currentAmount: 7800,
      targetAmount: 10000,
      imageUrl: '/placeholder-drive-3.jpg',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Featured Drives
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredDrives.map((drive) => (
          <DriveCard
            key={drive.id}
            driveId={drive.id}
            title={drive.title}
            currentAmount={drive.currentAmount}
            targetAmount={drive.targetAmount}
            imageUrl={drive.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
```

**Expected Result:**

- Section titled "Featured Drives" at the top
- Three drive cards displayed in a responsive grid (1 column on mobile, 3 columns on desktop)
- Each card shows:
  - Image at the top (200x150 dimensions, full width of card)
  - Drive title below image
  - Progress percentage and currency amounts
  - Visual progress bar (green) showing completion percentage
  - "View Drive" button at the bottom
- Cards have hover effects (shadow increases on hover)
- Progress bars are accurate based on current/target amounts
- Currency is formatted in PHP (₱)

**Common Errors:**

- If images don't load, add placeholder images to `frontend/public/` folder or use a placeholder service
- Make sure Image component has proper width/height or uses `fill` with relative positioning
- Progress percentage should never exceed 100%

