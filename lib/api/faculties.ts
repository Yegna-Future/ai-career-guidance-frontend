import { api, handleError, ApiResponse } from "./client";
import { Department } from "./departments";

// ----------------------
// Types
// ----------------------
export interface University {
  id: number;
  name: string;
  region: string;
  website: string;
  description: string;
  establishedYear: number;
  isPublic: boolean;
  image_url?: string;
  globalRank?: number;
  nationalRank?: number;
  location: UniversityLocation;
  createdAt?: string;
  updatedAt?: string;
}

export interface UniversityLocation {
  address: string;
  latitude: number;
  longitude: number;
}

export interface Faculty {
  id: number;
  name: string;
  description?: string;
  establishedYear?: number;
  website?: string;
  image_url?: string;
  createdAt?: string;
  updatedAt?: string;
  // New required properties from your API
  universityId: number;
  // Relations
  university?: University;
  departments?: Department[]; // If you need faculty with departments
}

export type FacultyInput = Omit<
  Faculty,
  "id" | "createdAt" | "updatedAt" | "university" | "departments"
>;

// Alternative: More specific types for different use cases
export interface FacultyWithUniversity extends Faculty {
  university: University; // Required instead of optional
}

export interface FacultyWithDepartments extends Faculty {
  departments: Department[]; // Required instead of optional
}

export interface FacultyWithRelations extends Faculty {
  university: University;
  departments: Department[];
}
// ----------------------
// API Functions
// ----------------------

// GET all faculties of a university
export const fetchFaculties = async (
  universityId: number
): Promise<Faculty[]> => {
  try {
    const { data } = await api.get<ApiResponse<Faculty[]>>(
      `/universities/${universityId}/faculties`
    );
    if (!data.success)
      throw new Error(data.error || "Failed to fetch faculties");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// GET single faculty
export const fetchFaculty = async (
  universityId: number,
  facultyId: number
): Promise<Faculty> => {
  try {
    const { data } = await api.get<ApiResponse<Faculty>>(
      `/universities/${universityId}/faculties/${facultyId}`
    );
    if (!data.success) throw new Error(data.error || "Failed to fetch faculty");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// POST create new faculty
export const createFaculty = async (
  universityId: number,
  payload: FacultyInput
): Promise<Faculty> => {
  try {
    const { data } = await api.post<ApiResponse<Faculty>>(
      `/universities/${universityId}/faculties`,
      payload
    );
    if (!data.success)
      throw new Error(data.error || "Failed to create faculty");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// PUT update faculty
export const updateFaculty = async (
  universityId: number,
  facultyId: number,
  payload: Partial<FacultyInput>
): Promise<Faculty> => {
  try {
    const { data } = await api.put<ApiResponse<Faculty>>(
      `/universities/${universityId}/faculties/${facultyId}`,
      payload
    );
    if (!data.success)
      throw new Error(data.error || "Failed to update faculty");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// DELETE faculty
export const deleteFaculty = async (
  universityId: number,
  facultyId: number
): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<ApiResponse<{ message: string }>>(
      `/universities/${universityId}/faculties/${facultyId}`
    );
    if (!data.success)
      throw new Error(data.error || "Failed to delete faculty");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const fetchAllFaculties = async (): Promise<Faculty[]> => {
  try {
    const { data } = await api.get<ApiResponse<Faculty[]>>(`/faculties`);
    if (!data.success)
      throw new Error(data.error || "Failed to fetch faculties");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// GET single faculty by ID (direct route)
export const fetchFacultyById = async (facultyId: number): Promise<Faculty> => {
  try {
    const { data } = await api.get<ApiResponse<Faculty>>(
      `/faculties/${facultyId}`
    );
    if (!data.success) throw new Error(data.error || "Failed to fetch faculty");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// PUT update faculty by ID (direct route)
export const updateFacultyById = async (
  facultyId: number,
  payload: Partial<FacultyInput>
): Promise<Faculty> => {
  try {
    const { data } = await api.put<ApiResponse<Faculty>>(
      `/faculties/${facultyId}`,
      payload
    );
    if (!data.success)
      throw new Error(data.error || "Failed to update faculty");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// DELETE faculty by ID (direct route)
export const deleteFacultyById = async (
  facultyId: number
): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<ApiResponse<{ message: string }>>(
      `/faculties/${facultyId}`
    );
    if (!data.success)
      throw new Error(data.error || "Failed to delete faculty");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// DELETE department
export const deleteDepartment = async (
  departmentId: number
): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<ApiResponse<{ message: string }>>(
      `/departments/${departmentId}`
    );
    if (!data.success)
      throw new Error(data.error || "Failed to delete department");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};
