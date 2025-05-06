import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/auth.context';
import { Role } from '@/types/auth.type';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Building, 
  Settings, 
  LogOut, 
  ChevronDown, 
  PieChart,
  Clock,
  CreditCard,
  Bell
} from 'lucide-react';
import { useState } from 'react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  onClick?: () => void;
}

const NavItem = ({ href, icon, label, isActive, hasSubmenu, isSubmenuOpen, onClick }: NavItemProps) => {
  return (
    <Link href={href}>
      <div
        onClick={onClick}
        className={`flex items-center px-4 py-3 text-sm rounded-lg mb-1 ${
          isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-blue-50'
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span className="flex-1">{label}</span>
        {hasSubmenu && (
          <ChevronDown
            size={16}
            className={`transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}
          />
        )}
      </div>
    </Link>
  );
};

export default function Sidebar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (menuKey: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Menu items berdasarkan role pengguna
  const getNavItems = () => {
    if (!user) return [];

    switch (user.role) {
      case Role.SUPER_ADMIN:
        return [
          {
            href: '/admin/dashboard',
            icon: <LayoutDashboard size={20} />,
            label: 'Dashboard'
          },
          {
            href: '/admin/users',
            icon: <Users size={20} />,
            label: 'Pengguna'
          },
          {
            href: '/admin/bookings',
            icon: <Calendar size={20} />,
            label: 'Booking'
          },
          {
            href: '/admin/branches',
            icon: <Building size={20} />,
            label: 'Cabang'
          },
          {
            href: '/admin/settings',
            icon: <Settings size={20} />,
            label: 'Pengaturan'
          }
        ];

      case Role.ADMIN_CABANG:
        return [
          {
            href: '/admin/cabang/dashboard',
            icon: <LayoutDashboard size={20} />,
            label: 'Dashboard'
          },
          {
            href: '/admin/cabang/bookings',
            icon: <Calendar size={20} />,
            label: 'Booking'
          },
          {
            href: '/admin/cabang/fields',
            icon: <Building size={20} />,
            label: 'Lapangan'
          },
          {
            href: '/admin/cabang/users',
            icon: <Users size={20} />,
            label: 'Pengguna'
          },
          {
            href: '/admin/cabang/notifications',
            icon: <Bell size={20} />,
            label: 'Notifikasi'
          }
        ];

      case Role.OWNER_CABANG:
        return [
          {
            href: '/owner/dashboard',
            icon: <LayoutDashboard size={20} />,
            label: 'Dashboard'
          },
          {
            href: '/owner/revenue',
            icon: <CreditCard size={20} />,
            label: 'Pendapatan'
          },
          {
            href: '/owner/occupancy',
            icon: <Clock size={20} />,
            label: 'Okupansi'
          },
          {
            href: '/owner/reports',
            icon: <PieChart size={20} />,
            label: 'Laporan'
          },
          {
            href: '/owner/settings',
            icon: <Settings size={20} />,
            label: 'Pengaturan'
          }
        ];

      case Role.USER:
        return [];

      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 fixed left-0 top-0 overflow-y-auto">
      <div className="px-4 py-6">
        <h2 className="text-xl font-bold mb-8 text-center">
          <span className="text-black">Sport</span>{" "}
          <span className="text-blue-400">Center</span>
        </h2>

        <div className="mb-6">
          <div className="px-4 py-2 mb-2">
            <p className="text-xs text-gray-500 uppercase">Menu</p>
          </div>
          
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.href)}
            />
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm text-red-600 rounded-lg hover:bg-red-50"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
} 