import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { colors } from "../../css/color";
import { styles } from "./styles";

type RowProps = {
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

function SetRow({
	title,
	weight,
	reps,
	duration,
	distance,
	onChangeWeight,
	onChangeReps,
	onChangeDuration,
	onChangeDistance,
}: RowProps) {
	const [focusedMetric, setFocusedMetric] = useState<string | null>(null);

	const metrics = [
		{ metric: "Wt", value: weight, unit: "lbs", onChange: onChangeWeight, showUnit: true },
		{ metric: "Reps", value: reps, unit: "reps", onChange: onChangeReps, showUnit: false },
		{
			metric: "Dur",
			value: duration,
			unit: "min",
			onChange: onChangeDuration,
			showUnit: true,
		},
		{ metric: "Dist", value: distance, unit: "mi", onChange: onChangeDistance, showUnit: true },
	].filter((row): row is MetricRow => row.value !== null && row.onChange !== undefined);

	if (metrics.length === 0) return null;

	return (
		<View style={styles.rowContainer}>
			<View style={styles.setRow}>
				<Text style={styles.setTitle}>{title}</Text>

				<View style={styles.metrics}>
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
									if (value === "0" || value === null || value === undefined) onChange("");
								}}
								onBlur={() => {
									setFocusedMetric(null);

									let cleaned = value ?? "";

									if (metric === "Reps") {
										cleaned = cleaned.replace(/[^0-9]/g, "");
									} else {
										cleaned = cleaned.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
									}

									onChange(cleaned === "" ? "0" : cleaned);
								}}
							/>
						</View>
					))}
				</View>
			</View>
		</View>
	);
}

type SwipeableProps = {
	index: number;
	weight: string | null;
	reps: string | null;
	duration: string | null;
	distance: string | null;
	onDelete: () => void;
	onChangeWeight?: (val: string) => void;
	onChangeReps?: (val: string) => void;
	onChangeDuration?: (val: string) => void;
	onChangeDistance?: (val: string) => void;
};

export function SwipeableSetRow({
	index,
	onDelete,
	weight,
	reps,
	duration,
	distance,
	onChangeWeight,
	onChangeReps,
	onChangeDuration,
	onChangeDistance,
}: SwipeableProps) {
	const [swiping, setSwiping] = useState(false);
	const translateX = useSharedValue(0);

	const panGesture = Gesture.Pan()
		.activeOffsetX([-10, 10])
		.runOnJS(true)
		.onUpdate((event) => {
			if (event.translationX > 0) {
				translateX.value = event.translationX;
				setSwiping(true);
			}
		})
		.onEnd(() => {
			if (translateX.value > 120) {
				onDelete();
			}
			translateX.value = withSpring(0);
			setSwiping(false);
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View style={animatedStyle}>
				<SetRow
					title={`Set ${index}`}
					weight={weight}
					reps={reps}
					duration={duration}
					distance={distance}
					onChangeWeight={onChangeWeight}
					onChangeReps={onChangeReps}
					onChangeDuration={onChangeDuration}
					onChangeDistance={onChangeDistance}
				/>
				<View style={styles.setChevronContainer}>
					<ChevronRight
						size={22}
						color={swiping ? colors.text.accent : colors.button.muted}
						strokeWidth={1.75}
					/>
				</View>
			</Animated.View>
		</GestureDetector>
	);
}
