/**
 * services/uploadService.js — 파일 업로드 전체 파이프라인
 *
 * ⭐ 핵심 보안 요구사항:
 *   - 평문 파일은 절대 디스크에 저장하지 않음 (메모리 스트림으로만 처리)
 *   - 평문 DEK는 사용 직후 null로 초기화해 메모리에서 제거
 *   - DEK는 반환값에 포함하지 않음 (tests/uploadService.test.js에서 검증)
 *
 * 처리 파이프라인 (upload 함수):
 *   1. DEK + IV 난수 생성 (utils/crypto.js — generateDataKey)
 *   2. 파일 스트림을 AES-256-GCM으로 암호화하며 S3 Quarantine 버킷에 업로드
 *      (utils/crypto.js — createEncryptStream / utils/s3.js — uploadEncryptedStream)
 *   3. 업로드 중 SHA-256 해시 동시 계산 (utils/hash.js — computeSHA256)
 *   4. DEK를 KEK(MASTER_KEY)로 암호화 (utils/crypto.js — encryptDEK)
 *   5. 암호화된 DEK + IV → key_store 테이블 INSERT (keyStoreModel.saveKey)
 *   6. files 테이블 INSERT (fileModel.create), status=PENDING
 *   7. 평문 DEK 변수 null 처리 (메모리 파기)
 *
 * 반환값: { fileId, status: 'PENDING' }
 *
 * 담당: A
 */
