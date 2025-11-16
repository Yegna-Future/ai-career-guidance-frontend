// lib/api/departments.ts
import { api, handleError, ApiResponse } from "./client";
import { University } from "./universities";

// ----------------------
// Types
// ----------------------
export interface ProgramTag {
  id: number;
  tag: string;
  createdAt: string;
  departmentId: number;
}

export interface AdmissionRequirement {
  id: number;
  subject: string;
  minimumGrade: string;
  entranceExamInfo: string;
  createdAt: string;
  departmentId: number;
}

export interface Faculty {
  id: number;
  universityId: number;
  name: string;
  description?: string;
  image_url?: string;
  createdAt: string;
  university?: University;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  facultyId: number;
  level: string;
  durationYears: string;
  deliveryMode: string;
  tuitionFee?: number | null;
  jobOutlook: string;
  image_url?: string | null;
  createdAt: string;
  // New properties from your database
  establishedYear?: number;
  website?: string;
  updatedAt?: string;
  // Relations
  faculty?: Faculty;
  programTags?: ProgramTag[];
  admissionRequirements?: AdmissionRequirement[];
}

export type DepartmentInput = Omit<
  Department,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "faculty"
  | "programTags"
  | "admissionRequirements"
> & {
  programTags?: string[]; // For creating/updating with tag names
  admissionRequirements?: Omit<
    AdmissionRequirement,
    "id" | "createdAt" | "departmentId"
  >[];
};

// ----------------------
// API Functions
// ----------------------

// GET all departments (global)
export const fetchDepartments = async (): Promise<Department[]> => {
  try {
    const { data } = await api.get<ApiResponse<Department[]>>("/departments");
    if (!data.success)
      throw new Error(data.error || "Failed to fetch departments");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// GET all departments by faculty
export const fetchDepartmentsByFaculty = async (
  facultyId: number
): Promise<Department[]> => {
  try {
    const { data } = await api.get<ApiResponse<Department[]>>(
      `/faculties/${facultyId}/departments`
    );
    if (!data.success)
      throw new Error(data.error || "Failed to fetch departments");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// GET single department by ID
export const fetchDepartment = async (
  departmentId: number
): Promise<Department> => {
  try {
    const { data } = await api.get<ApiResponse<Department>>(
      `/departments/${departmentId}`
    );
    if (!data.success)
      throw new Error(data.error || "Failed to fetch department");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// POST create new department
export const createDepartment = async (
  payload: DepartmentInput
): Promise<Department> => {
  try {
    const { data } = await api.post<ApiResponse<Department>>(
      "/departments",
      payload
    );
    if (!data.success)
      throw new Error(data.error || "Failed to create department");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// PUT update department
export const updateDepartment = async (
  departmentId: number,
  payload: Partial<DepartmentInput>
): Promise<Department> => {
  try {
    const { data } = await api.put<ApiResponse<Department>>(
      `/departments/${departmentId}`,
      payload
    );
    if (!data.success)
      throw new Error(data.error || "Failed to update department");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};
