import { useAuth } from '../../context/auth.context';
import { Role } from '../../types/auth.type';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/shared/components/layouts/DashboardLayout';
import {
  getOwnerPerformanceReport,
  getOwnerRevenueReport,
  OwnerPerformanceStats,
  MonthlyRevenueData,
  OwnerRevenueReport
} from '@/api/owner.api';
import { 
  TrendingUp,
  BarChart3,
  Users,
  Calendar,
  ArrowUpRight,
  BadgePercent
} from 'lucide-react';

export default function OwnerCabangDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [ownerStats, setOwnerStats] = useState<OwnerPerformanceStats>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    revenueGrowth: 0,
    totalBookings: 0,
    occupancyRate: 0,
    customerRetention: 0
  });
  const [revenueData, setRevenueData] = useState<MonthlyRevenueData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && (!isAuthenticated || (user && user.role !== Role.OWNER_CABANG))) {
      router.replace('/auth/login');
    } else if (isAuthenticated && user && user.role === Role.OWNER_CABANG) {
      fetchOwnerData();
    }
  }, [user, isAuthenticated, loading, router]);

  const fetchOwnerData = async () => {
    setIsLoading(true);
    try {
      const performanceData = await getOwnerPerformanceReport();
      const revenueReportData = await getOwnerRevenueReport();
      
      setOwnerStats(performanceData);
      setRevenueData(revenueReportData.monthlyBreakdown || []); 
    } catch (error) {
      console.error('Failed to fetch owner data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || !isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
    trend?: number;
  }

  const StatCard = ({ title, value, icon, color, trend }: StatCardProps) => (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {trend !== undefined && (
            <div className="flex items-center mt-2">
              <ArrowUpRight size={16} className={trend >= 0 ? "text-green-500" : "text-red-500"} />
              <span className={`text-xs font-medium ml-1 ${trend >= 0 ? "text-green-500" : "text-red-500"}`}>
                {trend}% dari bulan lalu
              </span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          {icon}
        </div>
      </div>
    </div>
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Owner</h1>
        <p className="text-gray-500">Selamat datang kembali, {user.name}</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <StatCard 
            title="Total Pendapatan" 
            value={formatCurrency(ownerStats.totalRevenue)} 
            icon={<TrendingUp size={24} color="#4F46E5" />}
            color="#4F46E5"
          />
          <StatCard 
            title="Pendapatan Bulan Ini" 
            value={formatCurrency(ownerStats.monthlyRevenue)} 
            icon={<BarChart3 size={24} color="#10B981" />}
            color="#10B981"
            trend={ownerStats.revenueGrowth}
          />
          <StatCard 
            title="Total Booking" 
            value={ownerStats.totalBookings} 
            icon={<Calendar size={24} color="#F59E0B" />}
            color="#F59E0B"
          />
          <StatCard 
            title="Tingkat Okupansi" 
            value={`${ownerStats.occupancyRate}%`} 
            icon={<BadgePercent size={24} color="#EC4899" />}
            color="#EC4899"
          />
          <StatCard 
            title="Retensi Pelanggan" 
            value={`${ownerStats.customerRetention}%`} 
            icon={<Users size={24} color="#8B5CF6" />}
            color="#8B5CF6"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Pendapatan Bulanan</h2>
          </div>
          <div className="p-6 h-80">
            {isLoading ? (
              <div className="h-full bg-gray-200 rounded animate-pulse"></div>
            ) : revenueData.length > 0 ? (
              <div className="h-full flex items-end justify-around">
                {revenueData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div 
                      className="bg-blue-500 rounded-t w-10 sm:w-12" 
                      style={{ 
                        height: `${Math.max(10, (item.value / Math.max(1, ...revenueData.map(d => d.value))) * (288-40) )}px`,
                      }}
                    ></div>
                    <span className="text-xs mt-2 break-all">{item.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 h-full flex items-center justify-center">Data pendapatan bulanan tidak tersedia.</p>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Performance Insight</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Okupansi Lapangan</span>
                  <span className="text-sm text-gray-500">{ownerStats.occupancyRate}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-500 rounded-full" 
                    style={{ width: `${ownerStats.occupancyRate}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Retensi Pelanggan</span>
                  <span className="text-sm text-gray-500">{ownerStats.customerRetention}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-green-500 rounded-full" 
                    style={{ width: `${ownerStats.customerRetention}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Pertumbuhan Pendapatan</span>
                  <span className="text-sm text-gray-500">{ownerStats.revenueGrowth}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-purple-500 rounded-full" 
                    style={{ width: `${Math.max(0, ownerStats.revenueGrowth)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium mb-3">Rekomendasi Bisnis</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Tingkatkan promosi untuk jam-jam sepi booking</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Tambahkan program loyalitas untuk meningkatkan retensi</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Evaluasi harga sewa lapangan di jam-jam favorit</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 