import { StyleSheet } from "react-native";
import { colors } from "../../css/color";
import { styles as settingsStyles } from "../Settings/styles";

export const styles = StyleSheet.create({
	...settingsStyles,
	title: {
		marginTop: 5,
		fontFamily: "Syncopate_700Bold",
		color: colors.text.accentDark,
		fontSize: 20,
		textAlign: "center",
	},
	titleRowLeft: {
		width: 45,
		alignItems: "flex-start",
	},
});
