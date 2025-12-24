"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { allDrives } from "@/data/allDrives";
import { Button } from "@/components/ui/button";
import DriveCard from "../components/DriveCard";
import Image from "next/image";
import NoDrivesFound from "../components/NoDrivesFound";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { getDriveProgress } from "@/utils/formatCurrency";
import { fetchDrives, transformDrive } from "@/lib/api";

export default function DrivesPage() {
  const [filter, setfilter] = useState<string>("Active");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
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
  const [isLoading, setIsLoading] = useState(true);

  const getFilteredDrives = () => {
    let filtered = drives;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (drive) =>
          drive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          drive.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected filter type
    if (filter === "Active") {
      filtered = filtered.filter((drive) => {
        const progress = getDriveProgress(
          drive.currentAmount,
          drive.targetAmount || 0
        );
        return progress < 100;
      });
    } else if (filter === "Ending Soon") {
      filtered = filtered.filter((drive) => {
        const progress = getDriveProgress(
          drive.currentAmount,
          drive.targetAmount || 0
        );
        return progress >= 80 && progress < 100;
      });
    } else if (filter === "Popular") {
      filtered = [...filtered].sort(
        (a, b) => b.currentAmount - a.currentAmount
      );
    }

    return filtered;
  };

  useEffect(() => {
    async function loadDrives() {
      try {
        setIsLoading(true);
        const response = await fetchDrives({ take: 100 }); // Fetch more drives
        const transformedDrives = response.drives.map(transformDrive);
        setDrives(transformedDrives);
      } catch (error) {
        console.error("Failed to load drives:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDrives();
  }, []);

  const filteredDrives = getFilteredDrives();
  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredDrives.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedDrives = filteredDrives.slice(startIndex, endIndex);

  useEffect(() => {
    setTimeout(() => {
      setCurrentPage(1);
    }, 0);
  }, [filter, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
      <Header />
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 w-full">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            All Donation Drives
          </h1>
          <div className="max-w-2xl mx-auto mb-8">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search drives by title or description..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-200 text-base"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              onClick={() => setfilter("Active")}
              className={
                filter === "Active"
                  ? "bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  : "bg-transparent text-gray-100 border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 hover:text-gray-700 transition-colors"
              }
            >
              Active
            </Button>
            <Button
              onClick={() => setfilter("Ending Soon")}
              className={
                filter === "Ending Soon"
                  ? "bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  : "bg-transparent text-gray-100 border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 hover:text-gray-700 transition-colors"
              }
            >
              Ending Soon
            </Button>
            <Button
              onClick={() => setfilter("Popular")}
              className={
                filter === "Popular"
                  ? "bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  : "bg-transparent text-gray-100 border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 hover:text-gray-700 transition-colors"
              }
            >
              Popular
            </Button>
          </div>
          {/* Drives Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 justify-items-center">
            {filteredDrives.length === 0 ? (
              <NoDrivesFound />
            ) : (
              paginatedDrives.map((drive) => (
                <DriveCard
                  key={String(drive.driveId)}
                  driveId={String(drive.driveId)}
                  title={drive.title}
                  organization={drive.organization}
                  description={drive.description}
                  currentAmount={drive.currentAmount}
                  targetAmount={drive.targetAmount}
                  imageUrl={drive.imageUrl}
                />
              ))
            )}
          </div>
          {/* Pagination */}
          {filteredDrives.length > 0 && (
            <>
              <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(
                    Math.max(0, Math.min(totalPages - 5, currentPage - 3)),
                    Math.max(5, Math.min(totalPages, currentPage + 2))
                  )
                  .map((pageNumber) => (
                    <Button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={
                        currentPage === pageNumber
                          ? "bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          : "px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      }
                    >
                      {pageNumber}
                    </Button>
                  ))}
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex justify-center items-center gap-2 mb-8 text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
