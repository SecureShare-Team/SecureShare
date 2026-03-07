/**
 * config/aws.js - AWS S3Client 싱글톤 생성
 *
 * - @aws-sdk/client-s3의 S3Client를 한 번만 생성해 export
 * - 모든 S3 작업은 동일한 클라이언트 인스턴스를 공유 사용
 * - 자격증명은 AWS SDK 기본 체인(예: EC2 IAM Role) 사용
 * - 코드에 Access Key / Secret Key 하드코딩 금지
 *
 * 설정:
 *   - region: env.AWS_REGION
 *
 * 담당: B
 */

const { S3Client } = require("@aws-sdk/client-s3");
const env = require("./env");

// 프로세스에서 1회 생성 후 재사용
const s3Client = new S3Client({
  region: env.AWS_REGION,
});

module.exports = s3Client;
