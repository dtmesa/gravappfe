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
		borderBottomWidth: 2,
	},
	calendarContainer: {
		borderRadius: 18,
		marginHorizontal: "4%",
		backgroundColor: colors.bg.input,
		overflow: "hidden",
		paddingBottom: 2,
		marginBottom: 30,
	},
	inputContainer: {
		marginHorizontal: 40,
		marginBottom: 15,
	},
	flatListBuffer: {
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
		width: 50,
	},
	titleRowRight: {
		width: 50,
		alignItems: "flex-end",
	},
	inputFocused: {
		backgroundColor: colors.bg.inputHighlight,
		elevation: 8,
		...iosShadow(8, colors.shadow.primary),
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.bg.input,
		borderRadius: 18,
		paddingHorizontal: 16,
		height: 50,
	},
	placeholderText: {
		fontFamily: "Play_400Regular",
		color: colors.text.muted,
		fontSize: 16,
		includeFontPadding: false,
	},
	textHighlight: {
		color: colors.text.accentHighlight,
	},
	modalBackground: {
		flex: 1,
		backgroundColor: colors.bg.darken,
	},
	modalContainer: {
		backgroundColor: colors.bg.input,
		borderRadius: 18,
		width: "86%",
		height: "60%",
		elevation: 8,
		...iosShadow(8, colors.shadow.primary),
	},
	modalWrapper: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalTitle: {
		marginTop: 20,
		fontFamily: "Syncopate_700Bold",
		color: colors.text.accentDark,
		fontSize: 20,
		textAlign: "center",
	},
	modalInputText: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		flex: 1,
		color: colors.text.input,
	},
	// Flat at rest, shadow only while focused. elevation lives here rather
	// than on modalInputWrapper below -- Android's elevation is unconditional
	// wherever it's set, so it has to be on the gated style, not the base.
	modalInputFocused: {
		backgroundColor: colors.bg.inputSecondaryHighlight,
		elevation: 8,
		...iosShadow(8, colors.shadow.primary),
	},
	modalInputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.bg.inputHighlight,
		borderRadius: 18,
		marginHorizontal: 16,
		paddingHorizontal: 18,
		height: 50,
		marginBottom: 20,
	},
	modalInputContainer: {
		marginTop: 20,
	},
	modalFilterBuffer: {
		marginLeft: 8,
	},
	modalListBuffer: {
		marginBottom: 20,
	},
	modalPlaceholderText: {
		fontFamily: "Play_400Regular",
		color: colors.text.mutedSecondary,
		fontSize: 16,
		position: "absolute",
		left: 18,
		includeFontPadding: false,
	},
});
