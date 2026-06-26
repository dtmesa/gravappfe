import { StyleSheet } from "react-native";
import { colors } from "../../css/color";

export const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
		backgroundColor: colors.bg.primary,
	},
	innerContainer: {
		backgroundColor: colors.bg.primary,
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 5,
		paddingTop: 5,
	},
	title: {
		fontFamily: "Syncopate_700Bold",
		color: colors.text.accentDark,
		fontSize: 45,
		marginBottom: 25,
		textAlign: "center",
	},
	registerTitle: {
		fontFamily: "Syncopate_700Bold",
		color: colors.text.accentDark,
		fontSize: 40,
		marginBottom: 25,
		textAlign: "center",
	},
	button: {
		backgroundColor: colors.button.accent,
		padding: 10,
		borderRadius: 18,
		marginTop: 12,
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
	inputFocused: {
		backgroundColor: colors.bg.inputHighlight,
		shadowColor: colors.shadow.primary,
	},
	input: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		flex: 1,
		color: colors.text.input,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.bg.input,
		borderRadius: 18,
		paddingHorizontal: 16,
		height: 50,
		marginBottom: 10,
		elevation: 8,
	},
	placeholderText: {
		fontFamily: "Play_400Regular",
		position: "absolute",
		left: 18,
		top: 13,
		color: colors.text.muted,
		fontSize: 16,
	},
});
