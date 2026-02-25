/**
 * services/downloadService.js — 다운로드 URL 발급 파이프라인
 *
 * 처리 파이프라인 (getDownloadUrl 함수):
 *   1. fileModel.findById()로 파일 조회 → 없으면 NotFoundError(404)
 *   2. 파일 status 검증
 *      - PENDING   → ForbiddenError(403, '아직 바이러스 검사 중')
 *      - INFECTED  → ForbiddenError(403, '감염된 파일')
 *      - DELETED   → NotFoundError(404)
 *      - CLEAN     → 다음 단계 진행
 *   3. aclModel.checkPermission()으로 READ 권한 확인
 *      - 소유자(owner_sub === req.user.sub)는 항상 허용
 *      - 그 외 → file_acl에 READ 권한 없으면 ForbiddenError(403)
 *   4. S3 Clean 버킷 Pre-signed GET URL 발급 (TTL 300초)
 *      (utils/s3.js — generatePresignedUrl)
 *   5. audit_logs INSERT (action=DOWNLOAD, result=GRANTED)
 *      (models/auditModel.js — log)
 *
 * 반환값: { url, expiresIn: 300 }
 *
 * 담당: A
 */
