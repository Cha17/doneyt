## Checkpoint 4: Build Details Section with Description and Gallery ✓ (Ask "Check my work")

### Step 1: Create the Details Section Layout

1. **Add the details section container**

   1.1 Create grid layout:

   - After the hero info card, create a `<div>` with classes: `grid grid-cols-1 lg:grid-cols-3 gap-8`
   - This creates a responsive 3-column grid (1 column on mobile, 3 columns on large screens)

     1.2 Create main content area:

   - Create a `<div>` with classes: `lg:col-span-2`
   - This takes up 2 columns on large screens

### Step 2: Add Full Description Section

1. **Create the description card**

   1.3 Add description container:

   - Create a `<div>` with classes: `bg-white rounded-lg shadow-lg p-8 mb-8`
   - This creates a white card with shadow

     1.4 Add section title:

   - Add an `<h2>` with classes: `text-3xl font-bold text-gray-900 mb-6`
   - Text: "About This Drive"

     1.5 Add description text:

   - Add a `<p>` with classes: `text-gray-700 leading-relaxed whitespace-pre-line`
   - Display `{drive.description}`
   - The `whitespace-pre-line` preserves line breaks in the description

### Step 3: Add Gallery Section

1. **Create the gallery**

   1.6 Check if gallery exists:

   - Conditionally render gallery only if `drive.gallery && drive.gallery.length > 0`

     1.7 Create gallery container:

   - Create a `<div>` with classes: `bg-white rounded-lg shadow-lg p-8`
   - Add an `<h2>` with classes: `text-3xl font-bold text-gray-900 mb-6`
   - Text: "Gallery"

     1.8 Create gallery grid:

   - Create a `<div>` with classes: `grid grid-cols-2 md:grid-cols-3 gap-4`
   - This creates a responsive grid (2 columns on mobile, 3 on medium+ screens)

     1.9 Map through gallery images:

   - Use `drive.gallery.map((imageUrl, index) => ...)` to render each image
   - For each image, create a container with classes: `relative aspect-square rounded-lg overflow-hidden`
   - Use Next.js `<Image>` component with `fill` prop
   - Set `src={imageUrl}`
   - Set `alt={`${drive.title} - Image ${index + 1}`}`
   - Add className: `object-cover hover:scale-105 transition-transform cursor-pointer`
   - Add `sizes="(max-width: 768px) 50vw, 33vw"` for responsive sizing

### Step 4: Add Sidebar Information

1. **Create the sidebar**

   1.10 Create sidebar container:

   - Create a `<div>` with classes: `lg:col-span-1`
   - This takes up 1 column on large screens

     1.11 Create sidebar card:

   - Create a `<div>` with classes: `bg-white rounded-lg shadow-lg p-6 sticky top-24`
   - The `sticky top-24` makes it stick to the top when scrolling

     1.12 Add sidebar content:

   - Add an `<h3>` with classes: `text-xl font-bold text-gray-900 mb-4`
   - Text: "Drive Information"
   - Create a `<div>` with classes: `space-y-4` for spacing
   - Add sections for:
     - Organizer: Show `{drive.organization}`
     - Progress: Show `{progress}% Complete`
     - End Date: Conditionally show if `drive.endDate` exists

**Code to add:**

```typescript
{
  /* Details Section */
}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* Main Content */}
  <div className="lg:col-span-2">
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        About This Drive
      </h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {drive.description}
      </p>
    </div>

    {/* Gallery */}
    {drive.gallery && drive.gallery.length > 0 && (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {drive.gallery.map((imageUrl, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <Image
                src={imageUrl}
                alt={`${drive.title} - Image ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform cursor-pointer"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    )}
  </div>

  {/* Sidebar */}
  <div className="lg:col-span-1">
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Drive Information
      </h3>
      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-600 mb-1">Organizer</div>
          <div className="text-lg font-semibold text-gray-900">
            {drive.organization}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Progress</div>
          <div className="text-lg font-semibold text-gray-900">
            {progress}% Complete
          </div>
        </div>
        {drive.endDate && (
          <div>
            <div className="text-sm text-gray-600 mb-1">End Date</div>
            <div className="text-lg font-semibold text-gray-900">
              {drive.endDate}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>;
```

**Expected Result:**

- Two-column layout on desktop (description/gallery on left, sidebar on right)
- Single column layout on mobile
- "About This Drive" section with full description text
- Gallery section displaying 3-4 images in a grid
- Images have hover effects (scale on hover)
- Sticky sidebar showing drive information
- Responsive design that adapts to different screen sizes
- Proper spacing and visual hierarchy
- Gallery only shows if images are available

**Common Errors:**

- If gallery doesn't show, check that `drive.gallery` exists and has items
- If images don't load, verify the image paths are correct
- If layout breaks on mobile, ensure grid classes are responsive
- If sidebar doesn't stick, check that `sticky top-24` is applied correctly
- If description text doesn't wrap properly, verify `whitespace-pre-line` is applied
