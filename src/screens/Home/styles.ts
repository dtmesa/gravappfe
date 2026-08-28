import { StyleSheet } from "react-native";
import { colors } from "../../css/color";
import { iosShadow } from "../../css/shadow";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.bg.primary,
	},
	headerMenuContainer: {
		position: "relative",
	},
	inputContainer: {
		paddingHorizontal: 40,
		paddingVertical: 20,
		marginBottom: 20,
	},
	flatListBuffer: {
		paddingBottom: 50,
	},
	headerContainer: {
		backgroundColor: colors.bg.primary,
		paddingHorizontal: 18,
		paddingTop: 50,
		paddingBottom: 30,
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
	},
	titleRowLeft: {
		width: 50,
	},
	titleRowRight: {
		width: 50,
		alignItems: "flex-end",
	},
	input: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		flex: 1,
		color: colors.text.input,
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
	infoText: {
		fontSize: 25,
		color: colors.text.muted,
		textAlign: "center",
		marginTop: 20,
		fontFamily: "Play_400Regular",
	},
	placeholderText: {
		fontFamily: "Play_400Regular",
		position: "absolute",
		left: 18,
		top: 13,
		color: colors.text.muted,
		fontSize: 16,
	},
	drawerButton: {
		paddingVertical: 15,
		paddingHorizontal: 25,
		width: "95%",
		alignSelf: "center",
		borderRadius: 18,
		backgroundColor: colors.bg.input,
		marginBottom: 10,
	},
	drawerButtonPressed: {
		backgroundColor: colors.bg.inputHighlight,
	},
	drawerButtonContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	drawerUserText: {
		fontFamily: "Syncopate_700Bold",
		fontSize: 25,
		color: colors.text.accentDark,
		marginBottom: 25,
		marginTop: 50,
		marginHorizontal: 20,
		paddingBottom: 25,
		borderBottomWidth: 2,
		borderBottomColor: colors.border.primary,
	},
	drawerText: {
		fontFamily: "Play_700Bold",
		fontSize: 18,
		color: colors.text.input,
		paddingBottom: 2,
	},
	drawerTextPressed: {
		color: colors.text.accent,
	},
});
