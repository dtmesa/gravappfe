import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../css/color";

type Props = {
	name: string;
	onUndo: () => void;
};

export default function UndoButton({ name, onUndo }: Props) {
	return (
		<View style={styles.bar}>
			<Text style={styles.text}>{name} deleted</Text>

			<Pressable onPress={onUndo}>
				{({ pressed }) => (
					<Text style={[styles.buttonText, pressed && styles.buttonPressed]}>Undo</Text>
				)}
			</Pressable>
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
		padding: 16,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderWidth: 1,
		borderColor: colors.border.accent,
	},

	text: {
		fontFamily: "Play_400Regular",
		color: colors.text.static,
		fontSize: 16,
	},

	buttonText: {
		fontFamily: "Play_400Regular",
		color: colors.text.accent,
		fontSize: 18,
	},
	buttonPressed: {
		color: colors.text.accentHighlight,
	},
});
