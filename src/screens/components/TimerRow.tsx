import { RotateCcw } from "lucide-react-native";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";

type Props = {
	running: boolean;
	elapsed: number;
	onPress: () => void;
	onReset: () => void;
};

export default function TimerRow({ running, elapsed, onPress, onReset }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation();

	const rotation = useRef(new Animated.Value(0)).current;

	const rotate = rotation.interpolate({
		inputRange: [-1, 0],
		outputRange: ["-360deg", "0deg"],
	});

	const handleReset = (e: any) => {
		e.stopPropagation();
		Animated.sequence([
			Animated.timing(rotation, {
				toValue: -1,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(rotation, {
				toValue: 0,
				duration: 0,
				useNativeDriver: true,
			}),
		]).start();
		onReset();
	};

	const formatTime = (seconds: number) => {
		const m = Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0");
		const s = (seconds % 60).toString().padStart(2, "0");
		return `${m}:${s}`;
	};

	return (
		<View style={styles.rowContainer}>
			<Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
				{({ pressed }) => (
					<Animated.View
						style={[
							styles.row,
							pressed && styles.rowPressed,
							running && styles.rowActive,
							{ transform: [{ scale }] },
						]}
					>
						<View style={styles.textWrapper}>
							<Text
								style={[
									styles.text,
									running && styles.textPressed,
									pressed && styles.textPressed,
									running && pressed && styles.textPressedRunning,
								]}
							>
								{formatTime(elapsed)}
							</Text>
						</View>
						<Pressable onPress={handleReset} hitSlop={12}>
							{({ pressed: resetPressed }) => (
								<Animated.View style={{ transform: [{ rotate }] }}>
									<RotateCcw
										size={32}
										color={
											resetPressed
												? colors.button.accentHighlight
												: running
													? colors.button.accent
													: colors.button.muted
										}
										strokeWidth={1.75}
									/>
								</Animated.View>
							)}
						</Pressable>
					</Animated.View>
				)}
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	rowContainer: {
		width: "100%",
		paddingHorizontal: "4%",
		marginBottom: 10,
	},
	row: {
		paddingHorizontal: "7.5%",
		paddingVertical: "4.5%",
		backgroundColor: colors.bg.input,
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 18,
		transform: [{ scale: 1 }],
	},
	rowActive: {
		backgroundColor: colors.bg.inputHighlight,
	},
	rowPressed: {
		elevation: 8,
		shadowColor: colors.shadow.primary,
		backgroundColor: colors.bg.inputHighlight,
	},
	text: {
		fontFamily: "Play_700Bold",
		color: colors.text.static,
		fontSize: 35,
		textAlign: "center",
	},
	textWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	textPressed: {
		color: colors.text.accent,
	},
	textPressedRunning: {
		color: colors.text.accentHighlight,
	},
});
