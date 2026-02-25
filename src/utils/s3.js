/**
 * utils/s3.js — S3 작업 추상화 모듈
 *
 * ⭐ 모든 S3 I/O를 이 모듈을 통해서만 수행
 * config/aws.js의 S3Client 싱글톤을 공유 사용
 * services와 lambda 양쪽에서 import 가능
 *
 * 버킷 구분:
 *   - Quarantine : 업로드 직후 바이러스 스캔 대기 공간 (외부 접근 차단)
 *   - Clean      : 스캔 통과 파일 보관 (Pre-signed URL로만 접근)
 *   - Infected   : 감염 파일 격리 보관 (접근 전면 차단, 포렌식용)
 *
 * 함수 목록:
 *
 *   uploadEncryptedStream(fileId, stream)
 *     → Quarantine 버킷에 암호화된 파일 스트림 업로드
 *     → S3 키: `quarantine/{fileId}`
 *     → 스트림 방식이므로 메모리에 전체 파일을 올리지 않음
 *
 *   moveToClean(fileId)
 *     → Quarantine 버킷의 파일을 Clean 버킷으로 복사 후 원본 삭제
 *     → S3 키: `quarantine/{fileId}` → `clean/{fileId}`
 *     → Lambda scanHandler에서 CLEAN 판정 시 호출
 *
 *   deleteOrIsolate(fileId)
 *     → 감염 파일 처리: Clean/Quarantine 버킷에서 삭제 또는 Infected 버킷으로 이동
 *     → Lambda scanHandler에서 INFECTED 판정 시 호출
 *
 *   generatePresignedUrl(key, ttl)
 *     → Clean 버킷의 특정 파일에 대한 임시 GET URL 발급
 *     → ttl: 초 단위 (기본 300초 = 5분)
 *     → @aws-sdk/s3-request-presigner 사용
 *
 *   getEncryptedStream(key)
 *     → S3에서 지정 키의 파일을 스트림으로 반환
 *     → Lambda에서 복호화 후 ClamAV에 전달할 때 사용
 *
 * 담당: B
 */
