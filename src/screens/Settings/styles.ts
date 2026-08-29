import { StyleSheet } from "react-native";
import { colors } from "../../css/color";
import { iosShadow } from "../../css/shadow";

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
		backgroundColor: colors.bg.primary,
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: "7%",
		paddingVertical: "7%",
		backgroundColor: colors.bg.input,
		borderRadius: 18,
		elevation: 8,
	},
	cardHeaderText: {
		fontFamily: "Play_700Bold",
		color: colors.text.static,
		fontSize: 20,
	},
	// elevation stays on cardHeader, never here -- see inputFocused below.
	cardHeaderPressed: {
		backgroundColor: colors.bg.inputHighlight,
		...iosShadow(8, colors.shadow.primary),
	},
	cardHeaderTextPressed: {
		color: colors.text.accentLight,
	},
	cardBody: {
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 20,
		paddingBottom: 10,
	},
	cardBodyGap: {
		gap: 10,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.bg.input,
		borderRadius: 18,
		paddingHorizontal: 16,
		height: 50,
		elevation: 8,
	},
	input: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		flex: 1,
		color: colors.text.input,
	},
	// elevation stays on inputWrapper, never here: toggling it on Android
	// forces a relayout that steals focus back off the TextInput the instant
	// it's gained. iosShadow is inert on Android, so it's safe here.
	inputFocused: {
		backgroundColor: colors.bg.inputHighlight,
		...iosShadow(8, colors.shadow.primary),
	},
	button: {
		backgroundColor: colors.button.accent,
		padding: 10,
		borderRadius: 18,
		marginRight: 75,
		marginLeft: 75,
		elevation: 8,
	},
	buttonPressed: {
		backgroundColor: colors.button.accentHighlight,
		...iosShadow(8, colors.shadow.primary),
	},
	buttonText: {
		fontFamily: "Play_400Regular",
		fontSize: 18,
		color: colors.text.contrast,
		textAlign: "center",
	},
	buttonDanger: {
		backgroundColor: colors.button.warning,
		padding: 10,
		borderRadius: 18,
		marginRight: 75,
		marginLeft: 75,
		elevation: 8,
	},
	buttonDangerPressed: {
		backgroundColor: colors.button.warningHighlight,
		...iosShadow(8, colors.shadow.warning),
	},
	placeholder: {
		fontFamily: "Play_400Regular",
		position: "absolute",
		left: 18,
		top: 13,
		color: colors.text.muted,
		fontSize: 16,
	},
	statusText: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		textAlign: "center",
	},
	staticText: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		color: colors.text.static,
		textAlign: "center",
	},
	resendLink: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		color: colors.text.accentDark,
		textAlign: "center",
	},
	linkContainer: {
		marginBottom: 8,
		gap: 3,
	},
	error: {
		color: colors.text.warning,
	},
	success: {
		color: colors.text.accentLight,
	},
	accent: {
		color: colors.text.accentDark,
	},
});
