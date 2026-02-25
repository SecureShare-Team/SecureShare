/**
 * config/aws.js — AWS S3Client 싱글톤 생성
 *
 * - @aws-sdk/client-s3 의 S3Client를 한 번만 생성해 export
 * - 모든 S3 작업은 이 클라이언트 인스턴스를 공유해 사용
 * - EC2 IAM Role 기반 자격증명 사용
 *   → 코드에 AWS Access Key / Secret Key 하드코딩 금지
 *   → EC2 메타데이터 서비스를 통해 자동으로 임시 자격증명 획득
 *
 * 설정:
 *   - region : env.AWS_REGION
 *
 * 담당: B
 */
