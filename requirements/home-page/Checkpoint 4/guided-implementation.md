## Checkpoint 4: Footer Component ✓ (Ask "Check my work")

### Step 1: Create the Footer Component

1. **Create the Footer component**

   1.1 Create: `frontend/app/components/Footer.tsx`

   1.2 Set up basic component structure with TypeScript:

   - Import `React` from 'react'
   - Import `Link` from 'next/link'
   - Create a functional component named `Footer`
   - Add TypeScript type annotation: `export default function Footer(): JSX.Element`

     1.3 Structure the footer container:

   - Create a `<footer>` element
   - Add background color: `bg-gray-900` or `bg-gray-800`
   - Add text color: `text-gray-300`
   - Add padding: `py-8 px-6`

     1.4 Create footer content container:

   - Add max width and centering: `max-w-7xl mx-auto`
   - Use flex layout for responsive design: `flex flex-col md:flex-row justify-between items-center`

     1.5 Add copyright section:

   - Create a div with copyright text
   - Add text: `Copyright © ${new Date().getFullYear()} Doneyt. All rights reserved.`
   - Style with: `text-sm mb-4 md:mb-0`

     1.6 Add links section:

   - Create a nav container with flex layout: `flex gap-6`
   - Create "About" link:
     - Use `Link` component pointing to "/about"
     - Style with: `text-sm hover:text-white transition-colors`
     - Add text: "About"
   - Create "Privacy" link:

     - Use `Link` component pointing to "/privacy"
     - Same styling as About link
     - Add text: "Privacy"

     1.7 Add separator between copyright and links (optional):

   - Use a visual separator on mobile, or let flexbox handle spacing

     1.8 Export as default export

**Code to add:**

```typescript
import Link from "next/link";

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm mb-4 md:mb-0">
          Copyright © {currentYear} Doneyt. All rights reserved.
        </div>
        <nav className="flex gap-6">
          <Link
            href="/about"
            className="text-sm hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-sm hover:text-white transition-colors"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
```

**Expected Result:**

- Footer appears at the bottom of the page
- Dark background (gray-900) with light text
- Copyright notice on the left showing current year
- "About" and "Privacy" links on the right
- Responsive layout: stacked on mobile, side-by-side on desktop
- Links have hover effects (text becomes white on hover)
- Clean, minimal design that complements the header
