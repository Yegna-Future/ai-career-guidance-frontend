// lib/api/scholarships.ts
import { Scholarship } from "@/types";
import { api, handleError, ApiResponse } from "./client";

// ----------------------
// Types
// ----------------------

export type ScholarshipInput = Omit<
  Scholarship,
  "id" | "createdAt" | "updatedAt"
>;

// ----------------------
// API Functions
// ----------------------

// GET all scholarships
export const fetchScholarships = async (): Promise<Scholarship[]> => {
  try {
    const { data } = await api.get<ApiResponse<Scholarship[]>>("/scholarships");
    if (!data.success)
      throw new Error(data.error || "Failed to fetch scholarships");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// GET scholarships by university
export const fetchScholarshipsByUniversity = async (
  universityId: number
): Promise<Scholarship[]> => {
  try {
    const { data } = await api.get<ApiResponse<Scholarship[]>>(
      `/universities/${universityId}/scholarships`
    );
    if (!data.success)
      throw new Error(data.error || "Failed to fetch scholarships");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// GET single scholarship
export const fetchScholarship = async (
  scholarshipId: number
): Promise<Scholarship> => {
  try {
    const { data } = await api.get<ApiResponse<Scholarship>>(
      `/scholarships/${scholarshipId}`
    );
    if (!data.success)
      throw new Error(data.error || "Failed to fetch scholarship");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// POST create scholarship
export const createScholarship = async (
  payload: ScholarshipInput
): Promise<Scholarship> => {
  try {
    const { data } = await api.post<ApiResponse<Scholarship>>(
      "/scholarships",
      payload
    );
    if (!data.success)
      throw new Error(data.error || "Failed to create scholarship");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// PUT update scholarship
export const updateScholarship = async (
  scholarshipId: number,
  payload: Partial<ScholarshipInput>
): Promise<Scholarship> => {
  try {
    const { data } = await api.put<ApiResponse<Scholarship>>(
      `/scholarships/${scholarshipId}`,
      payload
    );
    if (!data.success)
      throw new Error(data.error || "Failed to update scholarship");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};

// DELETE scholarship
export const deleteScholarship = async (
  scholarshipId: number
): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<ApiResponse<{ message: string }>>(
      `/scholarships/${scholarshipId}`
    );
    if (!data.success)
      throw new Error(data.error || "Failed to delete scholarship");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};
