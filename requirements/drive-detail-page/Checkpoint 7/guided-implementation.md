## Checkpoint 7: Success/Thank You Modal After Donation ✓ (Ask "Check my work")

### Step 1: Create the Success Modal Component

1. **Define a new props interface**

   1.1 In `frontend/app/components/DonationModal.tsx`, below `DonationReviewModalProps`, define `DonationSuccessModalProps`:

   - It should include:

     - `open: boolean`
     - `onOpenChange: (open: boolean) => void`
     - `donorName: string`
     - `amount: number`

     1.2 Create the `DonationSuccessModal` component:

   - Export a new named component: `DonationSuccessModal`
   - Use the same `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, and `Button` components

     1.3 Layout for the success modal:

   - **Header:**
     - Title: `"Thank You!"` (centered, large and bold)
     - Description: `"Your donation has been received successfully."`
   - **Success message section:**
     - Display a personalized message: `"Thank you, {donorName}, for your generous donation of {formattedAmount}!"`
     - Format the amount using `Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", minimumFractionDigits: 2 })`
   - **Additional message:**
     - Add text: `"Your contribution makes a difference. You will be redirected shortly..."`
   - **Footer:**
     - Center a single button: `"Continue"` or `"Go to Drives"` that navigates to `/drives`

### Step 2: Add Auto-Redirect Logic

1. **Add useEffect for auto-redirect**

   2.1 Import `useRouter` from `next/navigation`:

   - Add: `import { useRouter } from "next/navigation";`

     2.2 Inside `DonationSuccessModal`, add a `useEffect` hook:

   - When `open` is `true`, set a timer for 3-5 seconds
   - After the timer, call `router.push("/drives")` to redirect
   - Clean up the timer on unmount or when `open` changes

     2.3 Optional: Show a countdown or progress indicator:

   - You can display "Redirecting in 3..." with a countdown
   - Or show a simple loading spinner

### Step 3: Wire the Success Modal to Complete Donation Button

1. **Add callback prop to review modal**

   3.1 Update `DonationReviewModalProps` interface:

   - Add: `onComplete?: () => void`

     3.2 Update the `DonationReviewModal` component signature:

   - Accept `onComplete` in the function parameters

     3.3 In the "Complete Donation" button handler:

   - Call `onComplete()` if provided
   - Close the review modal with `onOpenChange(false)`

### Step 4: Connect Everything in the Drive Detail Page

1. **Add state and router**

   4.1 Open: `frontend/app/drives/[id]/page.tsx`

   4.2 Import `useRouter`:

   - Add: `import { useRouter } from "next/navigation";`

     4.3 Add state for success modal:

   - Add: `const [isSuccessOpen, setIsSuccessOpen] = useState(false);`
   - Initialize router: `const router = useRouter();`

     4.4 Pass `onComplete` to `DonationReviewModal`:

   - Where you render `DonationReviewModal`, add:

     ```tsx
     onComplete={() => {
       setIsSuccessOpen(true);
     }}
     ```

     4.5 Render the `DonationSuccessModal`:

   - Conditionally render it when `isSuccessOpen` is `true`:

     ```tsx
     {
       reviewData && (
         <DonationSuccessModal
           open={isSuccessOpen}
           onOpenChange={setIsSuccessOpen}
           donorName={reviewData.donorName}
           amount={reviewData.amount}
         />
       );
     }
     ```

**Code to add:**

```typescript
// In frontend/app/components/DonationModal.tsx

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Add after DonationReviewModalProps:

interface DonationSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donorName: string;
  amount: number;
}

export function DonationSuccessModal({
  open,
  onOpenChange,
  donorName,
  amount,
}: DonationSuccessModalProps) {
  const router = useRouter();

  const formattedAmount = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        router.push("/drives");
      }, 3000); // Redirect after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [open, router]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-green-600">
            Thank You!
          </DialogTitle>
          <DialogDescription className="text-center mt-2">
            Your donation has been received successfully.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 text-center space-y-4">
          <p className="text-lg text-gray-800">
            Thank you, <span className="font-semibold">{donorName}</span>, for
            your generous donation of{" "}
            <span className="font-bold text-green-600">{formattedAmount}</span>!
          </p>
          <p className="text-sm text-gray-600">
            Your contribution makes a difference. You will be redirected
            shortly...
          </p>
        </div>

        <DialogFooter className="mt-6 flex justify-center">
          <Button
            type="button"
            className="px-6 py-2 text-sm font-semibold"
            onClick={() => router.push("/drives")}
          >
            Go to Drives
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Update DonationReviewModalProps:

interface DonationReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driveName: string;
  amount: number;
  donorName: string;
  email: string;
  message?: string;
  onGoBack?: () => void;
  onComplete?: () => void; // Add this
}

// Update DonationReviewModal component:

export function DonationReviewModal({
  open,
  onOpenChange,
  driveName,
  amount,
  donorName,
  email,
  message,
  onGoBack,
  onComplete, // Add this
}: DonationReviewModalProps) {
  // ... existing code ...

  // Update the "Complete Donation" button:
  <Button
    type="button"
    className="w-full sm:w-auto px-6 py-2 text-sm font-semibold"
    onClick={() => {
      if (onComplete) {
        onComplete();
      }
      onOpenChange(false);
    }}
  >
    Complete Donation {formattedAmount}
  </Button>;
}
```

```typescript
// In frontend/app/drives/[id]/page.tsx

import { useRouter } from "next/navigation";
import DonationModal, {
  DonationReviewModal,
  DonationSuccessModal, // Add this import
} from "@/app/components/DonationModal";

// Inside DriveDetailPage component:

const router = useRouter();
const [isSuccessOpen, setIsSuccessOpen] = useState(false);

// Update DonationReviewModal:

<DonationReviewModal
  open={isReviewOpen}
  onOpenChange={setIsReviewOpen}
  driveName={drive.title}
  amount={reviewData?.amount || 0}
  donorName={reviewData?.donorName || ""}
  email={reviewData?.email || ""}
  message={reviewData?.message || ""}
  onGoBack={() => {
    setIsReviewOpen(false);
    setIsDonateOpen(true);
  }}
  onComplete={() => {
    setIsSuccessOpen(true);
  }}
/>;

// Add DonationSuccessModal:

{
  reviewData && (
    <DonationSuccessModal
      open={isSuccessOpen}
      onOpenChange={setIsSuccessOpen}
      donorName={reviewData.donorName}
      amount={reviewData.amount}
    />
  );
}
```

**Expected Result:**

- After clicking **"Complete Donation"** in the review modal, the review modal closes and a **success modal** appears
- The success modal shows a personalized thank you message with the donor's name and donation amount
- After **3 seconds**, the user is automatically redirected to `/drives`
- The user can also click **"Go to Drives"** button to manually navigate immediately
- The success modal is centered on the page with a blurred background

**Common Errors:**

- If the redirect doesn't work, ensure `useRouter` is imported from `next/navigation` (not `next/router`)
- If the timer doesn't clear, make sure to return the cleanup function from `useEffect`
- If the success modal doesn't show, verify `onComplete` is passed to `DonationReviewModal` and calls `setIsSuccessOpen(true)`
- If TypeScript complains, ensure `DonationSuccessModal` is exported as a named export and imported correctly
