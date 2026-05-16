"use client";

import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithCustomToken, signOut, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

declare global {
  interface Window {
    Kakao: {
      init(key: string): void;
      isInitialized(): boolean;
      Auth: {
        login(options: {
          success(authObj: { access_token: string }): void;
          fail?(err: unknown): void;
        }): void;
        logout(callback?: () => void): void;
      };
    };
  }
}

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [kakaoReady, setKakaoReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    if (document.querySelector('script[src*="kakao_js_sdk"]')) {
      initKakaoSdk();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
    script.onload = initKakaoSdk;
    document.head.appendChild(script);
  }, []);

  function initKakaoSdk() {
    const jsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (jsKey && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(jsKey);
    }
    setKakaoReady(true);
  }

  const loginWithKakao = useCallback(() => {
    if (!window.Kakao?.isInitialized()) return;
    setLoading(true);

    window.Kakao.Auth.login({
      success: async ({ access_token }) => {
        try {
          const res = await fetch("/api/auth/kakao", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accessToken: access_token }),
          });
          const data = (await res.json()) as { customToken?: string; error?: string };
          if (!res.ok || !data.customToken) throw new Error(data.error ?? "로그인 실패");

          const auth = getFirebaseAuth();
          if (!auth) throw new Error("Firebase Auth 미설정");
          await signInWithCustomToken(auth, data.customToken);
        } catch (err) {
          console.error("카카오 로그인 오류:", err);
        } finally {
          setLoading(false);
        }
      },
      fail: (err) => {
        console.error("카카오 인증 실패:", err);
        setLoading(false);
      },
    });
  }, []);

  const handleLogout = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (auth) await signOut(auth);
    if (window.Kakao?.isInitialized()) window.Kakao.Auth.logout();
  }, []);

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-zinc-300 sm:inline">
          {user.displayName ?? user.email ?? "사용자"}
        </span>
        <button
          onClick={handleLogout}
          className="focus-ring rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/14"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={loginWithKakao}
      disabled={loading || !kakaoReady}
      className="focus-ring flex items-center gap-2 rounded-full bg-[#FEE500] px-4 py-2 text-sm font-bold text-[#3C1E1E] transition hover:bg-[#f5dc00] disabled:opacity-60"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 3C6.477 3 2 6.72 2 11.3c0 2.84 1.87 5.35 4.67 6.78l-.94 3.5a.4.4 0 0 0 .6.44l4.27-2.84c.45.06.9.09 1.4.09 5.523 0 10-3.72 10-8.3C22 6.72 17.523 3 12 3z"
          fill="#3C1E1E"
        />
      </svg>
      {loading ? "로그인 중..." : "카카오 로그인"}
    </button>
  );
}
