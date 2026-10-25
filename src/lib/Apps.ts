import { Iworkout } from "@/types/workout.type";

const BASE_URL = "https://api.api-store.workers.dev/api/fitlog";

export const getAllCategory = async (): Promise<Iworkout[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch workouts. Status: ${res.status}`);
  }
  const data = await res.json();
  // Defensive: a non-array payload should render an empty library, not crash.
  return Array.isArray(data) ? data : [];
};

export const getWorkoutDetails = async (id: string): Promise<Iworkout> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch workout details. Status:${res.status}`);
  }
  const data = await res.json();
  return data;
};
