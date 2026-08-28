import { Platform } from "react-native";

// Android's `elevation` needs no counterpart here -- it already renders on its
// own. iOS instead needs shadowColor/Offset/Opacity/Radius together, or
// nothing shows at all. Values approximate Material elevation's visual weight
// so both platforms read as the same shadow.
const LEVELS = {
	4: { height: 2, opacity: 0.23, radius: 2.62 },
	8: { height: 4, opacity: 0.3, radius: 4.65 },
} as const;

/**
 * Pass `color: null` for a deliberately invisible shadow (e.g. a resting
 * state that only shows a shadow once focused/pressed). shadowOpacity: 0 is
 * the only reliable way to turn a shadow off -- a "transparent" shadowColor
 * depends on that string being parsed as zero-alpha, which isn't guaranteed.
 */
export function iosShadow(elevation: keyof typeof LEVELS, color: string | null) {
	if (Platform.OS !== "ios") return {};

	if (color === null) return { shadowOpacity: 0 };

	const { height, opacity, radius } = LEVELS[elevation];

	return {
		shadowColor: color,
		shadowOffset: { width: 0, height },
		shadowOpacity: opacity,
		shadowRadius: radius,
	};
}
