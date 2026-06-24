import { StyleSheet } from "react-native";
import { colors } from "../../css/color";

export const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "flex-start",
		backgroundColor: colors.bg.primary,
	},
	headerContainer: {
		backgroundColor: colors.bg.primary,
		paddingHorizontal: 18,
		paddingTop: 50,
		paddingBottom: 50,
	},
	title: {
		fontFamily: "Syncopate_700Bold",
		color: colors.text.accentDark,
		fontSize: 30,
		textAlign: "center",
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	titleRowLeft: {
		width: 40,
		alignItems: "flex-start",
	},
	titleRowRight: {
		width: 40,
	},
	card: {
		marginHorizontal: "4%",
		marginBottom: 10,
		overflow: "hidden",
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: "7%",
		paddingVertical: "7%",
		backgroundColor: colors.bg.input,
		borderRadius: 18,
	},
	cardHeaderText: {
		fontFamily: "Play_700Bold",
		color: colors.text.static,
		fontSize: 20,
	},
	cardHeaderPressed: {
		backgroundColor: colors.bg.inputHighlight,
	},
	cardHeaderTextPressed: {
		color: colors.text.accentLight,
	},
	cardBody: {
		backgroundColor: colors.bg.primary,
		gap: 10,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 20,
		paddingBottom: 10,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.bg.input,
		borderRadius: 18,
		paddingHorizontal: 16,
		height: 50,
		borderColor: colors.border.transparent,
	},
	input: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		flex: 1,
		color: colors.text.input,
	},
	inputFocused: {
		borderColor: colors.border.transparent,
		backgroundColor: colors.bg.inputHighlight,
	},
	button: {
		backgroundColor: colors.button.accent,
		padding: 10,
		borderRadius: 18,
		marginRight: 75,
		marginLeft: 75,
	},
	buttonPressed: {
		backgroundColor: colors.button.accentHighlight,
		elevation: 8,
		shadowColor: colors.shadow.primary,
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
