import { useRef } from "react";
import { Animated } from "react-native";

export function useScaleAnimation(toValue: number = 0.975) {
	const scale = useRef(new Animated.Value(1)).current;

	const pressIn = () =>
		Animated.spring(scale, { toValue, useNativeDriver: true, speed: 10, bounciness: 10 }).start();

	const pressOut = () =>
		Animated.spring(scale, {
			toValue: 1,
			useNativeDriver: true,
			speed: 10,
			bounciness: 10,
		}).start();

	return { scale, pressIn, pressOut };
}
