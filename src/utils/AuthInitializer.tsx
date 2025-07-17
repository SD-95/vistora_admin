import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { initializeAuth } from '../redux/slices/Authslice'; 

export const AuthInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return null;
};
