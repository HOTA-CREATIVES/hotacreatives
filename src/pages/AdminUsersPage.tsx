import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Shield, UserCog, UserRound } from "lucide-react";
import { auth, db } from "@/services/firebase";
import { logAdminAuditEvent } from "@/services";
import { ROUTES } from "@/routes";
import AdminSidebar from "@/components/shell/AdminSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { Switch } from "@/components/base/switch";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";

type AdminUser = {
  uid: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  isActive: boolean;
  authProvider: string;
};

function normalizeRole(value: string | undefined): "admin" | "editor" {
  return value === "editor" ? "editor" : "admin";
}

export default function AdminUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadUsers() {
      setMessage("");
      try {
        const q = query(collection(db, "admins"), orderBy("name", "asc"));
        const snapshot = await getDocs(q);
        const loaded = snapshot.docs.map((item) => {
          const data = item.data() as Partial<AdminUser>;
          return {
            uid: data.uid || item.id,
            name: data.name || "Unnamed",
            email: data.email || "-",
            role: normalizeRole(data.role),
            isActive: data.isActive ?? true,
            authProvider: data.authProvider || "password",
          };
        });

        setUsers(loaded);
      } catch {
        setMessage("Failed to load admin users.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadUsers();
  }, []);

  async function handleLogout() {
    await signOut(auth);
    navigate(ROUTES.ADMIN_LOGIN, { replace: true });
  }

  async function updateUser(uid: string, payload: Partial<AdminUser>) {
    setMessage("");
    try {
      await setDoc(
        doc(db, "admins", uid),
        {
          ...payload,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
      setUsers((prev) =>
        prev.map((user) => (user.uid === uid ? { ...user, ...payload } : user)),
      );

      try {
        await logAdminAuditEvent({
          action: "admin-user.updated",
          targetType: "admin-user",
          targetId: uid,
          changes: payload as unknown as Record<string, unknown>,
          metadata: {
            updatedBy: auth.currentUser?.uid || "unknown",
          },
        });
      } catch {
        // no-op
      }

      setMessage("User settings updated.");
    } catch {
      setMessage("Failed to update user.");
    }
  }

  const filteredUsers = useMemo(() => {
    const queryValue = search.trim().toLowerCase();
    if (!queryValue) return users;

    return users.filter((user) => {
      return [user.name, user.email, user.role]
        .join(" ")
        .toLowerCase()
        .includes(queryValue);
    });
  }, [users, search]);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <AdminSidebar activePage="users" onLogout={handleLogout} />

        <section className="space-y-6" aria-labelledby="admin-users-heading">
          <header className="rounded-2xl border border-border/70 bg-bg-secondary/80 p-5 shadow-lg backdrop-blur-sm sm:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
              HOTA Admin
            </p>
            <h1 id="admin-users-heading" className="mt-1 text-3xl font-black">
              Users & Roles
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Manage admin access, role levels, and account activity status.
            </p>
          </header>

          {message ? (
            <p className="rounded-xl border border-border bg-bg-secondary px-4 py-3 text-sm text-text-secondary">
              {message}
            </p>
          ) : null}

          <Card className="border-border/70 bg-bg-secondary/80 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserCog size={18} />
                Team Access Management
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Search and update user roles and activation status.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, email, or role"
              />

              {isLoading ? (
                <p className="text-sm text-text-secondary">Loading users...</p>
              ) : filteredUsers.length === 0 ? (
                <p className="text-sm text-text-secondary">No users found.</p>
              ) : (
                <ul className="space-y-3">
                  {filteredUsers.map((user) => (
                    <li
                      key={user.uid}
                      className="rounded-xl border border-border bg-bg-primary/60 p-4"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-xs text-text-muted">
                            {user.email}
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-xs text-text-secondary">
                            <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5">
                              <UserRound size={12} />
                              {user.authProvider}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5">
                              <Shield size={12} />
                              {user.role}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <select
                            value={user.role}
                            onChange={(event) => {
                              void updateUser(user.uid, {
                                role: normalizeRole(event.target.value),
                              });
                            }}
                            className="rounded-md border border-border bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent"
                          >
                            <option value="admin">admin</option>
                            <option value="editor">editor</option>
                          </select>

                          <label className="flex items-center gap-2 text-sm">
                            <span className="text-text-secondary">Active</span>
                            <Switch
                              checked={user.isActive}
                              onCheckedChange={(checked) => {
                                void updateUser(user.uid, {
                                  isActive: checked,
                                });
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(ROUTES.ADMIN_PROFILE)}
            >
              Go to My Profile
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
