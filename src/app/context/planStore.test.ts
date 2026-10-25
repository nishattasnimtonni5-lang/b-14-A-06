import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeWorkout } from "@/test/fixtures";

const STORAGE_KEY = "fitlog-plan";

type Store = typeof import("./planStore");

// planStore keeps module-level state, so each test re-imports a fresh copy.
const loadStore = async (): Promise<Store> => {
  vi.resetModules();
  return import("./planStore");
};

describe("planStore", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("starts empty when nothing is stored", async () => {
    const store = await loadStore();
    expect(store.getPlanSnapshot()).toEqual({ todayPlan: [], savedPlan: [] });
    expect(store.getServerSnapshot()).toEqual({ todayPlan: [], savedPlan: [] });
  });

  it("hydrates from localStorage at import time", async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ todayPlan: [makeWorkout(1)], savedPlan: [makeWorkout(2)] })
    );
    const store = await loadStore();

    expect(store.getPlanSnapshot().todayPlan).toHaveLength(1);
    expect(store.getPlanSnapshot().savedPlan[0]?.id).toBe(2);
    // The server snapshot must stay empty so prerendered HTML matches.
    expect(store.getServerSnapshot()).toEqual({ todayPlan: [], savedPlan: [] });
  });

  it("persists every change and rehydrates on the next load", async () => {
    const store = await loadStore();
    store.setTodayPlan([makeWorkout(3)]);
    store.setSavedPlan((prev) => [...prev, makeWorkout(4)]);

    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(persisted.todayPlan).toHaveLength(1);
    expect(persisted.savedPlan).toHaveLength(1);

    const reloaded = await loadStore();
    expect(reloaded.getPlanSnapshot().todayPlan[0]?.id).toBe(3);
    expect(reloaded.getPlanSnapshot().savedPlan[0]?.id).toBe(4);
  });

  it("supports functional updates (remove by id)", async () => {
    const store = await loadStore();
    store.setTodayPlan([makeWorkout(1), makeWorkout(2)]);

    store.setTodayPlan((prev) =>
      prev.filter((workout) => String(workout.id) !== "1")
    );

    expect(
      store.getPlanSnapshot().todayPlan.map((workout) => workout.id)
    ).toEqual([2]);
  });

  it("survives corrupt stored JSON", async () => {
    localStorage.setItem(STORAGE_KEY, "{definitely not json");
    const store = await loadStore();
    expect(store.getPlanSnapshot()).toEqual({ todayPlan: [], savedPlan: [] });
  });

  it("notifies subscribers on change and stops after unsubscribe", async () => {
    const store = await loadStore();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    store.setTodayPlan([makeWorkout(1)]);
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    store.setSavedPlan([makeWorkout(2)]);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
