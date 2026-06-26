import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { getExercise, updateExercise } from "../../api/exercises";
import { colors } from "../../css/color";
import type { Exercise } from "../../types/exercise";
import type { RootStackParamList } from "../../types/navigation";
import BackButton from "../components/BackButton";
import { FadeIn } from "../components/FadeIn";
import { StarBackground } from "../components/StarBackground";
import { ExerciseChecks } from "./CheckRow";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Exercise">;

export default function ExerciseScreen({ navigation, route }: Props) {
	const { exerciseId, workoutId } = route.params;

	const [exercise, setExercise] = useState<Exercise | null>(null);
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [description, setDescription] = useState(exercise?.description ?? "");
	const [loading, setLoading] = useState(false);

	const fetchExercise = useCallback(async () => {
		const data = await getExercise(workoutId, exerciseId);
		setExercise(data);
	}, [workoutId, exerciseId]);

	const handleToggleField = useCallback(
		async (field: "isWeight" | "isReps" | "isDuration" | "isDistance") => {
			if (loading || !exercise) return;

			const newValue = !exercise[field];

			setLoading(true);
			setExercise((prev) => (prev ? { ...prev, [field]: newValue } : prev));

			try {
				await updateExercise(workoutId, exerciseId, field, newValue);
			} catch {
				setExercise((prev) => (prev ? { ...prev, [field]: !newValue } : prev));
			} finally {
				setLoading(false);
			}
		},
		[exercise, loading, workoutId, exerciseId],
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
				<FadeIn visible={true}>
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
							<ExerciseChecks exercise={exercise} loading={loading} onToggle={handleToggleField} />
					</View>
				</FadeIn>
			</View>
		</TouchableWithoutFeedback>
	);
}
