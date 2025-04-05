'use server';

import { NextResponse } from 'next/server';

export const createOwner = async (walletAddress) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/owner`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress: walletAddress }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Server responded with ${response.status}`
      );
    }
    const data = await response.json();
    return NextResponse.json({ success: true, result: data, status: 200 });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err,
      status: 500,
    });
  }
};
