/**
 * utils/crypto.js — 봉투 암호화(Envelope Encryption) 핵심 모듈
 *
 * ⭐ 프로젝트에서 가장 중요한 보안 파일
 *
 * 봉투 암호화 개념:
 *   - DEK (Data Encryption Key) : 파일 자체를 암호화하는 키 (파일마다 고유)
 *   - KEK (Key Encryption Key)  : DEK를 암호화하는 마스터 키 (MASTER_KEY ENV)
 *   - 암호화된 DEK만 DB에 저장, 평문 DEK는 메모리에만 존재
 *
 * 외부 의존성 없이 Node.js 내장 crypto 모듈만 사용
 * 알고리즘: AES-256-GCM (인증된 암호화 — 무결성 + 기밀성 동시 보장)
 *
 * 함수 목록:
 *
 *   generateDataKey()
 *     → { dek: Buffer(32), iv: Buffer(12) }
 *     → crypto.randomBytes로 DEK(32바이트)와 IV(12바이트) 난수 생성
 *     → 파일마다 반드시 새로운 DEK+IV 생성 (재사용 금지)
 *
 *   encryptDEK(dek, kek)
 *     → Buffer (암호화된 DEK, RDS key_store에 저장)
 *     → AES-256-GCM으로 dek를 kek로 암호화
 *     → 반환값에는 authTag도 포함 (복호화 시 무결성 검증용)
 *
 *   decryptDEK(encryptedDek, kek)
 *     → Buffer (평문 DEK, 메모리에서만 사용 후 null 처리)
 *     → 잘못된 kek 또는 변조된 encryptedDek → Error throw
 *
 *   createEncryptStream(dek, iv)
 *     → Node.js Transform Stream (AES-256-GCM 암호화 스트림)
 *     → 파일 스트림을 파이프해서 암호화된 데이터를 흘려보냄
 *     → S3 업로드 파이프라인에서 사용
 *
 *   createDecryptStream(dek, iv)
 *     → Node.js Transform Stream (AES-256-GCM 복호화 스트림)
 *     → S3에서 받은 암호화 스트림을 ClamAV stdin으로 넘길 때 사용 (Lambda)
 *
 * 담당: A
 */
