import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 py-8 px-6 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            <div className="flex items-center gap-4">
              <Image
                src="/images/doneyt.png"
                alt="Doneyt Logo"
                width={100}
                height={100}
              />
              <span>
                Copyright © {new Date().getFullYear()} Doneyt. All rights
                reserved.
              </span>
            </div>
          </div>
          <nav className="flex gap-6">
            <Link
              href="/drives"
              className="text-sm hover:text-white transition-colors"
            >
              Drives
            </Link>
            <Link
              href="/about"
              className="text-sm hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/profile"
              className="text-sm hover:text-white transition-colors"
            >
              Profile
            </Link>
          </nav>
        </div>
      </footer>
      <div className="w-full h-1 bg-linear-to-r from-green-400 via-teal-400 to-blue-500" />
    </>
  );
}
