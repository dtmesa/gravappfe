import type { Averages } from "../screens/ActiveExercise/AverageRow";
import type { Exercise } from "../types/exercise";
import { api } from "./client";

export const getExercises = async (workoutId: number): Promise<Exercise[]> => {
	const res = await api.get<Exercise[]>(`/workouts/${workoutId}/exercises`);
	return res.data;
};

export async function getExercise(workoutId: number, id: number): Promise<Exercise> {
	const res = await api.get<Exercise>(`/workouts/${workoutId}/exercises/${id}`);
	return res.data;
}

export async function createExercise(workoutId: number, name: string): Promise<Exercise> {
	const res = await api.post<Exercise>(`/workouts/${workoutId}/exercises`, { name });
	return res.data;
}

export async function deleteExercise(workoutId: number, id: number): Promise<void> {
	await api.delete(`/workouts/${workoutId}/exercises/${id}`);
}

export async function updateExercise(
	workoutId: number,
	id: number,
	field: string,
	value: unknown,
): Promise<Exercise> {
	const res = await api.patch(`/workouts/${workoutId}/exercises/${id}/${field}`, {
		[field]: value,
	});
	return res.data;
}

export async function getWeeklyAverages(
	workoutId: number,
	exerciseId: number,
): Promise<Averages | null> {
	const res = await api.get<Averages | null>(
		`/workouts/${workoutId}/exercises/${exerciseId}/averages`,
	);
	return res.data;
}

export async function getAllAverages(
	workoutId: number,
	exerciseId: number,
): Promise<Averages | null> {
	const res = await api.get<Averages | null>(
		`/workouts/${workoutId}/exercises/${exerciseId}/averages/all`,
	);
	return res.data;
}
