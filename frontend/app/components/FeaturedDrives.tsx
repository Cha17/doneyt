"use client";

import React, { useEffect, useState } from "react";
import DriveCard from "./DriveCard";
import { Drive, fetchDrives, transformDrive } from "@/lib/api";
import NoDrivesFound from "./NoDrivesFound";
// import { allDrives } from "@/data/allDrives";

export default function FeaturedDrives() {
  const [drives, setDrives] = useState<
    Array<{
      driveId: number;
      title: string;
      organization: string;
      description: string;
      currentAmount: number;
      targetAmount?: number;
      imageUrl: string;
    }>
  >([]);

  useEffect(() => {
    async function loadDrives() {
      try {
        const response = await fetchDrives({ take: 3 });
        const transformedDrives = response.drives.map(transformDrive);
        setDrives(transformedDrives);
      } catch (error) {
        console.error("Error loading drives:", error);
        return <NoDrivesFound />;
      }
    }
    loadDrives();
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">
        Featured Drives
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {drives.map((drive) => (
          <DriveCard
            key={drive.driveId}
            driveId={drive.driveId.toString()}
            title={drive.title}
            organization={drive.organization}
            description={drive.description}
            currentAmount={drive.currentAmount}
            targetAmount={drive.targetAmount}
            imageUrl={drive.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
