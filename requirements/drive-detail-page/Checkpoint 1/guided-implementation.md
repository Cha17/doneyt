## Checkpoint 1: Extend Data Structure with End Date and Gallery ✓ (Ask "Check my work")

### Step 1: Update the Drive Data Structure

1. **Update the allDrives data file**

   1.1 Open: `frontend/data/allDrives.ts`

   1.2 Add TypeScript interface at the top of the file:

   - Create an interface named `Drive` with the following properties:
     - `id: string`
     - `title: string`
     - `organization: string`
     - `description: string`
     - `currentAmount: number`
     - `targetAmount: number`
     - `imageUrl: string`
     - `endDate?: string` (optional)
     - `gallery?: string[]` (optional array of image URLs)

   1.3 Update the export statement:

   - Change `export const allDrives = [` to `export const allDrives: Drive[] = [`
   - This adds type safety to the drives array

   1.4 Add endDate and gallery to the first drive (Emergency Relief example):

   - Find or create a drive with id "1" titled "Emergency Relief for Typhoon Victims"
   - Set `organization: "Red Cross PH"`
   - Add `endDate: "Dec 20, 2025"`
   - Add `gallery: ["/images/sample.png", "/images/sample.png", "/images/sample.png", "/images/sample.png"]`
   - Update the description to be a longer, more detailed description (200-300 words)

   1.5 Export the Drive interface:

   - Add `export interface Drive` so it can be imported in other files

**Code to add:**

```typescript
export interface Drive {
  id: string;
  title: string;
  organization: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  imageUrl: string;
  endDate?: string;
  gallery?: string[];
}

export const allDrives: Drive[] = [
  {
    id: "1",
    title: "Emergency Relief for Typhoon Victims",
    organization: "Red Cross PH",
    description:
      "In the wake of devastating typhoons that have struck our communities, thousands of families have been left without homes, food, and basic necessities. This emergency relief drive aims to provide immediate assistance to those most affected. Your donations will help us distribute food packages, clean water, medical supplies, and temporary shelter materials to over 500 families across the hardest-hit regions. We are working closely with local government units and community leaders to ensure aid reaches those who need it most. Every contribution, no matter how small, makes a significant difference in helping these families rebuild their lives and recover from this disaster. Together, we can provide hope and support during this critical time.",
    currentAmount: 250000,
    targetAmount: 1000000,
    imageUrl: "/images/sample.png",
    endDate: "Dec 20, 2025",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
  // ... rest of drives
];
```

**Expected Result:**

- TypeScript interface `Drive` is defined and exported
- The `allDrives` array is typed as `Drive[]`
- At least one drive has `endDate` and `gallery` properties
- The first drive has a detailed description (200-300 words)
- No TypeScript errors in the file

**Common Errors:**

- If TypeScript complains, ensure the interface properties match the drive objects exactly
- Make sure optional properties use `?:` syntax
- Verify all existing drives still have the required properties (id, title, organization, description, currentAmount, targetAmount, imageUrl)

