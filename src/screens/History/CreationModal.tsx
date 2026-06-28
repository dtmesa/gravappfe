import { useCallback, useEffect, useState } from "react";
import { Keyboard, Modal, Pressable, Text } from "react-native";
import { getWorkouts } from "../../api/workouts";
import type { Workout } from "../../types/workout";
import Selector from "./Selector";
import { styles } from "./styles";
import { TimePicker } from "./TimePicker";

type Props = {
	visible: boolean;
	onExit: () => void;
};

export function CreationModal({ visible, onExit }: Props) {
	const [filter, setFilter] = useState("");
	const [focusedField, setFocusedField] = useState(false);
	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const [selectedWorkout, setSelectedWorkout] = useState<Workout>();
	const [time, setTime] = useState<Date>(new Date());

	const fetchWorkouts = useCallback(async () => {
		const data = await getWorkouts();
		setWorkouts(data);
	}, []);

	useEffect(() => {
		fetchWorkouts();
	}, [fetchWorkouts]);

	return (
		<Modal transparent visible={visible} animationType="fade">
			<Pressable
				style={styles.modalBackground}
				onPress={() => {
					onExit();
					setFilter("");
					setSelectedWorkout(undefined);
					setFocusedField(false);
				}}
			>
				{!selectedWorkout && (
					<Selector
						filter={filter}
						setFilter={setFilter}
						focusedField={focusedField}
						setFocusedField={setFocusedField}
						workouts={workouts}
						onWorkoutSelect={setSelectedWorkout}
					/>
				)}
				{selectedWorkout && (
					<Pressable
						style={styles.modalContainer}
						onPress={(e) => {
							e.stopPropagation();
							Keyboard.dismiss();
							setFocusedField(false);
						}}
					>
						<Text style={styles.modalTitle}>Set a time</Text>
						<TimePicker value={time} onChange={setTime} />
					</Pressable>
				)}
			</Pressable>
		</Modal>
	);
}
