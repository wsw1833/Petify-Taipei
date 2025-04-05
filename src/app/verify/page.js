'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';
import { Button } from '@/components/ui/button';
import { useAccount, useAccountEffect } from 'wagmi';
import { handleVerify, setVerify } from '../actions/world';
import worldIcon from '@images/world-white.svg';
import Image from 'next/image';

export default function verifyPage() {
  const { address } = useAccount();
  const router = useRouter();

  useAccountEffect({
    onDisconnect() {
      router.push(`/`);
    },
  });

  return (
    <div className="w-full h-screen items-center justify-center flex flex-col bg-[#FFFFFD]">
      <p className="text-base md:text-lg mb-4">
        Please verify your identity with World ID
      </p>
      <IDKitWidget
        app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID}
        action="verify"
        onSuccess={(result) => {
          console.log('success verified', result);
          setVerify(address, result.nullifier_hash);
          router.push('/profile');
        }}
        handleVerify={handleVerify}
        verification_level={VerificationLevel.Device}
      >
        {({ open }) => (
          <Button
            onClick={open}
            className="bg-[#3B82F6] shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:w-fit w-[15rem] px-10 h-auto py-2 text-white font-medium rounded-[12px] text-sm md:text-base lg:text-lg flex gap-2 items-center justify-center hover:bg-[#2563EB] transition hover:duration-300"
          >
            Verify with World ID
            <Image src={worldIcon} width={38} height={38} priority={true} />
          </Button>
        )}
      </IDKitWidget>
    </div>
  );
}
