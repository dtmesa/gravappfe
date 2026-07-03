import { Undo2 } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Animated as RNAnimated, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { colors } from "../../css/color";
import { useScaleAnimation } from "./scaleAnim";

type Props = {
	name: string;
	onUndo: () => void;
};

const SWIPE_THRESHOLD = 100;
const SWIPE_VELOCITY_THRESHOLD = 800;

export function UndoBubble({ name, onUndo }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);
	const [hidden, setHidden] = useState(false);
	const translateX = useSharedValue(0);
	const opacity = useSharedValue(1);

	const panGesture = Gesture.Pan()
		.activeOffsetX([-10, 10])
		.onUpdate((event) => {
			translateX.value = event.translationX;
		})
		.onEnd((event) => {
			const shouldDismiss =
				Math.abs(translateX.value) > SWIPE_THRESHOLD ||
				Math.abs(event.velocityX) > SWIPE_VELOCITY_THRESHOLD;

			if (shouldDismiss) {
				const direction = translateX.value > 0 ? 1 : -1;
				translateX.value = withTiming(direction * 500, { duration: 200 });
				opacity.value = withTiming(0, { duration: 200 }, (finished) => {
					if (finished) runOnJS(() => setHidden(true))();
				});
			} else {
				translateX.value = withSpring(0);
			}
		});

	const swipeStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
		opacity: opacity.value,
	}));

	if (hidden) return null;

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View style={[styles.bar, swipeStyle]}>
				<Text numberOfLines={3} style={styles.text}>
					{name} deleted
				</Text>
				<RNAnimated.View style={{ transform: [{ scale }] }}>
					<Pressable
						style={styles.button}
						onPress={onUndo}
						onPressIn={pressIn}
						onPressOut={pressOut}
					>
						{({ pressed }) => (
							<Undo2
								size={26}
								color={pressed ? colors.button.accentHighlight : colors.text.accent}
								strokeWidth={1.75}
							/>
						)}
					</Pressable>
				</RNAnimated.View>
			</Animated.View>
		</GestureDetector>
	);
}

const styles = StyleSheet.create({
	bar: {
		position: "absolute",
		bottom: "10%",
		left: "8%",
		right: "8%",
		backgroundColor: colors.bg.inputHighlight,
		padding: 12,
		borderRadius: 18,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		elevation: 8,
		shadowColor: colors.shadow.primary,
		borderColor: colors.border.accent,
		borderWidth: 1,
	},
	text: {
		fontFamily: "Play_400Regular",
		color: colors.text.static,
		fontSize: 16,
		flex: 1,
		paddingRight: 16,
		paddingLeft: 5,
	},
	button: {
		paddingRight: 5,
	},
});
