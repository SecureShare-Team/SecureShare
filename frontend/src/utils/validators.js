/**
 * 이메일 검증
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * 비밀번호 검증
 */
export const isValidPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

/**
 * 파일명 검증
 */
export const isValidFileName = (fileName) => {
  const regex = /^[^<>:"/\\|?*]+(\.[A-Za-z0-9]+)?$/;
  return regex.test(fileName) && fileName.length <= 255;
};
