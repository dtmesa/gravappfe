export type ExerciseSessionDTO = {
	id: number;
	order: number;
	workoutSessionId: number;
	exerciseId: number;
	createdAt: string;
};

export type ExerciseSession = {
	id: number;
	order: number;
	workoutSessionId: number;
	exerciseId: number;
	createdAt: Date;
};
