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
		borderBottomWidth: 2,
	},
	calendarContainer: {
		borderRadius: 18,
		marginHorizontal: "4%",
		backgroundColor: colors.bg.input,
		overflow: "hidden",
		marginBottom: 5,
	},
	inputContainer: {
		paddingHorizontal: 40,
		paddingVertical: 20,
		marginBottom: 20,
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
	input: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		flex: 1,
		color: colors.text.input,
	},
	inputFocused: {
		backgroundColor: colors.bg.inputHighlight,
		shadowColor: colors.shadow.primary,
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
	placeholderText: {
		fontFamily: "Play_400Regular",
		position: "absolute",
		left: 18,
		top: 13,
		color: colors.text.muted,
		fontSize: 16,
	},
});
