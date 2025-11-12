import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cityName = searchParams.get('cityName') || searchParams.get('destination');

  if (!cityName) {
    return NextResponse.json({ message: 'City name is required' }, { status: 400 });
  }

  const apiKey = process.env.LITE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: 'API key is not configured' }, { status: 500 });
  }

  const apiUrl = new URL('https://api.liteapi.travel/v3.0/data/hotels');
  apiUrl.searchParams.set('cityName', cityName);
  apiUrl.searchParams.set('timeout', '4');

  try {
    const response = await fetch(apiUrl.toString(), {
      headers: { 'X-API-Key': apiKey },
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
