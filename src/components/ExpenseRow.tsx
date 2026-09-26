"use client";

import { useState } from "react";
import { useExpenses, useExpenseActions } from "@/hooks/useExpenses";
import { useAuth } from "@/lib/auth";

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

  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <span className="text-sm text-slate-700">{label}</span>
      <div className="flex items-center gap-1">
        <span className="text-xs text-slate-400">USD</span>
        <input
          type="number"
          inputMode="decimal"
          value={draft}
          disabled={!isAdmin}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => {
            const n = parseFloat(draft);
            setAmount(dayId, isNaN(n) ? 0 : n);
          }}
          placeholder="0"
          className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-right text-sm disabled:bg-slate-50 disabled:text-slate-400"
        />
      </div>
    </li>
  );
}
