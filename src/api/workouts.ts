import type { Workout } from "../types/workout";
import { api } from "./client";

export const getWorkouts = async (): Promise<Workout[]> => {
	const res = await api.get<Workout[]>("/workouts");
	return res.data;
};

export async function getWorkout(id: number) {
	const res = await api.get<Workout>(`/workouts/${id}`);
	return res.data;
}

export async function createWorkout(name: string) {
	const res = await api.post<Workout>("/workouts", { name });
	return res.data;
}

export async function deleteWorkout(id: number) {
	const res = await api.delete(`/workouts/${id}`);
	return res.data;
}

export async function updateWorkout(id: number, field: string, value: unknown) {
	const res = await api.patch(`/workouts/${id}/${field}`, { [field]: value });
	return res.data;
}
