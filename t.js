warning: in the working copy of '.claude/settings.local.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of '.github/workflows/auto_post.yml', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'auto_post.js', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/.claude/settings.local.json b/.claude/settings.local.json[m
[1mindex 2cfcf1a..8b14644 100644[m
[1m--- a/.claude/settings.local.json[m
[1m+++ b/.claude/settings.local.json[m
[36m@@ -30,7 +30,27 @@[m
       "WebFetch(domain:mcp.sixshop.io)",[m
       "PowerShell(claude mcp *)",[m
       "WebFetch(domain:sulab.store)",[m
[31m-      "mcp__claude_ai_MCP__common_get_store"[m
[32m+[m[32m      "mcp__claude_ai_MCP__common_get_store",[m
[32m+[m[32m      "Bash(gh run *)",[m
[32m+[m[32m      "Bash(gh api *)",[m
[32m+[m[32m      "Bash(gh workflow *)",[m
[32m+[m[32m      "WebFetch(domain:www.gov.kr)",[m
[32m+[m[32m      "WebFetch(domain:www.work24.go.kr)",[m
[32m+[m[32m      "WebFetch(domain:www.bokjiro.go.kr)",[m
[32m+[m[32m      "WebFetch(domain:www.myhome.go.kr)",[m
[32m+[m[32m      "WebFetch(domain:www.energyv.or.kr)",[m
[32m+[m[32m      "WebFetch(domain:www.nhis.or.kr)",[m
[32m+[m[32m      "WebFetch(domain:www.sbiz.or.kr)",[m
[32m+[m[32m      "WebFetch(domain:idolbom.go.kr)",[m
[32m+[m[32m      "WebFetch(domain:www.nps.or.kr)",[m
[32m+[m[32m      "WebFetch(domain:m.myhome.go.kr)",[m
[32m+[m[32m      "WebFetch(domain:www.nts.go.kr)",[m
[32m+[m[32m      "WebFetch(domain:www.hometax.go.kr)",[m
[32m+[m[32m      "WebFetch(domain:www.sbiz24.kr)",[m
[32m+[m[32m      "WebFetch(domain:www.work.go.kr)",[m
[32m+[m[32m      "WebFetch(domain:www.socialservice.or.kr)",[m
[32m+[m[32m      "WebFetch(domain:www.mss.go.kr)",[m
[32m+[m[32m      "WebFetch(domain:ai.google.dev)"[m
     ][m
   }[m
 }[m
[1mdiff --git a/.github/workflows/auto_post.yml b/.github/workflows/auto_post.yml[m
[1mindex 057d13f..b43aa5d 100644[m
[1m--- a/.github/workflows/auto_post.yml[m
[1m+++ b/.github/workflows/auto_post.yml[m
[36m@@ -4,7 +4,29 @@[m [mon:[m
   schedule:[m
     # 매일 한국 시간 기준 아침 8시(UTC 23:00)와 오후 6시(UTC 09:00)에 실행[m
     - cron: '0 23,9 * * *'[m
[31m-  workflow_dispatch: # 수동으로도 실행할 수 있도록 버튼 생성[m
[32m+[m[32m  workflow_dispatch:[m
[32m+[m[32m    inputs:[m
[32m+[m[32m      mode:[m
[32m+[m[32m        description: 'Post mode (auto or custom)'[m
[32m+[m[32m        required: true[m
[32m+[m[32m        default: 'auto'[m
[32m+[m[32m        type: choice[m
[32m+[m[32m        options:[m
[32m+[m[32m          - auto[m
[32m+[m[32m          - custom[m
[32m+[m[32m      keyword:[m
[32m+[m[32m        description: 'Custom Keyword (used if mode is custom)'[m
[32m+[m[32m        required: false[m
[32m+[m[32m        type: string[m
[32m+[m[32m      topic:[m
[32m+[m[32m        description: 'Custom Topic (used if mode is custom)'[m
[32m+[m[32m        required: false[m
[32m+[m[32m        type: string[m
[32m+[m[32m      publish_now:[m
[32m+[m[32m        description: 'Publish immediately (true/false)'[m
[32m+[m[32m        required: false[m
[32m+[m[32m        default: true[m
[32m+[m[32m        type: boolean[m
 [m
 jobs:[m
   post:[m
[36m@@ -29,4 +51,8 @@[m [mjobs:[m
         GOOGLE_CLIENT_SECRET: ${{ secrets.GOOGLE_CLIENT_SECRET }}[m
         GOOGLE_REFRESH_TOKEN: ${{ secrets.GOOGLE_REFRESH_TOKEN }}[m
         BLOGGER_BLOG_ID: ${{ secrets.BLOGGER_BLOG_ID }}[m
[32m+[m[32m        POST_MODE: ${{ inputs.mode || 'auto' }}[m
[32m+[m[32m        CUSTOM_KEYWORD: ${{ inputs.keyword || '' }}[m
[32m+[m[32m        CUSTOM_TOPIC: ${{ inputs.topic || '' }}[m
[32m+[m[32m        PUBLISH_NOW: ${{ inputs.publish_now }}[m
       run: node auto_post.js[m
[1mdiff --git a/auto_post.js b/auto_post.js[m
[1mindex f0945fa..7f1b0fd 100644[m
[1m--- a/auto_post.js[m
[1m+++ b/auto_post.js[m
[36m@@ -424,7 +424,7 @@[m [mGoogle 검색 도구를 활용하여 위 프로그램의 2026년 현재 시점 [m
 [m
 [m
 // Blogger에 포스트 발행[m
[31m-async function publishToBlogger(newContent, program, blogger, blogId) {[m
[32m+[m[32masync function publishToBlogger(newContent, program, blogger, blogId, publishNow) {[m
   console.log(`💾 Blogger(블로그 ID: ${blogId})에 포스팅 중...`);[m
 [m
   // 콘텐츠 품질 종합 검증 (강화된 로직)[m
[36m@@ -443,7 +443,7 @@[m [masync function publishToBlogger(newContent, program, blogger, blogId) {[m
   try {[m
     const res = await blogger.posts.insert({[m
       blogId: blogId,[m
[31m-      isDraft: false,[m
[32m+[m[32m      isDraft: publishNow === 'false' ? true : false,[m
       requestBody: {[m
         title: newContent.title,[m
         content: newContent.htmlBody,[m
[36m@@ -460,7 +460,7 @@[m [masync function publishToBlogger(newContent, program, blogger, blogId) {[m
 [m
 // 메인 실행 함수[m
 async function main() {[m
[31m-  const { GEMINI_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, BLOGGER_BLOG_ID } = process.env;[m
[32m+[m[32m  const { GEMINI_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, BLOGGER_BLOG_ID, POST_MODE, CUSTOM_KEYWORD, CUSTOM_TOPIC, PUBLISH_NOW } = process.env;[m
 [m
   if (!GEMINI_API_KEY || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN || !BLOGGER_BLOG_ID) {[m
     console.error('❌ API 키 또는 Blogger 인증 정보(.env)가 누락되었습니다. 실행을 중단합니다.');[m
[36m@@ -473,7 +473,27 @@[m [masync function main() {[m
   const blogger = google.blogger({ version: 'v3', auth: oauth2Client });[m
 [m
   // 오늘의 프로그램 선택[m
[31m-  const program = await getInformationKeyword();[m
[32m+[m[32m  let program;[m
[32m+[m[32m  const isCustomMode = POST_MODE === 'custom';[m
[32m+[m
[32m+[m[32m  if (isCustomMode) {[m
[32m+[m[32m    console.log(`🛠️ 수동 커스텀 모드 실행: 키워드='${CUSTOM_KEYWORD}', 주제='${CUSTOM_TOPIC}'`);[m
[32m+[m[32m    if (!CUSTOM_TOPIC) {[m
[32m+[m[32m      console.error('❌ 커스텀 모드에서는 CUSTOM_TOPIC이 필수입니다.');[m
[32m+[m[32m      process.exit(1);[m
[32m+[m[32m    }[m
[32m+[m[32m    program = {[m
[32m+[m[32m      title: CUSTOM_TOPIC,[m
[32m+[m[32m      category: CUSTOM_KEYWORD || '기타',[m
[32m+[m[32m      targetAudience: '일반 대상',[m
[32m+[m[32m      coreSummary: `${CUSTOM_KEYWORD ? CUSTOM_KEYWORD + ' 관련 ' : ''}${CUSTOM_TOPIC}`,[m
[32m+[m[32m      sourceUrl: '', // 커스텀 모드이므로 URL 없음[m
[32m+[m[32m      officialSiteName: '검색 기반 정보'[m
[32m+[m[32m    };[m
[32m+[m[32m  } else {[m
[32m+[m[32m    console.log('🤖 자동 스케줄 모드 실행');[m
[32m+[m[32m    program = await getInformationKeyword();[m
[32m+[m[32m  }[m
 [m
   // 중복 체크 (최근 게시물 제목 기반)[m
   console.log('🔍 중복 게시물 여부 확인 중...');[m
[36m@@ -506,7 +526,7 @@[m [masync function main() {[m
     }[m
 [m
     // 블로그 발행 (품질 검증 포함)[m
[31m-    await publishToBlogger(newContent, program, blogger, BLOGGER_BLOG_ID);[m
[32m+[m[32m    await publishToBlogger(newContent, program, blogger, BLOGGER_BLOG_ID, PUBLISH_NOW);[m
 [m
     console.log('🚀 파이프라인 실행 완료!');[m
   } catch (err) {[m
