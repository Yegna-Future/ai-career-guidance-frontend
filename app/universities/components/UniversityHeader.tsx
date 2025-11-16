import { University } from "@/lib/api/universities";
import { Faculty } from "@/lib/api/faculties";
import { Department } from "@/lib/api/departments";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Edit3, Landmark, MapPin, Globe, Award } from "lucide-react";
import Link from "next/link";

export default function UniversityHeader({
  university,
  faculties,
  departments,
}: {
  university: University;
  faculties: Faculty[];
  departments: Department[];
}) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-8 border border-blue-100 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Image */}
        {university.image_url && (
          <img
            src={university.image_url}
            alt={university.name}
            className="w-28 h-28 lg:w-36 lg:h-36 rounded-2xl object-cover shadow-md border-4 border-white"
          />
        )}

        {/* Info */}
        <div className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary">{university.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-gray-600">
                <div className="flex items-center gap-2 bg-primary text-secondary px-3 py-1.5 rounded-full">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{university.region}</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-2 bg-primary text-secondary  px-3 py-1.5 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Est. {university.establishedYear}</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-2 bg-primary text-secondary px-3 py-1.5 rounded-full">
                  <Landmark className="w-4 h-4" />
                  <span className="text-sm">{university.isPublic ? "Public" : "Private"}</span>
                </div>
              </div>
            </div>
            {/**TODO: Admin
             *  <Button asChild size="sm" className="bg-blue-600 text-white">
                <Link href={`/universities/${university.id}/edit`}>
                  <Edit3 className="w-4 h-4" />
            </Button>
                </Link>
                       
            */}
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={university.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>

          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-blue-200">
            <div className="flex flex-wrap gap-2">
              {university.globalRank && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  <Globe className="w-3 h-3 mr-1" /> Global #{university.globalRank}
                </Badge>
              )}
              {university.nationalRank && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  <Award className="w-3 h-3 mr-1" /> National #{university.nationalRank}
                </Badge>
              )}
            </div>
            <div className="flex gap-6">
              {[
                { count: faculties.length, label: "Faculties" },
                { count: departments.length, label: "Departments" },
                { count: university.scholarships?.length || 0, label: "Scholarships" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-lg font-semibold">{stat.count}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
