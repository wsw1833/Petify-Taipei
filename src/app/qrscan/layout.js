'use client';

import Header from '@/components/header';
import { formatAddress } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';

// Create a separate component for the logic that uses useSearchParams
function QRLayoutContent({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push(`/?returnUrl=/qrscan?petId=${petId}`);
    }
  }, [isConnected, router, petId]);

  return (
    <div className="h-screen xl:overflow-hidden overflow-auto">
      <Header QR={true} />
      <div className="sm:w-full w-full h-[40rem] mt-4 flex flex-row">
        <div className="w-full bg-[#E9E6DD] xl:h-full h-max md:mx-40 mx-10 rounded-[20px]">
          {children}
        </div>
      </div>
    </div>
  );
}

// The main QRLayout component wraps the content in Suspense
export default function QRLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <QRLayoutContent>{children}</QRLayoutContent>
    </Suspense>
  );
}
