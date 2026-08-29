import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import useSWR from "swr";
import { createExerciseSession, getExerciseSessions } from "../../api/exerciseSession.api";
import { getExercises } from "../../api/exercises.api";
import { getWorkoutSession } from "../../api/workoutSession.api";
import { getWorkout } from "../../api/workouts.api";
import type { Exercise } from "../../types/exercise.types";
import type { ExerciseSession } from "../../types/exerciseSession.types";
import type { RootStackParamList } from "../../types/navigation.types";
import type { Workout } from "../../types/workout.types";
import type { WorkoutSession } from "../../types/workoutSession.types";
import { BackButton } from "../components/BackButton";
import { FadeIn } from "../components/FadeIn";
import { PressableRow } from "../components/PressableRow";
import { StarBackground } from "../components/StarBackground";
import { styles } from "./styles";
import { TimePicker, type TimeValue } from "./TimePicker";

type Props = NativeStackScreenProps<RootStackParamList, "EditWorkoutSession">;

export function EditWorkoutSessionScreen({ navigation, route }: Props) {
	const { workoutId, sessionId } = route.params;
	const { data: workout } = useSWR<Workout>(["workout", workoutId], () => getWorkout(workoutId));
	const { data: exercises = [] } = useSWR<Exercise[]>(["exercises", workoutId], () =>
		getExercises(workoutId),
	);
	const { data: workoutSession, mutate: mutateWorkoutSession } = useSWR<WorkoutSession>(
		["workoutSession", workoutId, sessionId],
		() => getWorkoutSession(sessionId, workoutId),
	);
	const { data: exerciseSessions = [], mutate: mutateExerciseSessions } = useSWR<ExerciseSession[]>(
		["exerciseSessions", workoutId, sessionId],
		() => getExerciseSessions(sessionId, workoutId),
	);

	const [time, setTime] = useState<TimeValue>(() => {
		const d = workoutSession ? new Date(workoutSession.date) : new Date();
		const hours24 = d.getHours();
		return {
			hours: hours24 % 12 === 0 ? 12 : hours24 % 12,
			minutes: d.getMinutes(),
			period: hours24 >= 12 ? "PM" : "AM",
		};
	});
	const selectedDate = workoutSession
		? new Date(workoutSession.date).toLocaleDateString("en-CA")
		: "";

	const handleNav = async (exerciseId: number) => {
		const exerciseSession = exerciseSessions.find((s) => s.exerciseId === exerciseId);

		if (!exerciseSession) {
			const newSession = await createExerciseSession(sessionId, exerciseId, workoutId);
			mutateExerciseSessions((prev = []) => [...prev, newSession], false);
			navigation.navigate("EditExerciseSession", {
				workoutId,
				sessionId,
				exerciseSessionId: newSession.id,
			});
		} else {
			navigation.navigate("EditExerciseSession", {
				workoutId,
				sessionId,
				exerciseSessionId: exerciseSession.id,
			});
		}
	};

	useEffect(() => {
		if (workoutSession) {
			const d = new Date(workoutSession.date);
			const hours24 = d.getHours();
			setTime({
				hours: hours24 % 12 === 0 ? 12 : hours24 % 12,
				minutes: d.getMinutes(),
				period: hours24 >= 12 ? "PM" : "AM",
			});
		}
	}, [workoutSession]);

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
						<BackButton onBack={() => navigation.goBack()} />
					</View>
					<View style={styles.titleContainer}>
						<Text numberOfLines={1} style={styles.title}>
							{workout.name}
						</Text>
					</View>
					<View style={styles.titleRowRight} />
				</View>
			</View>

			<FadeIn visible={true}>
				<TimePicker
					value={time}
					onChange={setTime}
					selectedWorkout={workout}
					selectedDate={selectedDate}
					sessionId={sessionId}
					onSet={() => mutateWorkoutSession()}
				/>
			</FadeIn>

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
								onPress={() => handleNav(item.id)}
							/>
						</FadeIn>
					)}
				/>
			)}
		</View>
	);
}
