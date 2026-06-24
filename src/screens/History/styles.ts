import { StyleSheet } from "react-native";
import { colors } from "../../css/color";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.bg.primary,
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
});
