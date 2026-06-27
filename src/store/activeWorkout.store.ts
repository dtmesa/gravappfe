import { create } from "zustand";

type TimerStore = {
	running: boolean;
	elapsed: number;
	intervalRef: ReturnType<typeof setInterval> | null;
	start: () => void;
	stop: () => void;
	reset: () => void;
};

export const useWorkoutTimerStore = create<TimerStore>((set, get) => ({
	running: false,
	elapsed: 0,
	intervalRef: null,

	start: () => {
		if (get().running) return;

		const interval = setInterval(() => {
			set((state) => ({ elapsed: state.elapsed + 10 }));
		}, 10);

		set({ running: true, intervalRef: interval });
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
