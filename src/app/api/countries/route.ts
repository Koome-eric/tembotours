import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = process.env.LITE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: 'API key is not configured' }, { status: 500 });
  }

  const apiUrl = new URL('https://api.liteapi.travel/v3.0/data/countries');
  apiUrl.searchParams.set('timeout', '4');

  try {
    const response = await fetch(apiUrl.toString(), {
      headers: {
        'X-API-Key': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ message: 'Failed to fetch data from Lite API', details: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching from Lite API:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}
