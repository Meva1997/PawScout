import React from "react";

export default function AnimalsInfoSkeleton() {
  return (
    <>
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="border border-gray-200 bg-gray-100 rounded-lg overflow-hidden shadow-sm animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-full h-75 bg-gray-300"></div>

          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>

            {/* Short Description */}
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>

            {/* Age */}
            <div className="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>

            {/* Size */}
            <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>

            {/* Gender */}
            <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
          </div>

          {/* Button Skeleton */}
          <div className="p-4 border-t border-gray-200">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ))}
    </>
  );
}
