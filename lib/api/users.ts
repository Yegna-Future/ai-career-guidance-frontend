// lib/api/users.ts
import { api, handleError, ApiResponse } from "./client";

// ----------------------
// Types
// ----------------------
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ----------------------
// API Functions
// ----------------------
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const { data } = await api.get<ApiResponse<User[]>>("/users");
    if (!data.success) throw new Error(data.error || "Failed to fetch users");
    return data.data;
  } catch (error) {
    throw handleError(error);
  }
};
