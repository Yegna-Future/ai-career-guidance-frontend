import { api, handleError, ApiResponse } from "./client";

// ----------------------
// Types
// ----------------------
export interface UniversityLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Scholarship {
  id: number;
  universityId: number;
  name: string;
  description: string;
  eligibility: string;
  deadline: string;
  link: string;
  amount: string;
  type: string;
  image_url?: string;
  createdAt: string;
}

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
  scholarships?: Scholarship[];
  createdAt?: string;
  updatedAt?: string;
}

export type UniversityInput = Omit<
  University,
  "id" | "createdAt" | "updatedAt"
>;

// ----------------------
// Faculty Types
// ----------------------
export interface Faculty {
  id: number;
  name: string;
  universityId: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type FacultyInput = Omit<Faculty, "id" | "createdAt" | "updatedAt">;

// ----------------------
// University API Functions
// ----------------------

// GET /universities
export const fetchUniversities = async (): Promise<University[]> => {
  try {
    const { data } = await api.get<ApiResponse<University[]>>("/universities");
    if (!data.success)
      throw new Error(data.error || "Failed to fetch universities");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// GET /universities/:id
export const fetchUniversity = async (id: number): Promise<University> => {
  try {
    const { data } = await api.get<ApiResponse<University>>(
      `/universities/${id}`
    );
    if (!data.success)
      throw new Error(data.error || "Failed to fetch university");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// POST /universities
export const createUniversity = async (
  payload: UniversityInput
): Promise<University> => {
  try {
    const { data } = await api.post<ApiResponse<University>>(
      "/universities",
      payload
    );
    if (!data.success)
      throw new Error(data.error || "Failed to create university");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// PUT /universities/:id
export const updateUniversity = async (
  id: number,
  payload: Partial<UniversityInput>
): Promise<University> => {
  try {
    const { data } = await api.put<ApiResponse<University>>(
      `/universities/${id}`,
      payload
    );
    if (!data.success)
      throw new Error(data.error || "Failed to update university");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// DELETE /universities/:id
export const deleteUniversity = async (
  id: number
): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<ApiResponse<{ message: string }>>(
      `/universities/${id}`
    );
    if (!data.success)
      throw new Error(data.error || "Failed to delete university");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ----------------------
// Faculties by University
// ----------------------

// GET /universities/:id/faculties
export const fetchFacultiesByUniversity = async (
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
