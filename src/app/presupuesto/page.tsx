"use client";

import Link from "next/link";
import { budget, days } from "@/data/itinerary";
import Callout from "@/components/Callout";
import EditableText from "@/components/EditableText";
import ExpenseRow from "@/components/ExpenseRow";
import { useExpenses } from "@/hooks/useExpenses";
import { useEditableContent } from "@/hooks/useEditableContent";

const DEFAULT_CAP = "3150";

export default function BudgetPage() {
  const expenses = useExpenses();
  const content = useEditableContent();
  const total = Object.values(expenses).reduce((sum, e) => sum + (e.amount || 0), 0);
  const capText = content["budget-cap"]?.text ?? DEFAULT_CAP;
  const CAP = parseFloat(capText.replace(/[^\d.-]/g, "")) || 0;
  const remaining = CAP - total;

  return (
    <main className="mx-auto max-w-md p-4">
      <Link href="/" className="text-xs text-brand-600">
        ← Volver
      </Link>
      <h1 className="mt-1 text-xl font-bold text-slate-800">Presupuesto</h1>

      <ul className="mt-4 space-y-3">
        {budget.rows.map((row, i) => (
          <li key={i} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-baseline justify-between gap-2">
              <EditableText
                id={`budget-row-${i}-concept`}
                defaultText={row.concept}
                className="text-sm font-semibold text-slate-800"
              />
              <EditableText
                id={`budget-row-${i}-total`}
                defaultText={row.total}
                className="shrink-0 text-sm font-bold text-brand-600"
              />
            </div>
            <EditableText
              id={`budget-row-${i}-detail`}
              defaultText={row.detail}
              className="mt-1 block text-xs text-slate-500"
            />
            <EditableText
              id={`budget-row-${i}-note`}
              defaultText={row.note}
              className="mt-1 block text-xs italic text-slate-400"
            />
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Callout>
          <EditableText id="budget-footnote" defaultText={budget.footnote} as="span" />
        </Callout>
      </div>

      <h2 className="mt-6 mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Gastos reales del viaje
      </h2>
      <ul className="space-y-2">
        {days.map((day) => (
          <ExpenseRow key={day.id} dayId={day.id} label={day.weekday} />
        ))}
      </ul>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
        <div className="flex justify-between text-slate-700">
          <span>Gastado</span>
          <span className="font-semibold">USD {total.toFixed(0)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-slate-700">
          <span>Tope del viaje</span>
          <span className="flex items-center gap-1">
            USD <EditableText id="budget-cap" defaultText={DEFAULT_CAP} as="span" />
          </span>
        </div>
        <div
          className={`mt-1 flex justify-between font-semibold ${
            remaining < 0 ? "text-red-600" : "text-emerald-600"
          }`}
        >
          <span>{remaining < 0 ? "Nos pasamos" : "Queda"}</span>
          <span>USD {Math.abs(remaining).toFixed(0)}</span>
        </div>
      </div>
    </main>
  );
}
