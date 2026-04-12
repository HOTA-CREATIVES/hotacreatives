import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NewsletterCTA from "@/components/blog/NewsletterCTA";

describe("NewsletterCTA", () => {
  it("submits email and shows success state", () => {
    vi.useFakeTimers();

    render(<NewsletterCTA variant="inline" />);

    fireEvent.change(screen.getByPlaceholderText("your@email.com"), {
      target: { value: "admin@hota.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(screen.getByText(/You're in!/i)).toBeInTheDocument();

    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();
  });
});
