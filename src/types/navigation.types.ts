export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	Settings: undefined;
	Home: undefined;
	History: undefined;
	Workout: { workoutId: number };
	Exercise: { workoutId: number; exerciseId: number };
	ActiveWorkout: { workoutId: number; sessionId: number };
	ActiveExercise: { workoutId: number; sessionId: number; exerciseSessionId: number };
	EditWorkoutSession: { workoutId: number; sessionId: number };
	EditExerciseSession: { workoutId: number; sessionId: number; exerciseSessionId: number };
};

export type DrawerParamList = {
	Main: undefined;
};
