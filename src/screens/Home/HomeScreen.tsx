import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { createWorkoutSession } from "../../api/workoutSession";
import { createWorkout, deleteWorkout, getWorkouts, updateWorkout } from "../../api/workouts";
import { colors } from "../../css/color";
import { useAuthStore } from "../../store/auth.store";
import type { RootStackParamList } from "../../types/navigation";
import type { Workout } from "../../types/workout";
import AddButton from "../components/AddButton";
import { HeaderMenu } from "../components/HeaderMenu";
import MoveableRow from "../components/MoveableRow";
import { StarBackground } from "../components/StarBackground";
import UndoButton from "../components/UndoButton";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
	const logout = useAuthStore((state) => state.logout);

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

		const newWorkout = await createWorkout(name);
		setWorkouts((prev) => [newWorkout, ...prev]);

		setName("");
		setFocusedField(null);
		Keyboard.dismiss();
	};

	const handleStartWorkout = async (workoutId: number) => {
		const session = await createWorkoutSession(workoutId);
		navigation.navigate("ActiveWorkout", { workoutId, sessionId: session.id });
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

	const handleLogout = async () => {
		await logout();
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<View style={styles.inner}>
					<View style={styles.titleRow}>
						<Text style={styles.title}>Workouts</Text>
						<HeaderMenu onSettings={() => navigation.navigate("Settings")} logout={handleLogout} />
					</View>
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
							color={focusedField === "name" ? colors.button.accent : colors.button.primary}
						/>

						{name.length === 0 && focusedField !== "name" && (
							<Text style={styles.fakePlaceholder}>Create a workout...</Text>
						)}
					</View>
				</View>
				<View style={styles.container}>
					{workouts.length === 0 ? (
						<>
							<StarBackground />
							<Text style={styles.info}>Empty</Text>
						</>
					) : (
						<DraggableFlatList
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
							renderItem={({ item, drag, isActive, getIndex }) => (
								<MoveableRow
									val={item}
									drag={drag}
									isActive={isActive}
									isLast={getIndex() === workouts.length - 1}
									onDelete={() => handleDelete(item.id)}
									onGear={() => navigation.navigate("Workout", { workoutId: item.id })}
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
