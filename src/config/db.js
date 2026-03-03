/**
 * config/db.js — MySQL 커넥션 풀 생성 (RDS Proxy 연결)
 *
 * - mysql2/promise 기반 커넥션 풀을 싱글톤으로 생성해 export
 * - 모든 model 파일은 이 pool을 import해서 공유 사용
 * - connectionLimit을 낮게 설정하는 이유:
 *   RDS Proxy가 자체적으로 커넥션 풀링을 관리하므로
 *   EC2 앱 레벨에서 다수의 커넥션을 유지할 필요 없음
 *
 * 연결 설정:
 *   - host     : env.DB_HOST (RDS Proxy 엔드포인트)
 *   - port     : env.DB_PORT (기본 3306)
 *   - user     : env.DB_USER
 *   - password : env.DB_PASSWORD
 *   - database : env.DB_NAME
 *   - connectionLimit : 5 (RDS Proxy 사용 시 낮게 유지)
 *   - waitForConnections : true
 *
 * 담당: B
 */

const mysql = require("mysql2/promise");
const env = require("./env");

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  connectionLimit: 5,
  waitForConnections: true,
  maxIdle: 5,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = pool;
