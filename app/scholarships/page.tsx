// components/scholarships-page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter, SortAsc, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { fetchScholarships } from "@/lib/api/scholarships";
import { Scholarship } from "@/types";
import { ScholarshipCard } from "./scholarship-card";
import SearchBar from "@/components/SearchBar";

type ScholarshipTypeCounts = {
  all: number;
  University: number;
  "Global/External": number;
};



export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("deadline");

  // Fetch scholarships on component mount
  useEffect(() => {
    const loadScholarships = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("🔄 Starting to fetch scholarships...");

        const data = await fetchScholarships();
        console.log("✅ Scholarships fetched successfully:", data);
        console.log("📊 Data structure:", {
          isArray: Array.isArray(data),
          length: data?.length,
          firstItem: data?.[0],
          fullData: data
        });

        setScholarships(data);

      } catch (err) {
        console.error("❌ Error fetching scholarships:", err);
        console.error("🔍 Error details:", {
          name: err instanceof Error ? err.name : 'Unknown',
          message: err instanceof Error ? err.message : 'Unknown error',
          stack: err instanceof Error ? err.stack : 'No stack trace'
        });

        setError(err instanceof Error ? err.message : "Failed to load scholarships");
      } finally {
        setLoading(false);
        console.log("🏁 Loading completed");
      }
    };

    loadScholarships();
  }, []);

  // Also add logging to check the API response structure
  useEffect(() => {
    if (scholarships.length > 0) {
      console.log("🎯 Scholarships state updated:", {
        count: scholarships.length,
        types: scholarships.map(s => s.type),
        sample: scholarships[0]
      });
    }
  }, [scholarships]);


  const filteredAndSortedScholarships = useMemo(() => {
    console.log("🔍 Filtering scholarships:", {
      total: scholarships.length,
      searchTerm,
      typeFilter,
      sortBy
    });

    let filtered = scholarships;

    // Apply search filter with safe property access
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();

      filtered = filtered.filter(scholarship => {
        // Safe checks for each property
        const titleMatch = scholarship.title?.toLowerCase().includes(searchTermLower) ?? false;
        const descriptionMatch = scholarship.description?.toLowerCase().includes(searchTermLower) ?? false;
        const universityMatch = scholarship.university?.name?.toLowerCase().includes(searchTermLower) ?? false;
        const eligibilityMatch = scholarship.eligibility?.toLowerCase().includes(searchTermLower) ?? false;

        return titleMatch || descriptionMatch || universityMatch || eligibilityMatch;
      });
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(scholarship => scholarship.type === typeFilter);
    }

    // Apply sorting with safe property access
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "deadline":
          const dateA = a.deadline ? new Date(a.deadline).getTime() : Number.MAX_SAFE_INTEGER;
          const dateB = b.deadline ? new Date(b.deadline).getTime() : Number.MAX_SAFE_INTEGER;
          return dateA - dateB;
        case "title":
          return (a.title || '').localeCompare(b.title || '');
        case "university":
          return (a.university?.name || '').localeCompare(b.university?.name || '');
        case "amount":
          return (b.amount || 0) - (a.amount || 0);
        default:
          return 0;
      }
    });

    console.log("✅ Filtered results:", filtered.length);
    return filtered;
  }, [scholarships, searchTerm, typeFilter, sortBy]);


  const typeCounts = useMemo((): ScholarshipTypeCounts => {
    const counts: ScholarshipTypeCounts = {
      all: scholarships.length,
      University: 0,
      "Global/External": 0
    };

    scholarships.forEach(scholarship => {
      counts[scholarship.type]++;
    });

    console.log("📊 Type counts:", counts);
    return counts;
  }, [scholarships]);

  // Test the API call directly in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("🧪 Development mode - testing API directly...");
      // You can also test the API call directly here if needed
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading scholarships...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center py-12 bg-white rounded-2xl border border-red-200">
            <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <Filter className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Scholarships</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-4">{error}</p>
            <p className="text-sm text-gray-500 mb-4">
              Check the browser console for detailed error information.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  console.log("🎨 Rendering scholarships page:", {
    scholarshipsCount: scholarships.length,
    filteredCount: filteredAndSortedScholarships.length,
    loading,
    error
  });

  return (
    <div className="min-h-screen  py-8">
      <div className="container mx-auto px-4  max-w-7xl">
        <div className="mb-3">
          <h1 className="text-4xl font-bold text-primary bg-clip-text text-transparent">
            Scholarships
          </h1>
          <p className="text-secondary mt-2 text-lg">
            Discover scholarships across the Globe
          </p>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">

          <SearchBar
            placeholder="Search universities by name, region, or description..."
            value={searchTerm}
            onChange={setSearchTerm}
            total={scholarships.length}
            filtered={filteredAndSortedScholarships.length}

          />
        </div>

        {/* Scholarships Grid */}
        {filteredAndSortedScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-indigo-100">
            <div className="w-24 h-24 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
              <Filter className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No scholarships found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search criteria or filters to find more scholarship opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}