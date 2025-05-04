import AxiosInstance from "../lib/axiosInstance";

export const getFields = async () => {
  try {
    const response = await AxiosInstance.get("/fields");
    return response.data;
  } catch (error) {
    console.error("Error fetching fields data:", error);
    throw error;
  }
};