import type { Exercise } from "../types/exercise";
import { api } from "./client";

export const getExercises = async (workoutId: number): Promise<Exercise[]> => {
	const res = await api.get<Exercise[]>(`/workouts/${workoutId}/exercises`);
	return res.data;
};

export async function getExercise(workoutId: number, id: number) {
	const res = await api.get<Exercise>(`/workouts/${workoutId}/exercises/${id}`);
	return res.data;
}

export async function createExercise(workoutId: number, name: string) {
	const res = await api.post<Exercise>(`/workouts/${workoutId}/exercises`, { name });
	return res.data;
}

export async function deleteExercise(workoutId: number, id: number) {
	const res = await api.delete(`/workouts/${workoutId}/exercises/${id}`);
	return res.data;
}

export async function updateExercise(
	workoutId: number,
	id: number,
	field: string,
	value: string | boolean | number,
) {
	const res = await api.patch(`/workouts/${workoutId}/exercises/${id}/${field}`, {
		[field]: value,
	});
	return res.data;
}
