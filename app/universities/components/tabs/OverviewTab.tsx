"use client";

import { University } from "@/lib/api/universities";
import { Faculty } from "@/lib/api/faculties";
import { Department } from "@/lib/api/departments";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  ExternalLink,
  Award,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface OverviewTabProps {
  university: University;
  faculties: Faculty[];
  departments: Department[];
  setActiveTab: (tab: string) => void;
}

export default function OverviewTab({
  university,
  faculties,
  departments,
  setActiveTab,
}: OverviewTabProps) {
  return (
    <div className="space-y-6 mt-6">
      {/* University Story & Rankings */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Description */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-50 to-pink-100 rounded-full translate-y-12 -translate-x-12" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-primary">Our Story</h2>
                  <p className="text-secondary mt-2 text-lg flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    Established {university.establishedYear}
                  </p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <div className="bg-gradient-to-br from-gray-50 to-indigo-50/50 rounded-2xl p-8 border-l-4 border-indigo-500">
                  <p className="text-gray-700 leading-relaxed text-lg font-medium">
                    {university.description}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  asChild
                  className="flex-1 h-14 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 mr-3" />
                    Official Website
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 h-14 border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300"
                >
                  <Link
                    href="#faculties"
                    onClick={() => setActiveTab("faculties")}
                  >
                    <Building2 className="w-5 h-5 mr-3" />
                    Explore Faculties
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scholarships Preview */}
        <div className="space-y-6">
          {university.scholarships && university.scholarships.length > 0 && (
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 border border-indigo-400 shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Scholarship Opportunities
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-indigo-100 text-sm">
                        Apply now - limited time!
                      </p>
                    </div>
                  </div>
                </div>
                <Badge className="bg-white text-primary font-bold text-sm py-1 px-3">
                  {university.scholarships.length} Available
                </Badge>
              </div>

              {/* Scholarship Cards */}
              <div className="space-y-4">
                {university.scholarships.slice(0, 3).map((scholarship) => {
                  const deadline = new Date(scholarship.deadline);
                  const isUrgent =
                    deadline.getTime() - Date.now() <
                    7 * 24 * 60 * 60 * 1000; // Less than 7 days

                  return (
                    <div
                      key={scholarship.id}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                      onClick={() => setActiveTab("scholarships")}
                    >
                      <div className="flex items-start gap-4">
                        {/* Scholarship Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-white text-lg group-hover:text-indigo-100 transition-colors truncate">
                                {scholarship.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant="outline"
                                  className="bg-white/20 text-white border-white/30 text-xs"
                                >
                                  {scholarship.type}
                                </Badge>
                                <div className="text-lg font-bold text-green-300">
                                  {scholarship.amount}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Deadline */}
                          <div
                            className={`flex items-center gap-2 p-2 rounded-lg ${isUrgent
                              ? "bg-red-500/20 border border-red-400/50"
                              : "bg-yellow-500/20 border border-yellow-400/50"
                              }`}
                          >
                            <Clock
                              className={`w-4 h-4 ${isUrgent ? "text-red-300" : "text-yellow-300"
                                }`}
                            />
                            <span
                              className={`text-sm font-semibold ${isUrgent ? "text-red-100" : "text-yellow-100"
                                }`}
                            >
                              {isUrgent ? "🚨 URGENT: " : "Apply by: "}
                              {deadline.toLocaleDateString("en-US", {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            {isUrgent && (
                              <div className="ml-auto px-2 py-1 bg-red-500 rounded text-xs font-bold text-white">
                                SOON!
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Call to Action */}
              <Button
                className="w-full mt-6 bg-white text-primary hover:bg-indigo-50 font-bold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => setActiveTab("scholarships")}
              >
                <Award className="w-5 h-5 mr-2" />
                Explore All {university.scholarships.length} Scholarships
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
