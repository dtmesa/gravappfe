export type WorkoutSessionDTO = {
	id: number;
	date: string;
	userId: number;
	workoutId: number;
	createdAt: string;
	workout: { id: number; name: string };
};

export type WorkoutSession = {
	id: number;
	date: Date;
	userId: number;
	workoutId: number;
	createdAt: Date;
	workout: { id: number; name: string };
};
