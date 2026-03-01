import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

export const usePermissions = () => {
  const { user } = useAuth();
  const [permissions] = useState(user?.permissions || []);

  const hasPermission = useCallback(
    (permission) => permissions.includes(permission),
    [permissions]
  );

  return { hasPermission, permissions };
};
