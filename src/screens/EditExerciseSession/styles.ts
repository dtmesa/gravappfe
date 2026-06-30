import { StyleSheet } from "react-native";
import { colors } from "../../css/color";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.bg.primary,
		flex: 1,
	},
	scrollContainer: {
		paddingBottom: 45,
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
	titleContainer: {
		flex: 1,
		paddingHorizontal: 12,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 50,
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
	plusRowContainer: {
		width: "100%",
		paddingHorizontal: 75,
		paddingVertical: 5,
		marginBottom: 20,
	},
	plusRow: {
		paddingVertical: "5%",
		backgroundColor: colors.bg.input,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 18,
	},
	plusRowPressed: {
		elevation: 8,
		shadowColor: colors.shadow.primary,
		backgroundColor: colors.bg.inputHighlight,
	},
	rowContainer: {
		width: "100%",
		paddingHorizontal: "4%",
		marginBottom: 10,
	},
	metrics: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	setTitle: {
		fontFamily: "Play_700Bold",
		color: colors.text.muted,
		fontSize: 14,
		marginRight: 16,
		includeFontPadding: false,
	},
	setRow: {
		paddingHorizontal: "5%",
		paddingVertical: "2%",
		backgroundColor: colors.bg.input,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 18,
	},
	setMetricContainer: {
		alignItems: "center",
		shadowColor: colors.shadow.primary,
	},
	setMetricValue: {
		fontFamily: "Play_700Bold",
		color: colors.text.static,
		fontSize: 20,
		includeFontPadding: false,
	},
	setMetricLabel: {
		fontFamily: "Play_700Bold",
		color: colors.text.muted,
		marginTop: 5,
		fontSize: 12,
		includeFontPadding: false,
	},
	setMetricLabelFocused: {
		color: colors.text.accentLight,
	},
	setMetricFocused: {
		backgroundColor: colors.bg.inputHighlight,
		borderRadius: 10,
		paddingHorizontal: 8,
		elevation: 4,
	},
	setChevronContainer: {
		position: "absolute",
		right: "7%",
		top: 0,
		bottom: "7%",
		justifyContent: "center",
		pointerEvents: "none",
	},
});
