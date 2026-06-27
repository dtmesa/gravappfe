import { Text, View } from "react-native";
import { styles } from "./styles";

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
			<View style={styles.avgRow}>
				<Text style={styles.avgLabel}>{title}</Text>
				<View style={styles.metrics}>
					{rows.map(({ isInteger, label, value, unit, showUnit }) => (
						<View key={label} style={styles.avgMetric}>
							<Text style={styles.avgMetricLabel}>
								{label}
								{showUnit ? ` (${unit})` : ""}
							</Text>
							<Text style={styles.avgMetricValue}>
								{isInteger ? Math.round(value).toString() : value.toFixed(1)}
							</Text>
						</View>
					))}
				</View>
			</View>
		</View>
	);
}
