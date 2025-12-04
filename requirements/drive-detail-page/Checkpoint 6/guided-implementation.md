## Checkpoint 6: Review Donation Summary Modal ✓ (Ask "Check my work")

### Step 1: Extend `DonationModal` to Emit Review Data

1. **Update the `DonationModalProps` interface**

   1.1 Open: `frontend/app/components/DonationModal.tsx`

   1.2 Find the `DonationModalProps` interface and add a new optional callback for the review data:

   - Add a prop:

     ```ts
     onReview?: (data: {
       driveName: string;
       amount: number;
       donorName: string;
       email: string;
       message: string;
     }) => void;
     ```

     1.3 Update the component signature to accept `onReview`:

   - In the function parameters, add `onReview`:

     ```ts
     export default function DonationModal({
       open,
       onOpenChange,
       driveName,
       onReview,
     }: DonationModalProps) {
     ```

1. **Use `onReview` instead of `console.log` only**

   1.4 In the `onClick` handler for the **"Review Donation"** button:

   - After validating the amount, replace the direct `console.log` with a call to `onReview` (if provided):

   - Keep `console.log` if you like, but make sure `onReview` receives the same data.

   - Then close the modal with `onOpenChange(false)`.

### Step 2: Create a New `DonationReviewModal` Component

1. **Define a new props interface**

   2.1 In the same file (`DonationModal.tsx`), under `DonationModalProps`, define `DonationReviewModalProps`:

   - It should include:
     - `open: boolean`
     - `onOpenChange: (open: boolean) => void`
     - `driveName: string`
     - `amount: number`
     - `donorName: string`
     - `email: string`
     - `message: string`

1. **Create the `DonationReviewModal` component**

   2.2 Below the default `DonationModal` component, export a new named component:

   - Name it: `DonationReviewModal`
   - Use the same `Dialog`, `DialogContent`, `DialogHeader`, `DialogFooter`, and `Button` components

     2.3 Layout for the review modal:

   - **Header:**
     - Title: `"Review your donation"` (centered)
     - Description: `"Please confirm the details below before completing your donation."`
   - **Summary section:**
     - Show the following in a clean stacked layout:
       - Drive: `{driveName}`
       - Amount: formatted with `Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", minimumFractionDigits: 2 })`
       - Donor Name: `{donorName}`
       - Email: `{email}`
       - Message (only if not empty): show as multi-line text (`whitespace-pre-line`)
   - **Security row:**
     - Reuse a small `"SSL Secure"` badge and `"Your info is safe"` text
   - **Footer buttons:**
     - **"Go Back"** secondary button (closes the review modal, letting the user adjust inputs)
     - **"Complete Donation ₱XXX"** primary button using the same formatted amount

### Step 3: Wire the Two Modals Together in the Drive Detail Page

1. **Import the review modal and add state**

   3.1 Open: `frontend/app/drives/[id]/page.tsx`

   3.2 At the top, update the import:

   - Change to:

     ```ts
     import DonationModal, {
       DonationReviewModal,
     } from "@/app/components/DonationModal";
     ```

     3.3 Inside `DriveDetailPage`, add new state:

   - Keep existing `isDonateOpen` state
   - Add:

     ```ts
     const [isReviewOpen, setIsReviewOpen] = useState(false);
     const [reviewData, setReviewData] = useState<{
       amount: number;
       donorName: string;
       email: string;
       message: string;
     } | null>(null);
     ```

1. **Pass `onReview` into `DonationModal`**

   3.4 Where you render `DonationModal`, add an `onReview` prop:

   - Example:

     ```tsx
     <DonationModal
       open={isDonateOpen}
       onOpenChange={setIsDonateOpen}
       driveName={drive.title}
       onReview={(data) => {
         setReviewData({
           amount: data.amount,
           donorName: data.donorName,
           email: data.email,
           message: data.message,
         });
         setIsReviewOpen(true);
       }}
     />
     ```

1. **Render the `DonationReviewModal` with the captured data**

   3.5 Below the `DonationModal`, conditionally render the review modal:

   - Only show it when `reviewData` is not `null`:

     ```tsx
     {
       reviewData && (
         <DonationReviewModal
           open={isReviewOpen}
           onOpenChange={setIsReviewOpen}
           driveName={drive.title}
           amount={reviewData.amount}
           donorName={reviewData.donorName}
           email={reviewData.email}
           message={reviewData.message}
         />
       );
     }
     ```

### Step 4: Decide What Happens on "Complete Donation"

1. **Keep it simple for now (console + close)**

   4.1 Inside `DonationReviewModal`, in the `"Complete Donation ₱XXX"` button handler:

   - Log the final donation payload to the console:

     ```ts
     console.log("Donation confirmed:", {
       driveName,
       amount,
       donorName,
       email,
       message,
     });
     ```

     4.2 Close the modal:

   - Call `onOpenChange(false)`

     4.3 (Optional next steps for later checkpoints):

   - Here is where you would:
     - Call a backend endpoint to create the donation record
     - Redirect to a **Thank You** page once payment succeeds

---

**Code to add (reference only, after you follow the numbered steps):**

```typescript
// In frontend/app/components/DonationModal.tsx

interface DonationModalProps {
  open: boolean;
  // This function is called whenever the open state (open or closed) of the modal changes
  onOpenChange: (open: boolean) => void;
  driveName: Drive["title"];
  onReview?: (data: {
    driveName: string;
    amount: number;
    donorName: string;
    email: string;
    message: string;
  }) => void;
}

export default function DonationModal({
  open,
  onOpenChange,
  driveName,
  onReview,
}: DonationModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // ...existing UI code...

  <Button
    type="submit"
    disabled={
      !amount.trim() ||
      Number.isNaN(parseFloat(amount)) ||
      parseFloat(amount) <= 0 ||
      !donorName.trim() ||
      !email.trim()
    }
    onClick={(e) => {
      e.preventDefault();
      const numericAmount = parseFloat(amount);
      if (!amount.trim() || Number.isNaN(numericAmount) || numericAmount <= 0) {
        return;
      }

      if (onReview) {
        onReview({
          driveName,
          amount: numericAmount,
          donorName,
          email,
          message,
        });
      }

      onOpenChange(false);
    }}
  >
    Review Donation
  </Button>;
}

// New review modal in the same file:

interface DonationReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driveName: string;
  amount: number;
  donorName: string;
  email: string;
  message: string;
}

export function DonationReviewModal({
  open,
  onOpenChange,
  driveName,
  amount,
  donorName,
  email,
  message,
}: DonationReviewModalProps) {
  const formattedAmount = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Review your donation
          </DialogTitle>
          <DialogDescription className="text-center">
            Please confirm the details below before completing your donation.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Drive</span>
            <span className="font-semibold text-gray-900">{driveName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Amount</span>
            <span className="font-semibold text-gray-900">
              {formattedAmount}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Donor Name</span>
            <span className="font-semibold text-gray-900">{donorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Email</span>
            <span className="font-semibold text-gray-900">{email}</span>
          </div>
          {message && (
            <div className="mt-2">
              <span className="block font-medium text-gray-600 mb-1">
                Message
              </span>
              <p className="text-gray-800 whitespace-pre-line">{message}</p>
            </div>
          )}

          <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
            <span className="inline-flex items-center gap-1 rounded-full border border-green-500/60 px-3 py-1 text-[11px] font-semibold text-green-700 bg-green-50">
              SSL Secure
            </span>
            <span>Your info is safe</span>
          </div>
        </div>

        <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Go Back
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="w-full sm:w-auto px-6 py-2 text-sm font-semibold"
            onClick={() => {
              console.log("Donation confirmed:", {
                driveName,
                amount,
                donorName,
                email,
                message,
              });
              onOpenChange(false);
            }}
          >
            Complete Donation {formattedAmount}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

```typescript
// In frontend/app/drives/[id]/page.tsx

import DonationModal, {
  DonationReviewModal,
} from "@/app/components/DonationModal";

const [isDonateOpen, setIsDonateOpen] = useState(false);
const [isReviewOpen, setIsReviewOpen] = useState(false);
const [reviewData, setReviewData] = useState<{
  amount: number;
  donorName: string;
  email: string;
  message: string;
} | null>(null);

// Inside JSX:
<DonationModal
  open={isDonateOpen}
  onOpenChange={setIsDonateOpen}
  driveName={drive.title}
  onReview={(data) => {
    setReviewData({
      amount: data.amount,
      donorName: data.donorName,
      email: data.email,
      message: data.message,
    });
    setIsReviewOpen(true);
  }}
/>;

{
  reviewData && (
    <DonationReviewModal
      open={isReviewOpen}
      onOpenChange={setIsReviewOpen}
      driveName={drive.title}
      amount={reviewData.amount}
      donorName={reviewData.donorName}
      email={reviewData.email}
      message={reviewData.message}
    />
  );
}
```

---

**Expected Result:**

- After filling out the first donation form modal and clicking **"Review Donation"**, the form modal closes and a **second modal** opens.
- The review modal shows a **summary** of the donation: drive name, formatted amount, donor name, email, and optional message.
- The user can click **"Go Back"** to close the review modal and adjust their inputs, or **"Complete Donation ₱XXX"** to confirm.
- Both modals are centered on top of the blurred drive detail page.
- All logic stays within `DonationModal.tsx` and `page.tsx`, with clean separation of responsibilities.

**Common Errors:**

- If the review modal does not open, ensure `onReview` is passed from the page and that it calls `setIsReviewOpen(true)`.
- If TypeScript complains about types, double-check the `DonationModalProps` and `DonationReviewModalProps` interfaces.
- If the amount shows as `NaN`, verify the `amount` string is correctly parsed with `parseFloat` and validated before calling `onReview`.
- If the first modal does not close on review, make sure `onOpenChange(false)` is called after `onReview` is triggered.
