import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import add from '@images/add-button.png';
import { petRecordSystemFlow, petRecordSystemPolygon } from '@/lib/constant';
import petRecordSystemABI from '@/ABI/petRecordSystem.json';
import { useWriteContract } from 'wagmi';
import { config } from 'wagmi.config.mjs';
import { waitForTransactionReceipt } from '@wagmi/core';
import { addProvider } from '@/app/actions/pet/provider';

export default function AddMember({
  petId,
  onSuccess,
  tokenId,
  selectedChain,
}) {
  const [name, setName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CONTRACT_ADDRESS =
    selectedChain === 'Flow' ? petRecordSystemFlow : petRecordSystemPolygon;
  const CONTRACT_ABI = petRecordSystemABI;
  const { writeContractAsync } = useWriteContract();

  const addServiceProvider = async (provider, name, tokenId) => {
    try {
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'registerServiceProvider',
        args: [provider, name, tokenId],
      });

      const result = await waitForTransactionReceipt(config, { hash });
      if (result.status === 'reverted') {
        throw new Error('Error occured during executing!');
      }

      return { hash: result.transactionHash.toString() };
    } catch (error) {
      alert(error.message);
    }
  };

  // Define the submit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { hash } = await addServiceProvider(walletAddress, name, tokenId);

      const formData = {
        petId: petId,
        name: name,
        walletAddress: walletAddress,
        location: location,
        txHash: hash,
        chainNetwork: selectedChain,
      };

      console.log(formData);

      const response = await addProvider(formData);
      if (response.success) {
        setName('');
        setWalletAddress('');
        setLocation('');
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="w-full flex flex-row gap-4 items-center justify-center">
        <div className=" w-[16rem]">
          <Label htmlFor="name" className="text-sm w-max mb-2">
            Nickname
          </Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dr Lim"
            required
          />
        </div>
        <div className="w-[20rem]">
          <Label htmlFor="walletAddress" className="text-sm w-max mb-2">
            Wallet Address
          </Label>
          <Input
            type="text"
            id="walletAddress"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="0x00...0000"
            required
          />
        </div>
        <div className="w-[20rem]">
          <Label htmlFor="location" className="text-sm w-max mb-2">
            Store Location
          </Label>
          <Input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Vet Polyclinic"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={
            'w-fit bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-6 text-[#181818] font-semibold rounded-[12px] text-lg items-center justify-center hover:bg-[#F89D47] transition hover:duration-300'
          }
        >
          <Image
            src={add}
            priority={true}
            alt="addIcon"
            className="w-10 h-10"
          />
          {isSubmitting ? 'Adding...' : 'Add Record'}
        </Button>
      </div>
    </form>
  );
}
