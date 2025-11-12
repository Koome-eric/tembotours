import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const countryCode = searchParams.get('countryCode');
  const cityName = searchParams.get('cityName');

  if (!countryCode && !cityName) {
    return NextResponse.json({ message: 'Country code or city name is required' }, { status: 400 });
  }

  const apiKey = process.env.LITE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: 'API key is not configured' }, { status: 500 });
  }

  const apiUrl = new URL('https://api.liteapi.travel/v3.0/data/cities');
  if (countryCode) {
    apiUrl.searchParams.set('countryCode', countryCode);
  }
  if (cityName) {
    // The API doesn't support direct city search, so we use aiSearch
    // which seems to be the intended way to search for locations by name.
    apiUrl.searchParams.set('name', cityName);
  }

  try {
    const response = await fetch(apiUrl.toString(), {
      headers: {
        'X-API-Key': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ message: 'Failed to fetch cities from Lite API', details: errorData }, { status: response.status });
    }

    const data = await response.json();
    // The data might be in data.data or directly in data
    const cities = data.data || data;
    // The /data/cities endpoint with 'name' query returns a different shape
    // It's an array of {name, country, country_code, iata_code}
    // We will standardize it to our City type
    const formattedCities = cities.map((c: any) => ({
      name: c.name,
      country: c.country
    }));
    
    return NextResponse.json({ data: formattedCities });

  } catch (error) {
    console.error('Error fetching from Lite API:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}
