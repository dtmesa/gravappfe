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
	descriptionWrapper: {
		backgroundColor: colors.bg.input,
		borderColor: colors.border.transparent,
		borderRadius: 18,
		paddingHorizontal: 16,
		minHeight: 50,
		maxHeight: 150,
		marginBottom: 20,
	},
	descriptionText: {
		color: colors.text.muted,
		fontFamily: "Play_400Regular",
		fontSize: 16,
		paddingVertical: 12,
	},
	alertBackground: {
		flex: 1,
		backgroundColor: colors.bg.darken,
		justifyContent: "center",
		alignItems: "center",
	},
	alertModal: {
		backgroundColor: colors.bg.input,
		borderRadius: 18,
		borderColor: colors.border.transparent,
		padding: 28,
		gap: 42,
	},
	alertTitle: {
		fontFamily: "Syncopate_700Bold",
		color: colors.text.accentDark,
		fontSize: 20,
		textAlign: "center",
	},
	alertButtons: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
});
