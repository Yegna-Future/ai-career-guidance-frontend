"use client"

import { fetchFaculties } from "@/lib/api/faculties";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, BookOpen, ArrowLeft, GraduationCap, MapPin, Calendar } from "lucide-react";
import Loading from "@/components/Loading";

export default function UniversityFacultiesPage() {
  const { id } = useParams();
  const [faculties, setFaculties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchFaculties(Number(id))
      .then(setFaculties)
      .catch(err => setError(err.message || "Failed to fetch faculties"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading message="Loading faculties..." />;


  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Faculties</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button asChild>
            <Link href={`/universities/${id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to University
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm" className="rounded-lg">
            <Link href={`/universities/${id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to University
            </Link>
          </Button>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">University Faculties</h1>
              <p className="text-gray-600 mt-2 text-lg">
                Explore academic faculties and their departments
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">{faculties.length}</div>
            <div className="text-sm text-gray-600">Total Faculties</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">
              {faculties.reduce((acc, faculty) => acc + (faculty.departments?.length || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Departments</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-primary">
              {faculties.filter(f => f.establishedYear).length}
            </div>
            <div className="text-sm text-gray-600">Established Faculties</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {faculties.filter(f => f.website).length}
            </div>
            <div className="text-sm text-gray-600">With Websites</div>
          </div>
        </div>
      </div>

      {/* Faculties Grid */}
      {faculties.length === 0 ? (
        <div className="text-center py-16">
          <GraduationCap className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Faculties Found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            This university doesn't have any faculties listed yet.
          </p>
          <Button asChild variant="outline">
            <Link href={`/universities/${id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to University
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {faculties.map(faculty => (
            <Card
              key={faculty.id}
              className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 group overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {faculty.name}
                  </CardTitle>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {faculty.departments?.length || 0} depts
                  </Badge>
                </div>

                <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
                  {faculty.description || "No description available for this faculty."}
                </CardDescription>

                {/* Faculty Details */}
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                  {faculty.establishedYear && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Est. {faculty.establishedYear}</span>
                    </div>
                  )}
                  {faculty.university?.region && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{faculty.university.region}</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Departments Preview */}
                {faculty.departments && faculty.departments.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">Departments</span>
                    </div>
                    <div className="space-y-1">
                      {faculty.departments.slice(0, 3).map((dept: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          <span className="truncate">{dept.name}</span>
                        </div>
                      ))}
                      {faculty.departments.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{faculty.departments.length - 3} more departments
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-lg border-gray-300 hover:border-blue-300"
                  >
                    <Link href={`/faculties/${faculty.id}`}>
                      <Users className="w-4 h-4 mr-2" />
                      View Faculty
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="rounded-lg bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Link href={`/faculties/${faculty.id}/departments`}>
                      <BookOpen className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}