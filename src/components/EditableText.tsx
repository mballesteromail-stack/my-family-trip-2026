"use client";

import { useState } from "react";
import { useEditableContent, useEditableContentActions } from "@/hooks/useEditableContent";
import { useAuth } from "@/lib/auth";

interface Props {
  id: string;
  defaultText: string;
  as?: "p" | "span";
  className?: string;
}

export default function EditableText({ id, defaultText, as = "p", className }: Props) {
  const { isAdmin } = useAuth();
  const items = useEditableContent();
  const { setText } = useEditableContentActions();
  const current = items[id]?.text ?? defaultText;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(current);

  if (!isAdmin) {
    const ReadOnlyTag = as;
    return <ReadOnlyTag className={className}>{current}</ReadOnlyTag>;
  }

  if (editing) {
    return (
      <div className="my-1 flex flex-col gap-2">
        <textarea
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={Math.min(6, Math.max(2, Math.ceil(draft.length / 40)))}
          className="w-full rounded-lg border border-slate-300 p-2 text-sm"
        />
        <div className="flex gap-2">
          <button
            onClick={() => {
              setText(id, draft);
              setEditing(false);
            }}
            className="rounded-lg bg-brand-600 px-3 py-1 text-xs font-semibold text-white"
          >
            Guardar
          </button>
          <button
            onClick={() => {
              setDraft(current);
              setEditing(false);
            }}
            className="rounded-lg border border-slate-300 px-3 py-1 text-xs text-slate-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  const Tag = as;
  return (
    <Tag
      onClick={() => {
        setDraft(current);
        setEditing(true);
      }}
      className={`${className ?? ""} cursor-text decoration-dotted underline-offset-4 hover:underline`}
      title="Tocá para editar"
    >
      {current}
    </Tag>
  );
}
