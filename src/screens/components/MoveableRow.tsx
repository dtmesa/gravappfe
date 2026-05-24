import { Settings } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { colors } from "../../css/color";

type Props = {
	val: { id: number; name: string };
	drag: () => void;
	isActive: boolean;
	isLast: boolean;
	onDelete: () => void;
	onPress: () => void;
	onGear?: () => void;
};

const OPACITY_ACTIVE = 0.9;
const OPACITY = 1;

export default function MoveableRow({
	val,
	drag,
	isActive,
	isLast,
	onDelete,
	onPress,
	onGear,
}: Props) {
	const translateX = useSharedValue(0);

	const panGesture = Gesture.Pan()
		.activeOffsetX([-10, 10])
		.runOnJS(true)
		.onUpdate((event) => {
			if (event.translationX < 0) {
				translateX.value = event.translationX;
			}
		})
		.onEnd(() => {
			if (translateX.value < -120) {
				onDelete();
			}
			translateX.value = withSpring(0);
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }, { scale: withSpring(isActive ? 1.02 : 1) }],
		opacity: isActive ? OPACITY_ACTIVE : OPACITY,
	}));

	return (
		<View style={styles.container}>
			<GestureDetector gesture={panGesture}>
				<Pressable onPress={onPress} onLongPress={drag}>
					{({ pressed }) => (
						<Animated.View
							style={[
								styles.row,
								isActive && styles.rowActive,
								isLast && styles.rowLast,
								pressed && !isActive && styles.rowPressed,
								animatedStyle,
							]}
						>
							<View style={styles.textWrapper}>
								<Text style={[styles.text, pressed && !isActive && styles.textPressed]}>
									{val.name}
								</Text>
							</View>
							{onGear && (
								<Pressable onPress={onGear} hitSlop={12}>
									{({ pressed }) => (
										<Settings
											size={25}
											color={pressed ? colors.button.accentLight : colors.button.muted}
											strokeWidth={1.75}
										/>
									)}
								</Pressable>
							)}
						</Animated.View>
					)}
				</Pressable>
			</GestureDetector>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	row: {
		paddingHorizontal: "7.5%",
		paddingVertical: "7.5%",
		backgroundColor: colors.bg.secondary,
		borderBottomWidth: 1,
		borderBottomColor: colors.border.secondary,
		alignItems: "center",
		flexDirection: "row",
	},
	rowActive: {
		elevation: 8,
		shadowColor: colors.button.accentHighlight,
		backgroundColor: colors.bg.inputHighlight,
		borderBottomWidth: 0,
	},
	rowLast: {
		borderBottomWidth: 0,
	},
	text: {
		fontFamily: "Play_700Bold",
		color: colors.text.static,
		fontSize: 20,
	},
	textWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	rowPressed: {
		backgroundColor: colors.bg.inputHighlight,
	},
	textPressed: {
		color: colors.text.accent,
	},
});
