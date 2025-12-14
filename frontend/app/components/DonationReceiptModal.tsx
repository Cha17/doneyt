"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatCurrency";
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
  const handleDownload = () => {
    const receiptNumber = `REC-${donation.driveId}-${donation.date.replace(
      /\s/g,
      ""
    )}`;

    const receiptHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Donation Receipt - ${receiptNumber}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 40px;
      background: white;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #032040;
      font-size: 28px;
      margin-bottom: 10px;
    }
    .header p {
      color: #666;
      font-size: 16px;
    }
    hr {
      border: none;
      border-top: 2px solid #e5e7eb;
      margin: 30px 0;
    }
    .details {
      margin: 30px 0;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f3f4f6;
    }
    .detail-label {
      color: #6b7280;
      font-size: 14px;
    }
    .detail-value {
      color: #111827;
      font-weight: 600;
      font-size: 14px;
    }
    .amount-section {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 30px;
      margin: 30px 0;
      text-align: center;
    }
    .amount-label {
      color: #374151;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .amount-value {
      color: #032040;
      font-size: 36px;
      font-weight: bold;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
    }
    .footer p {
      color: #6b7280;
      font-size: 14px;
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>DONEYT</h1>
    <p>Donation Receipt</p>
  </div>
  <hr>
  <div class="details">
    <div class="detail-row">
      <span class="detail-label">Receipt #:</span>
      <span class="detail-value">${receiptNumber}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Date:</span>
      <span class="detail-value">${donation.date}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Donation Drive:</span>
      <span class="detail-value">${drive.title}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Organization:</span>
      <span class="detail-value">${drive.organization}</span>
    </div>
  </div>
  <div class="amount-section">
    <div class="amount-label">Donation Amount</div>
    <div class="amount-value">${formatCurrency(donation.amount)}</div>
  </div>
  <div class="footer">
    <p>Thank you for your generous contribution!</p>
    <p style="font-size: 12px; color: #9ca3af;">This is an official receipt for your donation.</p>
  </div>
</body>
</html>
    `;

    const blob = new Blob([receiptHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-${donation.driveId}-${donation.date.replace(
      /\s/g,
      "-"
    )}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const receiptNumber = `REC-${donation.driveId}-${donation.date.replace(
    /\s/g,
    ""
  )}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Donation Receipt</DialogTitle>
        </DialogHeader>

        <div className="bg-white rounded-lg px-4 py-8 space-y-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#032040] mb-2">DONEYT</h2>
            <p className="text-gray-600">Donation Receipt</p>
          </div>

          <hr className="border-gray-300 my-6" />

          {/* Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Receipt #:</p>
              <p className="text-sm font-semibold text-gray-900">
                {receiptNumber}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Date:</p>
              <p className="text-sm font-semibold text-gray-900">
                {donation.date}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Donation Drive:</p>
              <p className="text-sm font-semibold text-gray-900 text-right">
                {drive.title}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Organization:</p>
              <p className="text-sm font-semibold text-gray-900 text-right">
                {drive.organization}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Amount:</p>
              <p className="text-sm font-semibold text-gray-900">
                {formatCurrency(donation.amount)}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-300">
            <p className="text-center text-gray-600 text-sm">
              Thank you for your generous contribution!
            </p>
            <p className="text-center text-gray-500 text-xs mt-2">
              This is an official receipt for your donation.
            </p>
          </div>
        </div>

        <DialogFooter>
          {/* <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Close
          </Button> */}
          <Button
            onClick={handleDownload}
            className="bg-[#032040] text-white hover:bg-[#032040]/90"
          >
            Download Receipt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
