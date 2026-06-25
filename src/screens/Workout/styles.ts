import { StyleSheet } from "react-native";
import { colors } from "../../css/color";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.bg.primary,
		flex: 1,
	},
	innerContainer: {
		backgroundColor: colors.bg.primary,
		marginTop: 30,
		paddingHorizontal: 40,
		paddingVertical: 20,
		gap: 20,
	},
	headerContainer: {
		backgroundColor: colors.bg.primary,
		paddingHorizontal: 18,
		paddingTop: 50,
	},
	flatListBuffer: {
		paddingBottom: 50,
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
	infoText: {
		fontFamily: "Play_400Regular",
		fontSize: 25,
		color: colors.text.muted,
		textAlign: "center",
		marginTop: 20,
	},
	inputWrapper: {
		backgroundColor: colors.bg.input,
		borderColor: colors.border.transparent,
		borderRadius: 18,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		height: 50,
		marginBottom: 20,
		elevation: 8,
	},
	inputText: {
		color: colors.text.input,
		fontFamily: "Play_400Regular",
		fontSize: 16,
		flex: 1,
	},
	inputFocused: {
		backgroundColor: colors.bg.inputHighlight,
		borderColor: colors.border.transparent,
		shadowColor: colors.shadow.primary,
	},
	inputPlaceholder: {
		fontFamily: "Play_400Regular",
		color: colors.text.muted,
		fontSize: 16,
		position: "absolute",
		left: 18,
		top: 13,
	},
	descriptionWrapper: {
		backgroundColor: colors.bg.input,
		borderColor: colors.border.transparent,
		borderRadius: 18,
		paddingHorizontal: 16,
		minHeight: 50,
		maxHeight: 150,
		elevation: 8,
	},
	descriptionInput: {
		color: colors.text.input,
		fontFamily: "Play_400Regular",
		fontSize: 16,
	},
	descriptionPlaceholder: {
		color: colors.text.muted,
		fontFamily: "Play_400Regular",
		fontSize: 16,
		position: "absolute",
		left: 18,
		top: 13,
	},
});
