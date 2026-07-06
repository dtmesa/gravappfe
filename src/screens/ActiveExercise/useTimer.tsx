import { useEffect, useRef, useState } from "react";

export function useTimer() {
	const [running, setRunning] = useState<boolean>(false);
	const [elapsed, setElapsed] = useState<number>(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const start = () => {
		if (running) return;

		const startTimestamp = Date.now() - elapsed;
		setRunning(true);

		intervalRef.current = setInterval(() => {
			setElapsed(Date.now() - startTimestamp);
		}, 10);
	};

	const stop = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = null;
		setRunning(false);
	};

	const reset = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = null;
		setRunning(false);
		setElapsed(0);
	};

	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	return { running, elapsed, start, stop, reset };
}
