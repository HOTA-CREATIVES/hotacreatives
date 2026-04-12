import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { hasAdminAccess } from "@/services/admin-auth.service";
import { ROUTES } from "@/routes";

type Props = {
  children: ReactNode;
};

export default function AdminProtectedRoute({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsAuthorized(await hasAdminAccess(user.uid));
      } catch {
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-bg-primary">
        <p className="text-text-secondary">Checking admin session...</p>
      </section>
    );
  }

  if (!isAuthorized) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  return <>{children}</>;
}
