import { Plus } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "../../css/color";

type Props = {
	onPress: () => void;
};

export default function PlusRow({ onPress }: Props) {
	return (
		<View style={styles.rowContainer}>
			<Pressable onPress={onPress}>
				{({ pressed }) => (
					<View style={[styles.row, pressed && styles.rowPressed]}>
						<Plus
							size={32}
							color={pressed ? colors.button.accentLight : colors.button.muted}
							strokeWidth={1.75}
						/>
					</View>
				)}
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	rowContainer: {
		width: "100%",
	},
	row: {
		paddingVertical: "5%",
		backgroundColor: colors.bg.secondary,
		alignItems: "center",
		justifyContent: "center",
	},
	rowPressed: {
		elevation: 8,
		shadowColor: colors.button.accentHighlight,
		backgroundColor: colors.bg.inputHighlight,
	},
});
