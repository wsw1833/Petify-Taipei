'use client';

import Image from 'next/image';
import addIcon from '@images/add-button.png';
import petpaw from '@images/pet-paw.png';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { fetchAllPetProfile } from '../actions/pet/profile';

export default function ProfilePage() {
  const { address } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  let [profile, setProfile] = useState([]);
  const [selectedChain, setSelectedChain] = useState(null);

  useEffect(() => {
    const selectedChain = localStorage.getItem('selectedChain');
    setSelectedChain(selectedChain);
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllPetProfile(address, selectedChain);
      setProfile(data.profile);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [address]);

  const dashboardHandler = (petId, tokenId) => {
    router.push(`/dashboard/${petId}`);
    localStorage.setItem('selectedPetId', petId);
    localStorage.setItem('tokenId', tokenId);
  };

  const addProfileHandler = () => {
    router.push('/create');
  };
  return (
    <div className="flex flex-col sm:items-center  h-screen w-full overflow-auto scrollbar-none">
      <div className="flex flex-col sm:items-center sm:px-0 px-6 justify-start items-center font-inter h-fit">
        <div className="flex flex-row items-center">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Furry Profile
          </p>
          <Image
            src={addIcon}
            priority={true}
            alt="addIcon"
            className="w-12 h-12 sm:hidden"
            onClick={addProfileHandler}
          ></Image>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 sm:text-lg text-lg mt-4">
          Select Your Furry
          <Image
            src={petpaw}
            priority={true}
            alt="petpaw"
            className="w-5 h-5 sm:w-6 sm:h-6"
          ></Image>
        </div>
        <Button
          onClick={addProfileHandler}
          className="bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-6 md:w-fit px-4 h-auto text-[#181818] font-medium rounded-[12px] text-base md:text-lg lg:text-xl gap-2 items-center justify-center hover:bg-[#F89D47] transition hover:duration-300 sm:flex hidden"
        >
          Adopt New Furry
          <Image
            src={addIcon}
            alt="addIcon"
            className="w-8 h-8 md:w-10 md:h-10"
          ></Image>
        </Button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-[20rem]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="md:w-[80%] w-full h-fit grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 place-items-center overflow-auto">
          {profile.map((pet) => (
            <div
              key={pet._id}
              onClick={() => dashboardHandler(pet._id, pet.tokenId)}
              className="col-span-1 sm:w-50 sm:h-70 w-44 h-64 my-6 bg-white border-2 rounded-[20px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col justify-center items-center hover:bg-[#FFC65C] transition hover:duration-200"
            >
              <Image
                src={pet.petImage ? pet.petImage : ''}
                width={500}
                height={500}
                alt="pet"
                className="sm:w-38 sm:h-38 w-30 h-30 rounded-[16px]"
              />
              <p className="sm:text-base text-sm font-medium text-[#484848] pt-1">
                {pet.petType}
              </p>
              <p className="sm:text-xl text-lg font-semibold mt-2">
                {pet.petName}
              </p>
              <p className="sm:text-base text-base font-medium text-[#484848] pt-2">
                {pet.petBreed}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
