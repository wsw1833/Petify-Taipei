'use server';

import { revalidatePath } from 'next/cache';

export const fetchReminder = async (petID, selectedChain) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(
      `${baseUrl}/api/reminder?petId=${petID}&selectedChain=${selectedChain}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Server responded with ${response.status}`
      );
    }
    revalidatePath(`/dashboard/${petID}/reminder`);
    return await response.json();
  } catch (err) {
    return { success: false, status: 400, error: err.message };
  }
};

export const addReminder = async (formData) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/reminder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Server responded with ${response.status}`
      );
    }

    revalidatePath(`/dashboard/${formData.petId}/reminder`);
    return await response.json();
  } catch (err) {
    return { success: false, status: 400, error: err.message };
  }
};
