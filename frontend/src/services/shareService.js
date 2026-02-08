import api from './api';

export const shareService = {
  shareFile: async (fileId, data) => {
    const response = await api.post(`/share/files/${fileId}`, data);
    return response.data;
  },

  getSharedFiles: async (params) => {
    const response = await api.get('/share/files', { params });
    return response.data;
  },

  revokeShare: async (shareId) => {
    const response = await api.delete(`/share/${shareId}`);
    return response.data;
  }
};
