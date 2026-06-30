import type { ExerciseSession, ExerciseSessionDTO } from "../types/exerciseSession.types";
import { api } from "./client.api";

const mapExerciseSession = (dto: ExerciseSessionDTO): ExerciseSession => ({
	...dto,
	createdAt: new Date(dto.createdAt),
});

export async function getExerciseSessions(
	sessionId: number,
	workoutId: number,
): Promise<ExerciseSession[]> {
	const res = await api.get<ExerciseSessionDTO[]>(
		`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions`,
	);
	return res.data.map(mapExerciseSession);
}

export async function getExerciseSession(
	id: number,
	sessionId: number,
	workoutId: number,
): Promise<ExerciseSession> {
	const res = await api.get<ExerciseSessionDTO>(
		`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions/${id}`,
	);
	return mapExerciseSession(res.data);
}

export async function createExerciseSession(
	sessionId: number,
	exerciseId: number,
	workoutId: number,
): Promise<ExerciseSession> {
	const res = await api.post<ExerciseSessionDTO>(
		`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions`,
		{ exerciseId },
	);
	return mapExerciseSession(res.data);
}

export async function deleteExerciseSession(
	id: number,
	sessionId: number,
	workoutId: number,
): Promise<void> {
	await api.delete(`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions/${id}`);
}

// export async function getPreviousSetCount(
// 	id: number,
// 	sessionId: number,
// 	workoutId: number,
// ): Promise<number> {
// 	const res = await api.get<{ count: number }>(
// 		`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions/${id}/previous-set-count`,
// 	);
// 	return res.data.count;
// }
