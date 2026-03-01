import { useState } from 'react';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file) => {
    setIsUploading(true);
    try {
      // 파일 업로드 로직
      setProgress(100);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading, progress };
};
