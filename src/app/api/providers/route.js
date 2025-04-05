// app/api/providers/route.js
import { cors, runMiddleware } from '@/lib/cors';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Provider from '@/models/provider';

export async function GET(req, res) {
  const { searchParams } = req.nextUrl;
  const walletAddress = searchParams.get('walletAddress');
  const selectedChain = searchParams.get('selectedChain');

  if (!walletAddress || !selectedChain) {
    return NextResponse.json(
      { success: false, message: 'address is missing' },
      { status: 400 }
    );
  }
  await dbConnect();
  try {
    const member = await Provider.find({
      walletAddress: walletAddress,
      chainNetwork: selectedChain,
    });
    return NextResponse.json(
      { success: true, provider: member },
      { status: 200 }
    );
  } catch (err) {
    console.log(err.error);
  }
}
