import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getFirebaseConfig } from "./config";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === "undefined") return null;
  const config = getFirebaseConfig();
  if (!config) return null;
  if (!app) {
    app = getApps().length ? getApps()[0]! : initializeApp(config);
    if (config.measurementId) {
      import("firebase/analytics")
        .then(({ getAnalytics, isSupported }) =>
          isSupported().then((ok) => {
            if (ok && app) getAnalytics(app);
          })
        )
        .catch(() => undefined);
    }
  }
  return app;
}

export function getFirebaseAuth(): Auth | null {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!auth) auth = getAuth(firebaseApp);
  return auth;
}

export function getFirebaseDb(): Firestore | null {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!db) db = getFirestore(firebaseApp);
  return db;
}
