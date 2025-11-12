import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hotelId = searchParams.get('hotelId');
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const guests = searchParams.get('guests');
  const currency = searchParams.get('currency') || 'USD';

  if (!hotelId || !checkin || !checkout || !guests) {
    return NextResponse.json({ message: 'Missing required query parameters: hotelId, checkin, checkout, guests' }, { status: 400 });
  }

  const apiKey = process.env.LITE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: 'API key is not configured' }, { status: 500 });
  }

  const apiUrl = new URL('https://api.liteapi.travel/v3.0/hotels/rates');
  apiUrl.searchParams.set('hotelIds', hotelId);
  apiUrl.searchParams.set('checkin', checkin);
  apiUrl.searchParams.set('checkout', checkout);
  apiUrl.searchParams.set('adults', guests);
  apiUrl.searchParams.set('currency', currency);

  try {
    const response = await fetch(apiUrl.toString(), {
      headers: {
        'X-API-Key': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: 'Failed to fetch rates from Lite API', details: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from Lite API:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}
