/**
 * tests/unit/middleware/auth.test.js — JWT 인증 미들웨어 단위 테스트
 *
 * mock 대상:
 *   - jwks-rsa (JwksClient) — 실제 Cognito 공개키 조회 대신 고정 키 반환
 *   - jsonwebtoken (verify)  — 실제 서명 검증 대신 mock 제어
 *
 * 테스트 케이스:
 *
 *   정상 인증
 *     ✓ 유효한 Bearer 토큰 → req.user = { sub, email } 세팅 확인
 *     ✓ next() 호출 확인 (미들웨어 체인 계속 진행)
 *
 *   인증 실패
 *     ✓ Authorization 헤더 없음 → UnauthorizedError(401) 확인
 *     ✓ Bearer 형식 아님 → UnauthorizedError(401) 확인
 *     ✓ 만료된 토큰(exp 초과) → UnauthorizedError(401) 확인
 *     ✓ 서명 변조 토큰 → UnauthorizedError(401) 확인
 *     ✓ 잘못된 iss(다른 User Pool) → UnauthorizedError(401) 확인
 *
 * 담당: A
 */
