/**
 * tests/e2e/uploadAndScan.test.js — 전체 흐름 E2E 통합 테스트
 *
 * 실제 DB, S3, Lambda(또는 Lambda Invoke 모의)를 사용하는 통합 테스트
 * 3분 데모 시나리오를 코드로 검증
 *
 * 전제 조건:
 *   - 로컬 또는 스테이징 DB가 실행 중이어야 함
 *   - AWS 자격증명 또는 LocalStack이 설정되어 있어야 함
 *   - Lambda Trigger 환경 세팅은 담당 B가 처리
 *
 * 테스트 시나리오 (순서 보장 — runInBand 필수):
 *
 *   Step 1. 사용자 A가 파일 업로드
 *     ✓ POST /files 성공 확인 (201 Created)
 *     ✓ DB files.status = 'PENDING' 확인
 *     ✓ DB key_store에 encrypted_dek 저장 확인
 *
 *   Step 2. Lambda 스캔 트리거 및 결과 확인
 *     ✓ S3 ObjectCreated 이벤트 발행 (또는 scanHandler 직접 호출)
 *     ✓ DB files.status = 'CLEAN' 변경 확인 (폴링 또는 이벤트 대기)
 *     ✓ S3 Clean 버킷에 파일 이동 확인
 *
 *   Step 3. 사용자 A가 사용자 B에게 READ 권한 부여
 *     ✓ POST /files/:id/acl 성공 확인 (200 OK)
 *     ✓ DB file_acl에 레코드 생성 확인
 *
 *   Step 4. 사용자 B가 다운로드 URL 요청
 *     ✓ POST /files/:id/download-url 성공 확인 (200 OK)
 *     ✓ 응답에 url 필드 포함 확인
 *     ✓ url이 S3 Pre-signed URL 형식인지 확인
 *
 *   Step 5. 감사 로그 검증
 *     ✓ audit_logs에 UPLOAD 액션 기록 확인 (actor=A, result=GRANTED)
 *     ✓ audit_logs에 SCAN 액션 기록 확인 (result=GRANTED)
 *     ✓ audit_logs에 PERMISSION 액션 기록 확인 (actor=A, result=GRANTED)
 *     ✓ audit_logs에 DOWNLOAD 액션 기록 확인 (actor=B, result=GRANTED)
 *
 * 담당: A (테스트 코드 작성) + B (Lambda Trigger 환경 세팅)
 */
