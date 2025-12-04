## Checkpoint 5: Donation Form Modal for "Donate Now" ✓ (Ask "Check my work")

### Step 1: Create the Donation Modal Component

1. **Create the modal component file**

   1.1 Create: `frontend/app/components/DonationModal.tsx`

   1.2 Set up the basic component structure with TypeScript:

   - Import `React` and `useState` from `"react"`
   - Import `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, and `DialogFooter` from `@/components/ui/dialog` (shadcn-ui pattern)
   - Import `Button` from `@/components/ui/button`
   - Import `Input` from `@/components/ui/input`
   - Import `Textarea` from `@/components/ui/textarea`
   - Define a `DonationModalProps` interface:
     - `open: boolean`
     - `onOpenChange: (open: boolean) => void`
     - `driveName: string`
     - `defaultAmount?: number`
   - Export a default `DonationModal` component that accepts these props

     1.3 Add local state for the form inside the modal:

   - `amount`, `setAmount` (number or string)
   - `donorName`, `setDonorName`
   - `email`, `setEmail`
   - `message`, `setMessage`
   - Optionally track `selectedPreset`, e.g. `100`, `500`, `1000`, `"custom"`

### Step 2: Build the Form UI Inside the Modal

1. **Add the dialog and form fields**

   2.1 Wrap the content in a `Dialog`:

   - Use `<Dialog open={open} onOpenChange={onOpenChange}>`
   - Place your form inside `<DialogContent>`

     2.2 Add a header with drive name and trust indicators:

   - Use `<DialogHeader>` and `<DialogTitle>`
   - Title: `"Complete your donation"`
   - Show drive name as a smaller subtitle, read-only: e.g. `Donating to: {driveName}`
   - Add a small "Security & Trust" row with:

     - A badge-like span: `"SSL Secure"` with subtle border/green accent
     - Text: `"Your info is safe"` in gray

       2.3 Add form fields (stacked with good spacing):

   - **Drive name (read-only)**:
     - Label: `"Drive"`
     - Read-only `Input` with `value={driveName}`
   - **Amount section**:
     - Label: `"Amount"`
     - Create preset buttons in a row (e.g. `₱100`, `₱500`, `₱1,000`)
       - Clicking a preset sets `amount` and highlights the active button
     - Below presets, add a custom amount `Input` with prefix `"₱"`
       - Typing in this input updates `amount` and clears the preset selection
   - **Donor Name**:
     - Label: `"Donor Name"`
     - Text `Input` bound to `donorName`
   - **Email**:
     - Label: `"Email"`
     - Email `Input` with `type="email"` bound to `email`
   - **Message (optional)**:
     - Label: `"Message (optional)"`
     - `Textarea` bound to `message`

### Step 3: Add Primary Action and Validation

1. **Add footer buttons and computed label**

   3.1 Add a footer with Cancel / Review:

   - Use `<DialogFooter>` at the bottom of `DialogContent`
   - Add a secondary `Button` labeled `"Cancel"` that calls `onOpenChange(false)`
   - Add a primary `Button` labeled `"Review"` for the main action (instead of "Complete Donation")

     3.2 Compute the button label with the amount:

   - If `amount` is a valid positive number, show:  
     `"Review ₱{formattedAmount}"`
   - If no valid amount yet, show: `"Review"` (disabled state)
   - Optionally use `Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", minimumFractionDigits: 0 })` to format

     3.3 Add simple front-end validation rules:

   - Disable the primary button if:
     - `!amount || Number(amount) <= 0`
     - `!donorName.trim()`
     - `!email.trim()`
   - On click of the primary button:
     - Prevent default form submission
     - For now, just log the payload to `console.log({ driveName, amount, donorName, email, message })`
     - Close the modal using `onOpenChange(false)`

### Step 4: Wire the Modal to the "DONATE NOW" Button

1. **Connect the modal from the drive detail page**

   4.1 Open: `frontend/app/drives/[id]/page.tsx`

   4.2 Import the modal component at the top:

   - `import DonationModal from "@/app/components/DonationModal";`

     4.3 Add state to control the modal:

   - Inside the `DriveDetailPage` component, add:  
     `const [isDonateOpen, setIsDonateOpen] = useState(false);`
   - Make sure `"use client";` is at the top of the file (already present)

     4.4 Update the "DONATE NOW" button:

   - Instead of directly submitting anything, set it to open the modal:  
      `onClick={() => setIsDonateOpen(true)}`

     4.5 Render the `DonationModal` near the bottom of the component JSX (but inside the page wrapper):

   - Pass the required props:
     - `open={isDonateOpen}`
     - `onOpenChange={setIsDonateOpen}`
     - `driveName={drive.title}`
     - `defaultAmount={drive.currentAmount ? undefined : undefined}` (you can omit or choose a sensible default like `500`)

**Code to add:**

```typescript
// frontend/app/components/DonationModal.tsx

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driveName: string;
  defaultAmount?: number;
}

const presetAmounts = [100, 500, 1000];

export default function DonationModal({
  open,
  onOpenChange,
  driveName,
  defaultAmount = 500,
}: DonationModalProps) {
  const [amount, setAmount] = useState<number | "">(defaultAmount ?? "");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(
    defaultAmount ?? null
  );
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const formattedAmount =
    typeof amount === "number" && amount > 0
      ? new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
          minimumFractionDigits: 0,
        }).format(amount)
      : null;

  const isPrimaryDisabled =
    !amount || Number(amount) <= 0 || !donorName.trim() || !email.trim();

  const handlePresetClick = (value: number) => {
    setSelectedPreset(value);
    setAmount(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) {
      setAmount("");
      setSelectedPreset(null);
    } else {
      const numeric = Number(value);
      setAmount(numeric);
      setSelectedPreset(null);
    }
  };

  const handleReview = () => {
    if (isPrimaryDisabled) return;

    console.log({
      driveName,
      amount,
      donorName,
      email,
      message,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Complete your donation
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Donating to: <span className="font-semibold">{driveName}</span>
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
            <span className="inline-flex items-center gap-1 rounded-full border border-green-500/60 px-3 py-1 text-[11px] font-semibold text-green-700 bg-green-50">
              SSL Secure
            </span>
            <span>Your info is safe</span>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Drive Name (read-only) */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Drive</label>
            <Input value={driveName} readOnly className="bg-gray-100" />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <div className="flex flex-wrap gap-2">
              {presetAmounts.map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={selectedPreset === value ? "default" : "outline"}
                  onClick={() => handlePresetClick(value)}
                  className="px-4 py-2 text-sm"
                >
                  ₱{value.toLocaleString("en-PH")}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-700">₱</span>
              <Input
                type="text"
                inputMode="numeric"
                value={amount === "" ? "" : amount}
                onChange={handleAmountChange}
                placeholder="Enter custom amount"
              />
            </div>
          </div>

          {/* Donor Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Donor Name
            </label>
            <Input
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          {/* Message (optional) */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Message (optional)
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a note to the organizers (optional)"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="w-full sm:w-auto px-6 py-2 text-sm font-semibold"
            disabled={isPrimaryDisabled}
            onClick={handleReview}
          >
            {formattedAmount ? `Review ${formattedAmount}` : "Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

```typescript
// In frontend/app/drives/[id]/page.tsx

import React, { useState } from "react";
import DonationModal from "@/app/components/DonationModal";

// Inside DriveDetailPage component:
const [isDonateOpen, setIsDonateOpen] = useState(false);

// Update the Donate button inside the sidebar / hero:
<Button
  className="w-full md:w-auto px-8 py-4 text-lg font-semibold bg-linear-to-r from-[#032040] via-[#1C7D91] to-[#7BAC6B] hover:opacity-90"
  onClick={() => setIsDonateOpen(true)}
>
  DONATE NOW
</Button>;

// Render the modal near the bottom of the JSX (inside the page layout):
<DonationModal
  open={isDonateOpen}
  onOpenChange={setIsDonateOpen}
  driveName={drive.title}
  defaultAmount={500}
/>;
```

**Expected Result:**

- Clicking **"DONATE NOW"** opens a centered modal over the drive detail page
- Modal shows the **drive name** in a read-only field
- Amount section offers **preset buttons** and a **custom amount input**
- Donor can enter **Name**, **Email**, and an optional **Message**
- A **"SSL Secure"** badge and **"Your info is safe"** text appear at the top of the modal
- Primary button text updates to **"Review ₱XXX"** when a valid amount is entered, or **"Review"** otherwise
- Primary button remains disabled until **amount, donor name, and email** are all filled in
- Cancel closes the modal without submitting; Review logs the payload and closes the modal
- Modal component lives in its **own file** and is cleanly wired to the drive detail page

**Common Errors:**

- If the modal doesn’t open, ensure `isDonateOpen` state and `onClick={() => setIsDonateOpen(true)}` are correctly wired
- If you see hydration errors, double-check that `"use client";` is present at the top of both the page and modal components that use hooks
- If shadcn UI dialog styles look broken, verify `Dialog` components are correctly imported from `@/components/ui/dialog`
- If the currency text doesn’t format, confirm `Intl.NumberFormat` is configured for `"en-PH"` and `"PHP"`
- If preset buttons don’t highlight, ensure `selectedPreset` state is updated on click and used to set the `variant` prop
