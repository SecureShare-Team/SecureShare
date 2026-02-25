/**
 * tests/unit/models/keyStoreModel.test.js — 키 스토어 모델 단위 테스트
 *
 * config/db.js(커넥션 풀)를 Jest mock으로 대체해 실제 DB 연결 없이 테스트
 *
 * 테스트 케이스:
 *
 *   saveKey()
 *     ✓ INSERT 쿼리에 fileId, encryptedDek, iv, keyVersion 바인딩 확인
 *     ✓ 동일 fileId 중복 저장 시 적절한 처리 확인 (INSERT IGNORE 또는 에러)
 *
 *   getKey()
 *     ✓ SELECT 쿼리에 fileId 바인딩 확인
 *     ✓ 반환값 구조 확인: { encryptedDek, iv, keyVersion }
 *     ✓ 존재하지 않는 fileId → null 반환 확인
 *
 * 담당: A
 */
