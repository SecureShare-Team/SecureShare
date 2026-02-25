/**
 * lambda/db.js — Lambda 전용 DB 연결 유틸
 *
 * EC2의 src/config/db.js와 별개로 Lambda에 최적화된 연결 설정
 *
 * Lambda 특성 고려사항:
 *   - 콜드 스타트 시 새 인스턴스 생성 → 매번 새 커넥션이 필요할 수 있음
 *   - 웜 인스턴스 재사용 시 기존 커넥션을 재사용해 오버헤드 감소
 *   - connectionLimit을 최소화 (1~2)해 RDS Proxy 부하 방지
 *   - Lambda 실행 시간(최대 15분) 내에 커넥션이 유효한지 확인 필요
 *
 * 연결 설정:
 *   - host     : process.env.DB_HOST
 *   - user     : process.env.DB_USER
 *   - password : process.env.DB_PASSWORD
 *   - database : process.env.DB_NAME
 *   - connectionLimit : 2
 *   - connectTimeout  : 10_000 (10초)
 *
 * 핸들러 종료 후 커넥션 풀을 명시적으로 닫지 않음
 * (Lambda 재사용 시 커넥션 재활용을 위해 의도적으로 열어둠)
 *
 * 담당: A
 */
