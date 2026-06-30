import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getExerciseSession } from "../../api/exerciseSession.api";
import { getExercise } from "../../api/exercises.api";
import {
	createSetSession,
	deleteSetSession,
	getSetSessions,
	updateSetSession,
} from "../../api/setSession.api";
import type { Exercise } from "../../types/exercise.types";
import type { ExerciseSession } from "../../types/exerciseSession.types";
import type { RootStackParamList } from "../../types/navigation.types";
import type { SetSession } from "../../types/setSession.types";
import { PlusRow } from "../ActiveExercise/PlusRow";
import { SwipeableSetRow } from "../ActiveExercise/SetRow";
import { BackButton } from "../components/BackButton";
import { FadeIn } from "../components/FadeIn";
import { StarBackground } from "../components/StarBackground";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "EditExerciseSession">;

export function EditExerciseSessionScreen({ navigation, route }: Props) {
	const { workoutId, sessionId, exerciseSessionId } = route.params;

	const [exerciseSession, setExerciseSession] = useState<ExerciseSession | null>(null);
	const [exercise, setExercise] = useState<Exercise | null>(null);
	const [sets, setSets] = useState<SetSession[] | null>(null);
	const [loading, setLoading] = useState(false);

	const fetchSets = useCallback(async () => {
		const data = await getSetSessions(exerciseSessionId, sessionId, workoutId);
		setSets(data);
	}, [exerciseSessionId, sessionId, workoutId]);

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
			await fetchSets();
		} finally {
			setLoading(false);
		}
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
			await fetchExercise(session.exerciseId);
			const currSets = await getSetSessions(exerciseSessionId, sessionId, workoutId);
			setSets(currSets);
		};
		load();
	}, [fetchExerciseSession, fetchExercise, workoutId, sessionId, exerciseSessionId]);

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
						<Text numberOfLines={1} style={styles.title}>
							{exercise.name}
						</Text>
					</View>
					<View style={styles.titleRowRight} />
				</View>
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
						<PlusRow onPress={handleCreateSet} disabled={loading} />
					</FadeIn>
				)}
			</KeyboardAwareScrollView>
		</View>
	);
}
