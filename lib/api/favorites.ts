// lib/api/favorites.ts
import { api, handleError, ApiResponse } from "./client";

// ----------------------
// Types
// ----------------------
export interface Favorite {
  id: number;
  userId: number;
  type: string;
  itemId: number;
  createdAt?: string;
  updatedAt?: string;
}

// ----------------------
// API Functions
// ----------------------
export const fetchFavorites = async (): Promise<Favorite[]> => {
  try {
    const { data } = await api.get<ApiResponse<Favorite[]>>("/favorites");
    if (!data.success)
      throw new Error(data.error || "Failed to fetch favorites");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};
