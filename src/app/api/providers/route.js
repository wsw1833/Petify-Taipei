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
    const provider = await Provider.find({
      walletAddress: walletAddress,
      chainNetwork: selectedChain,
    });
    return NextResponse.json(
      { success: true, provider: provider },
      { status: 200 }
    );
  } catch (err) {
    console.log(err.error);
  }
}

export async function POST(req, res) {
  await dbConnect();
  try {
    const data = await req.json();
    const provider = await Provider.create(data);
    return NextResponse.json(
      { success: true, data: provider },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}
