import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '@/context/auth.context';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              {user && user.name ? `Halaman ${user.name}` : 'Dashboard'}
            </h1>
            <div className="flex items-center">
              <div className="relative">
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-2">
                    {user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-medium">{user && user.name ? user.name : 'User'}</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 