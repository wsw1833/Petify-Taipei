// api/world-verify.js
import { NextResponse } from 'next/server';
import { cors, runMiddleware } from '@/lib/cors';

export async function POST(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method !== 'POST') {
    return NextResponse.json({
      success: false,
      error: 'wrong method',
      status: 504,
    });
  }

  try {
    const body = await req.json();
    console.log(body);
    const response = await fetch(
      `https://developer.worldcoin.org/api/v2/verify/${process.env.WORLDCOIN_APP_ID}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          ...body.proof,
          action: body.action,
        }),
      }
    );

    const data = await response.json();
    return NextResponse.json({ success: true, result: data, status: 200 });
  } catch (error) {
    console.error('Worldcoin verification error:', error);
    return NextResponse.json({
      success: false,
      error: 'Verified Failed',
      status: 400,
    });
  }
}
