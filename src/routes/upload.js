/**
 * routes/upload.js — 파일 업로드 라우터
 *
 * POST /files
 *   - auth 미들웨어 적용 (인증된 사용자만 접근)
 *   - busboy로 multipart/form-data 스트림 수신
 *     → 파일을 디스크에 저장하지 않고 스트림으로 uploadService에 전달
 *   - uploadService.upload() 호출
 *   - 성공 시 201 Created + { fileId, status: 'PENDING' } 반환
 *
 * 주의:
 *   - 비즈니스 로직 작성 금지 → 반드시 service 함수 호출만 할 것
 *   - 평문 파일 데이터를 응답에 포함하거나 로그에 출력하지 않을 것
 *
 * 담당: B
 */
