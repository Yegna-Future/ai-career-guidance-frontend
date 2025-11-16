"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUniversity, University } from "@/lib/api/universities";
import { fetchFaculties, Faculty } from "@/lib/api/faculties";
import { fetchDepartments, Department, fetchDepartmentsByFaculty } from "@/lib/api/departments";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Building2,
  Globe,
  Calendar,
  Award,
  MapPin,
  ExternalLink,
  Edit3,
  Eye,
  Users,
  BookOpen,
  Landmark,
  Clock
} from "lucide-react";
import Link from "next/link";
import UniversityHeader from "../components/UniversityHeader";
import UniversityTabs from "../components/UniversityTabs";

export default function UniversityDetail() {
  const { id } = useParams();
  const [university, setUniversity] = useState<University | null>(null);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        setLoading(true);
        const [uni, facs, deps] = await Promise.all([
          fetchUniversity(Number(id)),
          fetchFaculties(Number(id)),
          fetchDepartmentsByFaculty(Number(id))
        ]);
        setUniversity(uni);
        setFaculties(facs);
        setDepartments(deps);
      } catch (err: any) {
        setError(err.message || "Failed to fetch university data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return <UniversitySkeleton />;

  // Error state
  if (error) return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <Award className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Unable to load university</h2>
        <p className="text-gray-600">{error}</p>
        <Button asChild>
          <Link href="/universities">Back to Universities</Link>
        </Button>
      </div>
    </div>
  );

  if (!university) return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-center">
      <h2 className="text-xl font-semibold text-gray-900">University not found</h2>
      <Button asChild className="mt-4">
        <Link href="/universities">Browse Universities</Link>
      </Button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Section - Light Blue Background */}
      <UniversityHeader
        university={university}
        faculties={faculties}
        departments={departments}
      />

      {/* Main Content Tabs */}
      <UniversityTabs
        university={university}
        faculties={faculties}
        departments={departments} />
    </div>
  );
}

// Empty State Component
function EmptyState({
  icon,
  title,
  description,
  action
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-6 text-gray-300">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">{description}</p>
      {action}
    </div>
  );
}

// Loading Skeleton
function UniversitySkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <Skeleton className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl" />
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="grid grid-cols-3 gap-6 pt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-12 w-full rounded-lg" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-48 rounded-2xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}