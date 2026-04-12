import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

type AdminProfile = {
  role?: string;
  isActive?: boolean;
};
export async function hasAdminAccess(uid: string): Promise<boolean> {
  const snapshot = await getDoc(doc(db, "admins", uid));
  if (!snapshot.exists()) return false;
  const data = snapshot.data() as AdminProfile;
  return data.role === "admin" && data.isActive !== false;
}