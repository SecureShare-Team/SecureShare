/**
 * tests/unit/utils/hash.test.js — SHA-256 해시 단위 테스트
 *
 * 외부 의존성 없음 (Node.js crypto 모듈만 사용하므로 mock 불필요)
 *
 * 테스트 케이스:
 *
 *   computeSHA256()
 *     ✓ 동일한 Buffer 입력 → 항상 동일한 hex string 반환 (결정론적)
 *     ✓ 다른 Buffer 입력 → 다른 hex string 반환 (충돌 저항성)
 *     ✓ 반환값이 64자리 hex string 형식인지 확인 (SHA-256 = 256비트 = 32바이트 = 64자)
 *     ✓ 빈 Buffer 입력도 오류 없이 처리 확인
 *
 * 담당: A
 */
