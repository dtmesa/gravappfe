import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import type { RootStackParamList } from "../../types/navigation";
import type { WorkoutSession } from "../../types/workoutSession";
import BackButton from "../components/BackButton";
import { FadeIn } from "../components/FadeIn";
import { StarBackground } from "../components/StarBackground";
import CalendarDisplay from "./Calendar";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "History">;

export default function HistoryScreen({ navigation }: Props) {
	const [name, setName] = useState("");
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [selected, setSelected] = useState<string>("");
	const [pendingDelete, setPendingDelete] = useState<WorkoutSession | null>(null);
	const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleCreateWorkoutSession = async () => {
		return;
	};

	return (
		<KeyboardAwareScrollView
			contentContainerStyle={styles.scrollContainer}
			keyboardShouldPersistTaps="handled"
			enableOnAndroid={true}
			enableAutomaticScroll={true}
			extraScrollHeight={60}
			extraHeight={60}
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
					<CalendarDisplay selected={selected} setSelected={setSelected} />
				</View>
			</FadeIn>
			<View>{selected.length === 0 && <StarBackground />}</View>
			<FadeIn visible={selected.length > 0}>
				<View style={styles.inputContainer}>
					<View style={[styles.inputWrapper, focusedField === "name" && styles.inputFocused]}>
						<TextInput
							value={name}
							onChangeText={setName}
							style={styles.input}
							keyboardType="visible-password"
							onSubmitEditing={handleCreateWorkoutSession}
							onFocus={() => setFocusedField("name")}
							onBlur={() => {
								setFocusedField(null);
								setName("");
							}}
						/>

						{name.length === 0 && focusedField !== "name" && (
							<Text style={styles.placeholderText}>Create a workout session...</Text>
						)}
					</View>
				</View>
			</FadeIn>
		</KeyboardAwareScrollView>
	);
}
