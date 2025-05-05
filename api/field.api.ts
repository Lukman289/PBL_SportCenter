import AxiosInstance from "../lib/axiosInstance";

const fields = [
  {
    id: 1,
    branchId: "1",
    typeId: "1",
    name: "Futsal Field 1",
    priceDay: 200000,
    priceNight: 250000,
    status: "available",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    branchId: "2",
    typeId: "2",
    name: "Futsal Field 2",
    priceDay: 200000,
    priceNight: 250000,
    status: "available",
    imageUrl: "https://via.placeholder.com/150",
  },
];

export const getFields = async () => {
  try {
    const response = await AxiosInstance.get("/fields");
    return (response.data == null) ? fields : response.data;
  } catch (error) {
    console.error("Error fetching fields data:", error);
    throw error;
  }
};