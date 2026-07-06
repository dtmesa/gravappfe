import type { SetSession, SetSessionDTO } from "./setSession.types";

export type ExerciseSessionDTO = {
	id: number;
	order: number;
	workoutSessionId: number;
	exerciseId: number;
	createdAt: string;
	sets: SetSessionDTO[];
};

export type ExerciseSession = {
	id: number;
	order: number;
	workoutSessionId: number;
	exerciseId: number;
	createdAt: Date;
	sets: SetSession[];
};
