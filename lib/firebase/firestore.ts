import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { getFirebaseDb } from "./client";
import type { LocalBusiness, LocalLead } from "@/lib/local-store";

function requireDb() {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firestore não configurado");
  return db;
}

export async function saveBusinessToFirestore(
  userId: string,
  business: LocalBusiness
) {
  const db = requireDb();
  await setDoc(
    doc(db, "users", userId, "businesses", business.id),
    {
      ...business,
      ownerId: userId,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function listBusinessesFromFirestore(
  userId: string
): Promise<LocalBusiness[]> {
  const db = requireDb();
  const snap = await getDocs(
    query(
      collection(db, "users", userId, "businesses"),
      orderBy("created_at", "desc")
    )
  );
  return snap.docs.map((d) => {
    const data = d.data() as DocumentData;
    return {
      id: d.id,
      name: data.name,
      segment: data.segment ?? "",
      city: data.city ?? "",
      description: data.description ?? "",
      wizard_completed: Boolean(data.wizard_completed),
      wizard_step: data.wizard_step ?? 1,
      wizardData: data.wizardData,
      assets: data.assets ?? {},
      created_at: data.created_at ?? new Date().toISOString(),
    } as LocalBusiness;
  });
}

export async function getBusinessFromFirestore(
  userId: string,
  businessId: string
): Promise<LocalBusiness | null> {
  const db = requireDb();
  const snap = await getDoc(doc(db, "users", userId, "businesses", businessId));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    id: snap.id,
    name: data.name,
    segment: data.segment ?? "",
    city: data.city ?? "",
    description: data.description ?? "",
    wizard_completed: Boolean(data.wizard_completed),
    wizard_step: data.wizard_step ?? 1,
    wizardData: data.wizardData,
    assets: data.assets ?? {},
    created_at: data.created_at ?? new Date().toISOString(),
  } as LocalBusiness;
}

export async function deleteBusinessFromFirestore(
  userId: string,
  businessId: string
) {
  const db = requireDb();
  await deleteDoc(doc(db, "users", userId, "businesses", businessId));
}

export async function saveLeadToFirestore(lead: LocalLead) {
  const db = requireDb();
  await setDoc(doc(db, "leads", lead.id), {
    ...lead,
    createdAt: serverTimestamp(),
  });
}

export async function saveUserProfile(
  userId: string,
  profile: { name: string; email: string; role?: string }
) {
  const db = requireDb();
  await setDoc(
    doc(db, "users", userId),
    {
      ...profile,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function listLeadsFromFirestore(): Promise<LocalLead[]> {
  const db = requireDb();
  const snap = await getDocs(
    query(collection(db, "leads"), orderBy("created_at", "desc"))
  );
  return snap.docs.map((d) => d.data() as LocalLead);
}

export async function updateWorkspaceAccess(
  email: string,
  status: "active" | "suspended",
  plan?: string
) {
  const db = requireDb();
  const q = query(collection(db, "workspaces"), where("buyerEmail", "==", email));
  const snap = await getDocs(q);
  if (snap.empty) {
    const id = crypto.randomUUID();
    await setDoc(doc(db, "workspaces", id), {
      buyerEmail: email,
      status,
      plan: plan ?? "basic",
      createdAt: serverTimestamp(),
    });
    return;
  }
  await Promise.all(
    snap.docs.map((d) =>
      updateDoc(d.ref, { status, plan: plan ?? d.data().plan, updatedAt: serverTimestamp() })
    )
  );
}
