import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  LockKeyhole,
  Save,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import {
  DEFAULT_ADMIN_SETTINGS,
  getAdminSettings,
  saveAdminSettings,
  type AdminSettings,
} from "@/services";
import { ROUTES } from "@/routes";
import AdminSidebar from "@/components/shell/AdminSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { Switch } from "@/components/base/switch";
import { Checkbox } from "@/components/base/checkbox";
import { Button } from "@/components/base/button";

export default function AdminSettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<AdminSettings>(DEFAULT_ADMIN_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSettings() {
      setError("");
      try {
        const loaded = await getAdminSettings();
        setSettings(loaded);
      } catch {
        setError("Failed to load settings from Firestore.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadSettings();
  }, []);

  async function handleLogout() {
    await signOut(auth);
    navigate(ROUTES.ADMIN_LOGIN, { replace: true });
  }

  const publishingSummary = useMemo(() => {
    return settings.requireTwoStepApproval
      ? "Two-step review is required before publishing."
      : "Editors can publish without two-step approval.";
  }, [settings.requireTwoStepApproval]);

  async function handleSaveSettings() {
    setMessage("");
    setError("");
    setIsSaving(true);

    try {
      const updatedBy = auth.currentUser?.uid || "system";
      await saveAdminSettings(settings, updatedBy);
      setMessage("Settings saved successfully.");
    } catch {
      setError("Failed to save settings. Check Firestore permissions.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <AdminSidebar activePage="settings" onLogout={handleLogout} />

        <section className="space-y-6" aria-labelledby="admin-settings-heading">
          <header className="rounded-2xl border border-border/70 bg-bg-secondary/80 p-5 shadow-lg backdrop-blur-sm sm:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
              HOTA Admin
            </p>
            <h1
              id="admin-settings-heading"
              className="mt-1 text-3xl font-black"
            >
              Settings & Preferences
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Tune your publishing workflow, notification controls, and account
              safeguards.
            </p>
          </header>

          {message ? (
            <p className="rounded-xl border border-border bg-bg-secondary px-4 py-3 text-sm text-text-secondary">
              {message}
            </p>
          ) : null}

          {error ? (
            <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <div className="grid gap-5 xl:grid-cols-2">
            <Card className="border-border/70 bg-bg-secondary/80 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <SlidersHorizontal size={18} />
                  Publishing Defaults
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Define default settings for your editorial operations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        siteName: e.target.value,
                      }))
                    }
                    placeholder="HOTA Creatives"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        supportEmail: e.target.value,
                      }))
                    }
                    placeholder="admin@hota.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultPostStatus">Default Post Status</Label>
                  <select
                    id="defaultPostStatus"
                    value={settings.defaultPostStatus}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        defaultPostStatus: e.target
                          .value as AdminSettings["defaultPostStatus"],
                      }))
                    }
                    className="w-full rounded-md border border-border bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent"
                  >
                    <option value="draft">draft</option>
                    <option value="published">published</option>
                  </select>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border bg-bg-primary/60 px-3 py-2">
                  <div>
                    <p className="text-sm font-semibold">
                      Require 2-step approval
                    </p>
                    <p className="text-xs text-text-secondary">
                      {publishingSummary}
                    </p>
                  </div>
                  <Switch
                    checked={settings.requireTwoStepApproval}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        requireTwoStepApproval: checked,
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-bg-secondary/80 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell size={18} />
                  Notifications
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Control where and when admin alerts are sent.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-center gap-3 rounded-lg border border-border bg-bg-primary/60 px-3 py-2">
                  <Checkbox
                    checked={settings.enableAdminEmailAlerts}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        enableAdminEmailAlerts: checked === true,
                      }))
                    }
                  />
                  <span className="text-sm">Enable admin email alerts</span>
                </label>

                <label className="flex items-center gap-3 rounded-lg border border-border bg-bg-primary/60 px-3 py-2">
                  <Checkbox
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        weeklyDigest: checked === true,
                      }))
                    }
                  />
                  <span className="text-sm">Receive weekly content digest</span>
                </label>

                <label className="flex items-center gap-3 rounded-lg border border-border bg-bg-primary/60 px-3 py-2">
                  <Checkbox
                    checked={settings.notifyOnNewComment}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifyOnNewComment: checked === true,
                      }))
                    }
                  />
                  <span className="text-sm">Notify on new comments</span>
                </label>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-bg-secondary/80 shadow-lg xl:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck size={18} />
                  Security Controls
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Set safer defaults for administrative access.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-bg-primary/60 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <LockKeyhole size={16} className="text-text-secondary" />
                    <h3 className="text-sm font-semibold">
                      Profile Change Guard
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary">
                    When enabled, admin profile edits should be reviewed by
                    another admin.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-text-muted">
                      Lock profile edits
                    </span>
                    <Switch
                      checked={settings.lockProfileChanges}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          lockProfileChanges: checked,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-bg-primary/60 p-4">
                  <h3 className="text-sm font-semibold">Security Snapshot</h3>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    <li>
                      Default publish mode:{" "}
                      <strong>{settings.defaultPostStatus}</strong>
                    </li>
                    <li>
                      2-step approval:{" "}
                      <strong>
                        {settings.requireTwoStepApproval ? "On" : "Off"}
                      </strong>
                    </li>
                    <li>
                      Profile lock:{" "}
                      <strong>
                        {settings.lockProfileChanges ? "On" : "Off"}
                      </strong>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button type="button" onClick={handleSaveSettings} className="gap-2" disabled={isLoading || isSaving}>
              <Save size={16} />
              {isLoading ? "Loading..." : isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
