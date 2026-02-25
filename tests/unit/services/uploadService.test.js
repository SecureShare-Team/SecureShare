/**
 * tests/unit/services/uploadService.test.js — 업로드 서비스 단위 테스트
 *
 * mock 대상:
 *   - utils/crypto.js  (generateDataKey, encryptDEK, createEncryptStream)
 *   - utils/s3.js      (uploadEncryptedStream)
 *   - utils/hash.js    (computeSHA256)
 *   - models/fileModel.js      (create)
 *   - models/keyStoreModel.js  (saveKey)
 *
 * 테스트 케이스:
 *
 *   업로드 성공
 *     ✓ 반환값에 fileId와 status='PENDING'이 포함되는지 확인
 *     ✓ fileModel.create 호출 시 status='PENDING'으로 호출되는지 확인
 *     ✓ keyStoreModel.saveKey가 암호화된 DEK로 호출되는지 확인
 *
 *   보안 검증 (핵심)
 *     ✓ 반환값에 평문 DEK가 포함되지 않는지 확인
 *     ✓ 반환값에 IV가 노출되지 않는지 확인
 *     ✓ encryptDEK 호출 이후 DEK 변수가 null 처리되는지 확인
 *
 *   에러 처리
 *     ✓ S3 업로드 실패 시 Error propagation 확인
 *     ✓ DB INSERT 실패 시 적절한 에러 처리 확인
 *
 * 담당: A
 */
