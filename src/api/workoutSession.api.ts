import type { WorkoutSession, WorkoutSessionDTO } from "../types/workoutSession.types";
import { api } from "./client.api";

const mapWorkoutSession = (dto: WorkoutSessionDTO): WorkoutSession => ({
	...dto,
	date: new Date(dto.date),
	createdAt: new Date(dto.createdAt),
});

export async function getWorkoutSession(id: number, workoutId: number): Promise<WorkoutSession> {
	const res = await api.get<WorkoutSessionDTO>(`/workouts/${workoutId}/sessions/${id}`);
	return mapWorkoutSession(res.data);
}

export async function createWorkoutSession(
	workoutId: number,
	date?: Date,
): Promise<WorkoutSession> {
	const res = await api.post<WorkoutSessionDTO>(`/workouts/${workoutId}/sessions`, {
		date: date?.toISOString(),
	});

	return mapWorkoutSession(res.data);
}

export async function deleteWorkoutSession(id: number, workoutId: number): Promise<void> {
	await api.delete(`/workouts/${workoutId}/sessions/${id}`);
}

export async function updateWorkoutSession(
	id: number,
	workoutId: number,
	field: string,
	value: unknown,
): Promise<WorkoutSession> {
	const res = await api.patch(`/workouts/${workoutId}/sessions/${id}/${field}`, { [field]: value });
	return res.data;
}

export async function getWorkoutSessionsByMonth(month: string): Promise<WorkoutSession[]> {
	const res = await api.get<WorkoutSessionDTO[]>(`/history/sessions`, {
		params: { month },
	});
	return res.data.map(mapWorkoutSession);
}
