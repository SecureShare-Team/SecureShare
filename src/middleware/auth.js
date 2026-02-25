/**
 * middleware/auth.js — Cognito JWT 검증 미들웨어
 *
 * - Authorization 헤더에서 "Bearer <token>" 형식으로 토큰 추출
 * - jwks-rsa 라이브러리로 Cognito 공개키를 자동 갱신하며 서명 검증
 *   → 공개키는 캐싱되어 매 요청마다 Cognito에 조회하지 않음
 * - 검증 성공 시 req.user = { sub, email } 세팅 후 next() 호출
 * - 검증 실패 시 UnauthorizedError(401) throw
 *
 * Cognito JWKS 엔드포인트:
 *   https://cognito-idp.{REGION}.amazonaws.com/{USER_POOL_ID}/.well-known/jwks.json
 *
 * 적용 대상:
 *   - POST /files (업로드)
 *   - POST /files/:id/download-url
 *   - GET  /files/:id
 *   - DELETE /files/:id
 *   - POST   /files/:id/acl
 *   - DELETE /files/:id/acl/:sub
 *
 * 담당: A
 */
