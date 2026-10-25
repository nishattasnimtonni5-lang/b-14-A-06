"use client";

import React from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
      <p className="text-gray-500">
        {error.message || "We couldn&apos;t load your workouts right now."}
      </p>
      <button
        onClick={() => reset()}
        className="bg-[#C2F800] px-4 py-2 rounded-xl text-black hover:bg-yellow-400"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
