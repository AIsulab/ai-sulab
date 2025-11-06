# design-tokens

이 디렉터리는 Figma로부터 동기화된 원시 토큰(`raw/`)과 변환된 결과물을 포함합니다.

- `raw/`: GitHub Actions (`figma-sync.yml`)가 Figma API를 통해 가져온 원본
- `build/`: Style Dictionary 등으로 플랫폼별 변환 결과물 (선택)

로컬 개발:
- 토큰을 사용하는 앱이 있다면, 빌드 전에 변환 스텝을 추가하세요.
