import AxiosInstance from "../lib/axiosInstance";

// Definisikan tipe data yang dikembalikan oleh endpoint di sini
// atau impor dari file types yang relevan jika sudah ada.

export interface BranchStats {
  totalBookings: number;
  pendingBookings: number;
  todayBookings: number;
  totalUsers: number;
  totalFields: number;
  completedBookings: number;
}

export interface BranchBookingData {
  id: number;
  user: {
    name: string;
    phone: string;
  };
  field: {
    name: string;
  };
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
  paymentStatus: string;
}

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
    // Pastikan response.data.data jika struktur dari backend adalah { data: { data: [...] } }
    // atau response.data jika struktur dari backend adalah { data: [...] }
    return branches.data.data || branches.data || branchs; // Fallback ke data dummy jika perlu
  } catch (error) {
    console.error("Error fetching branches data:", error);
    return branchs; // Fallback ke data dummy jika error
  }
};

export const getBranchStats = async (branchId: number): Promise<BranchStats> => {
  const response = await AxiosInstance.get(`/branches/${branchId}/stats`);
  return response.data;
};

export const getBranchBookingsToday = async (branchId: number): Promise<BranchBookingData[]> => {
  const response = await AxiosInstance.get(`/branches/${branchId}/bookings?date=today`);
  return response.data.results || response.data || [];
};

