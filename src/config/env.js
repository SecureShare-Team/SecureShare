/**
 * config/env.js — 환경변수 로드 및 필수값 유효성 검사
 *
 * - dotenv로 .env 파일 로드
 * - 필수 ENV가 누락된 경우 앱 시작 즉시 process.exit(1)로 종료
 *   → 잘못된 설정으로 운영 중 오류가 나는 것을 방지 (Fail Fast)
 * - 검증 통과 후 정리된 설정 객체를 export
 *
 * 필수 ENV 목록:
 *   - MASTER_KEY    : DEK 암호화에 사용하는 KEK
 *   - DB_HOST       : RDS Proxy 엔드포인트
 *   - DB_USER       : DB 접속 계정
 *   - DB_PASSWORD   : DB 접속 비밀번호
 *   - DB_NAME       : 사용할 데이터베이스 이름
 *   - AWS_REGION    : S3 리전
 *   - S3_QUARANTINE_BUCKET : 업로드 직후 격리 버킷
 *   - S3_CLEAN_BUCKET      : 스캔 통과 후 이동 버킷
 *   - COGNITO_USER_POOL_ID : JWT 검증용 Cognito 풀 ID
 *   - COGNITO_REGION       : Cognito 리전
 *
 * 담당: 공통
 */
