import AxiosInstance from "../lib/axiosInstance";
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "../types/auth.type";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await AxiosInstance.post("/auth/login", payload);
  return response.data;
};

export const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const response = await AxiosInstance.post("/auth/register", payload);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await AxiosInstance.post("/auth/logout");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const refreshToken = async (): Promise<LoginResponse> => {
  const response = await AxiosInstance.post("/auth/refresh-token", {}, {
    withCredentials: true
  });
  return response.data;
};

