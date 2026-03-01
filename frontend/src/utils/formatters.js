/**
 * 날짜 포맷 (YYYY-MM-DD)
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

/**
 * 파일 크기 포맷 (B, KB, MB, GB)
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * 시간으로 표시 (예: 2시간 전)
 */
export const formatTimeAgo = (date) => {
  const now = new Date();
  const d = new Date(date);
  const seconds = Math.floor((now - d) / 1000);

  if (seconds < 60) return '방금 전';
  if (seconds < 3600) return Math.floor(seconds / 60) + '분 전';
  if (seconds < 86400) return Math.floor(seconds / 3600) + '시간 전';
  if (seconds < 2592000) return Math.floor(seconds / 86400) + '일 전';

  return formatDate(d);
};
