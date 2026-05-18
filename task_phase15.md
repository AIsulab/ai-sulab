[Phase 1.5 통합 수정 작업]

[배경]
Phase 1-B는 발행에 성공했으나 두 가지 큰 문제 발견:
1. fetchSourceContent가 한국 정부 사이트(JS 렌더링)에서 유의미한
   콘텐츠를 가져오지 못해 본문이 "확인 필요" 문장만 11번 반복되는
   빈 액자 상태
2. 시각적 디자인이 전 연령대 가독성에 미흡, 이미지 크기 과대

[목표]
- 콘텐츠: Gemini의 Google Search Grounding을 활용해 실시간 검색 정보 기반
  작성으로 전환. fetchSourceContent는 보조 수단으로 유지.
- 가독성: 전 연령대(부모님 포함)가 편안하게 읽을 수 있는 디자인.
- 반응형: 모바일/데스크탑 모두 균형있게.
- 이미지: 생성은 고품질 1200x630 유지, 본문 표시는 작게.

================================================
[작업 1] verified_programs.json 보강
================================================

기존 24개 프로그램에 다음 필드를 추가해줘:

- "coreSummary": 2-3문장 한국어 요약. 해당 프로그램의 정확한 정보
  (지원 대상, 핵심 혜택, 일반적 신청 방법)를 2026년 기준으로 정리.
  Google 검색이나 정부 사이트 fetch를 통해 검증된 실제 정보로만 작성.
  추측 금지.

- "officialSiteName": 공식 사이트 이름 (예: "정부24", "복지로", "청년정책")

- "lastVerified": "2026-05" (검증 시점)

수정 후 JSON 유효성 검사하고 결과 알려줘.

================================================
[작업 2] auto_post.js - Google Search Grounding 도입
================================================

[2-1] Gemini API 호출에 Google Search 도구 추가

@google/genai SDK 최신 버전 문서를 WebFetch로 확인:
https://ai.google.dev/gemini-api/docs/google-search

generateContent 호출 시 tools 파라미터로 Google Search를
활성화하는 방법 확인 후 적용. 가능하면 이런 형태:

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: prompt,
  config: {
    responseMimeType: "application/json",
    tools: [{ googleSearch: {} }]
  }
});

만약 responseMimeType과 tools가 동시 사용 불가하면, JSON 응답을
수동 파싱하는 방식으로 폴백 (응답 텍스트에서 JSON 부분만 추출).

[2-2] generateContent 함수 시그니처 및 프롬프트 재작성

함수: generateContent(program, sourceContent)
- program: verified_programs.json의 객체 전체 (coreSummary 포함)
- sourceContent: fetchSourceContent 결과 (실패 시 null)

새 Gemini 프롬프트:
"""
당신은 한국 정부 정책과 복지 혜택을 전문적으로 정리하는 시니어
에디터입니다. 독자 연령대는 20대부터 60대까지 폭넓으며, 부모님
세대도 편하게 읽을 수 있도록 친절하고 명확한 문장을 사용합니다.

[현재 정보]
- 현재 연도: 2026년
- 작성 일자: ${new Date().toISOString().slice(0,10)}

[작성 대상 프로그램]
- 제목: ${program.title}
- 카테고리: ${program.category}
- 대상: ${program.targetAudience}
- 핵심 요약 (검증된 정보): ${program.coreSummary}
- 공식 출처: ${program.sourceUrl} (${program.officialSiteName})

[참고 자료]
${sourceContent ? `공식 사이트에서 가져온 내용:\n${sourceContent}`
                : "공식 사이트 자동 fetch는 실패. Google 검색으로
                   최신 정보 확인 후 작성하세요."}

[필수 작업]
Google 검색 도구를 활용하여 위 프로그램의 2026년 현재 시점 정보를
검색하고, 다음 항목들에 대한 구체적이고 정확한 정보를 확보한 뒤
작성하세요:
- 정확한 지원 금액 (한도, 이자율 등)
- 자격 요건 (소득, 연령, 거주지 등)
- 신청 기간 (2026년 기준)
- 신청 방법 및 필요 서류
- 자주 묻는 질문 (FAQ)

[작성 규칙]
1. 추측 금지: Google 검색으로 확인한 정보만 사용. 확인 불가한 부분은
   "공식 사이트에서 최신 정보 확인 권장"으로 짧게 표기.
2. 분량: 본문 2500자 이상 (한글 기준)
3. 문체: 친절하고 명확. 어려운 행정 용어는 풀어서 설명.
4. 신뢰성: 검색에서 발견한 출처를 본문에 자연스럽게 인용

[필수 HTML 구조]

<h1>[연도 없거나 2026년 명시한 매력적 제목 40-60자]</h1>

<div class="summary-box">
  <h3>📌 한눈에 보는 핵심 요약</h3>
  <ul>
    <li><strong>지원 대상:</strong> [2-3개 키워드]</li>
    <li><strong>지원 금액/혜택:</strong> [핵심 숫자]</li>
    <li><strong>신청 기간:</strong> [기간 또는 상시]</li>
    <li><strong>신청 방법:</strong> [경로 한 줄]</li>
  </ul>
</div>

<p>[도입부 2-3문장 - 누가 왜 이 정보를 알아야 하는지]</p>

<h2>목차</h2>
<ul class="toc">[목차]</ul>

<h2>지원 대상 자세히 보기</h2>
<p>[자격 요건 설명, 예시 포함]</p>
<ul>[자격 요건 항목들]</ul>

<h2>지원 내용 및 혜택</h2>
<p>[혜택 설명]</p>
<table>[혜택 비교/정리 표 - 가능한 경우]</table>

<h2>신청 방법 단계별 안내</h2>
<ol>[단계별 신청 방법]</ol>

<h2>준비 서류</h2>
<ul>[필요 서류]</ul>

<h2>자주 묻는 질문 (FAQ)</h2>
[Q&A 3-5개]

<h2>꿀팁과 주의사항</h2>
[놓치기 쉬운 포인트]

<h2>마무리</h2>
<p>[행동 유도 마무리]</p>

<p class="source-link">
  📌 자세한 내용 및 최신 정보:
  <a href="${program.sourceUrl}" target="_blank" rel="noopener">
    ${program.title} 공식 페이지 (${program.officialSiteName})
  </a>
</p>

[이미지 프롬프트 규칙] (이전과 동일)
구체적·실사적·한국적 맥락, 마지막에 스타일 키워드 포함.

[출력 형식 - 반드시 JSON]
{
  "title": "h1 텍스트만 추출",
  "imagePrompt": "영문 이미지 프롬프트",
  "htmlContent": "전체 HTML 본문"
}
"""

================================================
[작업 3] HTML 출력 스타일 전면 개선
================================================

generateContent 함수 끝부분의 styledHtml 래퍼를 다음 디자인으로
전면 재작성:

- 본문 폭: 최대 720px, 가운데 정렬
- 폰트: 'Noto Sans KR', 시스템 한글 폰트 폴백
- 폰트 크기: 18px (모바일 17px)
- 행간: 1.85
- 글자색: #2c2c2c (순검정 대신 부드러운 검정)
- 배경: 흰색
- 단락 간격: 1.5em

[이미지 처리]
- 메인 썸네일 이미지: max-width 480px (모바일에서는 max-width 100%)
- 가운데 정렬, 모서리 둥글게 8px
- 약한 그림자

[핵심 요약 박스 (.summary-box)]
- 배경색: #fff8e7 (부드러운 노란빛)
- 좌측 컬러 바: 4px solid #f5a623
- 패딩: 20px 24px
- 둥근 모서리: 8px
- 여백: 위아래 24px
- h3 폰트 17px 굵게
- ul: 들여쓰기 제거, 항목 줄간격 0.5em

[h2 소제목]
- 폰트 크기: 22px (모바일 20px)
- 굵게
- 좌측에 4px 컬러 바 (#1976d2)
- 좌측 패딩: 12px
- 위 여백 2em, 아래 0.8em

[h3]
- 폰트 크기: 19px
- 굵게, 색 #1976d2

[ul/ol 리스트]
- 항목 간격 0.6em
- 들여쓰기 적절히

[표 (table)]
- 100% 폭
- 테두리 단순화
- 헤더 배경 #f5f5f5
- 짝수 행 배경 #fafafa
- 셀 패딩 12px

[strong, mark]
- strong: 색 #d32f2f, 약간 굵게
- mark: 노란색 배경 #fff59d, 패딩 0 4px

[a 링크]
- 색 #1976d2
- 밑줄 hover 시 표시

[.source-link]
- 위 여백 32px
- 배경 #f5f5f5
- 패딩 16px
- 둥근 모서리

[반응형 - 모바일 768px 이하]
- 본문 좌우 패딩 16px
- 폰트 17px
- h1 24px
- h2 20px
- 이미지 max-width 100%
- 표는 가로 스크롤 가능하도록 wrap

스타일은 <style> 태그로 본문 시작 부분에 인라인 삽입.
(Blogger는 <style> 태그 내부 CSS를 허용함)

================================================
[작업 4] 잘못된 글 자동 삭제 방어 로직
================================================

publishToBlogger 함수에 다음 검증 추가:

- newContent.htmlContent에 "확인할 수 없습니다", "명시되어 있지 않습니다",
  "참고 자료에" 같은 표현이 3회 이상 등장하면 콘텐츠 품질 미달로 간주.
- 이런 경우 발행하지 말고 콘솔에 경고 출력 후 종료:
  "⚠️ 콘텐츠 품질 미달 (검증 부족 표현 다수). 발행 스킵."

이는 안전장치로, 검색 grounding이 실패한 경우 또 빈 글이 올라가는
사고를 방지함.

================================================
[작업 5] 패키지 확인 및 commit/push
================================================

- @google/genai 패키지 버전 확인. Google Search Grounding 지원
  최신 버전으로 업데이트 필요한지 확인 후 필요하면 업데이트.
- 변경된 파일: auto_post.js, verified_programs.json, package.json (필요시)
- commit 메시지:
  "feat(phase1.5): google search grounding + readable styling for all ages"
- push origin main

================================================
[검증]
================================================

작업 완료 후 다음을 보고해줘:
1. 작업별 주요 변경 사항 요약
2. @google/genai의 Google Search tool 활용 방식 (어떤 API/파라미터로)
3. verified_programs.json의 coreSummary 추가 결과 (몇 개 완료, 누락 있나)
4. 가독성 스타일 적용 위치와 주요 CSS 클래스 정리
5. push 결과

push 완료되면 GitHub Actions 수동 실행해서 결과 확인하고 발행된 글
URL 알려줘.