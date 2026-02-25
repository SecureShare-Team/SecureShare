/**
 * middleware/auditLog.js — 감사 로그 후처리 미들웨어
 *
 * - 요청이 완료된 후 audit_logs 테이블에 자동으로 행위를 기록
 * - res.on('finish') 이벤트를 사용해 응답 전송 완료 후 비동기로 INSERT
 *   → 감사 로그 기록이 실패해도 클라이언트 응답에는 영향 없음
 *
 * 기록 항목:
 *   - actor_sub  : req.user.sub (인증된 사용자 식별자)
 *   - action     : res.locals.auditAction (각 route에서 세팅)
 *   - file_id    : res.locals.fileId (각 route에서 세팅)
 *   - ip         : req.ip (클라이언트 IP)
 *   - result     : HTTP 상태코드 기준
 *                  2xx → 'GRANTED' / 4xx·5xx → 'DENIED'
 *
 * 사용 방법:
 *   route 핸들러에서 res.locals.auditAction, res.locals.fileId를 세팅하면
 *   이 미들웨어가 응답 완료 후 자동으로 audit_logs에 INSERT
 *
 * 담당: B
 */
