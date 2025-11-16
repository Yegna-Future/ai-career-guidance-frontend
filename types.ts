import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

// types.ts
// types.ts
export interface ProgramTag {
  id: number;
  programId: number;
  tag: string;
}

export interface AdmissionRequirement {
  id: number;
  programId: number;
  subject: string;
  minimumGrade: string;
  entranceExamInfo: string;
}

export interface Program {
  id: number;
  departmentId: number;
  name: string;
  level: string;
  durationYears: string;
  description: string;
  jobOutlook: string;
  programTags: ProgramTag[];
  admissionRequirements: AdmissionRequirement[];
}

export interface Department {
  id: number;
  universityId: number;
  name: string;
  description: string;
  programs: Program[];
}

export interface JourneyPointProps {
  cx: string;
  cy: string;
  delay: number;
  emoji: ReactNode;
  text: string;
}

// types/scholarship.ts
export interface University {
  id: number;
  name: string;
  region: string;
  website?: string;
  description?: string;
  establishedYear?: number;
  isPublic?: boolean;
  globalRank?: number;
  nationalRank?: number;
  image_url?: string;
  location?: {
    address: string;
    latitude: number;
    longitude: number;
  };
  createdAt?: string;
}

export interface Scholarship {
  id: number;
  title: string;
  description?: string;
  amount?: number;
  deadline?: string;
  type: "University" | "Global/External";
  universityId?: number;
  link?: string;
  eligibility?: string;
  image_url?: string;
  createdAt?: string;
  updatedAt?: string;
  university?: University | null;
}

export type ScholarshipInput = Omit<
  Scholarship,
  "id" | "createdAt" | "updatedAt"
>;
