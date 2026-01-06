"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut, isLoading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-[#012326]  via-[#1C7D91]/30 to-[#012326] shadow-sm shadow-gray-500/10 px-6 py-4 w-full">
      <div className="max-w-7xl mx-auto flex items-center">
        <Link
          href="/"
          className="text-xl font-bold text-white hover:opacity-80 transition-opacity"
          onClick={closeMenu}
        >
          DONEYT
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <Link
            href="/drives"
            className="text-white hover:opacity-80 transition-opacity"
          >
            drives
          </Link>
          <Link
            href="/about"
            className="text-white hover:opacity-80 transition-opacity"
          >
            about
          </Link>

          {isLoading ? (
            <span className="text-white">Loading...</span>
          ) : isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="text-white hover:opacity-80 transition-opacity"
              >
                profile
              </Link>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-white hover:opacity-80 transition-opacity"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Burger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden ml-auto text-white hover:opacity-80 transition-opacity"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[73px] left-0 right-0 bg-linear-to-r from-[#012326] via-[#1C7D91]/90 to-[#012326] shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 space-y-4">
          <Link
            href="/drives"
            className="text-white hover:opacity-80 transition-opacity py-2 text-center"
            onClick={closeMenu}
          >
            drives
          </Link>
          <Link
            href="/about"
            className="text-white hover:opacity-80 transition-opacity py-2 text-center"
            onClick={closeMenu}
          >
            about
          </Link>

          {isLoading ? (
            <span className="text-white text-center py-2">Loading...</span>
          ) : isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="text-white hover:opacity-80 transition-opacity py-2 text-center"
                onClick={closeMenu}
              >
                profile
              </Link>
              <button
                onClick={handleSignOut}
                className="text-white hover:opacity-80 transition-opacity py-2 text-center"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-white hover:opacity-80 transition-opacity py-2 text-center"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
