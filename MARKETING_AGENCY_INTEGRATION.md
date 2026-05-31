# SULAB 마케팅 대행사 통합 가이드

## 개요

이 문서는 ai-sulab 프로젝트에 마케팅 대행사 포털 기능을 통합하는 방법을 설명합니다.

## 디렉토리 구조

```
app/
├── marketing-agency/          # 마케팅 대행사 포털
│   ├── layout.tsx            # 포털 레이아웃
│   ├── page.tsx              # 포털 홈페이지 (대시보드)
│   ├── inquiries/            # 고객 문의 관리
│   ├── advertiser/           # 광고주 대시보드
│   ├── orders/               # 광고 주문 관리
│   └── reports/              # 월간 성과 리포트
├── api/
│   └── marketing-agency/     # 마케팅 대행사 API
│       ├── inquiries/        # 문의 API
│       ├── orders/           # 주문 API
│       ├── payments/         # 결제 API
│       └── reports/          # 리포트 API
└── ...

lib/
├── supabase.ts               # Supabase 클라이언트 설정
└── ...
```

## 환경 변수 설정

1. `.env.local` 파일을 생성하고 다음 변수들을 설정합니다:

```bash
# Firebase (기존)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
...

# Supabase (신규)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

2. Vercel 배포 시 동일한 환경 변수를 설정합니다.

## Supabase 테이블 구조

마케팅 대행사 기능을 위해 다음 테이블들이 필요합니다:

### inquiries (고객 문의)
```sql
CREATE TABLE inquiries (
  id BIGSERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  contact VARCHAR(255) NOT NULL,
  concern TEXT NOT NULL,
  chat_history JSONB,
  estimated_total DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### ad_orders (광고 주문)
```sql
CREATE TABLE ad_orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  estimated_cost DECIMAL(10, 2),
  start_date DATE,
  end_date DATE,
  result_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### payments (결제)
```sql
CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  ad_order_id BIGINT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  depositor_name VARCHAR(255),
  bank_name VARCHAR(100),
  status VARCHAR(50) DEFAULT 'awaiting_payment',
  confirmed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### monthly_reports (월간 성과 리포트)
```sql
CREATE TABLE monthly_reports (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  year_month VARCHAR(7) NOT NULL,
  summary TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 사용 방법

### 1. 마케팅 대행사 포털 접근

사용자가 로그인 후 `/marketing-agency` 경로로 이동하면 마케팅 대행사 포털에 접근할 수 있습니다.

### 2. API 엔드포인트

#### 문의 관리
- `GET /api/marketing-agency/inquiries` - 모든 문의 조회
- `POST /api/marketing-agency/inquiries` - 새 문의 생성

#### 광고 주문
- `GET /api/marketing-agency/orders` - 모든 주문 조회
- `POST /api/marketing-agency/orders` - 새 주문 생성

#### 결제 관리
- `GET /api/marketing-agency/payments` - 모든 결제 조회
- `POST /api/marketing-agency/payments` - 새 결제 생성

#### 월간 리포트
- `GET /api/marketing-agency/reports` - 모든 리포트 조회
- `POST /api/marketing-agency/reports` - 새 리포트 생성

## 배포 가이드

### Vercel 배포

1. GitHub에 코드를 푸시합니다:
```bash
git add .
git commit -m "feat: add marketing agency integration"
git push origin feature/marketing-agency-integration
```

2. GitHub에서 Pull Request를 생성합니다.

3. Vercel에서 Preview Deployment를 확인합니다.

4. 테스트 후 main 브랜치로 merge합니다.

5. Vercel이 자동으로 프로덕션 배포를 진행합니다.

## 다음 단계

- [ ] Supabase 테이블 생성 및 마이그레이션
- [ ] Firebase + Supabase 인증 통합
- [ ] 마케팅 대행사 UI 컴포넌트 구현
- [ ] API 엔드포인트 테스트
- [ ] 환경 변수 설정 및 배포
- [ ] 사용자 문서 작성
