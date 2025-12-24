import React, { useEffect, useState } from "react";
import { Drive } from "@/data/allDrives";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { submitDonation } from "@/lib/api";
import NoDrivesFound from "./NoDrivesFound";
import { formatCurrency } from "@/utils/formatCurrency";

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
    message?: string;
  }) => void;
}

export default function DonationFormModal({
  open,
  onOpenChange,
  driveName,
  onReview,
}: DonationModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form action="">
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-center">
              Complete your donation
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>Donating to: {driveName}</DialogDescription>
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span className="inline-flex items-center gap-1 rounded-full border border-green-500/60 px-3 py-1 text-[11px] font-semibold text-green-700 bg-green-50">
              All the information you provide here are safe and secure.
            </span>
          </div>
          <div className="mt-4 space-y-4">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">Drive</Label>
              <Input value={driveName} readOnly className="bg-gray-100" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                Donor Name
              </Label>
              <Input
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                Amount
              </Label>
              <div className="flex items-center">
                <span className="px-2 font-medium text-gray-600 select-none">
                  ₱
                </span>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => {
                    // 1. Get the user's current input.
                    let val = e.target.value;

                    // 2. Remove any characters except digits and dot (so only numbers and one '.').
                    val = val.replace(/[^0-9.]/g, "");

                    // 3. If the input starts with '.', add a '0' at the front (so '.5' becomes '0.5').
                    if (val.startsWith(".")) {
                      val = "0" + val;
                    }

                    // 4. If there are multiple '.', keep only the first one.
                    const parts = val.split(".");
                    if (parts.length > 2) {
                      val = parts[0] + "." + parts.slice(1).join("");
                    }

                    // 5. Check if the value ends with a dot (user is typing decimal)
                    const hasTrailingDot = val.endsWith(".");

                    // 6. Split into integer and decimal parts
                    let intPart = "";
                    let decPart = "";
                    if (val.includes(".")) {
                      [intPart, decPart] = val.split(".");
                      // Remove commas from intPart before parsing
                      intPart = intPart.replace(/,/g, "");
                      // Limit decimal part to 2 digits
                      decPart = decPart.substring(0, 2);
                    } else {
                      // Remove commas before processing
                      intPart = val.replace(/,/g, "");
                    }

                    // 7. Format the integer part with commas (e.g., 32000 -> 32,000)
                    if (intPart) {
                      const numericInt = parseInt(intPart, 10);
                      if (!isNaN(numericInt)) {
                        intPart = numericInt.toLocaleString("en-US");
                      }
                    }

                    // 8. Rejoin integer and decimal parts, preserving trailing dot
                    if (hasTrailingDot && !decPart) {
                      val = `${intPart}.`;
                    } else if (decPart) {
                      val = `${intPart}.${decPart}`;
                    } else {
                      val = intPart;
                    }

                    // 9. Update the amount state with the cleaned and formatted string.
                    setAmount(val);
                  }}
                  placeholder="Enter amount"
                  className="pl-2"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                Message (optional)
              </Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a note to the organizers (optional)"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={
                !amount.trim() ||
                Number.isNaN(parseFloat(amount.replace(/,/g, ""))) ||
                parseFloat(amount.replace(/,/g, "")) <= 0 ||
                !donorName.trim() ||
                !email.trim()
              }
              onClick={(e) => {
                e.preventDefault();
                // Remove commas before parsing
                const numericAmount = parseFloat(amount.replace(/,/g, ""));
                if (
                  !amount.trim() ||
                  Number.isNaN(numericAmount) ||
                  numericAmount <= 0
                ) {
                  return;
                }

                console.log({
                  driveName,
                  amount: numericAmount,
                  donorName,
                  email,
                  message,
                });

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
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

interface DonationReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driveId: number;

  driveName: string;
  amount: number;
  donorName: string;
  email: string;
  message?: string;
  onGoBack?: () => void;
  onComplete?: () => void;
}

export function DonationReviewModal({
  open,
  onOpenChange,
  driveId,
  driveName,
  amount,
  donorName,
  email,
  message,
  onGoBack,
  onComplete,
}: DonationReviewModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
              {formatCurrency(amount)}
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
        </div>
        <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
          <span className="inline-flex items-center gap-1 rounded-full border border-green-500/60 px-3 py-1 text-[11px] font-semibold text-green-700 bg-green-50">
            Your donation is protected and secure
          </span>
        </div>
        <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            // onClick={async () => {
            //   setIsSubmitting(true);
            //   setSubmitError(null);

            //   try {
            //     await submitDonation({
            //       driveId: driveId,
            //       amount: amount,
            //     });

            //     if (onComplete) {
            //       onComplete();
            //     }

            //     onOpenChange(false);
            //   } catch (error) {
            //     setSubmitError(
            //       error instanceof Error ? error.message : "An error occurred"
            //     );
            //     console.error("Donation submission error:", error);
            //     <NoDrivesFound />;
            //   } finally {
            //     setIsSubmitting(false);
            //   }
            // }}
            onClick={() => {
              onOpenChange(false);
              if (onGoBack) {
                onGoBack();
              }
            }}
          >
            Go Back
          </Button>
          <Button
            type="button"
            className="w-full sm:w-auto px-6 py-2 text-sm font-semibold"
            onClick={async () => {
              setIsSubmitting(true);
              setSubmitError(null);

              try {
                await submitDonation({
                  driveId: driveId,
                  amount: amount,
                });

                if (onComplete) {
                  onComplete();
                }

                onOpenChange(false);
              } catch (error) {
                setSubmitError(
                  error instanceof Error ? error.message : "An error occurred"
                );
                console.error("Donation submission error:", error);
                <NoDrivesFound />;
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {isSubmitting ? "Submitting..." : "Complete Donation"}
          </Button>
          {submitError && (
            <div className="text-red-500 text-sm mt-2">{submitError}</div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface DonationSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donorName: string;
}

export function DonationSuccessModal({
  open,
  onOpenChange,
  donorName,
}: DonationSuccessModalProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        router.push("/drives");
        setCountdown(countdown - 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, router, countdown]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <div className="flex justify-center my-6">
          <span className="inline-block">
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-pop-in"
            >
              <circle
                cx="36"
                cy="36"
                r="34"
                stroke="#22c55e"
                strokeWidth="4"
                fill="#ecfdf5"
              />
              <path
                d="M22 38.5L32 48L50 30"
                stroke="#22c55e"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 38,
                  strokeDashoffset: 0,
                  animation: "dash 0.4s ease-in-out forwards",
                }}
              />
              <style jsx>{`
                @keyframes dash {
                  from {
                    stroke-dashoffset: 38;
                  }
                  to {
                    stroke-dashoffset: 0;
                  }
                }
                .animate-pop-in {
                  animation: pop-in 0.3s cubic-bezier(0.57, 1.84, 0.57, 1.84);
                }
                @keyframes pop-in {
                  0% {
                    scale: 0.7;
                    opacity: 0.2;
                  }
                  90% {
                    scale: 1.15;
                  }
                  100% {
                    scale: 1;
                    opacity: 1;
                  }
                }
              `}</style>
            </svg>
          </span>
        </div>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Thank You {donorName}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-gray-700">
          Thank you for your donation. Your support helps move this drive closer
          to its goal and makes a real impact on the cause it represents.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
