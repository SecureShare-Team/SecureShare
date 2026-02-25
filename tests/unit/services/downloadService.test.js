/**
 * tests/unit/services/downloadService.test.js — 다운로드 서비스 단위 테스트
 *
 * mock 대상:
 *   - models/fileModel.js  (findById)
 *   - models/aclModel.js   (checkPermission)
 *   - models/auditModel.js (log)
 *   - utils/s3.js          (generatePresignedUrl)
 *
 * 테스트 케이스:
 *
 *   정상 다운로드
 *     ✓ status=CLEAN + READ 권한 있음 → Pre-signed URL 반환 확인
 *     ✓ status=CLEAN + 소유자 본인 → 권한 체크 없이 URL 반환 확인
 *     ✓ audit_logs에 action=DOWNLOAD, result=GRANTED 기록 확인
 *
 *   접근 거부 — 파일 상태
 *     ✓ status=PENDING   → ForbiddenError(403) 확인
 *     ✓ status=INFECTED  → ForbiddenError(403) 확인
 *     ✓ status=DELETED   → NotFoundError(404) 확인
 *
 *   접근 거부 — 권한
 *     ✓ status=CLEAN + READ 권한 없음 → ForbiddenError(403) 확인
 *     ✓ 거부 시 audit_logs에 result=DENIED 기록 확인
 *
 *   파일 없음
 *     ✓ fileModel.findById null 반환 → NotFoundError(404) 확인
 *
 * 담당: A
 */
