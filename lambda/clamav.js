/**
 * lambda/clamav.js — ClamAV Lambda Layer 연동 유틸
 *
 * - ClamAV는 Lambda Layer에 미리 배포된 바이너리 사용
 *   (Lambda Layer 경로: /opt/bin/clamscan)
 * - child_process.spawn으로 clamscan 프로세스 실행
 * - 복호화된 평문 파일 스트림을 clamscan의 stdin으로 전달
 *   → 파일을 /tmp 등 디스크에 기록하지 않음
 *
 * 함수 목록:
 *
 *   scanStream(decryptedStream)
 *     → Promise<'CLEAN' | 'INFECTED'>
 *     → 스트림을 stdin으로 전달하고 clamscan 종료 코드 및 stdout 파싱
 *       - 종료 코드 0 + stdout에 'OK'   → 'CLEAN'
 *       - 종료 코드 1 + stdout에 'FOUND' → 'INFECTED'
 *       - 그 외 → Error throw (스캔 실패)
 *     → 타임아웃 설정 필수 (Lambda 실행 시간 제한 고려)
 *
 * 담당: A
 */
