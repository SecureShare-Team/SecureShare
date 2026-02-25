/**
 * models/auditModel.js — audit_logs 테이블 INSERT 전담
 *
 * 감사 로그 기록만 담당하는 단일 책임 모듈
 * auditLog 미들웨어와 각 service 양쪽에서 호출됨
 *
 * 함수 목록:
 *
 *   log({ actorSub, action, fileId, ip, result })
 *     → audit_logs 테이블에 행위 기록 INSERT
 *     → 파라미터:
 *        - actorSub : 행위자 Cognito sub (req.user.sub)
 *        - action   : 액션 타입 (auditActions 상수 사용)
 *        - fileId   : 대상 파일 ID (null 허용 — 파일 무관 이벤트)
 *        - ip       : 클라이언트 IP 주소
 *        - result   : 'GRANTED' | 'DENIED'
 *     → 감사 로그 INSERT 실패 시 throw 대신 logger.error로만 기록
 *        (감사 로그 오류로 인해 본 요청 흐름이 중단되지 않도록)
 *
 * 담당: B
 */
