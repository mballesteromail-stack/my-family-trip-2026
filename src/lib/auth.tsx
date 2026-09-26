"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  onAuthStateChanged,
  getRedirectResult,
  signInWithRedirect,
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
  authError: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [deniedEmail, setDeniedEmail] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Desregistrar cualquier Service Worker que haya quedado pegado de una
    // versión anterior (este proyecto nunca agrega uno a propósito): un SW
    // viejo puede seguir sirviendo respuestas cacheadas para siempre.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister());
      });
    }

    getRedirectResult(auth).catch((err) => {
      setAuthError(err?.message ?? "Error al iniciar sesión.");
    });

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

    // Safari a veces restaura la página desde su caché de navegación
    // (bfcache) al volver de un sitio externo como accounts.google.com, en
    // vez de recargarla de verdad. Ahí el código de arriba nunca se vuelve
    // a ejecutar, así que el login de Google parece "no hacer nada" (loop).
    // Forzamos una recarga real cuando eso pasa.
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      unsub();
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  const signIn = async () => {
    setUnauthorized(false);
    setAuthError(null);
    // signInWithRedirect en vez de signInWithPopup: el popup depende de
    // cookies de terceros entre la pestaña y accounts.google.com, que
    // Safari/Chrome bloquean cada vez más en navegación normal (de ahí que
    // solo funcionara en modo incógnito). El redirect no tiene ese problema.
    await signInWithRedirect(auth, googleProvider);
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
        authError,
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
