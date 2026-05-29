import type { SetSession, SetSessionDTO } from "../types/setSession";
import { api } from "./client";

const mapSetSession = (dto: SetSessionDTO): SetSession => ({
	...dto,
	weight: dto.weight?.toString() ?? null,
	reps: dto.reps?.toString() ?? null,
	duration: dto.duration?.toString() ?? null,
	distance: dto.distance?.toString() ?? null,
	createdAt: new Date(dto.createdAt),
});

export async function getSetSessions(
	exerciseSessionId: number,
	sessionId: number,
	workoutId: number,
): Promise<SetSession[]> {
	const res = await api.get<SetSessionDTO[]>(
		`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions/${exerciseSessionId}/setSessions`,
	);
	return res.data.map(mapSetSession);
}

export async function getSetSession(
	id: number,
	exerciseSessionId: number,
	sessionId: number,
	workoutId: number,
): Promise<SetSession> {
	const res = await api.get<SetSessionDTO>(
		`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions/${exerciseSessionId}/setSessions/${id}`,
	);
	return mapSetSession(res.data);
}

export async function createSetSession(
	exerciseSessionId: number,
	sessionId: number,
	workoutId: number,
): Promise<SetSession> {
	const res = await api.post<SetSessionDTO>(
		`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions/${exerciseSessionId}/setSessions`,
	);
	return mapSetSession(res.data);
}

export async function deleteSetSession(
	id: number,
	exerciseSessionId: number,
	sessionId: number,
	workoutId: number,
): Promise<void> {
	await api.delete(
		`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions/${exerciseSessionId}/setSessions/${id}`,
	);
}

export async function updateSetSession(
	id: number,
	exerciseSessionId: number,
	sessionId: number,
	workoutId: number,
	field: string,
	value: number | null,
): Promise<SetSession> {
	const res = await api.patch<SetSessionDTO>(
		`/workouts/${workoutId}/sessions/${sessionId}/exerciseSessions/${exerciseSessionId}/setSessions/${id}/${field}`,
		{ [field]: value },
	);
	return mapSetSession(res.data);
}
