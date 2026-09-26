"use client";

import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";

interface ContentEntry {
  text: string;
  updatedBy?: string;
}

type ContentMap = Record<string, ContentEntry>;

const COLLECTION = "content";

export function useEditableContent() {
  const [items, setItems] = useState<ContentMap>({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, COLLECTION), (snapshot) => {
      const next: ContentMap = {};
      snapshot.forEach((docSnap) => {
        next[docSnap.id] = docSnap.data() as ContentEntry;
      });
      setItems(next);
    });
    return unsub;
  }, []);

  return items;
}

export function useEditableContentActions() {
  const { user } = useAuth();

  const setText = async (id: string, text: string) => {
    await setDoc(
      doc(db, COLLECTION, id),
      { text, updatedBy: user?.email ?? null, updatedAt: serverTimestamp() },
      { merge: true }
    );
  };

  return { setText };
}
