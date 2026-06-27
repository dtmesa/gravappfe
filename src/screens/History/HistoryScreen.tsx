import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useRef, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useSWR from "swr";
import { getWorkoutSessionsByMonth } from "../../api/workoutSession";
import type { RootStackParamList } from "../../types/navigation";
import type { WorkoutSession } from "../../types/workoutSession";
import BackButton from "../components/BackButton";
import { FadeIn } from "../components/FadeIn";
import { StarBackground } from "../components/StarBackground";
import SwipeableRow from "../components/SwipeableRow";
import CalendarDisplay from "./Calendar";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "History">;

export default function HistoryScreen({ navigation }: Props) {
	const [name, setName] = useState("");
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [selected, setSelected] = useState<string>("");
	const [pendingDelete, setPendingDelete] = useState<WorkoutSession | null>(null);
	const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const [currentMonth, setCurrentMonth] = useState(() => {
		const now = new Date();
		return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
	});

	const { data: sessions = [] } = useSWR<WorkoutSession[]>(["sessions", currentMonth], async () => {
		const result = await getWorkoutSessionsByMonth(currentMonth);
		return result;
	});

	const sessionsByDay = useMemo(() => {
		return sessions.reduce<Record<string, WorkoutSession[]>>((acc, session) => {
			const day = new Date(session.date).toLocaleDateString("en-CA");
			if (!acc[day]) acc[day] = [];
			acc[day].push(session);
			return acc;
		}, {});
	}, [sessions]);

	const selectedSessions = sessionsByDay[selected] ?? [];

	const handleCreate = async () => {
		return;
	};

	const handleDelete = async () => {
		return;
	};

	const handlePress = () => {
		return;
	};

	return (
		<KeyboardAwareScrollView
			contentContainerStyle={styles.scrollContainer}
			keyboardShouldPersistTaps="handled"
			enableOnAndroid={true}
			enableAutomaticScroll={true}
			extraScrollHeight={240}
			extraHeight={240}
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
			<View>{selected.length === 0 && <StarBackground />}</View>
			<FadeIn visible={selected.length > 0} key={selected}>
				<FlatList
					style={styles.flatListBuffer}
					data={selectedSessions}
					keyExtractor={(item) => String(item.id)}
					scrollEnabled={false}
					renderItem={({ item }) => (
						<SwipeableRow
							val={{ id: item.id, name: item.workout.name }}
							onDelete={() => handleDelete()}
							onPress={() => handlePress()}
						/>
					)}
					ListHeaderComponent={
						<View style={styles.inputContainer}>
							<View style={[styles.inputWrapper, focusedField === "name" && styles.inputFocused]}>
								<TextInput
									value={name}
									onChangeText={setName}
									style={styles.input}
									keyboardType="visible-password"
									onSubmitEditing={handleCreate}
									onFocus={() => setFocusedField("name")}
									onBlur={() => {
										setFocusedField(null);
										setName("");
									}}
								/>

								{name.length === 0 && focusedField !== "name" && (
									<Text style={styles.placeholderText}>Insert a workout session...</Text>
								)}
							</View>
						</View>
					}
				/>
			</FadeIn>
		</KeyboardAwareScrollView>
	);
}
