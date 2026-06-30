import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Modal, Pressable, StyleSheet, View } from "react-native";
import { getWorkouts } from "../../api/workouts.api";
import type { Workout } from "../../types/workout.types";
import { Selector } from "./Selector";
import { styles } from "./styles";
import { TimePicker, type TimeValue } from "./TimePicker";

type Props = {
	visible: boolean;
	onExit: () => void;
	selectedDate: string;
	onCreated: () => void;
};

export function CreationModal({ visible, onExit, selectedDate, onCreated }: Props) {
	const [filter, setFilter] = useState("");
	const [focusedField, setFocusedField] = useState(false);
	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const [selectedWorkout, setSelectedWorkout] = useState<Workout>();
	const [time, setTime] = useState<TimeValue>({ hours: 6, minutes: 30, period: "AM" });
	const [stage, setStage] = useState<"selector" | "timePicker">("selector");
	const opacity = useRef(new Animated.Value(1)).current;

	const fetchWorkouts = useCallback(async () => {
		const data = await getWorkouts();
		setWorkouts(data);
	}, []);

	const handleClose = () => {
		onExit();
		setFilter("");
		setSelectedWorkout(undefined);
		setStage("selector");
		opacity.setValue(1);
		setTime({ hours: 6, minutes: 30, period: "AM" });
		setFocusedField(false);
	};

	const handleSelect = (workout: Workout) => {
		Animated.timing(opacity, {
			toValue: 0,
			duration: 350,
			useNativeDriver: true,
		}).start(() => {
			setSelectedWorkout(workout);
			setStage("timePicker");
			Animated.timing(opacity, {
				toValue: 1,
				duration: 350,
				useNativeDriver: true,
			}).start();
		});
	};

	useEffect(() => {
		fetchWorkouts();
	}, [fetchWorkouts]);

	return (
		<Modal transparent visible={visible} animationType="fade">
			<View style={styles.modalBackground}>
				<Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
				<View style={styles.modalWrapper}>
					{stage === "timePicker" && selectedWorkout ? (
						<TimePicker
							value={time}
							onChange={setTime}
							selectedDate={selectedDate}
							selectedWorkout={selectedWorkout}
							onExit={handleClose}
							onCreated={onCreated}
							opacity={opacity}
						/>
					) : (
						<Selector
							filter={filter}
							setFilter={setFilter}
							focusedField={focusedField}
							setFocusedField={setFocusedField}
							workouts={workouts}
							onWorkoutSelect={handleSelect}
							opacity={opacity}
						/>
					)}
				</View>
			</View>
		</Modal>
	);
}
