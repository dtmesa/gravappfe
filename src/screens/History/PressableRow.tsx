import { Animated, Pressable, StyleSheet, View } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";

type Props = {
	val: { id: number; name: string };
	onPress: () => void;
};

export function PressableRow({ val, onPress }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9375);

	return (
		<View style={styles.rowContainer}>
			<Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
				{({ pressed }) => (
					<View style={[styles.rowWrapper, pressed && styles.rowWrapperPressed]}>
						<Animated.Text
							numberOfLines={1}
							style={[styles.rowText, pressed && styles.rowTextPressed, { transform: [{ scale }] }]}
						>
							{val.name}
						</Animated.Text>
					</View>
				)}
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	rowContainer: {
		paddingHorizontal: "4%",
		marginBottom: 8,
	},
	rowWrapper: {
		paddingHorizontal: "5%",
		paddingVertical: "5%",
		backgroundColor: colors.bg.input,
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 18,
	},
	rowWrapperPressed: {
		backgroundColor: colors.bg.inputHighlight,
	},
	rowText: {
		fontFamily: "Play_700Bold",
		color: colors.text.muted,
		fontSize: 18,
		includeFontPadding: false,
	},
	rowTextPressed: {
		color: colors.text.accent,
	},
});
