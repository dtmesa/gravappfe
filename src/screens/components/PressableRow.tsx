import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "./scaleAnim";

type Props = {
	val: { id: number; name: string };
	onPress: () => void;
	hasSets?: boolean;
};

export function PressableRow({ val, onPress, hasSets }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation();

	return (
		<View style={styles.container}>
			<Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
				{({ pressed }) => (
					<Animated.View
						style={[styles.row, pressed && styles.rowPressed, { transform: [{ scale }] }]}
					>
						<Text
							numberOfLines={1}
							style={[
								styles.text,
								pressed && styles.textPressed,
								hasSets && styles.textNotEmpty,
								pressed && hasSets && styles.textNotEmptyPressed,
							]}
						>
							{val.name}
						</Text>
					</Animated.View>
				)}
			</Pressable>
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
	},
	rowPressed: {
		backgroundColor: colors.bg.inputHighlight,
		elevation: 8,
		shadowColor: colors.shadow.primary,
	},
	rowVisited: {
		backgroundColor: colors.bg.input,
	},
	text: {
		fontFamily: "Play_700Bold",
		color: colors.text.muted,
		fontSize: 20,
		includeFontPadding: false,
	},
	textPressed: {
		color: colors.text.accent,
	},
	textNotEmpty: {
		color: colors.text.static,
	},
	textNotEmptyPressed: {
		color: colors.text.accentHighlight,
	},
});
