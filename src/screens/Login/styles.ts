import { StyleSheet } from "react-native";
import { colors } from "../../css/color";

export const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
		backgroundColor: colors.bg.primary,
	},
	inner: {
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
	button: {
		backgroundColor: colors.button.accent,
		padding: 10,
		borderRadius: 12,
		marginTop: 12,
		marginRight: 75,
		marginLeft: 75,
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
	inputFocused: {
		borderColor: colors.border.accent,
		borderWidth: 2,
		backgroundColor: colors.bg.inputHighlight,
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
		borderRadius: 12,
		paddingHorizontal: 16,
		height: 50,
		borderWidth: 1,
		borderColor: colors.border.primary,
		marginBottom: 10,
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
