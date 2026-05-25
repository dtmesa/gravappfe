import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../css/color";

type Props = Averages & { title: string };

export type Averages = {
	weight: number | null;
	reps: number | null;
	duration: number | null;
	distance: number | null;
};

export function AverageRow({ title, weight, reps, duration, distance }: Props) {
	const rows = [
		{ label: "Weight", value: weight, unit: "lbs" },
		{ label: "Reps", value: reps, unit: "reps" },
		{ label: "Duration", value: duration, unit: "min" },
		{ label: "Distance", value: distance, unit: "mi" },
	].filter((row): row is { label: string; value: number; unit: string } => row.value !== null);

	if (rows.length === 0) return null;

	return (
		<View style={styles.rowContainer}>
			<View style={styles.row}>
				<Text style={styles.label}>{title}</Text>
				<View style={styles.metrics}>
					{rows.map(({ label, value, unit }) => (
						<View key={label} style={styles.metric}>
							<Text style={styles.metricLabel}>{label}</Text>
							<Text style={styles.metricValue}>
								{value.toFixed(1)} {unit}
							</Text>
						</View>
					))}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	rowContainer: {
		width: "100%",
	},
	row: {
		paddingHorizontal: "5%",
		paddingVertical: "5%",
		backgroundColor: colors.bg.secondary,
		borderBottomWidth: 1,
		borderBottomColor: colors.border.secondary,
		flexDirection: "row",
		alignItems: "center",
	},
	label: {
		fontFamily: "Play_700Bold",
		color: colors.text.muted,
		fontSize: 13,
		marginRight: 16,
	},
	metrics: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	metric: {
		alignItems: "center",
	},
	metricLabel: {
		fontFamily: "Play_700Bold",
		color: colors.text.muted,
		fontSize: 11,
	},
	metricValue: {
		fontFamily: "Play_700Bold",
		color: colors.text.static,
		fontSize: 20,
	},
});
