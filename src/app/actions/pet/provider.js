'use server';
import { revalidatePath } from 'next/cache';

export const fetchProviders = async (walletAddress, selectedChain) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(
      `${baseUrl}/api/providers?walletAddress=${walletAddress}&selectedChain=${selectedChain}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Server responded with ${response.status}`
      );
    }
    return await response.json();
  } catch (err) {
    return { success: false, status: 400, error: err.message };
  }
};

export const addProvider = async (formData) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/providers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log(response.body);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Server responded with ${response.status}`
      );
    }

    revalidatePath(`/dashboard/${formData.petId}/member`);
    return await response.json();
  } catch (err) {
    return { success: false, status: 400, error: err.message };
  }
};
