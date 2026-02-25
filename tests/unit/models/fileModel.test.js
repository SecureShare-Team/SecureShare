/**
 * tests/unit/models/fileModel.test.js — 파일 모델 단위 테스트
 *
 * config/db.js(커넥션 풀)를 Jest mock으로 대체해 실제 DB 연결 없이 테스트
 *
 * 테스트 케이스:
 *
 *   findById()
 *     ✓ SELECT 쿼리에 fileId가 파라미터로 올바르게 바인딩되는지 확인
 *     ✓ DB 반환값이 없을 때 null 반환 확인
 *
 *   create()
 *     ✓ INSERT 쿼리에 ownerSub, s3Key, sha256, status='PENDING' 바인딩 확인
 *     ✓ 반환값으로 insertId가 포함되는지 확인
 *
 *   updateStatus()
 *     ✓ UPDATE 쿼리에 fileId, status 올바르게 바인딩 확인
 *
 *   softDelete()
 *     ✓ status='DELETED' 로 UPDATE되는지 확인 (실제 DELETE 쿼리 사용 안됨)
 *
 * 담당: A
 */
