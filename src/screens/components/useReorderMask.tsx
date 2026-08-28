import { useEffect, useRef, useState } from "react";

const MASK_DURATION = 550;

/**
 * DraggableFlatList has a known flicker/duplicate-item glitch right after a
 * reorder commits: a stale copy of the moved item briefly appears at the
 * bottom of the list (roughly 500ms on-device) while the library's internal
 * transform-reset catches up with the newly re-flowed layout -- see
 * springConfig.ts's note on why the library's own fix for this can't be used
 * here (it crashes on this app's Reanimated version).
 *
 * Rather than fix that timing directly, this covers it: since the app's
 * background is solid black, painting a same-colored panel over the glitch's
 * region for its duration hides it without touching the animation at all.
 */
export function useReorderMask() {
	const [visible, setVisible] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const triggerMask = () => {
		setVisible(true);

		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setVisible(false), MASK_DURATION);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	return { visible, triggerMask };
}
