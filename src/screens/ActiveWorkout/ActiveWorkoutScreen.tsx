import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, FlatList, ScrollView, Text, View } from "react-native";
import { createExerciseSession } from "../../api/exerciseSession";
import { getExercises } from "../../api/exercises";
import { getWorkoutSession } from "../../api/workoutSession";
import { getWorkout } from "../../api/workouts";
import { colors } from "../../css/color";
import { useWorkoutTimerStore } from "../../store/activeWorkout.store";
import type { Exercise } from "../../types/exercise";
import type { RootStackParamList } from "../../types/navigation";
import type { Workout } from "../../types/workout";
import type { WorkoutSession } from "../../types/workoutSession";
import ClickableRow from "../components/ClickableRow";
import HomeButton from "../components/HomeButton";
import { StarBackground } from "../components/StarBackground";
import TimerRow from "../components/TimerRow";
import { LeaveAlert } from "./LeaveAlert";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "ActiveWorkout">;

export default function ActiveWorkoutScreen({ navigation, route }: Props) {
	const { workoutId, sessionId } = route.params;
	const { running, elapsed, start, stop, reset } = useWorkoutTimerStore();

	const [workout, setWorkout] = useState<Workout | null>(null);
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [workoutSession, setWorkoutSession] = useState<WorkoutSession | null>(null);
	const [exerciseSessions, setExerciseSessions] = useState<Record<number, number>>({});
	const [alertVisible, setAlertVisible] = useState(false);

	const glowAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: false }),
				Animated.timing(glowAnim, { toValue: 0, duration: 2000, useNativeDriver: false }),
			]),
		).start();
	}, [glowAnim]);

	const textShadowRadius = glowAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 15],
	});

	const fetchWorkout = useCallback(async () => {
		const data = await getWorkout(workoutId);
		setWorkout(data);
	}, [workoutId]);

	const fetchExercises = useCallback(async () => {
		const data = await getExercises(workoutId);
		setExercises(data);
	}, [workoutId]);

	const fetchWorkoutSession = useCallback(async () => {
		const data = await getWorkoutSession(workoutId, sessionId);
		setWorkoutSession(data);
	}, [workoutId, sessionId]);

	const handleExercisePress = async (exerciseId: number) => {
		if (exerciseSessions[exerciseId]) {
			navigation.navigate("ActiveExercise", {
				workoutId,
				sessionId,
				exerciseSessionId: exerciseSessions[exerciseId],
			});
			return;
		} else {
			const session = await createExerciseSession(sessionId, exerciseId, workoutId);
			setExerciseSessions((prev) => ({ ...prev, [exerciseId]: session.id }));
			navigation.navigate("ActiveExercise", {
				workoutId,
				sessionId,
				exerciseSessionId: session.id,
			});
		}
	};

	useEffect(() => {
		fetchWorkout();
		fetchWorkoutSession();
		fetchExercises();
	}, [fetchWorkout, fetchWorkoutSession, fetchExercises]);

	useEffect(() => {
		return () => reset();
	}, [reset]);

	if (!workoutSession || !workout) {
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
		<View style={styles.container}>
			<View style={styles.inner}>
				<View style={styles.titleRow}>
					<Animated.Text
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
					<LeaveAlert
						visible={alertVisible}
						onConfirm={() => {
							setAlertVisible(false);
							reset();
							navigation.navigate("Home");
						}}
						onCancel={() => setAlertVisible(false)}
					/>
					<HomeButton navHome={() => 
						Object.keys(exerciseSessions).length > 0 
							? setAlertVisible(true) 
							: navigation.navigate("Home")
					} />
				</View>
				{workout.description && (
					<View style={styles.descrWrapper}>
						<ScrollView nestedScrollEnabled>
							<Text style={styles.descrText}>{workout.description}</Text>
						</ScrollView>
					</View>
				)}
			</View>
			<View style={styles.container}>
				<TimerRow
					running={running}
					elapsed={elapsed}
					onPress={() => (running ? stop() : start())}
					onReset={reset}
				/>

				{exercises.length === 0 ? (
					<>
						<StarBackground />
						<Text style={styles.info}>Empty</Text>
					</>
				) : (
					<FlatList
						data={exercises}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item, index }) => (
							<ClickableRow
								val={item}
								isLast={index === exercises.length - 1}
								onPress={() => handleExercisePress(item.id)}
								isVisited={!!exerciseSessions[item.id]}
							/>
						)}
					/>
				)}
			</View>
		</View>
	);
}
