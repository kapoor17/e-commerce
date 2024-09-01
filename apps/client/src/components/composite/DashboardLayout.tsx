import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { Outlet } from 'react-router';

export function DashboardLayout() {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <DashboardSidebar />
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <DashboardHeader />
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
