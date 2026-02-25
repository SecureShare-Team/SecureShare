/**
 * models/aclModel.js — file_acl 테이블 CRUD
 *
 * 파일별 사용자 권한 관리 쿼리 전담
 * 권한 검증 로직은 aclService에서 처리, 이 모듈은 DB 조작만 담당
 *
 * 함수 목록:
 *
 *   grantPermission(fileId, targetSub, permission)
 *     → file_acl 테이블에 권한 레코드 INSERT
 *     → 이미 동일한 권한이 존재하면 중복 INSERT 방지 (INSERT IGNORE 또는 UPSERT)
 *     → permission 값은 permissions 상수 사용 (READ / WRITE / ADMIN)
 *
 *   revokePermission(fileId, targetSub, permission)
 *     → 해당 권한 레코드 DELETE
 *     → 존재하지 않아도 오류 발생 없이 무시
 *
 *   checkPermission(fileId, userSub, permission)
 *     → 해당 사용자가 해당 파일에 지정 권한을 가지고 있는지 확인
 *     → boolean 반환 (true: 권한 있음 / false: 없음)
 *
 * 담당: A
 */
