import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase solo se inicializa en el navegador: durante el build estático
// (next export) estos módulos también se evalúan en Node, y ahí no hay
// variables de entorno de Firebase configuradas todavía.
const isBrowser = typeof window !== "undefined";

export const app = isBrowser
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : undefined;

export const auth = isBrowser
  ? getAuth(app!)
  : (undefined as unknown as ReturnType<typeof getAuth>);
export const db = isBrowser
  ? getFirestore(app!)
  : (undefined as unknown as ReturnType<typeof getFirestore>);
export const googleProvider = new GoogleAuthProvider();
