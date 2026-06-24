import { RotateCcw } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../css/color";

type Props = {
	running: boolean;
	elapsed: number;
	onPress: () => void;
	onReset: () => void;
};

export default function TimerRow({ running, elapsed, onPress, onReset }: Props) {
	const formatTime = (seconds: number) => {
		const m = Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0");
		const s = (seconds % 60).toString().padStart(2, "0");
		return `${m}:${s}`;
	};

	return (
		<View style={styles.rowContainer}>
			<Pressable onPress={onPress}>
				{({ pressed }) => (
					<View style={[styles.row, pressed && styles.rowPressed, running && styles.rowActive]}>
						<View style={styles.textWrapper}>
							<Text
								style={[styles.text, running && styles.textRunning, pressed && styles.textPressed]}
							>
								{formatTime(elapsed)}
							</Text>
						</View>
						<Pressable
							onPress={(e) => {
								e.stopPropagation();
								onReset();
							}}
							hitSlop={12}
						>
							{({ pressed: resetPressed }) => (
								<RotateCcw
									size={32}
									color={
										resetPressed
											? colors.button.accentHighlight
											: running
												? colors.button.accent
												: colors.button.muted
									}
									strokeWidth={1.75}
								/>
							)}
						</Pressable>
					</View>
				)}
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	rowContainer: {
		width: "100%",
		paddingHorizontal: "4%",
		marginBottom: 10,
	},
	row: {
		paddingHorizontal: "7.5%",
		paddingVertical: "4.5%",
		backgroundColor: colors.bg.input,
		borderBottomColor: colors.border.transparent,
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 18,
	},
	rowActive: {
		backgroundColor: colors.bg.inputHighlight,
	},
	rowPressed: {
		elevation: 8,
		shadowColor: colors.shadow.primary,
		backgroundColor: colors.bg.inputHighlight,
	},
	text: {
		fontFamily: "Play_700Bold",
		color: colors.text.static,
		fontSize: 35,
		textAlign: "center",
	},
	textWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	textPressed: {
		color: colors.text.accentHighlight,
	},
	textRunning: {
		color: colors.text.accent,
	},
});
