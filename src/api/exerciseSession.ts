import type { ExerciseSession } from "../types/exerciseSession";
import { api } from "./client";

export async function getExerciseSession(id: number, sessionId: number, workoutId: number) {
	const res = await api.get<ExerciseSession>(
		`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions/${id}`,
	);
	return res.data;
}

export async function createExerciseSession(
    sessionId: number,
    exerciseId: number,
	workoutId: number,
) {
	const res = await api.post<ExerciseSession>(
		`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions`,
		{ exerciseId },
	);
	return res.data;
}

export async function deleteExerciseSession(id: number, sessionId: number, workoutId: number) {
	const res = await api.delete(
		`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions/${id}`,
	);
	return res.data;
}

export async function updateExerciseSession(
	id: number,
	sessionId: number,
    workoutId: number,
	field: string,
	value: unknown,
) {
	const res = await api.patch(
		`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions/${id}/${field}`,
		{ [field]: value },
	);
	return res.data;
}
