export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	Settings: undefined;
	Home: undefined;
	Workout: { workoutId: number };
	Exercise: { workoutId: number; exerciseId: number };
	ActiveWorkout: { workoutId: number; sessionId: number };
	ActiveExercise: { workoutId: number; sessionId: number; exerciseSessionId: number };
};
