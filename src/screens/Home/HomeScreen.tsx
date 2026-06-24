import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { createWorkoutSession } from "../../api/workoutSession";
import { createWorkout, deleteWorkout, getWorkouts, updateWorkout } from "../../api/workouts";
import { colors } from "../../css/color";
import type { RootStackParamList } from "../../types/navigation";
import type { Workout } from "../../types/workout";
import AddButton from "../components/AddButton";
import MoveableRow from "../components/MoveableRow";
import { StarBackground } from "../components/StarBackground";
import UndoButton from "../components/UndoButton";
import { HeaderMenu } from "./HeaderMenu";
import { styles } from "./styles";

export default function HomeScreen() {
	const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const [name, setName] = useState("");
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [pendingDelete, setPendingDelete] = useState<Workout | null>(null);
	const [undoTimeout, setUndoTimeout] = useState<number | null>(null);
	const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const fetchWorkouts = useCallback(async () => {
		const data = await getWorkouts();
		setWorkouts(data);
	}, []);

	useEffect(() => {
		fetchWorkouts();
	}, [fetchWorkouts]);

	useEffect(() => {
		return () => {
			if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
		};
	}, []);

	const handleCreateWorkout = async () => {
		if (!name.trim()) return;

		const newWorkout = await createWorkout(name.trim());
		setWorkouts((prev) => [newWorkout, ...prev]);

		setName("");
		setFocusedField(null);
		Keyboard.dismiss();
	};

	const handleStartWorkout = async (workoutId: number) => {
		const session = await createWorkoutSession(workoutId);
		rootNav.navigate("ActiveWorkout", { workoutId, sessionId: session.id });
	};

	const handleDelete = async (id: number) => {
		const workout = workouts.find((w) => w.id === id);
		if (!workout) return;

		if (pendingDelete && undoTimeout) {
			clearTimeout(undoTimeout);
			setUndoTimeout(null);
			setPendingDelete(null);

			try {
				await deleteWorkout(pendingDelete.id);
			} catch {
				fetchWorkouts();
			}
		}

		setWorkouts((prev) => prev.filter((w) => w.id !== id));
		setPendingDelete(workout);

		const timeout = setTimeout(async () => {
			try {
				await deleteWorkout(id);
			} catch {
				setUndoTimeout(null);
				fetchWorkouts();
			} finally {
				setPendingDelete(null);
			}
		}, 3000);

		setUndoTimeout(timeout);
	};

	const handleUndo = () => {
		if (!pendingDelete) return;

		setWorkouts((prev) => {
			const restored = [pendingDelete, ...prev];
			return restored.sort((a, b) => a.order - b.order);
		});

		if (undoTimeout) {
			clearTimeout(undoTimeout);
			setUndoTimeout(null);
		}

		setPendingDelete(null);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<View style={styles.titleRow}>
						<View style={styles.titleRowLeft} />
						<Text style={styles.title}>Workouts</Text>
						<View style={styles.titleRowRight}>
							<HeaderMenu />
						</View>
					</View>
				</View>
				<View style={styles.inputContainer}>
					<View style={[styles.inputWrapper, focusedField === "name" && styles.inputFocused]}>
						<TextInput
							value={name}
							onChangeText={setName}
							style={styles.input}
							keyboardType="visible-password"
							onSubmitEditing={handleCreateWorkout}
							onFocus={() => setFocusedField("name")}
							onBlur={() => {
								setFocusedField(null);
								setName("");
							}}
						/>

						<AddButton
							onAdd={handleCreateWorkout}
							color={focusedField === "name" ? colors.button.accent : colors.button.muted}
						/>

						{name.length === 0 && focusedField !== "name" && (
							<Text style={styles.placeholderText}>Create a workout...</Text>
						)}
					</View>
				</View>
				<View style={styles.container}>
					{workouts.length === 0 ? (
						<StarBackground />
					) : (
						<DraggableFlatList
							contentContainerStyle={styles.flatListBuffer}
							data={workouts}
							keyExtractor={(item) => item.id.toString()}
							onDragEnd={async ({ data }) => {
								const updatedOrder = data.map((item, index) => ({
									...item,
									order: index,
								}));

								setWorkouts(updatedOrder);

								await Promise.all(
									updatedOrder.map((item) => updateWorkout(item.id, "order", item.order)),
								);
							}}
							renderItem={({ item, drag, isActive }) => (
								<MoveableRow
									val={item}
									drag={drag}
									isActive={isActive}
									onDelete={() => handleDelete(item.id)}
									onEdit={() => rootNav.navigate("Workout", { workoutId: item.id })}
									onPress={() => handleStartWorkout(item.id)}
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
