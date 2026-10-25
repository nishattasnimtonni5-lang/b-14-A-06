import type { Iworkout } from "@/types/workout.type";

/** Minimal valid workout for tests; tweak fields per case. */
export const makeWorkout = (id: number): Iworkout => ({
  id,
  name: `Workout ${id}`,
  image: `https://example.com/workout-${id}.jpg`,
  muscleGroups: ["Chest"],
  equipment: "Barbell",
  difficulty: "Intermediate",
  duration: id * 10,
  caloriesBurned: id * 100,
  sets: 3,
  reps: "8",
  rating: 4.5,
  description: `Description for workout ${id}`,
  instructions: ["Step one", "Step two"],
});
