// lib/api/search.ts
import { api, handleError, ApiResponse } from "./client";

// ----------------------
// Types
// ----------------------
export interface SearchResult {
  id: number;
  type: "university" | "faculty" | "department" | "program" | "scholarship";
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ----------------------
// API Functions
// ----------------------
export const search = async (query: string): Promise<SearchResult[]> => {
  try {
    const { data } = await api.get<ApiResponse<SearchResult[]>>(`/search`, {
      params: { q: query },
    });
    if (!data.success)
      throw new Error(data.error || "Failed to perform search");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};
