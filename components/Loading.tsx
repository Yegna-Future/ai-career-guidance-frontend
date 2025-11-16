// components/Loading.tsx
"use client";

import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  className?: string;
}

export default function Loading({ message = "Loading...", className = "" }: LoadingProps) {
  return (
    <div className={`flex justify-center items-center h-[60vh] ${className}`}>
      <div className="text-center space-y-4">
        <Loader2 className="animate-spin w-16 h-16 text-purple-500 mx-auto" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
