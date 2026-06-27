import type { WorkoutSession, WorkoutSessionDTO } from "../types/workoutSession";
import { api } from "./client";

const mapWorkoutSession = (dto: WorkoutSessionDTO): WorkoutSession => ({
	...dto,
	date: new Date(dto.date),
	createdAt: new Date(dto.createdAt),
});

export async function getWorkoutSession(id: number, workoutId: number): Promise<WorkoutSession> {
	const res = await api.get<WorkoutSessionDTO>(`/workouts/${workoutId}/sessions/${id}`);
	return mapWorkoutSession(res.data);
}

export async function createWorkoutSession(workoutId: number): Promise<WorkoutSession> {
	const res = await api.post<WorkoutSessionDTO>(`/workouts/${workoutId}/sessions`);
	return mapWorkoutSession(res.data);
}

export async function deleteWorkoutSession(id: number, workoutId: number): Promise<void> {
	await api.delete(`/workouts/${workoutId}/sessions/${id}`);
}

export async function getWorkoutSessionsByMonth(month: string): Promise<WorkoutSession[]> {
	const res = await api.get<WorkoutSessionDTO[]>(`/history/sessions`, {
		params: { month },
	});
	return res.data.map(mapWorkoutSession);
}
