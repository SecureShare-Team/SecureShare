/**
 * API 상수
 */
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * 파일 업로드 설정
 */
export const FILE_UPLOAD_SETTINGS = {
  MAX_FILE_SIZE: 1024 * 1024 * 1024, // 1GB
  ALLOWED_TYPES: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'jpg', 'jpeg', 'png', 'gif', 'zip']
};

/**
 * 권한
 */
export const PERMISSIONS = {
  FILE_VIEW: 'file:view',
  FILE_DOWNLOAD: 'file:download',
  FILE_UPLOAD: 'file:upload',
  FILE_DELETE: 'file:delete',
  FILE_SHARE: 'file:share',
  FILE_EDIT: 'file:edit'
};
