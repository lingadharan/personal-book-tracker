'use client'

import { env } from "@/utiles/env";
import { createContext, useContext, useEffect, useState } from "react";

export interface IUser {
  _id: string,
  email: string,
  name?: string,
  avatar?: string,
  provider: string,
  // providerId: string;
}

export interface IAuthContext {
  user: IUser | null,
  isAuthenticated: boolean,
  refreshAuth: () => Promise<void>
}

export interface IAuthResponse {
  isAuthenticated: boolean,
  user: IUser
}

const authContext = createContext<undefined | IAuthContext>(undefined);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<null | IUser>(null)
  const isAuthenticated = !(user === null)

  const refreshAuth = async () => {
    try {
      const response = await fetch(`${env.backendURL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json() as IAuthResponse;
      if (data.isAuthenticated) {
        setUser(data.user);
      }
    }
    catch (error: unknown) {
      console.error("Error on Auth: ", error)
    }
  }

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <authContext.Provider
      value={{ user: user, isAuthenticated: isAuthenticated, refreshAuth: refreshAuth }}
    >
      {children}
    </authContext.Provider>
  )
}

export function useAuth(): IAuthContext {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("AuthContext must be used within provider!")
  }
  return context
}