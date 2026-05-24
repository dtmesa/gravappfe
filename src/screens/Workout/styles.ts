import { StyleSheet } from "react-native";
import { colors } from "../../css/color";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.bg.primary,
		flex: 1,
	},

	inner: {
		backgroundColor: colors.bg.primary,
		marginTop: 50,
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

	info: {
		fontFamily: "Play_400Regular",
		fontSize: 25,
		color: colors.text.muted,
		textAlign: "center",
		marginTop: 20,
	},

	inputWrapper: {
		backgroundColor: colors.bg.input,
		borderColor: colors.border.primary,
		borderWidth: 1,
		borderRadius: 12,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		height: 50,
	},

	input: {
		color: colors.text.input,
		fontFamily: "Play_400Regular",
		fontSize: 16,
		flex: 1,
	},

	inputFocused: {
		backgroundColor: colors.bg.inputHighlight,
		borderColor: colors.border.accent,
		borderWidth: 2,
	},

	inputPlaceholder: {
		fontFamily: "Play_400Regular",
		color: colors.text.muted,
		fontSize: 16,
		position: "absolute",
		left: 18,
		top: 13,
	},

	descrWrapper: {
		backgroundColor: colors.bg.input,
		borderColor: colors.border.primary,
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 16,
		minHeight: 50,
		maxHeight: 150,
	},

	descrInput: {
		color: colors.text.input,
		fontFamily: "Play_400Regular",
		fontSize: 16,
	},

	descrPlaceholder: {
		color: colors.text.muted,
		fontFamily: "Play_400Regular",
		fontSize: 16,
		position: "absolute",
		left: 18,
		top: 13,
	},
});
