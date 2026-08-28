import { Platform } from "react-native";

// shadowOffset/Opacity/Radius are iOS-only -- Android ignores them entirely.
// Values approximate Material elevation's visual weight so both platforms
// read as roughly the same shadow.
const LEVELS = {
	4: { height: 2, opacity: 0.23, radius: 2.62 },
	8: { height: 4, opacity: 0.3, radius: 4.65 },
} as const;

/**
 * shadowColor is returned on BOTH platforms: on iOS it's one piece of the
 * shadow-casting bundle below; on Android it independently tints whatever
 * `elevation` is already present on the view, without needing `elevation`
 * itself to change. That distinction matters -- toggling `elevation` forces
 * Android to relayout, which steals focus back off a TextInput the instant
 * it's gained, so `elevation` must stay constant on the wrapper style and
 * never appear here. shadowColor is a paint-only property and doesn't carry
 * that risk.
 *
 * Pass `color: null` for a deliberately invisible iOS shadow (e.g. a resting
 * state that only shows one once focused/pressed). shadowOpacity: 0 is the
 * only reliable way to turn a shadow off -- a "transparent" shadowColor
 * depends on that string being parsed as zero-alpha, which isn't guaranteed.
 */
export function iosShadow(elevation: keyof typeof LEVELS, color: string | null) {
	if (color === null) return { shadowOpacity: 0 };

	if (Platform.OS !== "ios") return { shadowColor: color };

	const { height, opacity, radius } = LEVELS[elevation];

	return {
		shadowColor: color,
		shadowOffset: { width: 0, height },
		shadowOpacity: opacity,
		shadowRadius: radius,
	};
}
