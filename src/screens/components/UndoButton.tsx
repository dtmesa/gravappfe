import { Undo2 } from "lucide-react-native";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";

type Props = {
	name: string;
	onUndo: () => void;
};

export default function UndoButton({ name, onUndo }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);

	return (
		<View style={styles.bar}>
			<Text numberOfLines={1} style={styles.text}>
				{name} deleted
			</Text>
			<Animated.View style={{ transform: [{ scale }] }}>
				<Pressable style={styles.button} onPress={onUndo} onPressIn={pressIn} onPressOut={pressOut}>
					{({ pressed }) => (
						<Undo2
							size={26}
							color={pressed ? colors.button.accentHighlight : colors.text.accent}
							strokeWidth={1.75}
						/>
					)}
				</Pressable>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	bar: {
		position: "absolute",
		bottom: "10%",
		left: "10%",
		right: "10%",
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
