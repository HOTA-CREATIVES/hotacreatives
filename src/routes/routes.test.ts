import { describe, expect, it } from "vitest";
import { ROUTES } from "@/routes/routes";

describe("ROUTES", () => {
  it("keeps unique public routes", () => {
    const publicRoutes = [
      ROUTES.HOME,
      ROUTES.SERVICES,
      ROUTES.PACKAGES,
      ROUTES.PORTFOLIO,
      ROUTES.BLOG,
      ROUTES.CONTACT,
      ROUTES.FREE_AUDIT,
    ];

    expect(new Set(publicRoutes).size).toBe(publicRoutes.length);
  });

  it("keeps admin routes in /admin namespace", () => {
    const adminRoutes = [
      ROUTES.ADMIN_DASHBOARD,
      ROUTES.ADMIN_BLOGS,
      ROUTES.ADMIN_BLOG_CREATE,
      ROUTES.ADMIN_PROFILE,
      ROUTES.ADMIN_SETTINGS,
      ROUTES.ADMIN_USERS,
    ];

    for (const route of adminRoutes) {
      expect(route.startsWith("/admin")).toBe(true);
    }
  });
});
