import { getApps, initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function initAdminApp() {
  if (getApps().length) return getApps()[0];

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (projectId && clientEmail && privateKey) {
    return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  } else if (projectId && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return initializeApp({ projectId, credential: applicationDefault() });
  }
  return null;
}

export function getAdminDb() {
  const app = initAdminApp();
  return app ? getFirestore(app) : null;
}

export function getAdminAuth() {
  const app = initAdminApp();
  return app ? getAuth(app) : null;
}
