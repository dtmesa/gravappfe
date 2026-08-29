import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Animated, Keyboard, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useSWR from "swr";
import { getExerciseSession } from "../../api/exerciseSession.api";
import { getAllAverages, getExercise, getWeeklyAverages } from "../../api/exercises.api";
import {
	createSetSession,
	deleteSetSession,
	getSetSessions,
	updateSetSession,
} from "../../api/setSession.api";
import { colors } from "../../css/color";
import type { Exercise } from "../../types/exercise.types";
import type { ExerciseSession } from "../../types/exerciseSession.types";
import type { RootStackParamList } from "../../types/navigation.types";
import type { SetSession } from "../../types/setSession.types";
import { BackButton } from "../components/BackButton";
import { FadeIn } from "../components/FadeIn";
import { useGlow } from "../components/glowAnim";
import { StarBackground } from "../components/StarBackground";
import { TimerRow } from "../components/TimerRow";
import type { Averages } from "./AverageRow";
import { AverageRow } from "./AverageRow";
import { PlusRow } from "./PlusRow";
import { SwipeableSetRow } from "./SetRow";
import { styles } from "./styles";
import { useTimer } from "./useTimer";

type Props = NativeStackScreenProps<RootStackParamList, "ActiveExercise">;

export function ActiveExerciseScreen({ navigation, route }: Props) {
	const { workoutId, sessionId, exerciseSessionId } = route.params;

	const { data: exerciseSession } = useSWR<ExerciseSession>(
		["exerciseSession", workoutId, sessionId, exerciseSessionId],
		() => getExerciseSession(exerciseSessionId, sessionId, workoutId),
	);

	const exerciseId = exerciseSession?.exerciseId;
	const { data: exercise } = useSWR<Exercise>(
		exerciseId ? ["exercise", workoutId, exerciseId] : null,
		() => getExercise(workoutId, exerciseId as number),
	);

	const { data: sets, mutate: mutateSets } = useSWR<SetSession[]>(
		["sets", workoutId, sessionId, exerciseSessionId],
		() => getSetSessions(exerciseSessionId, sessionId, workoutId),
	);

	const [loading, setLoading] = useState(false);
	const { running, elapsed, start: onStart, stop: onStop, reset: onReset } = useTimer();

	const { textShadowRadius } = useGlow();
	const [fadeKey, setFadeKey] = useState(0);

	const { data: weeklyAverages } = useSWR<Averages | null>(
		exercise ? ["weeklyAverages", workoutId, exerciseId, sessionId] : null,
		() => {
			if (!exerciseId) throw new Error("Missing exerciseId");
			return getWeeklyAverages(workoutId, exerciseId, sessionId);
		},
	);
	const { data: allAverages } = useSWR<Averages | null>(
		exercise ? ["allAverages", workoutId, exerciseId, sessionId] : null,
		() => {
			if (!exerciseId) throw new Error("Missing exerciseId");
			return getAllAverages(workoutId, exerciseId, sessionId);
		},
	);

	const handleCreateSet = async () => {
		if (loading) return;
		setLoading(true);

		try {
			const newSet = await createSetSession(exerciseSessionId, sessionId, workoutId);

			if (sets && sets.length > 0) {
				const lastSet = sets[sets.length - 1];
				if (lastSet.weight !== null) {
					await updateSetSession(
						newSet.id,
						exerciseSessionId,
						sessionId,
						workoutId,
						"weight",
						parseFloat(lastSet.weight),
					);
				}
			}
			setFadeKey((k) => k + 1);
			await mutateSets();
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteSet = async (id: number) => {
		await deleteSetSession(id, exerciseSessionId, sessionId, workoutId);
		setFadeKey((k) => k + 1);
		await mutateSets();
	};

	const handleUpdateSet = async (
		id: number,
		field: "weight" | "reps" | "duration" | "distance",
		val: string,
	) => {
		mutateSets(
			(prev) => prev?.map((s) => (s.id === id ? { ...s, [field]: val } : s)) ?? prev,
			false,
		);

		const parsed = val === "" || val === "." ? null : parseFloat(val);

		updateSetSession(
			id,
			exerciseSessionId,
			sessionId,
			workoutId,
			field,
			Number.isNaN(parsed) ? null : parsed,
		);
	};

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
					<FadeIn visible={true}>
						<View style={styles.descriptionWrapper}>
							<ScrollView nestedScrollEnabled>
								<Text style={styles.descriptionText}>{exercise.description}</Text>
							</ScrollView>
						</View>
					</FadeIn>
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
				{!exercise.isWeight && !exercise.isReps && !exercise.isDuration && !exercise.isDistance && (
					<StarBackground />
				)}
				{(exercise.isWeight || exercise.isReps || exercise.isDuration || exercise.isDistance) && (
					<FadeIn visible={true}>
						<TimerRow
							running={running}
							elapsed={elapsed}
							onPress={running ? onStop : onStart}
							onReset={onReset}
							timerType={"cs"}
						/>
					</FadeIn>
				)}
				{weeklyAverages && (
					<FadeIn visible={true}>
						<AverageRow title={"Weekly Avg"} {...weeklyAverages} />
					</FadeIn>
				)}
				{allAverages && (
					<FadeIn visible={true}>
						<AverageRow title={"Total Avg     "} {...allAverages} />
					</FadeIn>
				)}
				{sets.map((set, index) => (
					<FadeIn key={set.id} visible={true}>
						<SwipeableSetRow
							key={set.id}
							index={index + 1}
							weight={set.weight}
							reps={set.reps}
							duration={set.duration}
							distance={set.distance}
							onChangeWeight={(val) => handleUpdateSet(set.id, "weight", val)}
							onChangeReps={(val) => handleUpdateSet(set.id, "reps", val)}
							onChangeDuration={(val) => handleUpdateSet(set.id, "duration", val)}
							onChangeDistance={(val) => handleUpdateSet(set.id, "distance", val)}
							onDelete={() => handleDeleteSet(set.id)}
						/>
					</FadeIn>
				))}
				{(exercise.isWeight || exercise.isReps || exercise.isDuration || exercise.isDistance) && (
					<FadeIn visible={true}>
						<PlusRow onPress={handleCreateSet} disabled={loading} triggerFade={fadeKey} />
					</FadeIn>
				)}
			</KeyboardAwareScrollView>
		</View>
	);
}
