import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { colors } from "../../css/color";

const { width, height } = Dimensions.get("window");

const NUM_STARS = 90;

function Star({
	x,
	y,
	size,
	delay,
	duration,
}: {
	x: number;
	y: number;
	size: number;
	delay: number;
	duration: number;
}) {
	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const blink = Animated.loop(
			Animated.sequence([
				Animated.delay(delay),
				Animated.timing(opacity, {
					toValue: Math.random() * 0.8 + 0.2,
					duration: duration / 2,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 0,
					duration: duration / 2,
					useNativeDriver: true,
				}),
			]),
		);
		blink.start();
		return () => blink.stop();
	}, [delay, duration, opacity]);

	return (
		<Animated.View
			style={{
				position: "absolute",
				left: x,
				top: y,
				width: size,
				height: size,
				borderRadius: size / 2,
				backgroundColor: colors.star.primary,
				opacity,
			}}
		/>
	);
}

const stars = Array.from({ length: NUM_STARS }, (_, i) => ({
	id: i,
	x: Math.random() * width,
	y: Math.random() * height,
	size: Math.random() * 3 + 0,
	delay: Math.random() * 5000,
	duration: Math.random() * 3000 + 2500,
}));

export function StarBackground() {
	return (
		<View style={StyleSheet.absoluteFill} pointerEvents="none">
			{stars.map((s) => (
				<Star key={s.id} {...s} />
			))}
		</View>
	);
}
