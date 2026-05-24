export type WorkoutSessionDTO = {
	id: number;
	date: string;
	userId: number;
	workoutId: number;
	createdAt: string;
};

export type WorkoutSession = {
	id: number;
	date: Date;
	userId: number;
	workoutId: number;
	createdAt: Date;
};
