import Link from "next/link";
import { transport } from "@/data/itinerary";
import Callout from "@/components/Callout";

export default function TransportPage() {
  return (
    <main className="mx-auto max-w-md p-4">
      <Link href="/" className="text-xs text-brand-600">
        ← Volver
      </Link>
      <h1 className="mt-1 text-xl font-bold text-slate-800">Transporte y datos fijos</h1>

      <ul className="mt-4 space-y-2">
        {transport.fixedRules.map((rule, i) => (
          <li key={i} className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm">
            {rule}
          </li>
        ))}
      </ul>

      <h2 className="mt-5 mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Lo que no es subte
      </h2>
      <Callout>{transport.specialSegments}</Callout>
    </main>
  );
}
