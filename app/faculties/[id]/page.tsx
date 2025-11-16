// faculties/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2, Edit, Trash, Plus, Building2, Users, Calendar, Globe,
  ArrowLeft, GraduationCap, BookOpen, Target, CheckCircle2, DollarSign,
  Briefcase, Clock, MapPin
} from "lucide-react";
import { toast } from "sonner";
import { Department, fetchDepartmentsByFaculty } from "@/lib/api";
import { Faculty, deleteDepartment, fetchFacultyById } from "@/lib/api/faculties";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Loading from "@/components/Loading";

export default function FacultyDetailPage() {
  const params = useParams();
  const facultyId = Number(params?.id);

  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingDeptId, setDeletingDeptId] = useState<number | null>(null);

  useEffect(() => {
    const loadFacultyAndDepartments = async () => {
      try {
        const [facultyData, deptData] = await Promise.all([
          fetchFacultyById(facultyId),
          fetchDepartmentsByFaculty(facultyId)
        ]);
        setFaculty(facultyData);
        setDepartments(deptData);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load faculty data");
      } finally {
        setLoading(false);
      }
    };

    if (facultyId) loadFacultyAndDepartments();
  }, [facultyId]);

  const handleDeleteDepartment = async (deptId: number) => {
    if (!confirm("Are you sure you want to delete this department? This action cannot be undone.")) return;

    try {
      setDeletingDeptId(deptId);
      await deleteDepartment(deptId);
      setDepartments(departments.filter((d) => d.id !== deptId));
      toast.success("Department deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete department");
    } finally {
      setDeletingDeptId(null);
    }
  };

  if (loading) return <Loading message="Loading faculty information..." />;

  if (!faculty) {
    return (
      <MaxWidthWrapper>
        <div className="text-center py-16 space-y-4">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Faculty Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The faculty you're looking for doesn't exist or may have been moved.
          </p>
          <Button asChild>
            <Link href="/faculties">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Faculties
            </Link>
          </Button>
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="space-y-8 py-8">
        {/* Back Navigation */}
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm" className="rounded-lg">
            <Link href="/faculties">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Faculties
            </Link>
          </Button>
        </div>

        {/* Faculty Header */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border border-indigo-200">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Faculty Icon */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Faculty Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-primary">
                    {faculty.name}
                  </h1>
                  <p className="text-secondary mt-2 text-lg leading-relaxed">
                    {faculty.description || "No description available"}
                  </p>
                </div>
                {/**
                 *                 <Button asChild className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Link href={`/faculties/${faculty.id}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Faculty
                  </Link>
                </Button>
                 */}
                {/* Faculty Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                  <div className="text-start">
                    <div className="text-2xl font-bold text-primary">{departments.length}</div>
                    <div className="text-sm text-gray-600">Departments</div>
                  </div>
                  {faculty.establishedYear && <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {faculty.establishedYear}
                    </div>
                    <div className="text-sm text-gray-600">
                      Established</div>
                  </div>}

                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {departments.reduce((acc, dept) => acc + (dept.programTags?.length || 0), 0)}
                    </div>
                    <div className="text-sm text-gray-600">Program Areas</div>
                  </div>
                  <div className="text-center">
                    {faculty.website ? (
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <a href={faculty.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    ) : (
                      null
                    )}
                  </div>
                </div>

              </div>



            </div>
          </div>
        </div>

        {/* Departments Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-primary">Academic Departments</h2>
              <p className="text-secondary mt-1">
                {departments.length} departments offering specialized programs
              </p>
            </div>
            {/**
             * TODO: Admin
             *             <Button asChild className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
              <Link href={`/departments/create?facultyId=${faculty.id}`}>
                <Plus className="w-4 h-4 mr-2" />
                Add Department
              </Link>
            </Button>
             */}

          </div>

          {departments.length === 0 ? (
            <Card className="rounded-2xl border-2 border-dashed border-gray-300">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Departments Yet</h3>
                <p className="text-gray-600 mb-6 max-w-sm">
                  Get started by adding the first department to {faculty.name}
                </p>
                <Button asChild size="lg" className="rounded-xl">
                  <Link href={`/departments/create?facultyId=${faculty.id}`}>
                    <Plus className="w-5 h-5 mr-2" />
                    Create First Department
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {departments.map((dept) => (
                <Card
                  key={dept.id}
                  className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 group overflow-hidden"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <CardTitle className="text-xl font-bold text-primary group-hover:text-primary transition-colors">
                        {dept.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                          {dept.level}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {dept.durationYears} years
                        </Badge>
                      </div>
                    </div>

                    <CardDescription className="text-gray-600 leading-relaxed">
                      {dept.description}
                    </CardDescription>

                    {/* Program Tags */}
                    {dept.programTags && dept.programTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {dept.programTags.map((tag) => (
                          <Badge key={tag.id} variant="secondary" className="bg-indigo-100 text-primary">
                            {tag.tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4 flex flex-col flex-1">
                    {/* Key Information Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <GraduationCap className="w-4 h-4" />
                          <span className="font-medium">Level:</span>
                          <span>{dept.level}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">Duration:</span>
                          <span>{dept.durationYears} years</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">Delivery:</span>
                          <span className="capitalize">{dept.deliveryMode}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {dept.tuitionFee && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-medium">Tuition:</span>
                            <span>{dept.tuitionFee}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Target className="w-4 h-4" />
                          <span className="font-medium">Requirements:</span>
                          <span>{dept.admissionRequirements?.length || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Job Outlook */}
                    {dept.jobOutlook && (
                      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Briefcase className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Career Outlook</span>
                        </div>
                        <p className="text-sm text-green-700 leading-relaxed">
                          {dept.jobOutlook}
                        </p>
                      </div>
                    )}

                    {/* Admission Requirements Preview */}
                    {dept.admissionRequirements && dept.admissionRequirements.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">Key Requirements</span>
                        </div>
                        <div className="space-y-1">
                          {dept.admissionRequirements.slice(0, 2).map((req, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                              <span>{req.subject}: {req.minimumGrade}</span>
                            </div>
                          ))}
                          {dept.admissionRequirements.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{dept.admissionRequirements.length - 2} more requirements
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2 mt-auto">
                      <Button
                        asChild
                        variant="primary"
                        size="sm"
                        className="flex-1 rounded-lg border-indigo-300 hover:border-indigo-300"
                      >
                        <Link href={`/departments/${dept.id}`}>
                          <BookOpen className="w-4 h-4 mr-2" />
                          View Courses
                        </Link>
                      </Button>
                      {/**
                       * TODO: Admin
                       *                       <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-lg border-gray-300 hover:border-indigo-300"
                      >
                        <Link href={`/departments/${dept.id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg border-gray-300 hover:border-red-300 text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteDepartment(dept.id)}
                        disabled={deletingDeptId === dept.id}
                      >
                        {deletingDeptId === dept.id ? (
                          <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                          <Trash className="w-4 h-4" />
                        )}
                      </Button>
                       */}


                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}