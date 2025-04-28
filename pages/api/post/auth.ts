import AxiosInstance from "../../../utils/axiosInstance";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayLoad {
  name: string;
  phone: string;
  email: string;
  password: string;
  role?: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await AxiosInstance.post("/auth/login", payload);
  return response.data;
};

export const register = async (payload: RegisterPayLoad) => {
  const response = await AxiosInstance.post("/auth/register", {
    ...payload,
    role: "user",
  });
  console.log("Register response:", response.data);
  return response.data;
};
