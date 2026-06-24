import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Keyboard, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getExerciseSession, getPreviousSetCount } from "../../api/exerciseSession";
import { getAllAverages, getExercise, getWeeklyAverages } from "../../api/exercises";
import {
	createSetSession,
	deleteSetSession,
	getSetSessions,
	updateSetSession,
} from "../../api/setSession";
import { colors } from "../../css/color";
import type { Exercise } from "../../types/exercise";
import type { ExerciseSession } from "../../types/exerciseSession";
import type { RootStackParamList } from "../../types/navigation";
import type { SetSession } from "../../types/setSession";
import BackButton from "../components/BackButton";
import { StarBackground } from "../components/StarBackground";
import TimerRow from "../components/TimerRow";
import type { Averages } from "./AverageRow";
import { AverageRow } from "./AverageRow";
import PlusRow from "./PlusRow";
import { SetRow } from "./SetRow";
import SwipeableSetRow from "./SwipeableSetRow";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "ActiveExercise">;

export default function ActiveExerciseScreen({ navigation, route }: Props) {
	const { workoutId, sessionId, exerciseSessionId } = route.params;

	const [exerciseSession, setExerciseSession] = useState<ExerciseSession | null>(null);
	const [exercise, setExercise] = useState<Exercise | null>(null);
	const [sets, setSets] = useState<SetSession[] | null>(null);
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

	const fetchSets = useCallback(async () => {
		const data = await getSetSessions(exerciseSessionId, sessionId, workoutId);
		setSets(data);
	}, [exerciseSessionId, sessionId, workoutId]);

	const handleCreateSet = async () => {
		await createSetSession(exerciseSessionId, sessionId, workoutId);
		await fetchSets();
	};

	const handleDeleteSet = async (id: number) => {
		await deleteSetSession(id, exerciseSessionId, sessionId, workoutId);
		await fetchSets();
	};

	const handleUpdateSet = async (
		id: number,
		field: "weight" | "reps" | "duration" | "distance",
		val: string,
	) => {
		setSets((prev) => prev?.map((s) => (s.id === id ? { ...s, [field]: val } : s)) ?? null);

		const parsed = val === "" || val === "0" ? null : parseFloat(val);

		updateSetSession(
			id,
			exerciseSessionId,
			sessionId,
			workoutId,
			field,
			Number.isNaN(parsed) ? null : parsed,
		);
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
			const [weekAverage, allAverage, previousSetCount] = await Promise.all([
				getWeeklyAverages(workoutId, exercise.id, sessionId),
				getAllAverages(workoutId, exercise.id, sessionId),
				getPreviousSetCount(exerciseSessionId, sessionId, workoutId),
			]);
			setWeeklyAverages(weekAverage);
			setAllAverages(allAverage);

			const existingSets = await getSetSessions(exerciseSessionId, sessionId, workoutId);
			if (existingSets.length === 0) {
				await Promise.all(
					Array.from({ length: previousSetCount }, () =>
						createSetSession(exerciseSessionId, sessionId, workoutId),
					),
				);
				await fetchSets();
			} else {
				setSets(existingSets);
			}
		};
		load();
	}, [fetchExerciseSession, fetchExercise, fetchSets, workoutId, sessionId, exerciseSessionId]);

	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	if (!exerciseSession || !exercise || !sets) {
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
						<BackButton onBack={() => navigation.goBack()} />
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
							{exercise.name}
						</Animated.Text>
					</View>
					<View style={styles.titleRowRight} />
				</View>
			</View>
			<View style={styles.innerContainer}>
				{exercise.description && (
					<View style={styles.descriptionWrapper}>
						<ScrollView nestedScrollEnabled>
							<Text style={styles.descriptionText}>{exercise.description}</Text>
						</ScrollView>
					</View>
				)}
			</View>
			<KeyboardAwareScrollView
				contentContainerStyle={styles.scrollContainer}
				keyboardShouldPersistTaps="handled"
				enableOnAndroid={true}
				enableAutomaticScroll={true}
				extraScrollHeight={90}
				extraHeight={90}
				onScrollBeginDrag={Keyboard.dismiss}
			>
				<TimerRow
					running={running}
					elapsed={elapsed}
					onPress={running ? onStop : onStart}
					onReset={onReset}
				/>
				{weeklyAverages && <AverageRow title={"Weekly Avg"} {...weeklyAverages} />}
				{allAverages && <AverageRow title={"Total Avg     "} {...allAverages} />}
				{sets.map((set, index) => {
					const sharedProps = {
						weight: set.weight,
						reps: set.reps,
						duration: set.duration,
						distance: set.distance,
						onChangeWeight: (val: string) => handleUpdateSet(set.id, "weight", val),
						onChangeReps: (val: string) => handleUpdateSet(set.id, "reps", val),
						onChangeDuration: (val: string) => handleUpdateSet(set.id, "duration", val),
						onChangeDistance: (val: string) => handleUpdateSet(set.id, "distance", val),
					};

					if (index === 0) {
						return <SetRow key={set.id} {...sharedProps} title="Set 1" />;
					}

					return (
						<SwipeableSetRow
							key={set.id}
							index={index + 1}
							{...sharedProps}
							onDelete={() => handleDeleteSet(set.id)}
						/>
					);
				})}
				<PlusRow onPress={handleCreateSet} />
			</KeyboardAwareScrollView>
		</View>
	);
}
