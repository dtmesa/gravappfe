import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useSWR from "swr";
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
	const [fadeKey, setFadeKey] = useState(0);

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
						<PlusRow onPress={handleCreateSet} disabled={loading} triggerFade={fadeKey} />
					</FadeIn>
				)}
			</KeyboardAwareScrollView>
		</View>
	);
}
