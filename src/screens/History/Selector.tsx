import { Funnel } from "lucide-react-native";
import type { Dispatch, SetStateAction } from "react";
import { Animated, FlatList, Text, TextInput, View } from "react-native";
import { colors } from "../../css/color";
import type { Workout } from "../../types/workout.types";
import { PressableRow } from "./PressableRow";
import { styles } from "./styles";

type Props = {
	filter: string;
	setFilter: Dispatch<SetStateAction<string>>;
	focusedField: boolean;
	setFocusedField: Dispatch<SetStateAction<boolean>>;
	workouts: Workout[];
	onWorkoutSelect: (workout: Workout) => void;
	opacity: Animated.Value;
};

export function Selector({
	filter,
	setFilter,
	focusedField,
	setFocusedField,
	workouts,
	onWorkoutSelect,
	opacity,
}: Props) {
	return (
		<View style={styles.modalContainer}>
			<Animated.View style={{ opacity, flex: 1 }}>
				<Text style={styles.modalTitle}>Select a workout</Text>
				<View style={styles.modalInputContainer}>
					<View style={[styles.modalInputWrapper, focusedField && styles.modalInputFocused]}>
						<TextInput
							value={filter}
							onChangeText={setFilter}
							style={styles.modalInputText}
							keyboardType="visible-password"
							onFocus={() => setFocusedField(true)}
							onBlur={() => {
								setFocusedField(false);
							}}
						/>

						{!focusedField && filter.length === 0 && (
							<Text style={styles.modalPlaceholderText}>Filter workouts...</Text>
						)}

						<Funnel
							size={24}
							color={focusedField ? colors.button.accentHighlight : colors.button.mutedSecondary}
							style={styles.modalFilterBuffer}
							strokeWidth={1.75}
						/>
					</View>
				</View>
				<FlatList
					style={styles.modalListBuffer}
					data={workouts.filter((w) => w.name.toLowerCase().includes(filter.toLowerCase()))}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<PressableRow val={item} onPress={() => onWorkoutSelect(item)} />
					)}
				/>
			</Animated.View>
		</View>
	);
}
