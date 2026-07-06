import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { colors } from "../../css/color";

type Props = {
	message: string | null;
	type?: "error" | "success";
	duration?: number;
	onClear?: () => void;
};

const LINE_HEIGHT = 22;
const MAX_LINES = 2;

export function StatusMessage({ message, type = "error", duration = 3000, onClear }: Props) {
	const timeoutRef = useRef<number | null>(null);
	const onClearRef = useRef(onClear);
	const opacity = useRef(new Animated.Value(0)).current;
	const height = useRef(new Animated.Value(0)).current;
	const [displayText, setDisplayText] = useState("");
	const [measuredHeight, setMeasuredHeight] = useState(LINE_HEIGHT);
	const style = type === "success" ? styles.successText : styles.errorText;

	useEffect(() => {
		onClearRef.current = onClear;
	}, [onClear]);

	useEffect(() => {
		if (message) {
			setDisplayText(message);
		}
	}, [message]);

	useEffect(() => {
		if (message) {
			Animated.parallel([
				Animated.timing(height, { toValue: measuredHeight, duration: 250, useNativeDriver: false }),
				Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: false }),
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: false }),
				Animated.timing(height, { toValue: 0, duration: 500, useNativeDriver: false }),
			]).start();
		}
	}, [message, measuredHeight, opacity, height]);

	useEffect(() => {
		if (!message) return;
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => onClearRef.current?.(), duration);
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [message, duration]);

	return (
		<Animated.View style={[styles.container, { height }]}>
			<Text
				style={[style, styles.measurer]}
				numberOfLines={MAX_LINES}
				onLayout={(e) => setMeasuredHeight(Math.max(LINE_HEIGHT, e.nativeEvent.layout.height))}
			>
				{displayText}
			</Text>

			<Animated.Text numberOfLines={MAX_LINES} style={[style, { opacity }]}>
				{displayText}
			</Animated.Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		overflow: "hidden",
	},
	successText: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		textAlign: "center",
		color: colors.text.accent,
		lineHeight: LINE_HEIGHT,
	},
	errorText: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		textAlign: "center",
		color: colors.text.warning,
		lineHeight: LINE_HEIGHT,
	},
	measurer: {
		position: "absolute",
		opacity: 0,
		left: 0,
		right: 0,
	},
});
