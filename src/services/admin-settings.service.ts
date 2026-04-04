import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { logAdminAuditEvent } from "./admin-audit.service";

export type AdminSettings = {
  siteName: string;
  supportEmail: string;
  defaultPostStatus: "draft" | "published";
  requireTwoStepApproval: boolean;
  enableAdminEmailAlerts: boolean;
  weeklyDigest: boolean;
  notifyOnNewComment: boolean;
  lockProfileChanges: boolean;
};

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  siteName: "HOTA Creatives",
  supportEmail: "admin@hota.com",
  defaultPostStatus: "draft",
  requireTwoStepApproval: false,
  enableAdminEmailAlerts: true,
  weeklyDigest: true,
  notifyOnNewComment: true,
  lockProfileChanges: false,
};

const ADMIN_SETTINGS_DOC = doc(db, "settings", "admin");

export async function getAdminSettings(): Promise<AdminSettings> {
  const snapshot = await getDoc(ADMIN_SETTINGS_DOC);
  if (!snapshot.exists()) {
    return DEFAULT_ADMIN_SETTINGS;
  }

  const data = snapshot.data() as Partial<AdminSettings>;
  return { ...DEFAULT_ADMIN_SETTINGS, ...data };
}

export async function saveAdminSettings(
  settings: AdminSettings,
  updatedBy: string,
): Promise<void> {
  await setDoc(
    ADMIN_SETTINGS_DOC,
    {
      ...settings,
      updatedBy,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  // Audit writes are best-effort and should not block a successful settings save.
  try {
    await logAdminAuditEvent({
      action: "settings.updated",
      targetType: "settings",
      targetId: "admin",
      changes: settings as unknown as Record<string, unknown>,
      metadata: { updatedBy },
    });
  } catch {
    // no-op
  }
}
