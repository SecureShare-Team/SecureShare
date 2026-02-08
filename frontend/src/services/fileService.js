import api from './api';

export const fileService = {
  uploadFile: async (file, folderId) => {
    const formData = new FormData();
    formData.append('file', file);
    if (folderId) formData.append('folderId', folderId);

    const response = await api.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  getFiles: async (folderId, params) => {
    const response = await api.get(`/files/${folderId || ''}`, { params });
    return response.data;
  },

  downloadFile: async (fileId) => {
    const response = await api.get(`/files/${fileId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  },

  deleteFile: async (fileId) => {
    const response = await api.delete(`/files/${fileId}`);
    return response.data;
  },

  shareFile: async (fileId, data) => {
    const response = await api.post(`/files/${fileId}/share`, data);
    return response.data;
  }
};
