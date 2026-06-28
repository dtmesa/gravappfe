import { Funnel } from "lucide-react-native";
import type { Dispatch, SetStateAction } from "react";
import { FlatList, Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { colors } from "../../css/color";
import type { Workout } from "../../types/workout";
import ClickableRow from "./ClickableRow";
import { styles } from "./styles";

type Props = {
	filter: string;
	setFilter: Dispatch<SetStateAction<string>>;
	focusedField: boolean;
	setFocusedField: Dispatch<SetStateAction<boolean>>;
	workouts: Workout[];
	onWorkoutSelect: (workout: Workout) => void;
};

export default function Selector({
	filter,
	setFilter,
	focusedField,
	setFocusedField,
	workouts,
	onWorkoutSelect,
}: Props) {
	return (
		<Pressable
			style={styles.modalContainer}
			onPress={(e) => {
				e.stopPropagation();
				Keyboard.dismiss();
				setFocusedField(false);
			}}
		>
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
				renderItem={({ item }) => <ClickableRow val={item} onPress={() => onWorkoutSelect(item)} />}
			/>
		</Pressable>
	);
}
