'use server';

export const fetchPetProfile = async (id, selectedChain) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(
      `${baseUrl}/api/petprofile?petId=${id}&selectedChain=${selectedChain}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch pet profile');
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchAllPetProfile = async (address, selectedChain) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(
      `${baseUrl}/api/user?walletAddress=${address}&selectedChain=${selectedChain}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch pet profile');
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createPetProfile = async (formData) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/create`, {
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
    return await response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
