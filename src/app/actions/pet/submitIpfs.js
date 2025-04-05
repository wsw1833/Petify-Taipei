'use server';

export const submitPetIPFS = async (data) => {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/ipfs`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const cid = await response.json();
  return cid;
};
