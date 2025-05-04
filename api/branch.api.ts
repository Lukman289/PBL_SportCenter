import AxiosInstance from "../lib/axiosInstance";

export const getBranches = async () => {
  try {
    const response = await AxiosInstance.get("/branches");
    return response.data;
  } catch (error) {
    console.error("Error fetching branchs data:", error);
    throw error;
  }
};

