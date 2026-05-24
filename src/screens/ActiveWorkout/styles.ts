import { StyleSheet } from "react-native";
import { colors } from "../../css/color";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.bg.primary,
		flex: 1,
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
	alertBackground: {
        flex: 1,
        backgroundColor: colors.bg.darken,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },
    alertModal: {
        backgroundColor: colors.bg.primary,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border.primary,
        padding: 24,
        width: "100%",
        gap: 12,
		elevation: 12,
		shadowColor: colors.bg.inputHighlight
    },
    alertTitle: {
        fontFamily: "Syncopate_700Bold",
        color: colors.text.accentDark,
        fontSize: 20,
        textAlign: "center",
    },
    alertText: {
        fontFamily: "Play_400Regular",
        color: colors.text.static,
        fontSize: 16,
        textAlign: "center",
    },
    alertButtons: {
        flexDirection: "row",
        gap: 12,
        marginTop: 8,
    },
    alertCancel: {
        flex: 1,
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border.secondary,
		backgroundColor: colors.bg.secondary,
        justifyContent: "center",
        alignItems: "center",
    },
	alertCancelPressed: {
		backgroundColor: colors.button.accentHighlight,
		elevation: 8,
		shadowColor: colors.bg.inputHighlight
	},
    alertCancelText: {
        fontFamily: "Play_400Regular",
        color: colors.text.static,
        fontSize: 18,
    },
	alertCancelTextPressed: {
		color: colors.text.contrast,
	},
    alertConfirm: {
        flex: 1,
        height: 50,
        borderRadius: 12,
        backgroundColor: colors.button.accent,
        justifyContent: "center",
        alignItems: "center",
    },
	alertConfirmPressed: {
		backgroundColor: colors.button.accentHighlight,
		elevation: 8,
		shadowColor: colors.bg.inputHighlight
	},
    alertConfirmText: {
        fontFamily: "Play_400Regular",
        color: colors.text.contrast,
        fontSize: 18,
    }
});
