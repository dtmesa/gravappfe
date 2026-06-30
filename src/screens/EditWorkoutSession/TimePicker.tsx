import { useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { updateWorkoutSession } from "../../api/workoutSession.api";
import { colors } from "../../css/color";
import type { Workout } from "../../types/workout.types";

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 5;
const COLUMN_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const PADDING_ITEMS = Math.floor(VISIBLE_ITEMS / 2);

export type TimeValue = {
	hours: number;
	minutes: number;
	period: "AM" | "PM";
};

function buildDate(day: string, time: TimeValue) {
	const [year, month, dayNum] = day.split("-").map(Number);

	let hour = time.hours % 12;
	if (time.period === "PM") hour += 12;

	return new Date(year, month - 1, dayNum, hour, time.minutes);
}

function WheelColumn({
	items,
	selectedIndex,
	onChange,
}: {
	items: string[];
	selectedIndex: number;
	onChange: (index: number) => void;
}) {
	const ref = useRef<FlatList>(null);

	useEffect(() => {
		const t = setTimeout(() => {
			ref.current?.scrollToOffset({
				offset: selectedIndex * ITEM_HEIGHT,
				animated: false,
			});
		}, 50);
		return () => clearTimeout(t);
	}, [selectedIndex]);

	return (
		<FlatList
			ref={ref}
			data={items}
			style={[styles.column]}
			snapToInterval={ITEM_HEIGHT}
			decelerationRate="fast"
			showsVerticalScrollIndicator={false}
			getItemLayout={(_, index) => ({
				length: ITEM_HEIGHT,
				offset: ITEM_HEIGHT * PADDING_ITEMS + ITEM_HEIGHT * index,
				index,
			})}
			ListHeaderComponent={<View style={{ height: ITEM_HEIGHT * PADDING_ITEMS }} />}
			ListFooterComponent={<View style={{ height: ITEM_HEIGHT * PADDING_ITEMS }} />}
			keyExtractor={(_, i) => String(i)}
			renderItem={({ item, index }) => (
				<View style={styles.item}>
					<Text style={[styles.itemText, index === selectedIndex && styles.selectedText]}>
						{item}
					</Text>
				</View>
			)}
			onMomentumScrollEnd={(e) => {
				const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
				onChange(Math.max(0, Math.min(items.length - 1, index)));
			}}
		/>
	);
}

type Props = {
	value: TimeValue;
	onChange: (val: TimeValue) => void;
	selectedWorkout: Workout;
	selectedDate: string;
	onSet: () => void;
	sessionId: number;
};

export function TimePicker({
	value,
	onChange,
	selectedWorkout,
	selectedDate,
	onSet,
	sessionId,
}: Props) {
	const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
	const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
	const periods: ("AM" | "PM")[] = ["AM", "PM"];

	const handleSet = async (newValue: TimeValue) => {
		onChange(newValue);
		const date = buildDate(selectedDate, newValue);
		await updateWorkoutSession(sessionId, selectedWorkout.id, "date", date);
		onSet();
	};

	return (
		<View style={styles.innerContainer}>
			<View style={styles.pickerContainer}>
				<View style={styles.selectionBand} />
				<WheelColumn
					items={hours}
					selectedIndex={value.hours - 1}
					onChange={(i) => handleSet({ ...value, hours: i + 1 })}
				/>
				<Text style={styles.colon}>:</Text>
				<WheelColumn
					items={minutes}
					selectedIndex={value.minutes}
					onChange={(i) => handleSet({ ...value, minutes: i })}
				/>

				<WheelColumn
					items={periods}
					selectedIndex={periods.indexOf(value.period)}
					onChange={(i) => handleSet({ ...value, period: periods[i] })}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	innerContainer: {
		backgroundColor: colors.bg.input,
		marginTop: 30,
		marginHorizontal: 40,
		marginVertical: 20,
		borderRadius: 18,
	},
	pickerContainer: {
		marginTop: 10,
		marginBottom: 10,
		flexDirection: "row",
		alignItems: "center",
		height: COLUMN_HEIGHT,
	},
	selectionBand: {
		position: "absolute",
		left: 0,
		right: 0,
		top: ITEM_HEIGHT * PADDING_ITEMS,
		height: ITEM_HEIGHT,
		borderRadius: 16,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: colors.border.accent,
	},
	column: {
		height: COLUMN_HEIGHT,
	},
	item: {
		height: ITEM_HEIGHT,
		alignItems: "center",
		justifyContent: "center",
	},
	itemText: {
		fontSize: 18,
		fontFamily: "Play_700Bold",
		includeFontPadding: false,
		color: colors.text.input,
	},
	selectedText: {
		fontSize: 20,
		color: colors.text.accentLight,
	},
	colon: {
		fontSize: 20,
		color: colors.text.accentLight,
		marginBottom: 2,
		includeFontPadding: false,
	},
});
