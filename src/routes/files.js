/**
 * routes/files.js — 파일 조회 / 다운로드 / 삭제 라우터
 *
 * 모든 엔드포인트에 auth 미들웨어 적용
 *
 * POST /files/:id/download-url
 *   - downloadService.getDownloadUrl() 호출
 *   - 성공 시 200 + { url, expiresIn: 300 } 반환
 *   - 파일 상태가 CLEAN이 아닌 경우 → 403
 *   - READ 권한이 없는 경우 → 403
 *
 * GET /files/:id
 *   - fileModel.findById() 결과를 그대로 반환 (메타데이터 조회)
 *   - 존재하지 않으면 404
 *   - 파일 소유자 또는 READ 이상 권한 보유자만 접근 가능
 *
 * DELETE /files/:id
 *   - downloadService.deleteFile() 또는 별도 서비스 함수 호출
 *   - 파일 소유자만 삭제 가능 → 타인 요청 시 403
 *   - 성공 시 200 + { message: '삭제 완료' } 반환
 *
 * 담당: B
 */
