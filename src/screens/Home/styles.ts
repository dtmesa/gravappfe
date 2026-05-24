import { StyleSheet } from "react-native";
import { colors } from "../../css/color";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.bg.primary,
	},

	inner: {
		marginTop: 50,
		backgroundColor: colors.bg.primary,
		padding: 30,
		gap: 20,
	},

	title: {
		fontFamily: "Syncopate_700Bold",
		color: colors.text.accentDark,
		fontSize: 30,
		textAlign: "center",
	},

	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		position: "relative",
		marginBottom: 30,
	},

	input: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		flex: 1,
		color: colors.text.input,
		paddingVertical: 0,
	},

	inputFocused: {
		borderColor: colors.border.accent,
		borderWidth: 2,
		backgroundColor: colors.bg.inputHighlight,
	},

	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.bg.input,
		borderRadius: 12,
		paddingHorizontal: 16,
		height: 50,
		borderWidth: 1,
		borderColor: colors.border.primary,
	},

	info: {
		fontSize: 25,
		color: colors.text.muted,
		textAlign: "center",
		marginTop: 20,
		fontFamily: "Play_400Regular",
	},

	fakePlaceholder: {
		fontFamily: "Play_400Regular",
		position: "absolute",
		left: 18,
		top: 13,
		color: colors.text.muted,
		fontSize: 16,
	},
});
