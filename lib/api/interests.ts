// lib/api/interests.ts
import { api, handleError, ApiResponse } from "./client";

// ----------------------
// Types
// ----------------------
export interface Interest {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

// ----------------------
// API Functions
// ----------------------
export const fetchInterests = async (): Promise<Interest[]> => {
  try {
    const { data } = await api.get<ApiResponse<Interest[]>>("/interests");
    if (!data.success)
      throw new Error(data.error || "Failed to fetch interests");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};
