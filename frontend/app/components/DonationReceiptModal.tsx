import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Drive } from "@/data/allDrives";

interface DonationReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donation: {
    driveId: string;
    amount: number;
    date: string;
  };
  drive: Drive;
}

export default function DonationReceiptModal({
  open,
  onOpenChange,
  donation,
  drive,
}: DonationReceiptModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Donation Receipt</DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-lg p-4 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-center text-[#032040] mb-2">
              DONEYT
            </h2>
            <p className="text-gray-600">Donation Receipt</p>
            <hr />
            {/* Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Receipt #:</p>
                <p className="text-sm font-semibold text-gray-900">
                  {/* {receiptNumber} */}
                  Reference number here
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Date:</p>
                <p className="text-sm font-semibold text-gray-900">
                  {donation.date}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Amount:</p>
                <p className="text-sm font-semibold text-gray-900">
                  {donation.amount}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Donor Name:</p>
                <p className="text-sm font-semibold text-gray-900">
                  {/* {donation.donorName} */}
                  Donor name here
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Drive: </p>
                <p className="text-sm font-semibold text-gray-900">
                  {drive.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
