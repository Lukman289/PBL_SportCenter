import { useAuth } from '../../../context/auth.context';
import { Role } from '../../../types/auth.type';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/shared/components/layouts/DashboardLayout';
import { 
  getBranchStats,
  getBranchBookingsToday,
  BranchStats,       // Impor tipe jika didefinisikan di branch.api.ts
  BranchBookingData  // Impor tipe jika didefinisikan di branch.api.ts
} from '@/api/branch.api'; // Path ke file API
import { 
  CalendarCheck2, 
  Users, 
  Building2,
  Clock,
  Boxes,
  ListChecks
} from 'lucide-react';

export default function AdminCabangDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [branchStats, setBranchStats] = useState<BranchStats>({
    totalBookings: 0,
    pendingBookings: 0,
    todayBookings: 0,
    totalUsers: 0,
    totalFields: 0,
    completedBookings: 0
  });
  const [todayBookings, setTodayBookings] = useState<BranchBookingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && (!isAuthenticated || (user && user.role !== Role.ADMIN_CABANG))) {
      router.replace('/auth/login');
    } else if (isAuthenticated && user && user.role === Role.ADMIN_CABANG) {
      fetchBranchData();
    }
  }, [user, isAuthenticated, loading, router]);

  const fetchBranchData = async () => {
    if (!user?.branchId) {
      console.error("Branch ID tidak ditemukan untuk Admin Cabang.");
      setIsLoading(false);
      // Mungkin tampilkan error ke pengguna atau redirect
      return;
    }
    setIsLoading(true);
    try {
      const branchId = user.branchId;
      
      const statsData = await getBranchStats(branchId);
      const todayBookingsData = await getBranchBookingsToday(branchId);
      
      setBranchStats(statsData);
      setTodayBookings(todayBookingsData);
    } catch (error) {
      console.error('Failed to fetch branch data:', error);
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
  }

  const StatCard = ({ title, value, icon, color }: StatCardProps) => (
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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Admin Cabang</h1>
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
            title="Total Booking" 
            value={branchStats.totalBookings} 
            icon={<CalendarCheck2 size={24} color="#10B981" />}
            color="#10B981"
          />
          <StatCard 
            title="Booking Menunggu" 
            value={branchStats.pendingBookings} 
            icon={<Clock size={24} color="#F59E0B" />}
            color="#F59E0B"
          />
          <StatCard 
            title="Booking Hari Ini" 
            value={branchStats.todayBookings} 
            icon={<ListChecks size={24} color="#4F46E5" />}
            color="#4F46E5"
          />
          <StatCard 
            title="Total Pengguna Terdaftar" 
            value={branchStats.totalUsers} 
            icon={<Users size={24} color="#EC4899" />}
            color="#EC4899"
          />
          <StatCard 
            title="Total Lapangan" 
            value={branchStats.totalFields} 
            icon={<Building2 size={24} color="#0891B2" />}
            color="#0891B2"
          />
          <StatCard 
            title="Booking Selesai" 
            value={branchStats.completedBookings} 
            icon={<Boxes size={24} color="#8B5CF6" />}
            color="#8B5CF6"
          />
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Booking Hari Ini</h2>
          <p className="text-sm text-gray-500">Daftar booking yang perlu ditangani hari ini</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengguna</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontak</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lapangan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pembayaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={8} className="px-6 py-4">
                      <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : todayBookings.length > 0 ? (
                todayBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.user.phone || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.field.name}</td>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                          booking.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          booking.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {booking.paymentStatus === 'paid' ? 'Lunas' : 
                          booking.paymentStatus === 'pending' ? 'Menunggu' : 
                          booking.paymentStatus === 'failed' ? 'Gagal' : booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Detail</button>
                      {booking.status === 'pending' && (
                        <button className="text-green-600 hover:text-green-900">Konfirmasi</button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                    Tidak ada booking hari ini
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