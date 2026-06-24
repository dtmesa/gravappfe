import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Check } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { Keyboard, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { getExercise, updateExercise } from "../../api/exercises";
import { colors } from "../../css/color";
import type { Exercise } from "../../types/exercise";
import type { RootStackParamList } from "../../types/navigation";
import BackButton from "../components/BackButton";
import { StarBackground } from "../components/StarBackground";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Exercise">;

export default function ExerciseScreen({ navigation, route }: Props) {
	const { exerciseId, workoutId } = route.params;

	const [exercise, setExercise] = useState<Exercise | null>(null);
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [description, setDescription] = useState(exercise?.description ?? "");

	const fetchExercise = useCallback(async () => {
		const data = await getExercise(workoutId, exerciseId);
		setExercise(data);
	}, [workoutId, exerciseId]);

	const handleToggleField = useCallback(
		async (field: "isWeight" | "isReps" | "isDuration" | "isDistance") => {
			if (!exercise) return;

			const newValue = !exercise[field];

			setExercise((prev) => (prev ? { ...prev, [field]: newValue } : prev));

			try {
				await updateExercise(workoutId, exerciseId, field, newValue);
			} catch {
				setExercise((prev) => (prev ? { ...prev, [field]: !newValue } : prev));
			}
		},
		[exercise, workoutId, exerciseId],
	);

	const handleUpdateDescription = useCallback(async () => {
		if (!exercise) return;

		const trimmed = description.trim();
		setFocusedField(null);
		Keyboard.dismiss();

		if (trimmed === (exercise.description ?? "").trim()) return;

		try {
			await updateExercise(workoutId, exerciseId, "description", trimmed);
			setExercise((prev) => (prev ? { ...prev, description: trimmed } : prev));
		} catch {
			setDescription(exercise.description ?? "");
		}
	}, [exercise, description, workoutId, exerciseId]);

	useEffect(() => {
		fetchExercise();
	}, [fetchExercise]);

	useEffect(() => {
		if (exercise) setDescription(exercise.description ?? "");
	}, [exercise]);

	if (!exercise) {
		return (
			<View style={styles.container}>
				<StarBackground />
			</View>
		);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<View style={styles.titleRow}>
						<View style={styles.titleRowLeft}>
							<BackButton onBack={() => navigation.goBack()} />
						</View>
						<View style={styles.titleContainer}>
							<Text numberOfLines={1} style={styles.title}>
								{exercise.name}
							</Text>
						</View>
						<View style={styles.titleRowRight} />
					</View>
				</View>
				<View style={styles.innerContainer}>
					<View
						style={[
							styles.descriptionWrapper,
							focusedField === "description" && styles.descriptionFocused,
						]}
					>
						<TextInput
							value={description}
							style={[
								styles.descriptionText,
								{ color: focusedField === "description" ? colors.text.input : colors.text.static },
							]}
							onChangeText={setDescription}
							onFocus={() => setFocusedField("description")}
							onBlur={handleUpdateDescription}
							multiline
						/>
						{description.length === 0 && focusedField !== "description" && (
							<Text style={styles.descriptionPlaceholderText}>Add a description...</Text>
						)}
					</View>
					<View style={styles.checksWrapper}>
						{(["isWeight", "isReps", "isDuration", "isDistance"] as const).map((field) => (
							<Pressable key={field} onPress={() => handleToggleField(field)}>
								{({ pressed }) => (
									<View style={[styles.checkRow, pressed && styles.checkRowPressed]}>
										<Text style={[styles.checkLabel, pressed && styles.checkLabelPressed]}>
											{field === "isWeight"
												? "Weighted"
												: field === "isReps"
													? "Repetitions"
													: field === "isDuration"
														? "Duration"
														: "Distance"}
										</Text>
										<View style={[styles.checkbox, exercise[field] && styles.checkboxChecked]}>
											{exercise[field] && (
												<Check size={14} color={colors.text.static} strokeWidth={2.5} />
											)}
										</View>
									</View>
								)}
							</Pressable>
						))}
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
