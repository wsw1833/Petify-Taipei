'use client';
import React from 'react';
import Title from '@/components/pageTitle';
import MemberForm from '@/components/addMember';
import { useState } from 'react';
import { formatAddress } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function MemberPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleRemoveMember = async (walletAddress) => {
    router.refresh();
  };

  return (
    <div className="container flex w-full h-full">
      <div className="m-4 px-4 md:px-10 flex flex-col w-full h-full gap-2 bg-[#FFFFFD] rounded-[24px]">
        <Title page={'member'} />
        <MemberForm />
        <div className="w-full flex flex-col mt-6 items-center justify-center">
          <p className="w-full font-semibold flex items-center justify-center text-lg md:text-xl">
            Member List
          </p>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:ml-22 md:ml-16 ml-10 items-center justify-center gap-4 p-2 mt-2">
            <p className="col-span-1 items-center justify-center text-base md:text-lg">
              Name
            </p>
            <p className="col-span-1 items-center justify-center text-base md:text-lg">
              Wallet Address
            </p>
            <p className="col-span-1 items-center justify-center text-base md:text-lg">
              Location
            </p>
            <p className="col-span-1 items-center justify-center text-base md:text-lg">
              Remove
            </p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : memberList && memberList.length > 0 ? (
            memberList.map((member) => (
              <div
                key={member._id}
                className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:ml-22 md:ml-16 ml-10 items-center justify-around gap-4 p-2 border-b"
              >
                <span className="col-span-1">{member.name}</span>
                <span className="col-span-1">
                  {formatAddress(member.walletAddress)}
                </span>
                <span className="col-span-1">
                  {member.petLocation || member.location}
                </span>
                <Button
                  onClick={() => handleRemoveMember(member.walletAddress)}
                  className="col-span-1 w-full sm:w-[8rem] bg-red-400 font-bold text-base transition hover:duration-300 hover:bg-red-600"
                >
                  Remove
                </Button>
              </div>
            ))
          ) : (
            <div>No members found</div>
          )}
        </div>
      </div>
    </div>
  );
}
