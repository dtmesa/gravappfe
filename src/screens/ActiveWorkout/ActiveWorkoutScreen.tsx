import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { Animated, BackHandler, FlatList, ScrollView, Text, View } from "react-native";
import { createExerciseSession, getExerciseSessions } from "../../api/exerciseSession.api";
import { getExercises } from "../../api/exercises.api";
import { deleteWorkoutSession, getWorkoutSession } from "../../api/workoutSession.api";
import { getWorkout } from "../../api/workouts.api";
import { colors } from "../../css/color";
import { useWorkoutTimerStore } from "../../store/activeWorkout.store";
import type { Exercise } from "../../types/exercise.types";
import type { ExerciseSession } from "../../types/exerciseSession.types";
import type { RootStackParamList } from "../../types/navigation.types";
import type { Workout } from "../../types/workout.types";
import type { WorkoutSession } from "../../types/workoutSession.types";
import { BackButton } from "../components/BackButton";
import { FadeIn } from "../components/FadeIn";
import { useGlow } from "../components/glowAnim";
import { PressableRow } from "../components/PressableRow";
import { StarBackground } from "../components/StarBackground";
import { TimerRow } from "../components/TimerRow";
import { LeaveAlertModal } from "./LeaveAlertModal";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "ActiveWorkout">;

export function ActiveWorkoutScreen({ navigation, route }: Props) {
	const { workoutId, sessionId } = route.params;
	const { running, elapsed, start, stop, reset } = useWorkoutTimerStore();
	const [workout, setWorkout] = useState<Workout | null>(null);
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [workoutSession, setWorkoutSession] = useState<WorkoutSession | null>(null);
	const [exerciseSessions, setExerciseSessions] = useState<ExerciseSession[]>([]);
	const [alertVisible, setAlertVisible] = useState(false);
	const hasStartedExercises = exerciseSessions.length > 0;
	const { textShadowRadius } = useGlow();

	const fetchWorkout = useCallback(async () => {
		const data = await getWorkout(workoutId);
		setWorkout(data);
	}, [workoutId]);

	const fetchExercises = useCallback(async () => {
		const data = await getExercises(workoutId);
		setExercises(data);
	}, [workoutId]);

	const fetchWorkoutSession = useCallback(async () => {
		const data = await getWorkoutSession(sessionId, workoutId);
		setWorkoutSession(data);
	}, [workoutId, sessionId]);

	const fetchExerciseSessions = useCallback(async () => {
		const data = await getExerciseSessions(sessionId, workoutId);
		setExerciseSessions(data);
	}, [sessionId, workoutId]);

	const handleExercisePress = (exerciseId: number) => {
		const exerciseSession = exerciseSessions.find((s) => s.exerciseId === exerciseId);

		if (!exerciseSession) return;

		navigation.navigate("ActiveExercise", {
			workoutId,
			sessionId,
			exerciseSessionId: exerciseSession.id,
		});
	};

	const handleBack = useCallback(async () => {
		setAlertVisible(false);
		await deleteWorkoutSession(sessionId, workoutId);
		stop();
		reset();
		navigation.goBack();
	}, [sessionId, workoutId, stop, reset, navigation]);

	const handleSave = () => {
		stop();
		reset();
		navigation.goBack();
	};

	const initializeExerciseSessions = useCallback(async () => {
		const existing = await getExerciseSessions(sessionId, workoutId);

		if (existing.length > 0) {
			setExerciseSessions(existing);
			return;
		}

		const workoutExercises = await getExercises(workoutId);

		const sessions = await Promise.all(
			workoutExercises.map((exercise) => createExerciseSession(sessionId, exercise.id, workoutId)),
		);

		setExerciseSessions(sessions);
	}, [sessionId, workoutId]);

	useEffect(() => {
		const load = async () => {
			await fetchWorkout();
			await fetchWorkoutSession();
			await fetchExercises();
			await initializeExerciseSessions();
		};

		load();
	}, [fetchWorkout, fetchWorkoutSession, fetchExercises, initializeExerciseSessions]);

	useFocusEffect(
		useCallback(() => {
			fetchExerciseSessions();

			const handler = BackHandler.addEventListener("hardwareBackPress", () => {
				if (hasStartedExercises) {
					setAlertVisible(true);
				} else {
					handleBack();
				}
				return true;
			});
			return () => handler.remove();
		}, [handleBack, hasStartedExercises, fetchExerciseSessions]),
	);

	if (!workoutSession || !workout) {
		return (
			<View style={styles.container}>
				<StarBackground />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.titleRow}>
					<View style={styles.titleRowLeft}>
						<BackButton
							onBack={() => (hasStartedExercises ? setAlertVisible(true) : handleBack())}
						/>
					</View>
					<View style={styles.titleContainer}>
						<Animated.Text
							numberOfLines={1}
							style={[
								styles.title,
								{
									textShadowColor: colors.button.accent,
									textShadowOffset: { width: 0, height: 0 },
									textShadowRadius,
								},
							]}
						>
							{workout.name}
						</Animated.Text>
					</View>
					<View style={styles.titleRowRight} />
				</View>
			</View>

			<LeaveAlertModal
				visible={alertVisible}
				onDiscard={() => handleBack()}
				onSave={() => handleSave()}
				onCancel={() => setAlertVisible(false)}
			/>

			<FadeIn visible={true}>
				<View style={styles.innerContainer}>
					{workout.description && (
						<View style={styles.descriptionWrapper}>
							<ScrollView nestedScrollEnabled>
								<Text style={styles.descriptionText}>{workout.description}</Text>
							</ScrollView>
						</View>
					)}
				</View>
			</FadeIn>
			<View style={styles.container}>
				<FadeIn visible={true}>
					<TimerRow
						running={running}
						elapsed={elapsed}
						onPress={() => (running ? stop() : start())}
						onReset={reset}
						timerType={"s"}
					/>
				</FadeIn>
				<View style={styles.container}>
					{exercises.length === 0 ? (
						<StarBackground />
					) : (
						<FlatList
							contentContainerStyle={styles.flatListBuffer}
							data={exercises}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<FadeIn key={item.id} visible={true}>
									<PressableRow
										val={item}
										hasSets={exerciseSessions.some(
											(s) => s.exerciseId === item.id && (s.sets?.length ?? 0) > 0,
										)}
										onPress={() => handleExercisePress(item.id)}
									/>
								</FadeIn>
							)}
						/>
					)}
				</View>
			</View>
		</View>
	);
}
