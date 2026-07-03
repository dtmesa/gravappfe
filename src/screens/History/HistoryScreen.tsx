import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useSWR from "swr";
import { deleteWorkoutSession, getWorkoutSessionsByMonth } from "../../api/workoutSession.api";
import type { RootStackParamList } from "../../types/navigation.types";
import type { WorkoutSession } from "../../types/workoutSession.types";
import { BackButton } from "../components/BackButton";
import { FadeIn } from "../components/FadeIn";
import { StarBackground } from "../components/StarBackground";
import { SwipeableRow } from "../components/SwipeableRow";
import { UndoBubble } from "../components/UndoBubble";
import { CalendarDisplay } from "./Calendar";
import { CreationModal } from "./CreationModal";
import { InsertButton } from "./InsertButton";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "History">;

export function HistoryScreen({ navigation }: Props) {
	const [selected, setSelected] = useState<string>("");
	const [pendingDelete, setPendingDelete] = useState<WorkoutSession | null>(null);
	const pendingDeleteRef = useRef(pendingDelete);
	const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [fadeKey, setFadeKey] = useState(0);

	const [currentMonth, setCurrentMonth] = useState(() => {
		const now = new Date();
		return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
	});

	const { data: sessions = [], mutate } = useSWR<WorkoutSession[]>(
		["sessions", currentMonth],
		async () => {
			const result = await getWorkoutSessionsByMonth(currentMonth);
			return result;
		},
		{ revalidateOnFocus: true },
	);

	const sessionsByDay = useMemo(() => {
		return sessions.reduce<Record<string, WorkoutSession[]>>((acc, session) => {
			const day = new Date(session.date).toLocaleDateString("en-CA");
			if (!acc[day]) acc[day] = [];
			acc[day].push(session);
			return acc;
		}, {});
	}, [sessions]);

	const selectedSessions = sessionsByDay[selected] ?? [];

	const isFutureSelected = useMemo(() => {
		if (!selected) return false;

		const today = new Date();
		const todayStr = today.toLocaleDateString("en-CA");

		return selected > todayStr;
	}, [selected]);

	const handleNav = (session: WorkoutSession) => {
		navigation.navigate("EditWorkoutSession", {
			workoutId: session.workoutId,
			sessionId: session.id,
		});
	};

	const handleDelete = async (id: number) => {
		const session = sessions.find((s) => s.id === id);
		if (!session) return;

		if (pendingDelete && undoTimeoutRef.current) {
			clearTimeout(undoTimeoutRef.current);

			try {
				await deleteWorkoutSession(pendingDelete.id, pendingDelete.workout.id);
			} catch {
				mutate();
			}
		}

		mutate((current = []) => current.filter((s) => s.id !== id), false);
		setPendingDelete(session);

		undoTimeoutRef.current = setTimeout(async () => {
			try {
				await deleteWorkoutSession(id, session.workout.id);
			} catch {
				mutate();
			} finally {
				setPendingDelete(null);
				undoTimeoutRef.current = null;
			}
		}, 3000);
	};

	const handleUndo = () => {
		if (!pendingDelete) return;

		if (undoTimeoutRef.current) {
			clearTimeout(undoTimeoutRef.current);
			undoTimeoutRef.current = null;
		}

		setPendingDelete(null);
		mutate();
	};

	useFocusEffect(
		useCallback(() => {
			mutate();
		}, [mutate]),
	);

	useEffect(() => {
		pendingDeleteRef.current = pendingDelete;
	}, [pendingDelete]);

	useEffect(() => {
		return () => {
			if (undoTimeoutRef.current) {
				clearTimeout(undoTimeoutRef.current);
				if (pendingDeleteRef.current) {
					deleteWorkoutSession(
						pendingDeleteRef.current.id,
						pendingDeleteRef.current.workout.id,
					).catch(() => {});
				}
			}
		};
	}, []);

	return (
		<>
			<KeyboardAwareScrollView
				contentContainerStyle={styles.scrollContainer}
				keyboardShouldPersistTaps="handled"
				enableOnAndroid={true}
			>
				<View style={styles.headerContainer}>
					<View style={styles.titleRow}>
						<View style={styles.titleRowLeft}>
							<BackButton onBack={() => navigation.goBack()} />
						</View>
						<Text style={styles.title}>History</Text>
						<View style={styles.titleRowRight} />
					</View>
				</View>
				<FadeIn visible={true}>
					<View style={styles.calendarContainer}>
						<CalendarDisplay
							selected={selected}
							setSelected={setSelected}
							onMonthChange={setCurrentMonth}
							sessionsByDay={sessionsByDay}
						/>
					</View>
				</FadeIn>
				<View>{(selected.length === 0 || isFutureSelected) && <StarBackground />}</View>
				<FadeIn visible={selected.length > 0 && !isFutureSelected} key={`${selected}-${fadeKey}`}>
					<FlatList
						style={styles.flatListBuffer}
						data={selectedSessions}
						keyExtractor={(item) => String(item.id)}
						scrollEnabled={false}
						renderItem={({ item }) => (
							<SwipeableRow
								val={{
									id: item.id,
									name: `${new Date(item.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · ${item.workout.name}`,
								}}
								onDelete={() => handleDelete(item.id)}
								onPress={() => handleNav(item)}
							/>
						)}
						ListHeaderComponent={
							<InsertButton
								onPress={() => setModalVisible(true)}
								label={"Insert a workout session..."}
							/>
						}
					/>
				</FadeIn>
			</KeyboardAwareScrollView>
			<CreationModal
				visible={modalVisible}
				onExit={() => setModalVisible(false)}
				selectedDate={selected}
				onCreated={() => {
					mutate();
					setFadeKey((k) => k + 1);
				}}
			/>
			{pendingDelete && (
				<UndoBubble key={pendingDelete.id} name={pendingDelete.workout.name} onUndo={handleUndo} />
			)}
		</>
	);
}
