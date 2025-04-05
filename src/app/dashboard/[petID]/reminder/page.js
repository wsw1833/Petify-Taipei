'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import remind from '@images/reminder.png';
import Title from '@/components/pageTitle';
import RemindBox from '@/components/remindbox';
import { Button } from '@/components/ui/button';
import ReminderForm from '@/components/remindForm';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { fetchReminder } from '@/app/actions/pet/reminder';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
export default function ReminderPage() {
  const [open, setOpen] = useState(false);
  const [petId, setPetId] = useState(null);
  const [selectedChain, setSelectedChain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reminder, setReminder] = useState([]);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const selectedChain = localStorage.getItem('selectedChain');
    const id = localStorage.getItem('selectedPetId');
    setPetId(id);
    setSelectedChain(selectedChain);

    //Fetch data once we have the petId
    if (id) {
      const getReminders = async () => {
        setLoading(true);
        try {
          const data = await fetchReminder(id, selectedChain);
          setReminder(data);
        } catch (error) {
          console.error('Failed to fetch records:', error);
        } finally {
          setLoading(false);
        }
      };
      getReminders();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        if (window.innerWidth < 800) {
          setIsDesktop(false);
        } else {
          setIsDesktop(true);
        }
      };
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  // Function to refresh data after adding a new record
  const refreshReminders = async () => {
    if (petId) {
      setLoading(true);
      try {
        const data = await fetchReminder(petId, selectedChain);
        setReminder(data);
      } catch (error) {
        console.error('Failed to refresh records:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (isDesktop) {
    return (
      <div className="container flex w-full h-full">
        <div className=" m-4 flex flex-col w-full h-full mb-20 gap-2 bg-[#FFFFFD] rounded-[24px]">
          <Title page={'reminder'} />
          <div className="w-full flex flex-row items-center justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  className={
                    'w-fit bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-4 text-[#181818] p-4 font-semibold rounded-[12px] text-lg items-center justify-center hover:bg-[#F89D47] transition hover:duration-300'
                  }
                >
                  <Image
                    src={remind}
                    priority={true}
                    alt="reminderIcon"
                    className="w-6 h-6"
                  />
                  Set Reminder
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#FFFFFD] w-full h-max flex flex-col ">
                <DialogTitle />
                <Title page={'reminder'} />
                {petId && (
                  <ReminderForm
                    petId={petId}
                    setOpen={setOpen}
                    onSuccess={refreshReminders}
                    selectedChain={selectedChain}
                  />
                )}
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full lg:px-20 grid items-center justify-center overflow-y-auto mb-4">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <RemindBox reminders={reminder.data || []} display={true} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex w-full h-full">
      <div className=" m-4 flex flex-col w-full h-full mb-20 gap-2 bg-[#FFFFFD] rounded-[24px]">
        <Title page={'reminder'} />
        <div className="w-full flex flex-row items-center justify-center">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button
                className={
                  'w-fit bg-[#FFC65C] shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-4 text-[#181818] p-4 font-semibold rounded-[12px] text-lg items-center justify-center hover:bg-[#F89D47] transition hover:duration-300'
                }
              >
                <Image
                  src={remind}
                  priority={true}
                  alt="reminderIcon"
                  className="w-6 h-6"
                />
                Set Reminder
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-[#FFFFFD] w-full h-max flex flex-col ">
              <DialogTitle />
              <Title page={'reminder'} />
              {petId && (
                <ReminderForm
                  petId={petId}
                  setOpen={setOpen}
                  onSuccess={refreshReminders}
                />
              )}
            </DrawerContent>
          </Drawer>
        </div>
        <div className="w-full lg:px-20 grid items-center justify-center overflow-y-auto mb-4">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <RemindBox reminders={reminder.data || []} display={true} />
          )}
        </div>
      </div>
    </div>
  );
}
