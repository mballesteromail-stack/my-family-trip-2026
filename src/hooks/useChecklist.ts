"use client";

import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";

export interface ChecklistEntry {
  done: boolean;
  note: string;
  updatedBy?: string;
}

type ChecklistMap = Record<string, ChecklistEntry>;

const COLLECTION = "checklist";

export function useChecklist() {
  const [items, setItems] = useState<ChecklistMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, COLLECTION), (snapshot) => {
      const next: ChecklistMap = {};
      snapshot.forEach((docSnap) => {
        next[docSnap.id] = docSnap.data() as ChecklistEntry;
      });
      setItems(next);
      setReady(true);
    });
    return unsub;
  }, []);

  return { items, ready };
}

export function useChecklistActions() {
  const { user } = useAuth();

  const setDone = async (id: string, done: boolean) => {
    await setDoc(
      doc(db, COLLECTION, id),
      { done, updatedBy: user?.email ?? null, updatedAt: serverTimestamp() },
      { merge: true }
    );
  };

  const setNote = async (id: string, note: string) => {
    await setDoc(
      doc(db, COLLECTION, id),
      { note, updatedBy: user?.email ?? null, updatedAt: serverTimestamp() },
      { merge: true }
    );
  };

  return { setDone, setNote };
}
