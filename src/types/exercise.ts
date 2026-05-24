export type Exercise = {
	id: number;
	order: number;
	name: string;
	description: string | null;
	workoutId: number | null;
	isWeight: boolean;
	isDuration: boolean;
	isReps: boolean;
	isDistance: boolean;
};
