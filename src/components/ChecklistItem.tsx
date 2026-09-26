"use client";

import { useState } from "react";
import { useChecklist, useChecklistActions } from "@/hooks/useChecklist";
import { useAuth } from "@/lib/auth";
import EditableText from "./EditableText";

interface Props {
  id: string;
  time?: string;
  title: string;
}

export default function ChecklistItem({ id, time, title }: Props) {
  const { isAdmin } = useAuth();
  const { items } = useChecklist();
  const { setDone, setNote } = useChecklistActions();
  const entry = items[id];
  const [editingNote, setEditingNote] = useState(false);
  const [draft, setDraft] = useState(entry?.note ?? "");

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={!!entry?.done}
          disabled={!isAdmin}
          onChange={(e) => setDone(id, e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-500 disabled:opacity-50"
        />
        <div className="min-w-0 flex-1">
          {time && (
            <EditableText
              id={`${id}-time`}
              defaultText={time}
              className="text-xs font-semibold uppercase tracking-wide text-brand-600"
            />
          )}
          <div className="flex items-start gap-1">
            <EditableText
              id={`${id}-text`}
              defaultText={title}
              className={`text-sm text-slate-800 ${entry?.done ? "line-through opacity-50" : ""}`}
            />
            {isAdmin && (
              <span
                title="Tocá el texto para reemplazar esta actividad (por ejemplo, si el clima no ayuda)"
                className="shrink-0 text-xs text-slate-300"
              >
                🔀
              </span>
            )}
          </div>

          {editingNote ? (
            <div className="mt-2 flex gap-2">
              <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Agregar nota o cambio..."
                className="flex-1 rounded-lg border border-slate-300 px-2 py-1 text-sm"
              />
              <button
                onClick={() => {
                  setNote(id, draft);
                  setEditingNote(false);
                }}
                className="rounded-lg bg-brand-600 px-3 py-1 text-sm text-white"
              >
                Guardar
              </button>
            </div>
          ) : entry?.note ? (
            isAdmin ? (
              <button
                onClick={() => setEditingNote(true)}
                className="mt-1 block text-left text-xs text-amber-700"
              >
                📝 {entry.note}
              </button>
            ) : (
              <p className="mt-1 text-xs text-amber-700">📝 {entry.note}</p>
            )
          ) : isAdmin ? (
            <button
              onClick={() => setEditingNote(true)}
              className="mt-1 text-xs text-slate-400 underline"
            >
              + agregar nota
            </button>
          ) : null}
        </div>
      </div>
    </li>
  );
}
