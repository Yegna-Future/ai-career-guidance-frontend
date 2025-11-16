"use client";

import { useEffect, useState } from "react";
import { fetchUniversities, University } from "@/lib/api/universities";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Building2, MapPin, Calendar, Search, Plus, Users, Award, Globe, Eye } from "lucide-react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/Loading";

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUniversities()
      .then(data => {
        setUniversities(data);
        setFilteredUniversities(data);
      })
      .catch(err => setError(err.message || "Failed to fetch universities"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = universities.filter(uni =>
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUniversities(filtered);
  }, [searchTerm, universities]);

  if (loading) return <Loading message="Loading universities..." />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Universities</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-primary bg-clip-text text-transparent">
              Universities
            </h1>
            <p className="text-secondary mt-2 text-lg">
              Discover academic institutions across Ethiopia
            </p>
          </div>

          {/**
           * TODO: Admin 
           * 
           *           <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Link href="/universities/create">
              <Plus className="w-5 h-5 mr-2" />
              Add University
            </Link>
          </Button>
           */}

        </div>

        {/* Search and Stats */}
        <SearchBar
          placeholder="Search universities by name, region, or description..."
          value={searchTerm}
          onChange={setSearchTerm}
          total={universities.length}
          filtered={filteredUniversities.length}
        />
      </div>

      {/* Universities Grid */}
      {filteredUniversities.length === 0 ? (
        <div className="text-center py-16">
          <Building2 className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No universities found' : 'No universities yet'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm
              ? `No universities match "${searchTerm}". Try different search terms.`
              : 'Get started by adding the first university to the system.'
            }
          </p>
          {!searchTerm && (
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/universities/create">
                <Plus className="w-5 h-5 mr-2" />
                Add First University
              </Link>
            </Button>
          )}
          {searchTerm && (
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredUniversities.map((uni) => (
            <Card
              key={uni.id}
              className=" rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 group overflow-hidden pt-0"
            >
              {/* University Image */}
              {uni.image_url && (
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={uni.image_url}
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <CardHeader className="pb-4x">
                <div className="space-y-3">
                  <CardTitle className="text-xl font-bold text-primary group-hover:text-primary transition-colors line-clamp-2">
                    {uni.name}

                  </CardTitle>

                  <div className="flex items-center gap-4 text-sm text-secondary">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{uni.region}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Est. {uni.establishedYear}</span>
                    </div>
                    {/* University Type Badge */}
                    <Badge variant={uni.isPublic ? "default" : "secondary"} className="w-fit">
                      {uni.isPublic ? "Public University" : "Private University"}
                    </Badge>
                  </div>


                </div>
              </CardHeader>

              <CardContent className="space-y-4 flex flex-col flex-1">
                {/* Description */}
                <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
                  {uni.description}
                </CardDescription>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2 mt-auto">
                  <Button
                    asChild
                    variant="primary"
                    size="sm"
                    className="flex-1 rounded-lg"
                  >
                    <Link href={`/universities/${uni.id}`}>
                      View Details
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