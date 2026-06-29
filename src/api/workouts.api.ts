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
}

export async function updateWorkout(id: number, field: string, value: unknown): Promise<Workout> {
	const res = await api.patch(`/workouts/${id}/${field}`, { [field]: value });
	return res.data;
}
