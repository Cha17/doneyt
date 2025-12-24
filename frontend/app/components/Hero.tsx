import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section className="pt-32 py-20 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-30">
        {/* Left Column */}
        <div className="flex-1 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left py-6 md:py-25">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Make an Impact
          </h1>
          <p className="text-base text-white leading-relaxed mb-8 max-w-xl">
            Support causes you care about. Every donation counts. Empowering
            generosity with a simple, secure, and trusted donation platform.
          </p>
          <Link href="/drives">
            <Button className="px-8 py-6 bg-linear-to-r from-[#032040] via-[#1C7D91] to-[#7BAC6B] text-white text-base font-semibold hover:opacity-80 transition-opacity">
              Browse donation drives
            </Button>
          </Link>
        </div>
        {/* Right Column */}
        <div className="flex-1 w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/hand-coins.png"
            alt="Hand Coins"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}
