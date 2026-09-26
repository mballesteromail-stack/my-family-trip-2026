"use client";

import { useState } from "react";
import { useExpenses, useExpenseActions } from "@/hooks/useExpenses";
import { useAuth } from "@/lib/auth";
import { formatUSD } from "@/lib/format";

interface Props {
  dayId: string;
  label: string;
}

export default function ExpenseRow({ dayId, label }: Props) {
  const { isAdmin } = useAuth();
  const items = useExpenses();
  const { setAmount } = useExpenseActions();
  const entry = items[dayId];
  const [draft, setDraft] = useState(entry?.amount != null ? String(entry.amount) : "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    const n = parseFloat(draft);
    setError(null);
    setSaving(true);
    try {
      await setAmount(dayId, isNaN(n) ? 0 : n);
    } catch (e) {
      setError("No se pudo guardar (revisá las reglas de Firestore).");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-slate-700">{label}</span>
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-400">$</span>
          <input
            type="number"
            inputMode="decimal"
            value={draft}
            disabled={!isAdmin || saving}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
            placeholder="0"
            className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-right text-sm disabled:bg-slate-50 disabled:text-slate-400"
          />
          {isAdmin && (
            <button
              onClick={save}
              disabled={saving}
              className="rounded-lg bg-brand-600 px-2 py-1 text-xs font-semibold text-white disabled:opacity-50"
            >
              {saving ? "..." : "Guardar"}
            </button>
          )}
        </div>
      </div>
      {entry?.amount != null && (
        <p className="mt-1 text-right text-xs text-slate-400">{formatUSD(entry.amount)}</p>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </li>
  );
}
