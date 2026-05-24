import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, ScrollView, Text, View } from "react-native";
import { getExerciseSession } from "../../api/exerciseSession";
import { getExercise } from "../../api/exercises";
import { colors } from "../../css/color";
import type { Exercise } from "../../types/exercise";
import type { ExerciseSession } from "../../types/exerciseSession";
import type { RootStackParamList } from "../../types/navigation";
import HomeButton from "../components/HomeButton";
import { StarBackground } from "../components/StarBackground";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "ActiveExercise">;

export default function ActiveExerciseScreen({ navigation, route }: Props) {
	const { workoutId, sessionId, exerciseSessionId } = route.params;

	const [exerciseSession, setExerciseSession] = useState<ExerciseSession | null>(null);
	const [exercise, setExercise] = useState<Exercise | null>(null);

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

	const fetchExercise = useCallback(
		async (exerciseId: number) => {
			const data = await getExercise(workoutId, exerciseId);
			setExercise(data);
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
			fetchExercise(session.exerciseId);
		};
		load();
	}, [fetchExerciseSession, fetchExercise]);

	if (!exerciseSession || !exercise) {
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
						{exercise.name}
					</Animated.Text>
					<HomeButton navHome={() => navigation.navigate("Home")} />
				</View>
				{exercise.description && (
					<View style={styles.descrWrapper}>
						<ScrollView nestedScrollEnabled>
							<Text style={styles.descrText}>{exercise.description}</Text>
						</ScrollView>
					</View>
				)}
			</View>
		</View>
	);
}
