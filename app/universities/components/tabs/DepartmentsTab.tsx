import { University } from "@/lib/api/universities";
import { Department } from "@/lib/api/departments";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Edit3, BookOpen } from "lucide-react";
import Link from "next/link";

interface DepartmentsTabProps {
  university: University;
  departments: Department[];
}

export default function DepartmentsTab({ university, departments }: DepartmentsTabProps) {
  if (departments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-gradient-to-br from-gray-50 to-indigo-50/40 rounded-2xl border border-dashed border-indigo-300 shadow-inner">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">No Departments</h2>
        <p className="text-gray-500 max-w-md">
          There are no departments available for{" "}
          <span className="font-semibold">{university.name}</span>.
          Start building the academic structure now!
        </p>
        <Button asChild className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:scale-105 transition-transform shadow-lg">
          <Link href={`/universities/${university.id}/edit`}>
            <Edit3 className="w-4 h-4 mr-2" />
            Add Departments
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((dept) => (
        <Card
          key={dept.id}
          className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50/40"
        >
          {/* Decorative Accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full -translate-y-10 translate-x-10 opacity-40 group-hover:opacity-60 transition-opacity" />

          <CardHeader className="relative z-10 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-primary group-hover:text-indigo-700 transition-colors">
                {dept.name}
              </CardTitle>
            </div>
            <CardDescription className="line-clamp-2 text-secondary">
              {dept.description || "No description available"}
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="flex items-center justify-between gap-3 mt-4">
              <Button
                asChild
                size="sm"
                className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:scale-105 transition-transform shadow-md"
              >
                <Link href={`/departments/${dept.id}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Link>
              </Button>
              {/**
               *               <Button
                asChild
                size="sm"
                variant="outline"
                className="flex-1 border-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all"
              >
                <Link href={`/departments/${dept.id}/edit`}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Link>
              </Button>
               */}

            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
