import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../css/color";

type Props = {
	title: string;
	weight: string | null;
	reps: string | null;
	duration: string | null;
	distance: string | null;
	onChangeWeight?: (val: string) => void;
	onChangeReps?: (val: string) => void;
	onChangeDuration?: (val: string) => void;
	onChangeDistance?: (val: string) => void;
};

type MetricRow = {
	metric: string;
	value: string;
	unit: string;
	onChange: (val: string) => void;
	showUnit: boolean;
};

export function SetRow({
	title,
	weight,
	reps,
	duration,
	distance,
	onChangeWeight,
	onChangeReps,
	onChangeDuration,
	onChangeDistance,
}: Props) {
	const [focusedMetric, setFocusedMetric] = useState<string | null>(null);

	const metrics = [
		{ metric: "Weight", value: weight, unit: "lbs", onChange: onChangeWeight, showUnit: true },
		{ metric: "Reps", value: reps, unit: "reps", onChange: onChangeReps, showUnit: false },
		{
			metric: "Duration",
			value: duration,
			unit: "min",
			onChange: onChangeDuration,
			showUnit: true,
		},
		{ metric: "Distance", value: distance, unit: "mi", onChange: onChangeDistance, showUnit: true },
	].filter((row): row is MetricRow => row.value !== null && row.onChange !== undefined);

	if (metrics.length === 0) return null;

	return (
		<View style={styles.rowContainer}>
			<View style={styles.row}>
				<Text style={styles.title}>{title}</Text>

				<View style={styles.metrics}>
					{metrics.map(({ metric, value, unit, onChange, showUnit }) => (
						<View
							key={metric}
							style={[styles.metricContainer, focusedMetric === metric && styles.metricFocused]}
						>
							<Text
								style={[styles.metricLabel, focusedMetric === metric && styles.metricLabelFocused]}
							>
								{metric}
								{showUnit ? ` (${unit})` : ""}
							</Text>

							<TextInput
								style={styles.metricValue}
								value={value}
								onChangeText={onChange}
								keyboardType="decimal-pad"
								onFocus={() => {
									setFocusedMetric(metric);
									if (value === "0") onChange("");
								}}
								onBlur={() => {
									setFocusedMetric(null);
									if (value === "") onChange("0");
								}}
							/>
						</View>
					))}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontFamily: "Play_700Bold",
		color: colors.text.muted,
		fontSize: 14,
		marginRight: 16,
	},
	rowContainer: {
		width: "100%",
	},
	row: {
		paddingHorizontal: "5%",
		paddingVertical: "3%",
		backgroundColor: colors.bg.secondary,
		borderBottomWidth: 1,
		borderBottomColor: colors.border.secondary,
		flexDirection: "row",
		alignItems: "center",
	},
	metrics: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	metricContainer: {
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
	metricLabelFocused: {
		color: colors.text.accentLight,
	},
	metricFocused: {
		backgroundColor: colors.bg.inputHighlight,
		borderRadius: 6,
		paddingHorizontal: 6,
	},
});
