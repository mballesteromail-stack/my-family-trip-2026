"use client";

import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";

export interface ExpenseEntry {
  amount: number;
  note?: string;
  updatedBy?: string;
}

type ExpenseMap = Record<string, ExpenseEntry>;

const COLLECTION = "expenses";

export function useExpenses() {
  const [items, setItems] = useState<ExpenseMap>({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, COLLECTION), (snapshot) => {
      const next: ExpenseMap = {};
      snapshot.forEach((docSnap) => {
        next[docSnap.id] = docSnap.data() as ExpenseEntry;
      });
      setItems(next);
    });
    return unsub;
  }, []);

  return items;
}

export function useExpenseActions() {
  const { user } = useAuth();

  const setAmount = async (dayId: string, amount: number) => {
    await setDoc(
      doc(db, COLLECTION, dayId),
      { amount, updatedBy: user?.email ?? null, updatedAt: serverTimestamp() },
      { merge: true }
    );
  };

  const setNote = async (dayId: string, note: string) => {
    await setDoc(
      doc(db, COLLECTION, dayId),
      { note, updatedBy: user?.email ?? null, updatedAt: serverTimestamp() },
      { merge: true }
    );
  };

  return { setAmount, setNote };
}
