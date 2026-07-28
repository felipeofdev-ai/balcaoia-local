import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  isSignInWithEmailLink,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { getFirebaseAuth } from "./client";
import { isFirebaseConfigured } from "./config";

export { isFirebaseConfigured };

export function watchAuth(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth();
  if (!auth) {
    callback(null);
    return () => undefined;
  }
  return onAuthStateChanged(auth, callback);
}

export async function firebaseSignIn(email: string, password: string) {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase não configurado");
  return signInWithEmailAndPassword(auth, email, password);
}

export async function firebaseSignUp(
  email: string,
  password: string,
  name?: string
) {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase não configurado");
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (name) {
    await updateProfile(cred.user, { displayName: name });
  }
  return cred;
}

export async function firebaseSendMagicLink(email: string) {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase não configurado");
  const actionCodeSettings = {
    url: `${window.location.origin}/app/login?emailLink=1`,
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem("balcaoia_email_for_sign_in", email);
}

export async function firebaseCompleteMagicLink(email?: string) {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase não configurado");
  if (!isSignInWithEmailLink(auth, window.location.href)) {
    return null;
  }
  const mail =
    email ||
    window.localStorage.getItem("balcaoia_email_for_sign_in") ||
    window.prompt("Confirme seu e-mail para concluir o login");
  if (!mail) throw new Error("E-mail necessário para concluir o link mágico");
  const cred = await signInWithEmailLink(auth, mail, window.location.href);
  window.localStorage.removeItem("balcaoia_email_for_sign_in");
  return cred;
}

export async function firebaseResetPassword(email: string) {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase não configurado");
  return sendPasswordResetEmail(auth, email);
}

export async function firebaseLogout() {
  const auth = getFirebaseAuth();
  if (!auth) return;
  await signOut(auth);
}

export function getCurrentFirebaseUser(): User | null {
  return getFirebaseAuth()?.currentUser ?? null;
}
