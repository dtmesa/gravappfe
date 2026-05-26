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
		{ label: "Weight", value: weight, isInteger: true, unit: "lbs", showUnit: true },
		{ label: "Reps", value: reps, isInteger: true, unit: "reps", showUnit: false },
		{ label: "Duration", value: duration, isInteger: false, unit: "min", showUnit: true },
		{ label: "Distance", value: distance, isInteger: false, unit: "mi", showUnit: true },
	].filter(
		(
			row,
		): row is {
			label: string;
			value: number;
			unit: string;
			isInteger: boolean;
			showUnit: boolean;
		} => row.value !== null,
	);

	if (rows.length === 0) return null;

	return (
		<View style={styles.rowContainer}>
			<View style={styles.row}>
				<Text style={styles.label}>{title}</Text>
				<View style={styles.metrics}>
					{rows.map(({ isInteger, label, value, unit, showUnit }) => (
						<View key={label} style={styles.metric}>
							<Text style={styles.metricLabel}>
								{label}
								{showUnit ? ` (${unit})` : ""}
							</Text>
							<Text style={styles.metricValue}>
								{isInteger ? Math.round(value).toString() : value.toFixed(1)}
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
		fontSize: 14,
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
		fontSize: 12,
	},
	metricValue: {
		fontFamily: "Play_700Bold",
		color: colors.text.static,
		fontSize: 20,
	},
});
