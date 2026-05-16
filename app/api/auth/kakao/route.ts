import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";

type KakaoUser = {
  id: number;
  kakao_account?: {
    profile?: { nickname?: string; profile_image_url?: string };
    email?: string;
  };
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { accessToken?: string };
  const { accessToken } = body;

  if (!accessToken) {
    return NextResponse.json({ error: "accessToken이 필요합니다" }, { status: 400 });
  }

  const kakaoRes = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!kakaoRes.ok) {
    return NextResponse.json({ error: "카카오 토큰 검증 실패" }, { status: 401 });
  }

  const kakaoUser = (await kakaoRes.json()) as KakaoUser;
  const uid = `kakao:${kakaoUser.id}`;

  const auth = getAdminAuth();
  if (!auth) {
    return NextResponse.json(
      { error: "Firebase Admin 미설정 — FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY를 .env.local에 추가하세요" },
      { status: 500 },
    );
  }

  const customToken = await auth.createCustomToken(uid, { provider: "kakao" });
  return NextResponse.json({ customToken });
}
