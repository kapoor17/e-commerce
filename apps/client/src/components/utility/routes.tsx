import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { Else, If, Then } from './conditionals';

export const PrivateRoutes: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return;

  return (
    <If condition={isAuthenticated}>
      <Then>
        <Outlet />
      </Then>
      <Else>
        <Navigate to='/sign-in' />
      </Else>
    </If>
  );
};

export const PublicRoutes: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return;

  return (
    <If condition={isAuthenticated}>
      <Then>
        <Navigate to='/products' />
      </Then>
      <Else>
        <Outlet />
      </Else>
    </If>
  );
};
