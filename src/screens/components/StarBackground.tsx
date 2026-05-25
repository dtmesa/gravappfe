import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { colors } from "../../css/color";

const NUM_STARS = 90;
const DUR_MULTIPLIER = 3000;
const DUR_BASE = 2500;
const DELAY_MULTIPLER = 5000;
const SIZE_BASE = 0;
const SIZE_MULTIPLIER = 3;

const { width, height } = Dimensions.get("window");

type props = {
	x: number;
	y: number;
	size: number;
	delay: number;
	duration: number;
};

function Star({ x, y, size, delay, duration }: props) {
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
	size: Math.random() * SIZE_MULTIPLIER + SIZE_BASE,
	delay: Math.random() * DELAY_MULTIPLER,
	duration: Math.random() * DUR_MULTIPLIER + DUR_BASE,
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
