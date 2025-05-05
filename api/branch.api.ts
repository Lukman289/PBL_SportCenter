import AxiosInstance from "../lib/axiosInstance";

const branchs = [
  {
    id: 1,
    name: "Branch Dummy 1",
    location: "Address Dummy 1",
    owner_id: "1",
    status: "active",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Branch Dummy 2",
    location: "Address Dummy 2",
    owner_id: "1",
    status: "active",
    imageUrl: "https://via.placeholder.com/150",
  },
]

export const getBranches = async () => {
  try {
    const branches = await AxiosInstance.get("/branches");
    const response = (branches == null) ? branchs : branches.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching branchs data:", error);
    throw error;
  }
};

