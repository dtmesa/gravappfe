import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { colors } from "../../css/color";
import { ModifyButton } from "./ModifyButton";

type Props = {
	val: { id: number; name: string };
	onDelete: () => void;
	onPress: () => void;
	onEdit?: () => void;
	disabled?: boolean;
};

export function SwipeableRow({ val, disabled, onDelete, onPress, onEdit }: Props) {
	const [swiping, setSwiping] = useState(false);
	const scale = useSharedValue(1);
	const translateX = useSharedValue(0);

	const panGesture = Gesture.Pan()
		.activeOffsetX([-10, 10])
		.runOnJS(true)
		.onUpdate((event) => {
			if (event.translationX > 0) {
				translateX.value = event.translationX;
				setSwiping(true);
			}
		})
		.onEnd(() => {
			if (translateX.value > 120) {
				onDelete();
			}
			translateX.value = withSpring(0);
			setSwiping(false);
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }, { scale: scale.value }],
	}));

	return (
		<View style={styles.container}>
			<GestureDetector gesture={panGesture}>
				<Pressable
					onPress={onPress}
					disabled={disabled}
					onPressIn={() => {
						scale.value = withSpring(0.975, { stiffness: 500, damping: 20, mass: 1 });
					}}
					onPressOut={() => {
						scale.value = withSpring(1, { stiffness: 500, damping: 20, mass: 1 });
					}}
				>
					{({ pressed }) => (
						<Animated.View style={[styles.row, pressed && styles.rowPressed, animatedStyle]}>
							<View style={styles.textWrapper}>
								<Text numberOfLines={1} style={[styles.text, pressed && styles.textPressed]}>
									{val.name}
								</Text>
							</View>
							{onEdit && <ModifyButton onEdit={onEdit} />}
							<ChevronRight
								size={24}
								color={swiping ? colors.text.accent : colors.button.muted}
								style={styles.chevronBuffer}
							/>
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
	rowPressed: {
		backgroundColor: colors.bg.inputHighlight,
		elevation: 8,
		shadowColor: colors.shadow.primary,
	},
	text: {
		fontFamily: "Play_700Bold",
		color: colors.text.static,
		fontSize: 20,
		paddingBottom: 2,
		includeFontPadding: false,
	},
	textWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	textPressed: {
		color: colors.text.accent,
	},
	chevronBuffer: {
		marginLeft: 10,
	},
});
