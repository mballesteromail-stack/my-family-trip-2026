"use client";

import { useAuth } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import NavBar from "./NavBar";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, unauthorized, deniedEmail, authError, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-400">
        Cargando...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-sm rounded-3xl border border-white/80 bg-white/85 p-6 shadow-xl backdrop-blur-md flex flex-col items-center gap-4">
          <div className="text-3xl">🗽 ✈️</div>
          <h1 className="text-2xl font-bold text-slate-800">Nueva York 2026</h1>
          <p className="text-sm text-slate-600">
            Iniciá sesión con el Gmail que agregaste a la lista familiar para ver y
            marcar el itinerario.
          </p>
          {authError && (
            <div className="w-full rounded-xl bg-red-50/90 border border-red-200 p-3 text-xs text-red-700">
              {authError}
            </div>
          )}
          {unauthorized && (
            <div className="w-full rounded-xl bg-red-50/90 border border-red-200 p-3 text-sm text-red-700">
              <p className="font-medium">
                {deniedEmail ?? "Esa cuenta"} todavía no tiene acceso.
              </p>
              <p className="mt-1">
                Pedí autorización por WhatsApp indicando ese mismo Gmail para que
                te agreguen a la lista.
              </p>
            </div>
          )}
          <button
            onClick={signIn}
            className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition active:scale-[0.98]"
          >
            Ingresar con Google
          </button>
          <p className="text-[10px] text-slate-400">authDomain: {auth?.config?.authDomain}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-2 text-xs text-slate-500 bg-white/70 backdrop-blur-md border-b border-slate-200/60 shadow-xs">
        <span className="font-medium">{user.email}</span>
        <button onClick={signOut} className="text-slate-400 hover:text-slate-700 underline">
          Salir
        </button>
      </header>
      {children}
      <NavBar />
    </div>
  );
}
