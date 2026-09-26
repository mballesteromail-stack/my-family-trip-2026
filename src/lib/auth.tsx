"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { isAllowedEmail, isAdminEmail } from "./allowedEmails";

interface AuthState {
  user: User | null;
  loading: boolean;
  unauthorized: boolean;
  deniedEmail: string | null;
  isAdmin: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [deniedEmail, setDeniedEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && !isAllowedEmail(firebaseUser.email)) {
        setUnauthorized(true);
        setDeniedEmail(firebaseUser.email);
        await firebaseSignOut(auth);
        setUser(null);
      } else {
        setUnauthorized(false);
        setDeniedEmail(null);
        setUser(firebaseUser);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signIn = async () => {
    setUnauthorized(false);
    await signInWithPopup(auth, googleProvider);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        unauthorized,
        deniedEmail,
        isAdmin: isAdminEmail(user?.email),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
