/**
 * routes/acl.js — 파일 접근 권한(ACL) 관리 라우터
 *
 * 모든 엔드포인트에 auth 미들웨어 적용
 * 파일 소유자(owner_sub)만 권한 부여/회수 가능 → 비소유자 요청 시 403
 *
 * POST /files/:id/acl
 *   요청 본문: { targetSub: string, permission: 'READ' | 'WRITE' | 'ADMIN' }
 *   - aclService.grantPermission() 호출
 *   - 성공 시 200 + { message: '권한 부여 완료' } 반환
 *
 * DELETE /files/:id/acl/:sub
 *   URL 파라미터: sub (권한을 회수할 대상 사용자의 Cognito sub)
 *   쿼리 파라미터: permission (선택, 없으면 해당 sub의 모든 권한 회수)
 *   - aclService.revokePermission() 호출
 *   - 성공 시 200 + { message: '권한 회수 완료' } 반환
 *
 * 담당: B
 */
