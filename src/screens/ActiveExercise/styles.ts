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
	avgRowContainer: {
		width: "100%",
		paddingHorizontal: "4%",
		marginBottom: 10,
	},
	avgRow: {
		paddingHorizontal: "5%",
		paddingVertical: "5%",
		backgroundColor: colors.bg.input,
		borderBottomColor: colors.border.transparent,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 18,
	},
	avgLabel: {
		fontFamily: "Play_700Bold",
		color: colors.text.muted,
		fontSize: 14,
		marginRight: 16,
	},
	avgMetrics: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	avgMetric: {
		alignItems: "center",
	},
	avgMetricLabel: {
		fontFamily: "Play_700Bold",
		color: colors.text.muted,
		fontSize: 12,
	},
	avgMetricValue: {
		fontFamily: "Play_700Bold",
		color: colors.text.static,
		fontSize: 20,
	},
	setTitle: {
		fontFamily: "Play_700Bold",
		color: colors.text.muted,
		fontSize: 14,
		marginRight: 16,
	},
	setRowContainer: {
		width: "100%",
		paddingHorizontal: "4%",
		marginBottom: 10,
	},
	setRow: {
		paddingHorizontal: "5%",
		paddingVertical: "3%",
		backgroundColor: colors.bg.input,
		borderBottomColor: colors.border.transparent,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 18,
	},
	setMetrics: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	setMetricContainer: {
		alignItems: "center",
	},
	setMetricLabel: {
		fontFamily: "Play_700Bold",
		color: colors.text.muted,
		fontSize: 12,
	},
	setMetricValue: {
		fontFamily: "Play_700Bold",
		color: colors.text.static,
		fontSize: 20,
	},
	setMetricLabelFocused: {
		color: colors.text.accentLight,
	},
	setMetricFocused: {
		backgroundColor: colors.bg.inputHighlight,
		borderRadius: 9,
		paddingHorizontal: 9,
	},
});
