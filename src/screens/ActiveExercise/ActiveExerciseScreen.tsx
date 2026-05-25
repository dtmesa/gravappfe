import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, ScrollView, Text, View } from "react-native";
import { getExerciseSession } from "../../api/exerciseSession";
import { getAllAverages, getExercise, getWeeklyAverages } from "../../api/exercises";
import { colors } from "../../css/color";
import type { Exercise } from "../../types/exercise";
import type { ExerciseSession } from "../../types/exerciseSession";
import type { RootStackParamList } from "../../types/navigation";
import BackButton from "../components/BackButton";
import { StarBackground } from "../components/StarBackground";
import TimerRow from "../components/TimerRow";
import type { Averages } from "./AverageRow";
import { AverageRow } from "./AverageRow";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "ActiveExercise">;

export default function ActiveExerciseScreen({ navigation, route }: Props) {
	const { workoutId, sessionId, exerciseSessionId } = route.params;

	const [exerciseSession, setExerciseSession] = useState<ExerciseSession | null>(null);
	const [exercise, setExercise] = useState<Exercise | null>(null);
	const [weeklyAverages, setWeeklyAverages] = useState<Averages | null>(null);
	const [allAverages, setAllAverages] = useState<Averages | null>(null);
	const [running, setRunning] = useState<boolean>(false);
	const [elapsed, setElapsed] = useState<number>(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const glowAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(glowAnim, { toValue: 1, duration: 2500, useNativeDriver: false }),
				Animated.timing(glowAnim, { toValue: 0, duration: 2500, useNativeDriver: false }),
			]),
		).start();
	}, [glowAnim]);

	const textShadowRadius = glowAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 15],
	});

	const onReset = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = null;
		setRunning(false);
		setElapsed(0);
	};

	const onStart = () => {
		if (running) return;
		setRunning(true);
		intervalRef.current = setInterval(() => {
			setElapsed((prev) => prev + 1);
		}, 1000);
	};

	const onStop = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = null;
		setRunning(false);
	};

	const fetchExercise = useCallback(
		async (exerciseId: number) => {
			const data = await getExercise(workoutId, exerciseId);
			setExercise(data);
			return data;
		},
		[workoutId],
	);

	const fetchExerciseSession = useCallback(async () => {
		const data = await getExerciseSession(exerciseSessionId, sessionId, workoutId);
		setExerciseSession(data);
		return data;
	}, [workoutId, sessionId, exerciseSessionId]);

	useEffect(() => {
		const load = async () => {
			const session = await fetchExerciseSession();
			const exercise = await fetchExercise(session.exerciseId);
			const weekAverage = await getWeeklyAverages(workoutId, exercise.id);
			const allAverage = await getAllAverages(workoutId, exercise.id);
			setWeeklyAverages(weekAverage);
			setAllAverages(allAverage);
		};
		load();
	}, [fetchExerciseSession, fetchExercise, workoutId]);

	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	if (!exerciseSession || !exercise) {
		return (
			<View style={styles.container}>
				<View style={styles.inner}>
					<StarBackground />
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
						{exercise.name}
					</Animated.Text>
					<BackButton onBack={() => navigation.goBack()} />
				</View>
				{exercise.description && (
					<View style={styles.descrWrapper}>
						<ScrollView nestedScrollEnabled>
							<Text style={styles.descrText}>{exercise.description}</Text>
						</ScrollView>
					</View>
				)}
			</View>
			<View style={styles.container}>
				<TimerRow
					running={running}
					elapsed={elapsed}
					onPress={() => (running ? onStop() : onStart())}
					onReset={() => onReset()}
				/>
				{weeklyAverages && <AverageRow title={"Weekly Avg"} {...weeklyAverages} />}
				{allAverages && <AverageRow title={"Historical Avg"} {...allAverages} />}
			</View>
		</View>
	);
}
