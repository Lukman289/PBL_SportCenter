import { useAuth } from '../../context/auth.context';
import { Role } from '../../types/auth.type';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/shared/components/layouts/DashboardLayout';
import { 
  getSuperAdminDashboardStats,
  getSuperAdminRecentBookings,
  SuperAdminDashboardStats,
  SuperAdminBookingData
} from '@/api/admin.api';
import { 
  Users,
  Building2, 
  CalendarCheck2, 
  ActivitySquare,
  ArrowUpCircle, 
  TrendingUp
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<SuperAdminDashboardStats>({
    totalUsers: 0,
    totalBranches: 0,
    totalBookings: 0,
    activeBookings: 0,
    revenueGrowth: 0,
    userGrowth: 0
  });
  const [recentBookings, setRecentBookings] = useState<SuperAdminBookingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && (!isAuthenticated || (user && user.role !== Role.SUPER_ADMIN))) {
      router.replace('/auth/login');
    } else if (isAuthenticated && user && user.role === Role.SUPER_ADMIN) {
      fetchDashboardData();
    }
  }, [user, isAuthenticated, loading, router]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const statsData = await getSuperAdminDashboardStats();
      const bookingsData = await getSuperAdminRecentBookings();
      
      setStats(statsData);
      setRecentBookings(bookingsData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || !isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  const StatCard = ({ 
    title, 
    value, 
    icon, 
    color 
  }: {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
  }) => (
    <div className="bg-white rounded-lg shadow p-5 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center">
        <div className="mr-4 p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Super Admin</h1>
        <p className="text-gray-500">Selamat datang kembali, {user.name}</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <StatCard 
            title="Total Pengguna" 
            value={stats.totalUsers} 
            icon={<Users size={24} color="#4F46E5" />}
            color="#4F46E5"
          />
          <StatCard 
            title="Total Cabang" 
            value={stats.totalBranches} 
            icon={<Building2 size={24} color="#0891B2" />}
            color="#0891B2"
          />
          <StatCard 
            title="Total Booking" 
            value={stats.totalBookings} 
            icon={<CalendarCheck2 size={24} color="#10B981" />}
            color="#10B981"
          />
          <StatCard 
            title="Booking Aktif" 
            value={stats.activeBookings} 
            icon={<ActivitySquare size={24} color="#F59E0B" />}
            color="#F59E0B"
          />
          <StatCard 
            title="Pertumbuhan Pendapatan" 
            value={`${stats.revenueGrowth}%`}
            icon={<TrendingUp size={24} color="#EC4899" />}
            color="#EC4899"
          />
          <StatCard 
            title="Pertumbuhan Pengguna" 
            value={`${stats.userGrowth}%`}
            icon={<ArrowUpCircle size={24} color="#8B5CF6" />}
            color="#8B5CF6"
          />
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Booking Terbaru</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengguna</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cabang</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lapangan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="px-6 py-4">
                      <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.user?.name || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.branch?.name || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.field?.name || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {booking.status === 'confirmed' ? 'Dikonfirmasi' : 
                          booking.status === 'pending' ? 'Menunggu' : 
                          booking.status === 'cancelled' ? 'Dibatalkan' : booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    Tidak ada data booking terbaru
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
} 