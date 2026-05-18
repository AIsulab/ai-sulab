verified_programs.json은 검토 완료됐어. 이제 auto_post.js를 다음
방향으로 수정해줘. scratch_json_test.js는 건드리지 마.

[수정 1: 핫이슈 모드 완전 제거]
- getTrendingKeyword 함수 삭제
- rss-parser 관련 import 및 코드 모두 삭제
- main 함수의 isMorning 분기 제거
- isInfoMode 변수 제거 (항상 정보성 모드)
- package.json에서 rss-parser 의존성 제거

[수정 2: cheerio 패키지 설치]
HTML 파싱용으로 cheerio를 dependencies에 추가하고 설치해줘.

[수정 3: getInformationKeyword 함수 재작성]
- verified_programs.json 파일을 읽어옴
- 하루에 2개씩 발행되므로 (오전/오후), 슬롯별로 다른 프로그램 선택
- 현재 시각이 KST 기준 오전(5-14시)인지 오후인지 판단
- 슬롯 인덱스: 오전=0, 오후=1
- 선택 공식: (dayOfYear * 2 + slotIndex) % programs.length
- 반환값: 선택된 프로그램 객체 전체 (title, sourceUrl, category 등 포함)

[수정 4: 새 함수 fetchSourceContent(url) 추가]
- native fetch 사용 (Node 18+)
- User-Agent 헤더 추가 (Mozilla/5.0 형태)
- 타임아웃 10초
- cheerio로 HTML 파싱 후 <script>, <style>, <nav>, <footer>, <header> 제거
- 본문 텍스트만 추출, 연속된 공백 정리
- 최대 6000자로 자르기
- 실패 시 null 반환 (에러 throw하지 말고 로그만)

[수정 5: generateContent 함수 전면 재작성]

함수 시그니처 변경:
async function generateContent(program, sourceContent)

새 Gemini 프롬프트는 다음 원칙을 따라야 함:

핵심 지시:
"당신은 정부 정책과 복지 혜택을 전문적으로 정리하는 콘텐츠 에디터입니다.
독자에게 실질적으로 도움이 되는 깊이 있는 글을 작성합니다."

엄격한 사실 기반 작성 규칙:
- 아래 제공되는 '참고 자료'에 명시된 내용만을 근거로 작성할 것
- 참고 자료에 없는 구체적 숫자, 금액, 기한, 자격 조건은 절대 추측하거나
  지어내지 말 것
- 참고 자료가 불충분한 부분은 "공식 사이트에서 최신 정보 확인 필요"로
  안내할 것
- 부정확한 정보를 쓰느니 일반적 설명만 하는 것이 낫다

프로그램 정보:
- 제목: ${program.title}
- 카테고리: ${program.category}
- 대상: ${program.targetAudience}
- 공식 출처: ${program.sourceUrl}

참고 자료 (공식 사이트에서 가져온 실제 내용):
${sourceContent || "참고 자료를 가져오지 못함 - 일반적인 안내만 작성할 것"}

작성 요구사항:
1. 제목: <h1>로 SEO 최적화된 매력적 제목 (40-60자, 연도/숫자 포함 권장)
2. 도입부: <p>로 2-3문장. 독자가 어떤 정보를 얻을 수 있는지 명확히 제시
3. 목차: <h2>목차</h2> 다음에 <ul>로 본문 섹션 링크
4. 본문 구조:
   - <h2>지원 대상</h2> - 자격 요건을 <ul>로 명확히
   - <h2>지원 내용 및 혜택</h2> - 구체적 금액/혜택을 <ul> 또는 <table>로
   - <h2>신청 방법</h2> - 단계별 절차를 <ol>로
   - <h2>준비 서류</h2> - <ul>로
   - <h2>주의사항 및 자주 묻는 질문</h2> - Q&A 형식
   - <h2>마무리</h2> - 핵심 요약과 행동 유도
5. 분량: 본문 텍스트 기준 2500자 이상 (한글)
6. 강조: 중요 수치, 기한, 조건은 <strong> 또는 <mark>로
7. 출처 표시: 본문 마지막에 <p>📌 자세한 내용 및 최신 정보:
   <a href="${program.sourceUrl}" target="_blank">${program.title} 공식 페이지</a></p>
8. 금지: <html>, <head>, <body> 태그 / 추측성 정보 / 부정확한 숫자

이미지 프롬프트 (imagePrompt) 규칙:
- 본문 주제를 시각적으로 직접 표현하는 구체적이고 실사적인 영문 프롬프트
- 실존 인물 묘사 금지, 브랜드 로고 묻지 금지
- "abstract", "metaphorical", "symbolic", "generic" 같은 표현 절대 사용
  하지 말 것
- 한국적 맥락이 자연스러울 때는 "Korean" 키워드 포함
- 반드시 마지막에 스타일 키워드 포함:
  "photorealistic, editorial photography, professional composition,
   cinematic lighting, high detail, 8k"
- 좋은 예: "A neat Korean home office with tax documents, calculator,
  warm coffee mug on wooden desk, soft morning light through window,
  photorealistic, editorial photography, professional composition,
  cinematic lighting, high detail, 8k"

출력 형식 (반드시 JSON):
{
  "title": "h1 안에 들어갈 텍스트만 추출한 제목",
  "imagePrompt": "영문 이미지 프롬프트",
  "htmlContent": "<h1>...</h1>...전체 HTML 본문..."
}

[수정 6: Pollinations.ai URL 업그레이드]
기존: https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=400&nologo=true
변경: https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=630&model=flux&nologo=true&enhance=true

[수정 7: publishToBlogger 함수 수정]
- newContent.title 사용 (Gemini가 생성한 실제 제목)
- 기존의 `${keyword} 완벽 정리` 같은 임시 제목 사용 부분 제거
- labels는 [program.title, program.category, "정부지원금", "정책정보", "혜택안내"]

[수정 8: main 함수 정리]
실행 흐름:
1. 환경변수 검증
2. Blogger 초기화
3. 현재 슬롯(오전/오후) 판단 후 program 선택
4. 중복 체크 (제목 기반)
5. fetchSourceContent로 출처 페이지 가져오기
6. generateContent(program, sourceContent) 호출
7. publishToBlogger 호출
8. 로그에 슬롯 정보, 선택된 프로그램명, 출처 fetch 성공 여부 출력

[검증]
모두 수정한 뒤:
- 변경된 파일과 패키지를 정리
- package.json의 dependencies 확인 (cheerio 추가, rss-parser 제거)
- commit 메시지: "feat(phase1): single-niche mode with source-verified content"
- main에 push

작업 끝나면 변경 요약 (어떤 함수가 어떻게 바뀌었는지) 알려줘.