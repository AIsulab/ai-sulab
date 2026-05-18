import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow-sm border-b sticky top-0 z-50">
            {/* 로고 영역 */}
            <Link href="/" className="flex items-center gap-2">
                {/* TODO: uploads/assets 폴더의 실제 로고 이미지를 public 폴더로 이동 후 아래 주석 해제하여 사용 */}
                {/* <img src="/logo.png" alt="Sulab Logo" className="h-8 w-auto" /> */}
                <span className="font-extrabold text-2xl tracking-tight text-purple-600">Sulab</span>
            </Link>

            {/* 네비게이션 링크 */}
            <div className="space-x-4 flex items-center">
                <Link href="/admin" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">관리자</Link>
                <Link href="/login" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">로그인</Link>
                <Link href="/signup" className="px-5 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors shadow-md">
                    무료로 시작하기
                </Link>
            </div>
        </nav>
    );
}