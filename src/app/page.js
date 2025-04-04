'use client';

import Image from 'next/image';
import animals from '@images/animals.jpg';
import petify from '@images/petify.png';
import flow from '@images/flow.svg';
import polygon from '@images/polygon.svg';
import worldIcon from '@images/world.svg';
import metamask from '@images/metamask.png';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Separate component for handling search params
const SearchParamsHandler = () => {
  const router = useRouter();

  return null;
};

export default function Home() {
  const [open, setOpen] = useState(false);

  const connectHandler = () => {
    router.push('/profile');
  };

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <SearchParamsHandler />
      <div className="flex flex-col sm:flex-row-reverse h-auto">
        <Image
          className="sm:w-[50%] shrink-0 max-h-200 sm:min-h-180 h-fit brightness-70"
          src={animals}
          priority={true}
          alt="animal picture"
        />
        <div className="flex flex-col sm:w-[50%] sm:mt-18 sm:px-12 mt-10 px-6 w-full">
          <div className="flex flex-row items-center sm:justify-start gap-2">
            <Image
              priority={true}
              src={petify}
              alt="icon"
              className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16"
            />
            <div className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              Petify
            </div>
          </div>
          <p className="line-clamp-2 sm:mt-10 mt-6 text-3xl md:text-4xl lg:text-6xl font-bold lg:leading-20 w-full">
            Pawprints in the Blockchain
          </p>
          <p className="line-clamp-2 lg:w-[60%] md:w-[80%] sm:mt-8 mt-6 text-xl md:text-2xl lg:text-4xl font-medium w-full lg:leading-12">
            Revolutionizing Pet Care with Soulbound
          </p>
          <div className="flex flex-row items-center justify-start gap-2 mt-6">
            <p className="text-xs md:text-sm lg:text-base font-medium text-[#484848]">
              Powered By
            </p>
            <Image src={flow} alt="icon" className="w-6 h-6 sm:w-8 sm:h-8" />
            <Image src={polygon} alt="icon" className="w-6 h-6 sm:w-8 sm:h-8" />
            <Image
              src={worldIcon}
              alt="icon"
              className="w-12 h-12 sm:w-14 sm:h-14 -ml-3"
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)]
                md:my-14 my-8 md:w-fit w-[15rem] px-10 h-auto py-2
                text-[#181818] font-medium rounded-[12px] text-sm md:text-base
                lg:text-lg flex gap-4 items-center justify-center
                hover:bg-[#F89D47] transition hover:duration-300"
              >
                Connect With Metamask
                <Image
                  src={metamask}
                  alt="metamask logo"
                  width={32}
                  height={32}
                />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#EEEEEEFF] w-full h-max flex flex-col items-center justify-center">
              <DialogTitle />
              <Button
                onClick={() => {
                  connectHandler('Polygon');
                }}
                className="bg-[#620FEC] shadow-[0_3px_10px_rgb(0,0,0,0.2)]
                py-2 md:w-[12rem] px-10
                text-[#FFFFFD] font-medium rounded-[12px] text-sm md:text-base
                lg:text-lg flex items-center justify-center
                hover:bg-[#5500CE] transition hover:duration-300"
              >
                Polygon
                <Image
                  src={polygon}
                  alt="icon"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </Button>
              <Button
                onClick={() => {
                  connectHandler('Flow');
                }}
                className="bg-[#00EF8B] shadow-[0_3px_10px_rgb(0,0,0,0.2)]
                py-2 md:w-[12rem] px-10 mt-4
                text-[#FFFFFD] font-medium rounded-[12px] text-sm md:text-base
                lg:text-lg flex items-center justify-center
                hover:bg-[#05E084] transition hover:duration-300"
              >
                Flow
                <Image
                  src={flow}
                  alt="icon"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Suspense>
  );
}
