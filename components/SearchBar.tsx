// components/SearchBar.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  total?: number;
  filtered?: number;
}

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  total,
  filtered,
}: SearchBarProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between w-full">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12 pr-4 py-3 rounded-2xl border-gray-300 focus:border-purple-500 shadow-sm"
        />
      </div>

      {typeof total !== "undefined" && typeof filtered !== "undefined" && (
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <Badge variant="secondary" className="bg-purple-50 text-purple-700 text-sm">
            {filtered} {filtered === 1 ? "Result" : "Results"}
          </Badge>
          <span className="hidden sm:inline">•</span>
          <span>{total} total</span>
        </div>
      )}
    </div>
  );
}
