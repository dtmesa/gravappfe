import type { WorkoutSession } from "../types/workoutSession";
import { api } from "./client";

export async function getWorkoutSession(id: number, workoutId: number) {
	const res = await api.get<WorkoutSession>(`/workouts/${workoutId}/sessions/${id}`);
	return res.data;
}

export async function createWorkoutSession(workoutId: number) {
	const res = await api.post<WorkoutSession>(`/workouts/${workoutId}/sessions`);
	return res.data;
}

export async function deleteWorkoutSession(id: number, workoutId: number) {
	const res = await api.delete(`/workouts/${workoutId}/sessions/${id}`);
	return res.data;
}

export async function updateWorkoutSession(
	id: number,
	workoutId: number,
	field: string,
	value: unknown,
) {
	const res = await api.patch(`/workouts/${workoutId}/sessions/${id}/${field}`, { [field]: value });
	return res.data;
}
