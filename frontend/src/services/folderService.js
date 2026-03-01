import api from './api';

export const folderService = {
  createFolder: async (name, parentFolderId) => {
    const response = await api.post('/folders', {
      name,
      parentFolderId
    });
    return response.data;
  },

  getFolders: async (params) => {
    const response = await api.get('/folders', { params });
    return response.data;
  },

  renameFolder: async (folderId, name) => {
    const response = await api.put(`/folders/${folderId}`, { name });
    return response.data;
  },

  deleteFolder: async (folderId) => {
    const response = await api.delete(`/folders/${folderId}`);
    return response.data;
  }
};
