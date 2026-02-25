/**
 * app.js — Express 앱 인스턴스 설정 및 미들웨어 등록
 *
 * - listen() 없이 app만 export
 *   → 테스트에서 서버를 실제 실행하지 않고도 import 가능
 * - 전역 미들웨어(JSON 파싱, CORS, Rate Limit 등)를 여기서 등록
 * - 라우터는 routes/index.js를 통해 일괄 등록
 * - 에러 핸들러는 반드시 모든 라우터 등록 이후 마지막에 등록
 *
 * 담당: 공통
 */
