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

	descrFocused: {
		backgroundColor: colors.bg.inputHighlight,
		borderColor: colors.border.accent,
		borderWidth: 2,
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

	checksWrapper: {
		gap: 12,
	},
	checkRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
		paddingHorizontal: 16,
		backgroundColor: colors.bg.input,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: colors.border.primary,
	},
	checkRowPressed: {
		backgroundColor: colors.bg.inputHighlight,
		borderColor: colors.border.accent,
		elevation: 8,
		shadowColor: colors.button.accentHighlight,
	},
	checkLabel: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		color: colors.text.static,
	},
	checkLabelPressed: {
		color: colors.text.accent,
	},
	checkbox: {
		width: 22,
		height: 22,
		borderRadius: 6,
		borderWidth: 1.5,
		borderColor: colors.border.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	checkboxChecked: {
		backgroundColor: colors.bg.inputHighlight,
		borderColor: colors.border.accent,
	},
});
