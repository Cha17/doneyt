## Checkpoint 5: Assemble Home Page ✓ (Ask "Check my work")

### Step 1: Update the Home Page to Use All Components

1. **Update the home page to assemble all components**

   1.1 Open: `frontend/app/page.tsx`

   1.2 Import all the components you created:

   - Import `Header` from `./components/Header`
   - Import `Hero` from `./components/Hero`
   - Import `FeaturedDrives` from `./components/FeaturedDrives`
   - Import `Footer` from `./components/Footer`

     1.3 Create the main page structure:

   - Replace the existing content in the `Home` function
   - Create a wrapper `<div>` with `min-h-screen flex flex-col`
   - This ensures the page takes full height and footer stays at bottom

     1.4 Add the Header component:

   - Place `<Header />` as the first element inside the wrapper
   - This will render at the top with fixed positioning

     1.5 Add main content wrapper:

   - Create a `<main>` element with `flex-1` class
   - This ensures the main content area grows to fill available space

     1.6 Add Hero section:

   - Place `<Hero />` as the first child of main
   - This displays the hero section below the fixed header

     1.7 Add Featured Drives section:

   - Place `<FeaturedDrives />` after the Hero component
   - This displays the three featured drive cards

     1.8 Add Footer component:

   - Place `<Footer />` after the main closing tag
   - This will render at the bottom of the page

     1.9 Add background styling:

   - Add background color to the wrapper: `bg-gray-50` or `bg-white`
   - Ensure proper spacing between sections

     1.10 Export as default export (already exists, keep it)

**Code to add:**

```typescript
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedDrives from "./components/FeaturedDrives";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedDrives />
      </main>
      <Footer />
    </div>
  );
}
```

**Expected Result:**

- Complete home page with all sections assembled
- Fixed header at the top that stays visible when scrolling
- Hero section with title, subtitle, stats, and CTA button
- Featured drives section with three drive cards displayed in a grid
- Footer at the bottom with copyright and links
- Smooth scrolling experience
- Responsive design that works on mobile and desktop
- All components properly integrated and styled
- Footer stays at the bottom even if content is short

**Common Errors:**

- If components don't render, check that all component files are created in `frontend/app/components/`
- Ensure all imports use correct relative paths
- If footer doesn't stick to bottom, verify `min-h-screen flex flex-col` structure
- If Header overlaps content, ensure Hero has proper top padding (`pt-24` or `pt-28`)
- Check that Next.js Image component has proper src paths or placeholders

**Next Steps:**

- Test all navigation links work correctly
- Verify responsive design on different screen sizes
- Add actual drive images to `frontend/public/` folder
- Style adjustments can be made to match your brand colors
