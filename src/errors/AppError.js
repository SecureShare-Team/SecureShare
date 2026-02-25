/**
 * errors/AppError.js — 커스텀 에러 클래스
 *
 * HTTP 상태코드를 에러 객체에 함께 포함해
 * errorHandler.js가 별도 분기 없이 일관된 응답을 반환할 수 있게 함
 *
 * 사용 패턴:
 *   services에서 throw → errorHandler.js(미들웨어)가 catch → JSON 응답 반환
 *
 * 클래스 목록:
 *
 *   AppError(message, statusCode)
 *     - 모든 커스텀 에러의 기반 클래스
 *     - this.isOperational = true 로 예상된 에러임을 표시
 *       (예상치 못한 에러와 구분해 500 처리 여부 결정)
 *
 *   ValidationError(message)   → statusCode 400
 *     - 요청 파라미터 또는 본문 유효성 검사 실패
 *
 *   UnauthorizedError(message) → statusCode 401
 *     - 인증 토큰 없음 또는 검증 실패
 *
 *   ForbiddenError(message)    → statusCode 403
 *     - 인증은 됐으나 해당 리소스 접근 권한 없음
 *     - 파일 상태가 PENDING/INFECTED인 경우에도 사용
 *
 *   NotFoundError(message)     → statusCode 404
 *     - 요청한 리소스가 DB에 존재하지 않음
 *
 * 담당: B
 */
