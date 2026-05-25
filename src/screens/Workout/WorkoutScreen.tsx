import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { createExercise, deleteExercise, getExercises, updateExercise } from "../../api/exercises";
import { getWorkout, updateWorkout } from "../../api/workouts";
import { colors } from "../../css/color";
import type { Exercise } from "../../types/exercise";
import type { RootStackParamList } from "../../types/navigation";
import type { Workout } from "../../types/workout";
import AddButton from "../components/AddButton";
import BackButton from "../components/BackButton";
import MoveableRow from "../components/MoveableRow";
import { StarBackground } from "../components/StarBackground";
import UndoButton from "../components/UndoButton";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Workout">;

export default function WorkoutScreen({ navigation, route }: Props) {
	const { workoutId } = route.params;

	const [workout, setWorkout] = useState<Workout | null>(null);
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [name, setName] = useState("");
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [pendingDelete, setPendingDelete] = useState<Exercise | null>(null);
	const [undoTimeout, setUndoTimeout] = useState<number | null>(null);

	const [description, setDescription] = useState(workout?.description ?? "");

	const fetchWorkout = useCallback(async () => {
		const data = await getWorkout(workoutId);
		setWorkout(data);
	}, [workoutId]);

	const fetchExercises = useCallback(async () => {
		const data = await getExercises(workoutId);
		setExercises(data);
	}, [workoutId]);

	const handleUndo = () => {
		if (!pendingDelete) return;

		setExercises((prev) => {
			const restored = [pendingDelete, ...prev];
			return restored.sort((a, b) => a.order - b.order);
		});

		if (undoTimeout) clearTimeout(undoTimeout);

		setPendingDelete(null);
	};

	const handleDelete = useCallback(
		async (id: number) => {
			const exercise = exercises.find((w) => w.id === id);
			if (!exercise) return;

			setExercises((prev) => prev.filter((w) => w.id !== id));
			setPendingDelete(exercise);

			const timeout = setTimeout(async () => {
				try {
					await deleteExercise(workoutId, id);

					setPendingDelete(null);
				} catch {
					fetchExercises();
				}
			}, 3000);

			setUndoTimeout(timeout);
		},
		[exercises, workoutId, fetchExercises],
	);

	const handleCreateExercise = async () => {
		if (!name.trim()) return;

		const newExercise = await createExercise(workoutId, name);
		setExercises((prev) => [...prev, newExercise]);

		setName("");
		setFocusedField(null);
		Keyboard.dismiss();
	};

	const handleUpdateDescription = async () => {
		if (!workout) return;

		const trimmed = description.trim();
		setFocusedField(null);
		Keyboard.dismiss();

		if (trimmed === (workout.description ?? "").trim()) return;

		try {
			await updateWorkout(workoutId, "description", trimmed);
			setWorkout((prev) => (prev ? { ...prev, description: trimmed } : prev));
		} catch {
			setDescription(workout.description ?? "");
		}
	};

	useEffect(() => {
		fetchWorkout();
		fetchExercises();
	}, [fetchWorkout, fetchExercises]);

	useEffect(() => {
		if (workout) setDescription(workout.description ?? "");
	}, [workout]);

	if (!workout) {
		return (
			<View style={styles.container}>
				<View style={styles.inner}>
					<StarBackground />
					<Text style={styles.title}>404</Text>
				</View>
			</View>
		);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<View style={styles.inner}>
					<View style={styles.titleRow}>
						<Text style={styles.title}>{workout.name}</Text>
						<BackButton onBack={() => navigation.goBack()} />
					</View>

					<View
						style={[styles.descrWrapper, focusedField === "description" && styles.inputFocused]}
					>
						<TextInput
							value={description}
							style={[
								styles.descrInput,
								{ color: focusedField === "description" ? colors.text.input : colors.text.static },
							]}
							onChangeText={setDescription}
							onFocus={() => setFocusedField("description")}
							onBlur={handleUpdateDescription}
							multiline
						/>
						{description.length === 0 && focusedField !== "description" && (
							<Text style={styles.descrPlaceholder}>Add a description...</Text>
						)}
					</View>

					<View style={[styles.inputWrapper, focusedField === "name" && styles.inputFocused]}>
						<TextInput
							value={name}
							onChangeText={setName}
							style={styles.input}
							keyboardType="visible-password"
							onSubmitEditing={handleCreateExercise}
							onFocus={() => setFocusedField("name")}
							onBlur={() => {
								setFocusedField(null);
								setName("");
							}}
						/>

						<AddButton
							onAdd={handleCreateExercise}
							color={focusedField === "name" ? colors.button.accent : colors.button.primary}
						/>

						{name.length === 0 && focusedField !== "name" && (
							<Text style={styles.inputPlaceholder}>Create an exercise...</Text>
						)}
					</View>
				</View>
				<View style={styles.container}>
					{exercises.length === 0 ? (
						<>
							<StarBackground />
							<Text style={styles.info}>Empty</Text>
						</>
					) : (
						<DraggableFlatList
							data={exercises}
							keyExtractor={(item) => item.id.toString()}
							onDragEnd={async ({ data }) => {
								const updatedOrder = data.map((item, index) => ({
									...item,
									order: index,
								}));

								setExercises(updatedOrder);

								await Promise.all(
									updatedOrder.map((item) =>
										updateExercise(workoutId, item.id, "order", item.order),
									),
								);
							}}
							renderItem={({ item, drag, isActive, getIndex }) => (
								<MoveableRow
									val={item}
									drag={drag}
									isActive={isActive}
									isLast={getIndex() === exercises.length - 1}
									onDelete={() => handleDelete(item.id)}
									onPress={() =>
										navigation.navigate("Exercise", { workoutId, exerciseId: item.id })
									}
								/>
							)}
						/>
					)}
				</View>

				{pendingDelete && <UndoButton name={pendingDelete.name} onUndo={handleUndo} />}
			</View>
		</TouchableWithoutFeedback>
	);
}
