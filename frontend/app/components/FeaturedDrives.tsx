import React from "react";
import DriveCard from "./DriveCard";
import { featuredDrives } from "@/data/featuredDrives";

export default function FeaturedDrives() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">
        Featured Drives
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredDrives.map((drive) => (
          <DriveCard
            key={drive.id}
            driveId={drive.id}
            title={drive.title}
            shortDescription={drive.shortDescription}
            currentAmount={drive.currentAmount}
            targetAmount={drive.targetAmount}
            imageUrl={drive.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
