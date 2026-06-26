import { Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { colors } from "../../css/color";
import ListAddButton from "./ListAddButton";

type Props = {
	val: { id: number; name: string };
	drag: () => void;
	isActive: boolean;
	onDelete: () => void;
	onPress: () => void;
	onEdit?: () => void;
	disabled?: boolean;
};

const OPACITY_ACTIVE = 0.85;
const OPACITY = 1;

export default function MoveableRow({
	val,
	drag,
	isActive,
	disabled,
	onDelete,
	onPress,
	onEdit,
}: Props) {
	const scale = useSharedValue(1);
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
		transform: [
			{ translateX: translateX.value },
			{ scale: withSpring(isActive ? 0.975 : scale.value) },
		],
		opacity: isActive ? OPACITY_ACTIVE : OPACITY,
	}));

	return (
		<View style={styles.container}>
			<GestureDetector gesture={panGesture}>
				<Pressable
					onPress={onPress}
					onLongPress={drag}
					disabled={disabled}
					onPressIn={() => {
						scale.value = withSpring(0.975, { stiffness: 500, damping: 20, mass: 1 });
					}}
					onPressOut={() => {
						scale.value = withSpring(1, { stiffness: 500, damping: 20, mass: 1 });
					}}
				>
					{({ pressed }) => (
						<Animated.View
							style={[
								styles.row,
								isActive && styles.rowActive,
								pressed && !isActive && styles.rowPressed,
								animatedStyle,
							]}
						>
							<View style={styles.textWrapper}>
								<Text
									numberOfLines={1}
									ellipsizeMode="tail"
									style={[styles.text, pressed && !isActive && styles.textPressed]}
								>
									{val.name}
								</Text>
							</View>
							{onEdit && <ListAddButton onEdit={onEdit} />}
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
		paddingHorizontal: "4%",
		marginBottom: 10,
	},
	row: {
		paddingHorizontal: "7%",
		paddingVertical: "7%",
		backgroundColor: colors.bg.input,
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 18,
		overflow: "hidden",
	},
	rowActive: {
		elevation: 8,
		shadowColor: colors.shadow.primary,
		backgroundColor: colors.bg.inputHighlight,
	},
	rowPressed: {
		backgroundColor: colors.bg.inputHighlight,
		elevation: 8,
		shadowColor: colors.shadow.primary,
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
	textPressed: {
		color: colors.text.accent,
	},
});
