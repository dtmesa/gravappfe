export type SetSessionDTO = {
	id: number;
	order: number;
	weight: number | null;
	reps: number | null;
	duration: number | null;
	distance: number | null;
	exerciseSessionId: number;
	createdAt: string;
};

export type SetSession = {
	id: number;
	order: number;
	weight: number | null;
	reps: number | null;
	duration: number | null;
	distance: number | null;
	exerciseSessionId: number;
	createdAt: Date;
};
