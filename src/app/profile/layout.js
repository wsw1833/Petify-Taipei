'use client';

import { useRouter } from 'next/navigation';
import { useAccountEffect } from 'wagmi';

export default function ProfileLayout({ children }) {
  const router = useRouter();

  useAccountEffect({
    onDisconnect() {
      router.push(`/`);
    },
  });
  return <div className={`my-8 h-max overflow-auto`}>{children}</div>;
}
