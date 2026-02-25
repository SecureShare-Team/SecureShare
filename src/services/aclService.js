/**
 * services/aclService.js — 파일 접근 권한 부여 / 회수 로직
 *
 * 모든 함수는 요청자가 파일 소유자(owner_sub)인지 먼저 검증
 * 소유자가 아니면 ForbiddenError(403) throw
 *
 * 함수 목록:
 *
 *   grantPermission({ fileId, requesterSub, targetSub, permission })
 *     1. fileModel.findById()로 파일 조회 → 없으면 NotFoundError(404)
 *     2. file.owner_sub === requesterSub 검증 → 불일치 시 ForbiddenError(403)
 *     3. aclModel.grantPermission() 호출
 *     4. audit_logs INSERT (action=PERMISSION, result=GRANTED)
 *
 *   revokePermission({ fileId, requesterSub, targetSub, permission })
 *     1. fileModel.findById()로 파일 조회 → 없으면 NotFoundError(404)
 *     2. file.owner_sub === requesterSub 검증 → 불일치 시 ForbiddenError(403)
 *     3. aclModel.revokePermission() 호출
 *     4. audit_logs INSERT (action=PERMISSION, result=GRANTED)
 *
 * 담당: A
 */
