import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

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
		<View style={styles.setRowContainer}>
			<View style={styles.setRow}>
				<Text style={styles.setTitle}>{title}</Text>

				<View style={styles.setMetrics}>
					{metrics.map(({ metric, value, unit, onChange, showUnit }) => (
						<View
							key={metric}
							style={[
								styles.setMetricContainer,
								focusedMetric === metric && styles.setMetricFocused,
							]}
						>
							<Text
								style={[
									styles.setMetricLabel,
									focusedMetric === metric && styles.setMetricLabelFocused,
								]}
							>
								{metric}
								{showUnit ? ` (${unit})` : ""}
							</Text>

							<TextInput
								style={styles.setMetricValue}
								value={value}
								onChangeText={onChange}
								keyboardType="decimal-pad"
								onFocus={() => {
									setFocusedMetric(metric);
								}}
								onBlur={() => {
									setFocusedMetric(null);

									let cleaned = value;

									if (metric === "Reps") {
										cleaned = cleaned.replace(/[^0-9]/g, "");
									} else {
										cleaned = cleaned.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
									}

									onChange(cleaned);
								}}
							/>
						</View>
					))}
				</View>
			</View>
		</View>
	);
}
