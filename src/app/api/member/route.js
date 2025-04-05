// app/api/member/route.js
import { cors, runMiddleware } from '@/lib/cors';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Provider from '@/models/provider';

export async function GET(req, res) {
  const { searchParams } = req.nextUrl;
  const petID = searchParams.get('petId');
  const selectedChain = searchParams.get('selectedChain');

  if (!petID || !selectedChain) {
    return NextResponse.json(
      { success: false, message: 'petID or walletAddress is missing' },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const member = await Provider.find({
      petId: petID,
      chainNetwork: selectedChain,
    });

    return NextResponse.json({ success: true, data: member }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, message: 'Error fetching data' },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  await dbConnect();
  try {
    const data = await req.json();
    const member = await Provider.create(data);
    return NextResponse.json({ success: true, data: member }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req, res) {
  const { searchParams } = req.nextUrl;
  const walletAddress = searchParams.get('walletAddress');
  const selectedChain = searchParams.get('selectedChain');

  if (!walletAddress || !selectedChain) {
    return NextResponse.json(
      { success: false, message: 'walletAddress is missing' },
      { status: 400 }
    );
  }

  await dbConnect();
  try {
    const result = await Provider.findOneAndDelete({
      walletAddress: walletAddress,
      chainNetwork: selectedChain,
    });

    return NextResponse.json(
      {
        success: true,
        deletedCount: result.deletedCount,
        message: `${result.deletedCount} member records deleted successfully`,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Delete error:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
