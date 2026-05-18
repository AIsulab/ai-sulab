import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const envUser = process.env.ADMIN_USERNAME;
    const envPass = process.env.ADMIN_PASSWORD;

    if (!envUser || !envPass) {
      console.error("Server missing ADMIN_USERNAME or ADMIN_PASSWORD");
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (username === envUser && password === envPass) {
      cookies().set({
        name: 'admin_token',
        value: 'authenticated', 
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: 'lax',
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
