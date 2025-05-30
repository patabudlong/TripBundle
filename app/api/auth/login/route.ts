import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, rememberMe } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TODO: Replace with your actual authentication logic
    // For now, we'll simulate authentication
    const isValidUser = await authenticateUser(email, password);

    if (!isValidUser) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate session token (replace with your JWT logic)
    const sessionToken = generateSessionToken(email);

    // Set session cookie
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Login successful',
        user: {
          email,
          // Add other user data as needed
        }
      },
      { status: 200 }
    );

    // Set HTTP-only cookie for session
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days or 1 day
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Simulate user authentication - replace with your actual logic
async function authenticateUser(email: string, password: string): Promise<boolean> {
  // TODO: Replace with actual database/API call
  // For demo purposes, accept any email with password "password123"
  return password === 'password123';
}

// Generate session token - replace with your JWT logic
function generateSessionToken(email: string): string {
  // TODO: Replace with actual JWT generation
  // For demo purposes, create a simple token
  const payload = {
    email,
    timestamp: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
} 