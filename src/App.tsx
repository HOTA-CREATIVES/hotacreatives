import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import { MainLayout } from "@/layouts";
import { ROUTES } from "@/routes/routes";
import AdminProtectedRoute from "@/components/common/AdminProtectedRoute";

// Lazy load pages for better code splitting
const HomePage = lazy(() => import("@/pages/HomePage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const PackagesPage = lazy(() => import("@/pages/PackagesPage"));
const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FreeAuditPage = lazy(() => import("@/pages/FreeAuditPage"));
const BlogListingPage = lazy(() => import("@/pages/BlogListingPage"));
const BlogArticlePage = lazy(() => import("@/pages/BlogArticlePage"));
const BlogAuthorPage = lazy(() => import("@/pages/BlogAuthorPage"));
const BlogCategoryPage = lazy(() => import("@/pages/BlogCategoryPage"));
const AdminLoginPage = lazy(() => import("@/pages/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("@/pages/AdminDashboardPage"));
const AdminBlogsPage = lazy(() => import("@/pages/AdminBlogsPage"));
const AdminPostCreatePage = lazy(() => import("@/pages/AdminPostCreatePage"));
const AdminProfilePage = lazy(() => import("@/pages/AdminProfilePage"));
const AdminSettingsPage = lazy(() => import("@/pages/AdminSettingsPage"));
const AdminUsersPage = lazy(() => import("@/pages/AdminUsersPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-secondary">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#141414",
            border: "1px solid #262626",
            color: "#f5f5f5",
          },
        }}
        richColors
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />
          <Route
            path={ROUTES.ADMIN_DASHBOARD}
            element={
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN_BLOGS}
            element={
              <AdminProtectedRoute>
                <AdminBlogsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN_BLOG_CREATE}
            element={
              <AdminProtectedRoute>
                <AdminPostCreatePage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN_SETTINGS}
            element={
              <AdminProtectedRoute>
                <AdminSettingsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN_PROFILE}
            element={
              <AdminProtectedRoute>
                <AdminProfilePage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN_USERS}
            element={
              <AdminProtectedRoute>
                <AdminUsersPage />
              </AdminProtectedRoute>
            }
          />
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
            <Route path={ROUTES.PACKAGES} element={<PackagesPage />} />
            <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
            <Route path={ROUTES.BLOG} element={<BlogListingPage />} />
            <Route path={ROUTES.BLOG_ARTICLE} element={<BlogArticlePage />} />
            <Route path={ROUTES.BLOG_AUTHOR} element={<BlogAuthorPage />} />
            <Route path={ROUTES.BLOG_CATEGORY} element={<BlogCategoryPage />} />
            <Route path={ROUTES.CONTACT} element={<ContactPage />} />
            <Route path={ROUTES.FREE_AUDIT} element={<FreeAuditPage />} />
          </Route>
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
