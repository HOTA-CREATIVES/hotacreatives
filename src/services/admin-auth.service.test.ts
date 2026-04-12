import { describe, expect, it, vi } from "vitest";

vi.mock("@/services/firebase", () => ({
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  doc: vi.fn(() => ({})),
  getDoc: vi.fn(),
}));

import { getDoc } from "firebase/firestore";
import { hasAdminAccess } from "@/services/admin-auth.service";

describe("hasAdminAccess", () => {
  it("returns false when admin profile does not exist", async () => {
    vi.mocked(getDoc).mockResolvedValueOnce({
      exists: () => false,
      data: () => ({}),
    } as never);

    await expect(hasAdminAccess("missing")).resolves.toBe(false);
  });

  it("returns false when role is not admin", async () => {
    vi.mocked(getDoc).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ role: "editor", isActive: true }),
    } as never);

    await expect(hasAdminAccess("editor-user")).resolves.toBe(false);
  });

  it("returns true for active admin", async () => {
    vi.mocked(getDoc).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ role: "admin", isActive: true }),
    } as never);

    await expect(hasAdminAccess("admin-user")).resolves.toBe(true);
  });
});
