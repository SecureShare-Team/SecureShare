/**
 * tests/unit/utils/s3.test.js — S3 유틸 단위 테스트
 *
 * @aws-sdk/client-s3 를 Jest mock으로 대체해 실제 AWS 호출 없이 테스트
 *
 * 테스트 케이스:
 *
 *   uploadEncryptedStream()
 *     ✓ PutObjectCommand가 올바른 버킷/키로 호출되는지 확인
 *     ✓ S3 업로드 실패 시 Error propagation 확인
 *
 *   moveToClean()
 *     ✓ CopyObjectCommand → DeleteObjectCommand 순서로 호출되는지 확인
 *     ✓ Copy 실패 시 Delete 호출 안됨을 확인
 *
 *   generatePresignedUrl()
 *     ✓ getSignedUrl이 올바른 TTL로 호출되는지 확인
 *     ✓ URL 형식의 문자열 반환 확인
 *
 * 담당: B
 */
