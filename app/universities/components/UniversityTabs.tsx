import { useState } from "react";
import { University } from "@/lib/api/universities";
import { Faculty } from "@/lib/api/faculties";
import { Department } from "@/lib/api/departments";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye, Building2, BookOpen, Award } from "lucide-react";

import OverviewTab from "./tabs/OverviewTab";
import FacultiesTab from "./tabs/FacultiesTab";
import DepartmentsTab from "./tabs/DepartmentsTab";
import ScholarshipsTab from "./tabs/ScholarshipsTab";

interface UniversityTabsProps {
  university: University;
  faculties: Faculty[];
  departments: Department[];
}

export default function UniversityTabs({
  university,
  faculties,
  departments,
}: UniversityTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="flex w-full border-b border-gray-200 pb-1 gap-8">
        <TabsTrigger value="overview" className="flex items-center gap-2 px-1 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:font-semibold transition-all duration-200 group relative">
          <Eye className="w-4 h-4 group-data-[state=active]:text-primary text-gray-500" />
          <span>Overview</span>
        </TabsTrigger>
        <TabsTrigger value="faculties" className="flex items-center gap-2 px-1 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:font-semibold transition-all duration-200 group relative">
          <Building2 className="w-4 h-4 group-data-[state=active]:text-primary text-gray-500" />
          <div className="flex items-center gap-2">
            <span>Faculties</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full group-data-[state=active]:bg-indigo-100 group-data-[state=active]:text-indigo-700">
              {faculties.length}
            </span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="departments" className="flex items-center gap-2 px-1 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:font-semibold transition-all duration-200 group relative">
          <BookOpen className="w-4 h-4 group-data-[state=active]:text-primary text-gray-500" />
          <div className="flex items-center gap-2">
            <span>Departments</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full group-data-[state=active]:bg-indigo-100 group-data-[state=active]:text-indigo-700">
              {departments.length}
            </span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="scholarships" className="flex items-center gap-2 px-1 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:font-semibold transition-all duration-200 group relative">
          <Award className="w-4 h-4 group-data-[state=active]:text-primary text-gray-500" />
          <span>Scholarships</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6 mt-6">
        <OverviewTab
          university={university}
          faculties={faculties}
          departments={departments}
          setActiveTab={setActiveTab}
        />
      </TabsContent>
      <TabsContent value="faculties" className="mt-6">
        <FacultiesTab university={university} faculties={faculties} />
      </TabsContent>
      <TabsContent value="departments" className="mt-6">
        <DepartmentsTab university={university} departments={departments} />
      </TabsContent>
      <TabsContent value="scholarships" className="mt-6">
        <ScholarshipsTab university={university} scholarships={university.scholarships || []} />
      </TabsContent>
    </Tabs>
  );
}
