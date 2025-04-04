'use client';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import { formatAddress } from '@/lib/utils';

export default function DashboardLayout({ children }) {
  return (
    <div className={`h-screen xl:overflow-hidden overflow-auto`}>
      <Header addr={address ? formatAddress(address) : ''} QR={false} />
      <div className="w-full h-[40rem] mt-4 flex flex-row">
        <Sidebar />
        <div className="w-full bg-[#E9E6DD] xl:h-full h-max mx-6 rounded-[20px] z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
