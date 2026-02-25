/**
 * middleware/rateLimiter.js — 요청 빈도 제한 (Rate Limiting)
 *
 * - express-rate-limit 기반으로 IP별 요청 횟수를 제한
 * - 제한 초과 시 429 Too Many Requests 반환
 * - 제한값은 추후 운영 환경에 맞춰 조정 가능
 *
 * 제한 설정:
 *   uploadLimiter   — 업로드 경로 (/files POST)
 *     · windowMs : 60_000 (1분)
 *     · max      : 10회
 *
 *   downloadLimiter — 다운로드 URL 발급 경로
 *     · windowMs : 60_000 (1분)
 *     · max      : 30회
 *
 * export:
 *   - uploadLimiter   : 업로드 경로에 적용
 *   - downloadLimiter : 다운로드 URL 발급 경로에 적용
 *
 * 담당: B
 */
