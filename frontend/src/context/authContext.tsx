'use client';

import { env } from '@/utiles/env';
import { API_ROUTES } from '@/utiles/constants';
import { createContext, useContext, useEffect, useState } from 'react';
import type { IUser, IAuthContext, IAuthResponse } from '@/types/interfaces';

export type { IUser, IAuthContext, IAuthResponse };

const authContext = createContext<undefined | IAuthContext>(undefined);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<null | IUser>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuthenticated = !(user === null);

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        const response = await fetch(`${env.backendURL}${API_ROUTES.AUTH_ME}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = (await response.json()) as IAuthResponse;
        if (data.isAuthenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error: unknown) {
        console.error('Error on Auth: ', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    void refreshAuth();
  }, []);

  return (
    <authContext.Provider
      value={{
        user: user,
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth(): IAuthContext {
  const context = useContext(authContext);

  if (!context) {
    throw new Error('AuthContext must be used within provider!');
  }
  return context;
}
