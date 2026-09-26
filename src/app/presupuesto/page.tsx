import Link from "next/link";
import { budget } from "@/data/itinerary";
import Callout from "@/components/Callout";

export default function BudgetPage() {
  return (
    <main className="mx-auto max-w-md p-4">
      <Link href="/" className="text-xs text-brand-600">
        ← Volver
      </Link>
      <h1 className="mt-1 text-xl font-bold text-slate-800">Presupuesto</h1>

      <ul className="mt-4 space-y-3">
        {budget.rows.map((row) => (
          <li key={row.concept} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-slate-800">{row.concept}</span>
              <span className="text-sm font-bold text-brand-600">{row.total}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{row.detail}</p>
            <p className="mt-1 text-xs italic text-slate-400">{row.note}</p>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Callout>{budget.footnote}</Callout>
      </div>
    </main>
  );
}
