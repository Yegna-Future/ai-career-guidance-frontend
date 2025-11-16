"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash, Edit, Plus, Building2, Users, Calendar, MapPin, Search } from "lucide-react";
import { Faculty, deleteFacultyById, fetchAllFaculties } from "@/lib/api/faculties";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/Loading";

export default function FacultiesPage() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [filteredFaculties, setFilteredFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadFaculties = async () => {
      try {
        const data = await fetchAllFaculties();
        setFaculties(data);
        setFilteredFaculties(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadFaculties();
  }, []);

  useEffect(() => {
    const filtered = faculties.filter(faculty =>
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.university?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFaculties(filtered);
  }, [searchTerm, faculties]);

  const handleDelete = async (facultyId: number) => {
    if (!confirm("Are you sure you want to delete this faculty? This will also remove all associated departments.")) return;

    try {
      setDeletingId(facultyId);
      await deleteFacultyById(facultyId);
      setFaculties(faculties.filter((f) => f.id !== facultyId));
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <Loading message="Loading faculties..." />;


  return (
    <MaxWidthWrapper>
      <div className="space-y-8 py-8">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-primary">Faculties</h1>
              <p className="text-secondary mt-2">
                Manage and explore academic faculties across universities
              </p>
            </div>
            {/**
             *             <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
              <Link href="/faculties/create">
                <Plus className="w-5 h-5 mr-2" />
                Add Faculty
              </Link>
            </Button>
             */}

          </div>

          {/* Search and Stats */}
          <SearchBar
            placeholder="Search faculties by name, description, or university..."
            value={searchTerm}
            onChange={setSearchTerm}
            total={faculties.length}
            filtered={filteredFaculties.length}
          />
        </div>

        {/* Faculties Grid */}
        {filteredFaculties.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No matching faculties found' : 'No faculties yet'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm
                ? 'Try adjusting your search terms or browse all faculties.'
                : 'Get started by creating the first faculty to organize academic departments.'
              }
            </p>
            {!searchTerm && (
              <Button asChild size="lg" className="rounded-xl">
                <Link href="/faculties/create">
                  <Plus className="w-5 h-5 mr-2" />
                  Create First Faculty
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredFaculties.map((faculty) => (
              <Card
                key={faculty.id}
                className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 group overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-xl font-bold text-primary group-hover:text-primary transition-colors line-clamp-2">
                      {faculty.name}
                    </CardTitle>

                  </div>

                  <CardDescription className="text-secondary line-clamp-3 leading-relaxed">
                    {faculty.description || "No description available for this faculty."}
                  </CardDescription>

                  {/* University Info */}
                  {faculty.university && (
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-medium">{faculty.university.name}</span>
                      <span>•</span>
                      <span>{faculty.university.region}</span>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="space-y-4 flex flex-1 flex-col">
                  {/* Faculty Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {faculty.establishedYear && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-primary" />
                        <div>
                          <div className="font-medium">Established</div>
                          <div>{faculty.establishedYear || "Not specified"}</div>
                        </div>
                      </div>)}


                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-medium">Departments {faculty.departments?.length || 0}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 mt-auto">
                    <Button
                      asChild
                      variant="primary"
                      size="sm"
                      className="flex-1 rounded-lg border-gray-300 hover:border-indigo-300"
                    >
                      <Link href={`/faculties/${faculty.id}`}>

                        View
                      </Link>
                    </Button>
                    {/**TODO: Admin
                     * 
                     *                     <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-lg border-gray-300 hover:border-indigo-300"
                    >
                      <Link href={`/faculties/${faculty.id}/edit`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg border-gray-300 hover:border-red-300 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(faculty.id)}
                      disabled={deletingId === faculty.id}
                    >
                      {deletingId === faculty.id ? (
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

        {/* Loading State for Search */}
        {searchTerm && filteredFaculties.length === 0 && faculties.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">
              No faculties found matching "<span className="font-medium">{searchTerm}</span>"
            </p>
            <Button
              variant="ghost"
              className="mt-2 text-primary hover:text-indigo-700"
              onClick={() => setSearchTerm("")}
            >
              Clear search and show all faculties
            </Button>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}