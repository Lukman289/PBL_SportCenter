import axiosInstance from '@/lib/axiosInstance';

// Definisikan tipe data yang dikembalikan oleh endpoint di sini
// atau impor dari file types yang relevan jika sudah ada.

export interface OwnerPerformanceStats {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  totalBookings: number;
  occupancyRate: number;
  customerRetention: number;
}

export interface MonthlyRevenueData {
  label: string; // e.g., "Jan", "Feb"
  value: number;
}

export interface OwnerRevenueReport {
  // Sesuaikan dengan struktur data dari endpoint /owner/reports/revenue
  // Misalnya:
  currentMonthRevenue: number;
  previousMonthRevenue: number;
  monthlyBreakdown: MonthlyRevenueData[]; 
  // ... properti lain
}

export const getOwnerPerformanceReport = async (): Promise<OwnerPerformanceStats> => {
  const response = await axiosInstance.get('/owner/reports/performance');
  return response.data;
};

export const getOwnerRevenueReport = async (): Promise<OwnerRevenueReport> => {
  const response = await axiosInstance.get('/owner/reports/revenue');
  return response.data; 
  // Jika endpoint revenue mengembalikan data bulanan dalam format tertentu:
  // return {
  //   ...
  //   monthlyBreakdown: response.data.monthlyRevenue || [] 
  // };
}; 