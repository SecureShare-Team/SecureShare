/**
 * constants/auditActions.js — 감사 로그 액션 타입 상수
 *
 * audit_logs 테이블의 action 컬럼에 사용하는 값을 상수로 정의
 * auditModel, auditLog 미들웨어, 각 service에서 공통 import해서 사용
 *
 * 액션 목록:
 *   - UPLOAD     : 파일 업로드
 *   - DOWNLOAD   : 다운로드 URL 발급 (실제 다운로드는 S3 직접 요청)
 *   - SCAN       : Lambda 바이러스 스캔 결과 기록
 *   - DELETE     : 파일 소프트 삭제
 *   - PERMISSION : 권한 부여 또는 회수
 *
 * 담당: A
 */
