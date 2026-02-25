/**
 * constants/permissions.js — ACL 권한 타입 상수
 *
 * file_acl 테이블의 permission 컬럼에 사용하는 값을 상수로 정의
 * aclModel, aclService, downloadService에서 공통 import해서 사용
 *
 * 권한 목록:
 *   - READ  : 파일 다운로드 URL 발급 허용
 *   - WRITE : 파일 메타데이터 수정 허용 (현재 미사용, 확장용)
 *   - ADMIN : 권한 부여/회수 허용 (소유자와 동일 수준)
 *
 * 담당: A
 */
