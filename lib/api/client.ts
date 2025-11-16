// lib/api/client.ts
import axios, { AxiosError } from "axios";

// Base URL
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.ai-career-guidance.dedyn.io/api";

// Axios instance
export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Generic API response type
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Generic error handler
export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError;
    return {
      message: (err.response?.data as any)?.error || err.message,
      status: err.response?.status || 500,
    };
  }
  return { message: "Unknown error", status: 500 };
};
