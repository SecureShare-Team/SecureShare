-- migrations/001_initial_schema.sql — 초기 DB 스키마 DDL
--
-- 테이블 목록:
--   1. files       : 업로드된 파일의 메타데이터 및 상태 관리
--   2. key_store   : 파일별 암호화된 DEK + IV + 키 버전 보관
--   3. audit_logs  : 모든 행위(업로드/다운로드/스캔/삭제/권한)의 감사 기록
--
-- 실행 순서: 001 → 002 (file_acl은 files 테이블 FK 의존)
-- 담당: A
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. files 테이블 ───────────────────────────────────────────────────────────
-- 파일 메타데이터와 상태를 저장
-- status: PENDING | CLEAN | INFECTED | DELETED (fileStatus 상수 참조)
-- s3_key: S3에서 파일을 식별하는 키 (예: quarantine/{uuid} 또는 clean/{uuid})
-- sha256: 업로드 시 계산한 파일 해시 (무결성 검증용)
-- owner_sub: 업로더의 Cognito sub (Cognito에서 발급한 고유 사용자 식별자)


-- ── 2. key_store 테이블 ───────────────────────────────────────────────────────
-- 파일별 암호화된 DEK(Data Encryption Key) 보관
-- encrypted_dek: KEK(MASTER_KEY)로 암호화된 DEK — 절대 평문 DEK 저장 금지
-- iv: DEK 암호화에 사용한 IV (복호화 시 필요)
-- key_version: KEK 로테이션 대비 버전 관리 (예: 'v1', 'v2')
-- file_id는 files 테이블의 PK를 FK로 참조


-- ── 3. audit_logs 테이블 ─────────────────────────────────────────────────────
-- 모든 행위를 시간 순으로 기록 (삭제 불가 원칙)
-- actor_sub: 행위자 Cognito sub
-- action: UPLOAD | DOWNLOAD | SCAN | DELETE | PERMISSION
-- result: GRANTED | DENIED
-- ip: 클라이언트 IP 주소
-- file_id: 대상 파일 ID (NULL 허용 — 파일 무관 이벤트 대비)
