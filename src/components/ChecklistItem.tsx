"use client";

import { useState } from "react";
import { useChecklist, useChecklistActions } from "@/hooks/useChecklist";
import EditableText from "./EditableText";

interface Props {
  id: string;
  time?: string;
  title: string;
}

export default function ChecklistItem({ id, time, title }: Props) {
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
          onChange={(e) => setDone(id, e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        <div className="min-w-0 flex-1">
          {time && (
            <EditableText
              id={`${id}-time`}
              defaultText={time}
              className="text-xs font-semibold uppercase tracking-wide text-brand-600"
            />
          )}
          <EditableText
            id={`${id}-text`}
            defaultText={title}
            className={`text-sm text-slate-800 ${entry?.done ? "line-through opacity-50" : ""}`}
          />

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
            <button
              onClick={() => setEditingNote(true)}
              className="mt-1 block text-left text-xs text-amber-700"
            >
              📝 {entry.note}
            </button>
          ) : (
            <button
              onClick={() => setEditingNote(true)}
              className="mt-1 text-xs text-slate-400 underline"
            >
              + agregar nota
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
