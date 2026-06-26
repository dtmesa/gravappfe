import { Check } from "lucide-react-native";
import { Animated, Pressable, Text, View } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";
import { styles } from "./styles";

type CheckField = "isWeight" | "isReps" | "isDuration" | "isDistance";

const FIELD_LABELS: Record<CheckField, string> = {
	isWeight: "Weighted",
	isReps: "Repetitions",
	isDuration: "Duration",
	isDistance: "Distance",
};

type CheckRowProps = {
	field: CheckField;
	checked: boolean;
	disabled: boolean;
	onPress: (field: CheckField) => void;
};

function CheckRow({ field, checked, disabled, onPress }: CheckRowProps) {
	const { scale, pressIn, pressOut } = useScaleAnimation();

	return (
		<Pressable
			disabled={disabled}
			onPressIn={pressIn}
			onPressOut={pressOut}
			onPress={() => onPress(field)}
		>
			{({ pressed }) => (
				<Animated.View
					style={[styles.checkRow, pressed && styles.checkRowPressed, { transform: [{ scale }] }]}
				>
					<Text style={[styles.checkLabel, pressed && styles.checkLabelPressed]}>
						{FIELD_LABELS[field]}
					</Text>
					<View style={[styles.checkbox, checked && styles.checkboxChecked]}>
						{checked && <Check size={16} color={colors.text.static} strokeWidth={2.5} />}
					</View>
				</Animated.View>
			)}
		</Pressable>
	);
}

const FIELDS = ["isWeight", "isReps", "isDuration", "isDistance"] as const;

type ChecksProps = {
	exercise: Record<CheckField, boolean>;
	loading: boolean;
	onToggle: (field: CheckField) => void;
};

export function ExerciseChecks({ exercise, loading, onToggle }: ChecksProps) {
	return (
		<View style={styles.checksWrapper}>
			{FIELDS.map((field) => (
				<CheckRow
					key={field}
					field={field}
					checked={exercise[field]}
					disabled={loading}
					onPress={onToggle}
				/>
			))}
		</View>
	);
}
