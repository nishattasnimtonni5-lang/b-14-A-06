import type { Dispatch, SetStateAction } from "react";
import { Iworkout } from "@/types/workout.type";

const STORAGE_KEY = "fitlog-plan";

export type PlanState = {
  todayPlan: Iworkout[];
  savedPlan: Iworkout[];
};

const EMPTY: PlanState = { todayPlan: [], savedPlan: [] };

// Runs on both server and client at import time; storage is client-only.
const readStorage = (): PlanState => {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return {
      todayPlan: Array.isArray(parsed?.todayPlan) ? parsed.todayPlan : [],
      savedPlan: Array.isArray(parsed?.savedPlan) ? parsed.savedPlan : [],
    };
  } catch {
    // Corrupt JSON or storage unavailable (private mode / quota) — start empty.
    return EMPTY;
  }
};

let state: PlanState = readStorage();
const listeners = new Set<() => void>();

const commit = (next: PlanState) => {
  state = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Persist failed — keep the in-memory state for this session.
    }
  }
  listeners.forEach((listener) => listener());
};

export const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Client snapshot — the live state (seeded from localStorage at import). */
export const getPlanSnapshot = (): PlanState => state;

/** Server/prerender snapshot — must match the static HTML, which is empty. */
export const getServerSnapshot = (): PlanState => EMPTY;

export const setTodayPlan: Dispatch<SetStateAction<Iworkout[]>> = (action) => {
  const value =
    typeof action === "function" ? action(state.todayPlan) : action;
  commit({ ...state, todayPlan: value });
};

export const setSavedPlan: Dispatch<SetStateAction<Iworkout[]>> = (action) => {
  const value =
    typeof action === "function" ? action(state.savedPlan) : action;
  commit({ ...state, savedPlan: value });
};
