import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/services/firebase";

type AuditTargetType = "settings" | "admin-user" | "profile" | "blog";

export type AdminAuditEvent = {
  action: string;
  targetType: AuditTargetType;
  targetId: string;
  changes?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
};

export async function logAdminAuditEvent(
  event: AdminAuditEvent,
): Promise<void> {
  const actor = auth.currentUser;

  await addDoc(collection(db, "admin_audit_logs"), {
    action: event.action,
    targetType: event.targetType,
    targetId: event.targetId,
    actorUid: actor?.uid || "unknown",
    actorEmail: actor?.email || "unknown",
    changes: event.changes || {},
    metadata: event.metadata || {},
    createdAt: serverTimestamp(),
  });
}
