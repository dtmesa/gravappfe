import { create } from "zustand";

type TimerStore = {
	running: boolean;
	elapsed: number;
	startTime: number | null;
	intervalRef: ReturnType<typeof setInterval> | null;
	start: () => void;
	stop: () => void;
	reset: () => void;
};

export const useWorkoutTimerStore = create<TimerStore>((set, get) => ({
	running: false,
	elapsed: 0,
	intervalRef: null,
	startTime: null,

	start: () => {
		if (get().running) return;

		const startTime = Date.now() - get().elapsed * 1000;

		const interval = setInterval(() => {
			set({ elapsed: Math.floor((Date.now() - startTime) / 1000) });
		}, 1000);

		set({ running: true, intervalRef: interval, startTime });
	},

	stop: () => {
		const { intervalRef } = get();
		if (intervalRef) clearInterval(intervalRef);
		set({ running: false, intervalRef: null });
	},

	reset: () => {
		const { intervalRef } = get();
		if (intervalRef) clearInterval(intervalRef);
		set({ running: false, elapsed: 0, intervalRef: null });
	},
}));
