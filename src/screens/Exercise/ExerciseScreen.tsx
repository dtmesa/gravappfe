import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { getExercise, updateExercise } from "../../api/exercises.api";
import { colors } from "../../css/color";
import type { Exercise } from "../../types/exercise.types";
import type { RootStackParamList } from "../../types/navigation.types";
import { BackButton } from "../components/BackButton";
import { EditButton } from "../components/EditButton";
import { FadeIn } from "../components/FadeIn";
import { StarBackground } from "../components/StarBackground";
import { StatusMessage } from "../components/StatusMessage";
import { ExerciseChecks } from "./CheckRow";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Exercise">;

const MAX_NAME_LENGTH = 75;
const MAX_DESCRIPTION_LENGTH = 500;

export function ExerciseScreen({ navigation, route }: Props) {
	const { exerciseId, workoutId } = route.params;

	const [exercise, setExercise] = useState<Exercise | null>(null);
	const [focusedField, setFocusedField] = useState(false);
	const [title, setTitle] = useState(exercise?.name ?? "");
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const titleInputRef = useRef<TextInput>(null);
	const [description, setDescription] = useState(exercise?.description ?? "");
	const [loading, setLoading] = useState(false);
	const [descriptionError, setDescriptionError] = useState<string | null>(null);

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

		const rawTrimmed = description.trim();
		const trimmed = rawTrimmed.slice(0, MAX_DESCRIPTION_LENGTH);
		setFocusedField(false);
		Keyboard.dismiss();

		if (rawTrimmed.length > MAX_DESCRIPTION_LENGTH) {
			setDescriptionError(`Description was trimmed to ${MAX_DESCRIPTION_LENGTH} characters`);
		} else {
			setDescriptionError(null);
		}

		if (trimmed === (exercise.description ?? "").trim()) {
			setDescription(trimmed);
			return;
		}

		try {
			await updateExercise(workoutId, exerciseId, "description", trimmed);
			setExercise((prev) => (prev ? { ...prev, description: trimmed } : prev));
			setDescription(trimmed);
		} catch {
			setDescription(exercise.description ?? "");
			setDescriptionError("Failed to update description");
		}
	}, [exercise, description, workoutId, exerciseId]);

	const handleUpdateTitle = async () => {
		if (!exercise) return;

		const rawTrimmed = title.trim();
		const trimmed = rawTrimmed.slice(0, MAX_NAME_LENGTH);
		setIsEditingTitle(false);
		Keyboard.dismiss();

		if (!rawTrimmed) {
			setDescriptionError("Workout name cannot be empty");
			setTitle(exercise.name);
			return;
		}

		if (rawTrimmed.length > MAX_NAME_LENGTH) {
			setDescriptionError(`Workout name was trimmed to ${MAX_NAME_LENGTH} characters`);
		} else {
			setDescriptionError(null);
		}

		if (trimmed === exercise.name.trim()) {
			setTitle(trimmed);
			return;
		}

		try {
			await updateExercise(workoutId, exerciseId, "name", trimmed);
			setExercise((prev) => (prev ? { ...prev, name: trimmed } : prev));
			setTitle(trimmed);
		} catch {
			setTitle(exercise.name);
			setDescriptionError("Failed to update workout name");
		}
	};

	useEffect(() => {
		if (isEditingTitle) titleInputRef.current?.focus();
	}, [isEditingTitle]);

	useEffect(() => {
		fetchExercise();
	}, [fetchExercise]);

	useEffect(() => {
		if (exercise) {
			setDescription(exercise.description ?? "");
			setTitle(exercise.name);
		}
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
							{isEditingTitle ? (
								<TextInput
									autoFocus
									ref={titleInputRef}
									style={styles.title}
									value={title}
									onChangeText={setTitle}
									onSubmitEditing={handleUpdateTitle}
									onBlur={handleUpdateTitle}
									maxLength={75}
									returnKeyType="done"
								/>
							) : (
								<Text numberOfLines={1} style={styles.title}>
									{exercise.name}
								</Text>
							)}
						</View>
						<View style={styles.titleRowRight}>
							<EditButton
								onEdit={() => {
									setIsEditingTitle(true);
								}}
							/>
						</View>
					</View>
				</View>
				<FadeIn visible={true}>
					<View style={styles.innerContainer}>
						<StatusMessage
							message={descriptionError}
							type="error"
							onClear={() => setDescriptionError(null)}
						/>
						<View style={[styles.descriptionWrapper, focusedField && styles.descriptionFocused]}>
							<TextInput
								value={description}
								style={[
									styles.descriptionText,
									{ color: focusedField ? colors.text.input : colors.text.static },
								]}
								onChangeText={setDescription}
								onFocus={() => setFocusedField(true)}
								onBlur={handleUpdateDescription}
								multiline
							/>
							{description.length === 0 && !focusedField && (
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
