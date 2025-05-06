import axiosInstance from '@/lib/axiosInstance';

// Definisikan tipe data yang dikembalikan oleh endpoint di sini
// atau impor dari file types yang relevan jika sudah ada.

export interface SuperAdminDashboardStats {
  totalUsers: number;
  totalBranches: number;
  totalBookings: number;
  activeBookings: number;
  revenueGrowth: number;
  userGrowth: number;
}

export interface SuperAdminBookingData {
  id: number;
  user: {
    name: string;
  };
  branch: {
    name: string;
  };
  field: {
    name: string;
  };
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
}

export const getSuperAdminDashboardStats = async (): Promise<SuperAdminDashboardStats> => {
  const response = await axiosInstance.get(`/bookings/admin/bookings`);
  return response.data;
};

export const getSuperAdminRecentBookings = async (limit: number = 5, sort: string = 'desc'): Promise<SuperAdminBookingData[]> => {
  const response = await axiosInstance.get(`/bookings/admin/bookings`);
  // Asumsi backend mengembalikan data booking dalam properti 'results'
  return response.data.results || response.data || []; 
}; 