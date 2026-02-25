/**
 * constants/fileStatus.js — 파일 상태 상수
 *
 * files 테이블의 status 컬럼에 사용하는 값을 상수로 정의
 * 문자열을 직접 쓰면 오타 버그가 발생하므로 반드시 이 상수를 import해서 사용
 *
 * 상태 흐름:
 *   PENDING → (Lambda 스캔) → CLEAN | INFECTED
 *   CLEAN   → (소프트 삭제) → DELETED
 *
 * 상수 목록:
 *   - PENDING   : 업로드 완료, 바이러스 스캔 대기 중
 *   - CLEAN     : 스캔 통과, 다운로드 가능 상태
 *   - INFECTED  : 바이러스 감지, 접근 차단
 *   - DELETED   : 소프트 삭제 처리됨 (DB 레코드는 유지)
 *
 * 담당: A
 */
