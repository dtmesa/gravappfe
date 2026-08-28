import type { WithSpringConfig } from "react-native-reanimated";

// The app's standard snappy spring feel. Originally just inline in
// MoveableRow's press/grip feedback; centralized here so DraggableFlatList's
// reorder animation (HomeScreen, WorkoutScreen) uses the same feel instead of
// the library's own, noticeably more sluggish default.
export const SPRING_CONFIG: WithSpringConfig = {
	stiffness: 500,
	damping: 20,
	mass: 1,
};

// NOTE: DraggableFlatList's `enableLayoutAnimationExperimental` +
// `itemLayoutAnimation` props were tried here as a fix for a flicker/
// duplicate-item glitch on reorder, and were reverted -- they crash on this
// app's Reanimated version (~4.1.1). The library's CellRendererComponent
// reaches into an internal `global.LayoutAnimationRepository` global that no
// longer exists in Reanimated 4, throwing "Cannot read property 'configs' of
// undefined" as soon as the flag is enabled. Do not re-enable without
// confirming the library has been updated to track Reanimated 4's internals.
