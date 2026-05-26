import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../css/color";

type Props = SetVars & {
	title: string;
	onChangeWeight?: (val: string) => void;
	onChangeReps?: (val: string) => void;
	onChangeDuration?: (val: string) => void;
	onChangeDistance?: (val: string) => void;
};

export type SetVars = {
	weight: number | null;
	reps: number | null;
	duration: number | null;
	distance: number | null;
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
	const [focusedLabel, setFocusedLabel] = useState<string | null>(null);

	const rows = [
		{ label: "Weight", value: weight, unit: "lbs", onChange: onChangeWeight, showUnit: true },
		{ label: "Reps", value: reps, unit: "reps", onChange: onChangeReps, showUnit: false },
		{ label: "Duration", value: duration, unit: "min", onChange: onChangeDuration, showUnit: true },
		{ label: "Distance", value: distance, unit: "mi", onChange: onChangeDistance, showUnit: true },
	].filter(
		(
			row,
		): row is {
			label: string;
			value: number;
			unit: string;
			onChange: (val: string) => void;
			showUnit: boolean;
		} => row.value !== null,
	);

	if (rows.length === 0) return null;

	return (
		<View style={styles.rowContainer}>
			<View style={styles.row}>
				<Text style={styles.label}>{title}</Text>
				<View style={styles.metrics}>
					{rows.map(({ label, value, unit, onChange, showUnit }) => (
						<View
							key={label}
							style={[styles.metric, focusedLabel === label && styles.metricFocused]}
						>
							<Text
								style={[styles.metricLabel, focusedLabel === label && styles.metricLabelFocused]}
							>
								{label}
								{showUnit ? ` (${unit})` : ""}
							</Text>
							<View style={styles.inputRow}>
								<TextInput
									style={styles.metricValue}
									value={value.toString()}
									onChangeText={onChange}
									keyboardType="decimal-pad"
									onFocus={() => setFocusedLabel(label)}
									onBlur={() => setFocusedLabel(null)}
								/>
							</View>
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
		paddingVertical: "3%",
		backgroundColor: colors.bg.secondary,
		borderBottomWidth: 1,
		borderBottomColor: colors.border.secondary,
		flexDirection: "row",
		alignItems: "center",
	},
	inputRow: {
		flexDirection: "row",
		alignItems: "baseline",
		gap: 4,
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
	unit: {
		fontFamily: "Play_700Bold",
		color: colors.text.muted,
		fontSize: 12,
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
