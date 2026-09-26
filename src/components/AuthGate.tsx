"use client";

import { useAuth } from "@/lib/auth";
import NavBar from "./NavBar";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, unauthorized, deniedEmail, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-400">
        Cargando...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Nueva York 2026 ✈️</h1>
        <p className="max-w-xs text-sm text-slate-500">
          Iniciá sesión con el Gmail que agregaste a la lista familiar para ver y
          marcar el itinerario.
        </p>
        {unauthorized && (
          <div className="max-w-xs rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
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
          className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow"
        >
          Ingresar con Google
        </button>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <header className="flex items-center justify-between px-4 py-2 text-xs text-slate-400">
        <span>{user.email}</span>
        <button onClick={signOut} className="underline">
          Salir
        </button>
      </header>
      {children}
      <NavBar />
    </div>
  );
}
