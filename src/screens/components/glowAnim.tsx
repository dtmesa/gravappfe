import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useGlow(duration: number = 2500) {
	const glowAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(glowAnim, { toValue: 1, duration, useNativeDriver: false }),
				Animated.timing(glowAnim, { toValue: 0, duration, useNativeDriver: false }),
			]),
		).start();
	}, [glowAnim, duration]);

	const textShadowRadius = glowAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 20],
	});

	return { glowAnim, textShadowRadius };
}
