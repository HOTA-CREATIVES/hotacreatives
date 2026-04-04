import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  FolderTree,
  Tag,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import {
  getBlogAuthorsForAdmin,
  getBlogCategoriesForAdmin,
  getBlogPostsForAdmin,
  getBlogTagsForAdmin,
} from "@/services";
import { ROUTES } from "@/routes";
import AdminSidebar from "@/components/shell/AdminSidebar";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminActionTile from "@/components/admin/AdminActionTile";

type DashboardStats = {
  posts: number;
  publishedPosts: number;
  draftPosts: number;
  authors: number;
  categories: number;
  tags: number;
};

const initialStats: DashboardStats = {
  posts: 0,
  publishedPosts: 0,
  draftPosts: 0,
  authors: 0,
  categories: 0,
  tags: 0,
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      setError("");
      try {
        const [posts, authors, categories, tags] = await Promise.all([
          getBlogPostsForAdmin(),
          getBlogAuthorsForAdmin(),
          getBlogCategoriesForAdmin(),
          getBlogTagsForAdmin(),
        ]);

        const publishedPosts = posts.filter(
          (post) =>
            ((post as { status?: string }).status || "published") ===
            "published",
        ).length;

        const draftPosts = posts.filter(
          (post) =>
            ((post as { status?: string }).status || "published") === "draft",
        ).length;

        setStats({
          posts: posts.length,
          publishedPosts,
          draftPosts,
          authors: authors.length,
          categories: categories.length,
          tags: tags.length,
        });
      } catch {
        setError("Failed to load dashboard metrics.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadDashboard();
  }, []);

  async function handleLogout() {
    await signOut(auth);
    navigate(ROUTES.ADMIN_LOGIN, { replace: true });
  }

  const completionRate = useMemo(() => {
    if (!stats.posts) return "0";
    return Math.round((stats.publishedPosts / stats.posts) * 100).toString();
  }, [stats.posts, stats.publishedPosts]);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <AdminSidebar activePage="dashboard" onLogout={handleLogout} />

        <section aria-labelledby="admin-dashboard-title" className="space-y-6">
          <header className="rounded-2xl border border-border/70 bg-bg-secondary/80 p-5 shadow-lg backdrop-blur-sm sm:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
              HOTA Admin
            </p>
            <h1 id="admin-dashboard-title" className="mt-1 text-3xl font-black">
              Dashboard Overview
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Track publishing health, manage content faster, and keep your
              admin workspace in sync.
            </p>
          </header>

          {error ? (
            <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <AdminStatCard
              title="Total Posts"
              value={isLoading ? "..." : stats.posts}
              helperText="All posts in your CMS"
              icon={<FileText size={18} />}
            />
            <AdminStatCard
              title="Published"
              value={isLoading ? "..." : stats.publishedPosts}
              helperText={`${completionRate}% of posts are live`}
              icon={<FolderTree size={18} />}
            />
            <AdminStatCard
              title="Drafts"
              value={isLoading ? "..." : stats.draftPosts}
              helperText="Pending content in pipeline"
              icon={<Wrench size={18} />}
            />
            <AdminStatCard
              title="Authors"
              value={isLoading ? "..." : stats.authors}
              helperText="Contributors in your team"
              icon={<UserRound size={18} />}
            />
            <AdminStatCard
              title="Categories"
              value={isLoading ? "..." : stats.categories}
              helperText="Main topics currently active"
              icon={<FolderTree size={18} />}
            />
            <AdminStatCard
              title="Tags"
              value={isLoading ? "..." : stats.tags}
              helperText="Content taxonomy labels"
              icon={<Tag size={18} />}
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <AdminActionTile
                title="Manage Content"
                description="Create, edit, and organize posts, authors, categories, and tags."
                to={ROUTES.ADMIN_BLOGS}
                icon={<FileText size={16} />}
              />
              <AdminActionTile
                title="Update Profile"
                description="Edit your admin details, avatar, and contact information."
                to={ROUTES.ADMIN_PROFILE}
                icon={<UserRound size={16} />}
              />
              <AdminActionTile
                title="Open Settings"
                description="Configure publishing workflow, notifications, and security preferences."
                to={ROUTES.ADMIN_SETTINGS}
                icon={<Wrench size={16} />}
              />
              <AdminActionTile
                title="Manage Users"
                description="Control role levels and active status for your admin team."
                to={ROUTES.ADMIN_USERS}
                icon={<Users size={16} />}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
