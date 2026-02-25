/**
 * tests/unit/utils/crypto.test.js — 암호화 유틸 단위 테스트
 *
 * 외부 의존성 없음 (Node.js crypto 모듈만 사용하므로 mock 불필요)
 *
 * 테스트 케이스:
 *
 *   generateDataKey()
 *     ✓ dek가 32바이트 Buffer로 반환되는지 확인
 *     ✓ iv가 12바이트 Buffer로 반환되는지 확인
 *     ✓ 호출마다 다른 dek+iv 생성 확인 (격리성 — 키 재사용 금지)
 *
 *   encryptDEK / decryptDEK
 *     ✓ 암호화 후 복호화 시 원본 DEK와 동일한지 확인 (왕복 테스트)
 *     ✓ 잘못된 KEK로 복호화 시 Error throw 확인
 *     ✓ 변조된 encryptedDek 복호화 시 Error throw 확인 (무결성 검증)
 *
 *   createEncryptStream / createDecryptStream
 *     ✓ 암호화 스트림 → 복호화 스트림 파이프 후 원본 데이터와 동일한지 확인
 *     ✓ 잘못된 키로 복호화 시 스트림 에러 이벤트 발생 확인
 *
 * 담당: A
 */
