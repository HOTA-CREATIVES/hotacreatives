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
});
