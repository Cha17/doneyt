import React from "react";
import DriveCard from "./DriveCard";
import { allDrives } from "@/data/allDrives";

export default function FeaturedDrives() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">
        Featured Drives
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allDrives.slice(0, 3).map((drive) => (
          <DriveCard
            key={drive.driveId}
            driveId={drive.driveId}
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
