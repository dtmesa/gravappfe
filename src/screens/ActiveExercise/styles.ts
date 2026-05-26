import { StyleSheet } from "react-native";
import { colors } from "../../css/color";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.bg.primary,
		flex: 1,
	},

	scrollContainer: {
		paddingBottom: 40,
	},

	inner: {
		backgroundColor: colors.bg.primary,
		marginTop: 50,
		padding: 30,
		gap: 20,
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
		justifyContent: "space-between",
		position: "relative",
		marginBottom: 30,
	},

	info: {
		fontFamily: "Play_400Regular",
		fontSize: 25,
		color: colors.text.muted,
		textAlign: "center",
		marginTop: 20,
	},

	descrWrapper: {
		backgroundColor: colors.bg.input,
		borderColor: colors.border.primary,
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 16,
		minHeight: 50,
		maxHeight: 150,
	},

	descrText: {
		color: colors.text.muted,
		fontFamily: "Play_400Regular",
		fontSize: 16,
		paddingVertical: 12,
	},
});
