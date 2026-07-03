import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { createWorkoutSession } from "../../api/workoutSession.api";
import { createWorkout, deleteWorkout, getWorkouts, updateWorkout } from "../../api/workouts.api";
import { colors } from "../../css/color";
import type { RootStackParamList } from "../../types/navigation.types";
import type { Workout } from "../../types/workout.types";
import { AddButton } from "../components/AddButton";
import { FadeIn } from "../components/FadeIn";
import { MoveableRow } from "../components/MoveableRow";
import { StarBackground } from "../components/StarBackground";
import { UndoBubble } from "../components/UndoBubble";
import { HeaderMenu } from "./HeaderMenu";
import { styles } from "./styles";

export function HomeScreen() {
	const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const [name, setName] = useState("");
	const [focusedField, setFocusedField] = useState(false);
	const [pendingDelete, setPendingDelete] = useState<Workout | null>(null);
	const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [loading, setLoading] = useState(false);

	const fetchWorkouts = useCallback(async () => {
		const data = await getWorkouts();
		setWorkouts(data);
	}, []);

	useEffect(() => {
		fetchWorkouts();
	}, [fetchWorkouts]);

	useFocusEffect(
		useCallback(() => {
			fetchWorkouts();
		}, [fetchWorkouts]),
	);

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
		setFocusedField(false);
		Keyboard.dismiss();
	};

	const handleNavWorkout = (workoutId: number) => {
		if (loading) return;
		rootNav.navigate("Workout", { workoutId });
	};

	const handleStartWorkout = async (workoutId: number) => {
		if (loading) return;
		setLoading(true);

		try {
			const session = await createWorkoutSession(workoutId);
			rootNav.navigate("ActiveWorkout", { workoutId, sessionId: session.id });
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: number) => {
		const workout = workouts.find((w) => w.id === id);
		if (!workout) return;

		if (pendingDelete && undoTimeoutRef.current) {
			clearTimeout(undoTimeoutRef.current);

			try {
				await deleteWorkout(pendingDelete.id);
			} catch {
				fetchWorkouts();
			}
		}

		setWorkouts((prev) => prev.filter((w) => w.id !== id));
		setPendingDelete(workout);

		undoTimeoutRef.current = setTimeout(async () => {
			try {
				await deleteWorkout(id);
			} catch {
				fetchWorkouts();
			} finally {
				setPendingDelete(null);
				undoTimeoutRef.current = null;
			}
		}, 3000);
	};

	const handleUndo = () => {
		if (!pendingDelete) return;

		setWorkouts((prev) => {
			const restored = [pendingDelete, ...prev];
			return restored.sort((a, b) => a.order - b.order);
		});

		if (undoTimeoutRef.current) {
			clearTimeout(undoTimeoutRef.current);
			undoTimeoutRef.current = null;
		}

		setPendingDelete(null);
		fetchWorkouts();
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
				<FadeIn visible={true}>
					<View style={styles.inputContainer}>
						<View style={[styles.inputWrapper, focusedField && styles.inputFocused]}>
							<TextInput
								value={name}
								onChangeText={setName}
								style={styles.input}
								keyboardType="visible-password"
								onSubmitEditing={handleCreateWorkout}
								onFocus={() => setFocusedField(true)}
								onBlur={() => {
									setFocusedField(false);
									setName("");
								}}
							/>

							<AddButton
								onAdd={handleCreateWorkout}
								color={focusedField ? colors.button.accent : colors.button.muted}
							/>

							{name.length === 0 && !focusedField && (
								<Text style={styles.placeholderText}>Create a workout...</Text>
							)}
						</View>
					</View>
				</FadeIn>
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
								<FadeIn key={item.id} visible={true}>
									<MoveableRow
										disabled={loading}
										val={item}
										drag={drag}
										isActive={isActive}
										onDelete={() => handleDelete(item.id)}
										onEdit={() => handleNavWorkout(item.id)}
										onPress={() => handleStartWorkout(item.id)}
									/>
								</FadeIn>
							)}
						/>
					)}
				</View>

				{pendingDelete && (
					<UndoBubble key={pendingDelete.id} name={pendingDelete.name} onUndo={handleUndo} />
				)}
			</View>
		</TouchableWithoutFeedback>
	);
}
