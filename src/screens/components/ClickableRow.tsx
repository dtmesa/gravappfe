import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../css/color";

type Props = {
	val: { id: number; name: string };
	isLast: boolean;
	onPress: () => void;
	isVisited?: boolean;
};

export default function MoveableRow({ val, isLast, onPress, isVisited }: Props) {
	return (
		<View style={styles.container}>
			<Pressable onPress={onPress}>
				{({ pressed }) => (
					<View
						style={[
							styles.row,
							isLast && styles.rowLast,
							isVisited && styles.rowVisited,
							pressed && styles.rowPressed,
						]}
					>
						<Text
							style={[
								styles.text,
								isVisited && styles.textVisited,
								pressed && styles.textPressed,
								isVisited && pressed && styles.textPressedVisited,
							]}
						>
							{val.name}
						</Text>
					</View>
				)}
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	row: {
		paddingHorizontal: "7%",
		paddingVertical: "7%",
		backgroundColor: colors.bg.secondary,
		borderBottomWidth: 1,
		borderBottomColor: colors.border.secondary,
		alignItems: "center",
		flexDirection: "row",
	},
	rowLast: {
		borderBottomWidth: 0,
	},
	rowPressed: {
		backgroundColor: colors.bg.inputHighlight,
	},
	rowVisited: {
		backgroundColor: colors.bg.input,
	},
	text: {
		fontFamily: "Play_700Bold",
		color: colors.text.muted,
		fontSize: 20,
	},
	textVisited: {
		color: colors.text.static,
	},
	textPressed: {
		color: colors.text.accent,
	},
	textPressedVisited: {
		color: colors.text.accentHighlight,
	},
});
