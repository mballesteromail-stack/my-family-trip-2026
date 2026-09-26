import Link from "next/link";
import { rules, rulesFootnote } from "@/data/itinerary";
import Callout from "@/components/Callout";

export default function RulesPage() {
  return (
    <main className="mx-auto max-w-md p-4">
      <Link href="/" className="text-xs text-brand-600">
        ← Volver
      </Link>
      <h1 className="mt-1 text-xl font-bold text-slate-800">Reglas para el viaje</h1>

      <ul className="mt-4 space-y-2">
        {rules.map((r, i) => (
          <li key={i} className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm">
            {r}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Callout>{rulesFootnote}</Callout>
      </div>
    </main>
  );
}
