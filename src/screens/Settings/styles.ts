import { StyleSheet } from "react-native";
import { colors } from "../../css/color";

export const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "flex-start",
		backgroundColor: colors.bg.primary,
	},
	inner: {
		padding: 30,
		backgroundColor: colors.bg.primary,
		marginTop: 50,
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
	card: {
		backgroundColor: colors.bg.secondary,
		borderBottomWidth: 1,
		borderColor: colors.border.primary,
		overflow: "hidden",
	},
	rowLast: {
		borderBottomWidth: 0,
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: "7.5%",
		paddingVertical: "7.5%",
	},
	cardHeaderText: {
		fontFamily: "Play_400Regular",
		color: colors.text.static,
		fontSize: 20,
	},
	cardHeaderPressed: {
		backgroundColor: colors.bg.inputHighlight,
		elevation: 8,
		shadowColor: colors.button.accentHighlight,
	},
	cardHeaderTextPressed: {
		color: colors.text.accentLight,
	},
	cardBody: {
		paddingHorizontal: 30,
		paddingBottom: 20,
		paddingTop: 16,
		gap: 12,
		borderTopWidth: 1,
		borderTopColor: colors.border.primary,
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
	input: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		flex: 1,
		color: colors.text.input,
	},
	inputFocused: {
		borderColor: colors.border.accent,
		borderWidth: 2,
		backgroundColor: colors.bg.inputHighlight,
	},
	button: {
		backgroundColor: colors.button.accent,
		borderRadius: 12,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 4,
		marginRight: 89,
		marginLeft: 89,
	},
	buttonPressed: {
		backgroundColor: colors.button.accentHighlight,
		elevation: 8,
		shadowColor: colors.button.accentHighlight,
	},
	buttonText: {
		fontFamily: "Play_400Regular",
		fontSize: 18,
		color: colors.text.contrast,
		textAlign: "center",
	},
	statusText: {
		fontFamily: "Play_400Regular",
		fontSize: 14,
		textAlign: "center",
	},
	error: {
		color: colors.text.warning,
	},
	success: {
		color: colors.text.accentLight,
	},
	placeholder: {
		fontFamily: "Play_400Regular",
		position: "absolute",
		left: 18,
		top: 13,
		color: colors.text.muted,
		fontSize: 16,
	},
});
