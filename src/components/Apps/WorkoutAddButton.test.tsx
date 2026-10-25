import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { toast } from "react-toastify";
import WorkoutAddButton from "@/components/Apps/WorkoutAddButton";
import PlanProvider from "@/app/context/PlanContext";
import { getPlanSnapshot, setSavedPlan, setTodayPlan } from "@/app/context/planStore";
import { makeWorkout } from "@/test/fixtures";
import type { Iworkout } from "@/types/workout.type";

vi.mock("react-toastify", () => ({
  toast: { info: vi.fn(), success: vi.fn() },
}));

const renderButton = (data: Iworkout) =>
  render(
    <PlanProvider>
      <WorkoutAddButton data={data} />
    </PlanProvider>
  );

describe("WorkoutAddButton", () => {
  beforeEach(() => {
    localStorage.clear();
    setTodayPlan([]);
    setSavedPlan([]);
    vi.clearAllMocks();
  });

  afterEach(cleanup);

  it("adds a workout to today's plan and toasts success", () => {
    const workout = makeWorkout(1);
    renderButton(workout);

    fireEvent.click(screen.getByRole("button", { name: /add to today/i }));

    expect(getPlanSnapshot().todayPlan).toHaveLength(1);
    expect(toast.success).toHaveBeenCalledWith(
      `${workout.name} added to today's plan.`
    );
  });

  it("rejects a duplicate instead of adding it twice", () => {
    const workout = makeWorkout(1);
    setTodayPlan([workout]);
    renderButton(workout);

    fireEvent.click(screen.getByRole("button", { name: /add to today/i }));

    expect(getPlanSnapshot().todayPlan).toHaveLength(1);
    expect(toast.info).toHaveBeenCalledWith(
      `${workout.name} is already in today's plan.`
    );
  });

  it("enforces the cap of five lifts", () => {
    setTodayPlan([1, 2, 3, 4, 5].map(makeWorkout));
    renderButton(makeWorkout(6));

    fireEvent.click(screen.getByRole("button", { name: /add to today/i }));

    expect(getPlanSnapshot().todayPlan).toHaveLength(5);
    expect(toast.info).toHaveBeenCalledWith(
      "Cap of five lifts for today. Finish one before adding another."
    );
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("saves a workout for later without touching today's plan", () => {
    const workout = makeWorkout(7);
    renderButton(workout);

    fireEvent.click(screen.getByRole("button", { name: /save for later/i }));

    expect(getPlanSnapshot().savedPlan).toHaveLength(1);
    expect(getPlanSnapshot().todayPlan).toHaveLength(0);
    expect(toast.success).toHaveBeenCalledWith(
      `${workout.name} added to saved plan.`
    );
  });
});
