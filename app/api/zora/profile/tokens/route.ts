import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userAddress = searchParams.get("userAddress");
  const limit = searchParams.get("limit");

  if (!userAddress || !limit) {
    return NextResponse.json({ error: "Both userAddress and limit parameters are required" }, { status: 400 });
  }

  const chainNames = [
    "ETHEREUM-MAINNET",
    "ZORA-MAINNET",
    "OPTIMISM-MAINNET",
    "BASE-MAINNET",
    "ARBITRUM-MAINNET",
    "PGN-MAINNET",
    "BLAST-MAINNET",
  ];

  const body = {
    json: {
      limit: parseInt(limit, 10),
      chainNames,
      userAddress,
      sortDirection: "DESC",
      contractAddress: null,
      direction: "forward",
    },
    meta: {
      values: {
        contractAddress: ["undefined"],
      },
    },
  };

  try {
    const zoraResponse = await fetch('https://zora.co/api/trpc/user.createdTokens', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!zoraResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch data from Zora API" }, { status: zoraResponse.status });
    }

    const data = await zoraResponse.json();

    if (!data) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}