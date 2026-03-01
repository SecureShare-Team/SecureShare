/**
 * config/db.js â€” MySQL ì»¤ë„¥ì…˜ í’€ ìƒì„± (RDS Proxy ì—°ê²°)
 *
 * - mysql2/promise ê¸°ë°˜ ì»¤ë„¥ì…˜ í’€ì„ ì‹±ê¸€í†¤ìœ¼ë¡œ ìƒì„±í•´ export
 * - ëª¨ë“  model íŒŒì¼ì€ ì´ poolì„ importí•´ì„œ ê³µìœ  ì‚¬ìš©
 * - connectionLimitì„ ë‚®ê²Œ ì„¤ì •í•˜ëŠ” ì´ìœ :
 *   RDS Proxyê°€ ìžì²´ì ìœ¼ë¡œ ì»¤ë„¥ì…˜ í’€ë§ì„ ê´€ë¦¬í•˜ë¯€ë¡œ
 *   EC2 ì•± ë ˆë²¨ì—ì„œ ë‹¤ìˆ˜ì˜ ì»¤ë„¥ì…˜ì„ ìœ ì§€í•  í•„ìš” ì—†ìŒ
 *
 * ì—°ê²° ì„¤ì •:
 *   - host     : env.DB_HOST (RDS Proxy ì—”ë“œí¬ì¸íŠ¸)
 *   - port     : env.DB_PORT (ê¸°ë³¸ 3306)
 *   - user     : env.DB_USER
 *   - password : env.DB_PASSWORD
 *   - database : env.DB_NAME
 *   - connectionLimit : 5 (RDS Proxy ì‚¬ìš© ì‹œ ë‚®ê²Œ ìœ ì§€)
 *   - waitForConnections : true
 *
 * ë‹´ë‹¹: B
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
