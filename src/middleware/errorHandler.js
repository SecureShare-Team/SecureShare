/**
 * middleware/errorHandler.js — 중앙화된 에러 핸들러
 *
 * - app.js에서 모든 라우터 등록 이후 마지막에 등록 (4개 매개변수 미들웨어)
 * - 모든 next(err) 호출과 throw된 에러가 이 핸들러에서 처리됨
 *
 * 처리 흐름:
 *   1. AppError 인스턴스 (isOperational === true)
 *      → err.statusCode로 응답 (400 / 401 / 403 / 404 등)
 *      → { success: false, message: err.message } JSON 반환
 *
 *   2. 예상치 못한 에러 (isOperational !== true)
 *      → 500 Internal Server Error 반환
 *      → 운영 환경: 에러 세부 정보 노출 금지
 *      → 개발 환경: err.stack 포함 반환 (디버깅 편의)
 *
 *   3. 모든 에러를 logger.error로 기록 (CloudWatch 수집 대상)
 *
 * 담당: B
 */
