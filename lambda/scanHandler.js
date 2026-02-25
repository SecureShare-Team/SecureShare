/**
 * lambda/scanHandler.js — Lambda 바이러스 스캔 엔트리포인트
 *
 * - S3 ObjectCreated 이벤트(Quarantine 버킷)로 트리거됨
 * - EC2 코드와 완전히 분리된 별도 프로젝트로 독립 번들링
 *   → EC2의 src/ 모듈 직접 import 금지
 *   → 공유 유틸(crypto.js, s3.js)은 lambda/ 내에 별도 복사 또는 Layer 사용
 *
 * 처리 파이프라인:
 *   1. 이미 CLEAN 또는 INFECTED 상태면 스킵 (멱등성 보장)
 *      → S3 이벤트가 중복 발생해도 중복 처리 방지
 *   2. Lambda 전용 db.js로 RDS에서 encrypted_dek + iv 조회 (keyStoreModel)
 *   3. ENV의 MASTER_KEY(KEK)로 DEK 복호화 (메모리에서만 처리)
 *   4. S3 Quarantine 버킷에서 암호화 파일 스트림 로드
 *   5. createDecryptStream으로 복호화 스트림 생성
 *      → ClamAV의 stdin으로 파이프 (디스크 저장 없이 메모리 스트림)
 *   6. 스캔 결과에 따라 분기:
 *      - CLEAN    → s3.moveToClean(fileId) + fileModel.updateStatus(CLEAN)
 *      - INFECTED → s3.deleteOrIsolate(fileId) + fileModel.updateStatus(INFECTED)
 *   7. audit_logs INSERT (action=SCAN, result=GRANTED/DENIED)
 *   8. 평문 DEK 변수 null 처리 (메모리 파기)
 *
 * 담당: A
 */
