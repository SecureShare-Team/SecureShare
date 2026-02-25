/**
 * routes/index.js — 라우터 통합 등록
 *
 * - 모든 라우터를 한 곳에서 import해 Express Router에 prefix와 함께 등록
 * - app.js는 이 파일 하나만 import하면 전체 라우팅이 구성됨
 *
 * 라우터 구성:
 *   POST   /files              → upload.js (파일 업로드)
 *   POST   /files/:id/download-url → files.js (다운로드 URL 발급)
 *   GET    /files/:id          → files.js (파일 메타데이터 조회)
 *   DELETE /files/:id          → files.js (파일 소프트 삭제)
 *   POST   /files/:id/acl      → acl.js (권한 부여)
 *   DELETE /files/:id/acl/:sub → acl.js (권한 회수)
 *
 * 담당: B
 */
