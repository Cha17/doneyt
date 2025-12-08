import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-[#012326]  via-[#1C7D91]/30 to-[#012326] shadow-sm shadow-gray-500/10 px-6 py-4 w-full">
      <div className="max-w-7xl mx-auto flex items-center">
        <Link
          href="/"
          className="text-xl font-bold text-white hover:opacity-80 transition-opacity"
        >
          DONEYT
        </Link>
        <div className="flex items-center gap-24 ml-auto">
          <Link href="/drives" className="text-white">
            drives
          </Link>
          <Link href="/about" className="text-white">
            about
          </Link>
          <Link href="/profile" className="text-white">
            profile
          </Link>
          <Link href="/sample" className="text-white">
            sample
          </Link>
        </div>
      </div>
    </header>
  );
}
