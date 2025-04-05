// app/api/owner/route.js
import { cors, runMiddleware } from '@/lib/cors';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Member from '@/models/member';

export async function GET(req, res) {
  await runMiddleware(req, res, cors);

  const { searchParams } = req.nextUrl;
  const walletAddress = searchParams.get('walletAddress');
  await dbConnect();
  try {
    const member = await Member.findOne({ walletAddress: walletAddress });
    console.log(member);
    if (!member) {
      return NextResponse.json({
        success: true,
        isVerified: false,
        status: 200,
      });
    }
    return NextResponse.json(
      { success: true, isVerified: member.isVerified },
      { status: 200 }
    );
  } catch (err) {
    console.log(err.error);
  }
}

export async function POST(req, res) {
  await runMiddleware(req, res, cors);

  await dbConnect();
  try {
    const data = await req.json();
    const member = await Member.create(data);
    return NextResponse.json(
      { success: true, member: member },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}

export async function UPDATE(req, res) {}
