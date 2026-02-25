/**
 * config/logger.js — 구조화 로그 설정 (winston)
 *
 * - JSON 포맷으로 출력해 CloudWatch Logs에서 필드 기반 쿼리 가능
 * - 로그 레벨: error > warn > info > debug
 *   - error : 예외, 장애
 *   - warn  : 비정상적이지만 서비스 지속 가능한 상황
 *   - info  : 주요 비즈니스 이벤트 (업로드 완료, 스캔 결과 등)
 *   - debug : 개발/디버깅용 상세 정보 (운영 환경에서는 비활성화)
 * - NODE_ENV=production 에서는 debug 레벨 비활성화
 * - 타임스탬프는 ISO 8601 포맷으로 포함
 *
 * 출력 예시:
 *   { "level":"info", "message":"파일 업로드 완료", "fileId":"...", "timestamp":"..." }
 *
 * 담당: 공통
 */
