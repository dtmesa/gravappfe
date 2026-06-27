import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function FadeIn({ children, visible }: { children: React.ReactNode; visible: boolean }) {
	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(opacity, {
			toValue: visible ? 1 : 0,
			duration: 350,
			useNativeDriver: true,
		}).start();
	}, [visible]);

	if (!visible) return null;

	return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}
