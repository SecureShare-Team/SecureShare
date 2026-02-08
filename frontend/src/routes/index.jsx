import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import MyDrivePage from '../pages/drive/MyDrivePage';
import SharedPage from '../pages/drive/SharedPage';
import StarredPage from '../pages/drive/StarredPage';
import TrashPage from '../pages/drive/TrashPage';
import FolderDetailPage from '../pages/drive/FolderDetailPage';
import FileDetailPage from '../pages/drive/FileDetailPage';
import UserManagementPage from '../pages/admin/UserManagementPage';
import AdminLayout from '../components/layout/AdminLayout';
import Layout from '../components/layout/Layout';

const routes = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MyDrivePage />
      },
      {
        path: 'shared',
        element: <SharedPage />
      },
      {
        path: 'starred',
        element: <StarredPage />
      },
      {
        path: 'trash',
        element: <TrashPage />
      },
      {
        path: 'folders/:folderId',
        element: <FolderDetailPage />
      },
      {
        path: 'files/:fileId',
        element: <FileDetailPage />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <UserManagementPage />
      }
    ]
  }
];

export default routes;
