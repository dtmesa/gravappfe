import { StyleSheet } from "react-native";
import { colors } from "../../css/color";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.bg.primary,
		flex: 1,
	},
	innerContainer: {
		backgroundColor: colors.bg.primary,
		paddingHorizontal: 40,
		gap: 30,
	},
	headerContainer: {
		backgroundColor: colors.bg.primary,
		paddingHorizontal: 18,
		paddingTop: 50,
		paddingBottom: 30,
	},
	titleContainer: {
		flex: 1,
		paddingHorizontal: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		paddingTop: 5,
		fontFamily: "Syncopate_700Bold",
		color: colors.text.accentDark,
		fontSize: 20,
		textAlign: "center",
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		position: "relative",
		marginBottom: 30,
	},
	titleRowLeft: {
		width: 40,
		alignItems: "flex-start",
	},
	titleRowRight: {
		width: 40,
		marginTop: 6,
		alignItems: "center",
	},
	descriptionFocused: {
		backgroundColor: colors.bg.inputHighlight,
		shadowColor: colors.shadow.primary,
	},
	descriptionWrapper: {
		backgroundColor: colors.bg.input,
		borderRadius: 18,
		paddingHorizontal: 16,
		minHeight: 50,
		maxHeight: 150,
		elevation: 8,
	},
	descriptionText: {
		color: colors.text.input,
		fontFamily: "Play_400Regular",
		fontSize: 16,
	},
	descriptionPlaceholderText: {
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
		paddingVertical: 14,
		paddingHorizontal: 20,
		backgroundColor: colors.bg.input,
		borderRadius: 18,
	},
	checkRowPressed: {
		backgroundColor: colors.bg.inputHighlight,
		elevation: 8,
		shadowColor: colors.shadow.primary,
	},
	checkLabel: {
		fontFamily: "Play_700Bold",
		fontSize: 16,
		color: colors.text.static,
	},
	checkLabelPressed: {
		color: colors.text.accent,
	},
	checkbox: {
		width: 24,
		height: 24,
		borderRadius: 9,
		borderWidth: 1,
		borderColor: colors.border.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	checkboxChecked: {
		backgroundColor: colors.bg.inputHighlight,
		borderColor: colors.border.accent,
	},
	checkboxPressed: {
		borderColor: colors.border.primaryHighlight,
	},
	checkboxCheckedAndPressed: {
		backgroundColor: colors.bg.inputSecondaryHighlight,
		borderColor: colors.border.accentHighlight,
	},
});
