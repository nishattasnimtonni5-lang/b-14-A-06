import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { toast } from "react-toastify";
import MyPlan from "@/app/apps/page";
import PlanProvider from "@/app/context/PlanContext";
import { getPlanSnapshot, setSavedPlan, setTodayPlan } from "@/app/context/planStore";
import { makeWorkout } from "@/test/fixtures";

vi.mock("react-toastify", () => ({
  toast: { info: vi.fn(), success: vi.fn() },
}));

// jsdom has no Next router, so supply controllable search params and a
// router.push spy instead.
const navState = vi.hoisted(() => ({ search: "", push: vi.fn() }));

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(navState.search),
  useRouter: () => ({ push: navState.push }),
}));

// next/link and next/image need the Next runtime; stub them for jsdom.
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: unknown; children: React.ReactNode }) => (
    <a href={typeof href === "string" ? href : "#"}>{children}</a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
  }: {
    src: string | { src: string };
    alt: string;
    // eslint-disable-next-line @next/next/no-img-element -- intentional: next/image is mocked for jsdom
  }) => <img src={typeof src === "string" ? src : src.src} alt={alt} />,
}));

const renderPage = () =>
  render(
    <PlanProvider>
      <MyPlan />
    </PlanProvider>
  );

const headingOrder = () =>
  screen.getAllByRole("heading", { level: 3 }).map((node) => node.textContent);

describe("MyPlan page", () => {
  beforeEach(() => {
    localStorage.clear();
    setTodayPlan([]);
    setSavedPlan([]);
    navState.search = "";
    vi.clearAllMocks();
  });

  afterEach(cleanup);

  it("keeps insertion order by default and pushes ?sort=duration when sorting", () => {
    // durations: 10, 20, 30
    setTodayPlan([makeWorkout(1), makeWorkout(2), makeWorkout(3)]);
    renderPage();

    expect(headingOrder()).toEqual(["Workout 1", "Workout 2", "Workout 3"]);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "duration" },
    });

    // Sort is URL-driven, so the change navigates instead of mutating state.
    expect(navState.push).toHaveBeenCalledWith("/apps?sort=duration");
  });

  it("sorts descending when ?sort=duration is in the URL", () => {
    navState.search = "sort=duration";
    setTodayPlan([makeWorkout(1), makeWorkout(2), makeWorkout(3)]);
    renderPage();

    expect(headingOrder()).toEqual(["Workout 3", "Workout 2", "Workout 1"]);
    // Switching tabs must keep the active sort.
    expect(
      screen.getByRole("link", { name: "Saved" }).getAttribute("href")
    ).toBe("/apps?sort=duration&tab=saved");
  });

  it("removes a lift via the remove button and toasts", () => {
    setTodayPlan([makeWorkout(1), makeWorkout(2)]);
    renderPage();

    fireEvent.click(screen.getByRole("button", { name: "Remove Workout 1" }));

    expect(getPlanSnapshot().todayPlan.map((w) => w.id)).toEqual([2]);
    expect(toast.info).toHaveBeenCalledWith(
      "Workout 1 removed from today's plan."
    );
  });

  it("marks a lift as done with a distinct success toast", () => {
    setTodayPlan([makeWorkout(1)]);
    renderPage();

    fireEvent.click(screen.getByRole("button", { name: /mark as done/i }));

    expect(getPlanSnapshot().todayPlan).toEqual([]);
    expect(toast.success).toHaveBeenCalledWith(
      "Workout 1 completed. Nice work!"
    );
    expect(toast.info).not.toHaveBeenCalled();
  });

  it("deep-links to the saved tab via ?tab=saved", () => {
    navState.search = "tab=saved";
    setSavedPlan([makeWorkout(7)]);
    renderPage();

    expect(screen.getByText("Workout 7")).toBeTruthy();
    expect(screen.queryByText("No Plan today")).toBeNull();
    expect(
      screen.getByRole("link", { name: "Today's Plan" }).getAttribute("href")
    ).toBe("/apps");
    expect(
      screen.getByRole("link", { name: "Saved" }).getAttribute("href")
    ).toBe("/apps?tab=saved");
  });
});
