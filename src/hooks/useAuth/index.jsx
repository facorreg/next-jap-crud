import { useAtom } from 'jotai';
import jwt from 'jsonwebtoken';

import { meAtom } from '@atoms';

const useAuth = () => {
  const [me] = useAtom(meAtom);
  if (!me) return { isAuthenticated: false };

  const { token } = me;
  const decoded = jwt.decode(token);

  if (!decoded) return { isAuthenticated: false };
  return {
    isAuthenticated: true,
  };
};

export default useAuth;
