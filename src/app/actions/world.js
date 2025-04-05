export const handleVerify = async (result) => {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/world-verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ proof: result, action: 'verify' }),
  });
  if (response.status == 500) throw new Error('Server error');
  if (response.status == 400) throw new Error('Verification error');
};

export const setVerify = async (walletAddress, nullifier_hash) => {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/owner`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      isVerified: true,
      walletAddress: walletAddress,
      nullifier_hash: nullifier_hash,
    }),
  });
  if (response.status == 500) throw new Error('Server error');
  if (response.status == 400) throw new Error('Verification error');
};

export const checkVerify = async (walletAddress) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(
      `${baseUrl}/api/owner?walletAddress=${walletAddress}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Server responded with ${response.status}`
      );
    }
    const data = await response.json();

    return {
      success: true,
      isVerified: data.isVerified,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Unknown error',
    };
  }
};
