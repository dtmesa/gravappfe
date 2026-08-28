import { mutate } from "swr";
import type { Workout } from "../types/workout.types";
import { api } from "./client.api";

export const getWorkouts = async (): Promise<Workout[]> => {
	const res = await api.get<Workout[]>("/workouts");
	return res.data;
};

export async function getWorkout(id: number): Promise<Workout> {
	const res = await api.get<Workout>(`/workouts/${id}`);
	return res.data;
}

export async function createWorkout(name: string): Promise<Workout> {
	const res = await api.post<Workout>("/workouts", { name });
	return res.data;
}

export async function deleteWorkout(id: number): Promise<void> {
	await api.delete(`/workouts/${id}`);
	// Cascades server-side into this workout's sessions/exercise sessions/sets.
	// HistoryScreen's cache is keyed ["sessions", month] and won't know that
	// happened on its own -- HomeScreen defers this call by a few seconds for
	// its undo window, so by the time it actually fires the user may already
	// be sitting on History with no refocus event left to trigger its own
	// mutate(). This reaches the cache from wherever the deletion completed.
	mutate((key) => Array.isArray(key) && key[0] === "sessions");
}

export async function updateWorkout(id: number, field: string, value: unknown): Promise<Workout> {
	const res = await api.patch(`/workouts/${id}/${field}`, { [field]: value });
	return res.data;
}
