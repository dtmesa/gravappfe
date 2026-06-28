import { useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const ITEM_HEIGHT = 44;

function WheelColumn({
	count,
	selected,
	onChange,
}: {
	count: number;
	selected: number;
	onChange: (val: number) => void;
}) {
	const ref = useRef<ScrollView>(null);

	return (
		<ScrollView
			ref={ref}
			style={styles.column}
			snapToInterval={ITEM_HEIGHT}
			decelerationRate="fast"
			showsVerticalScrollIndicator={false}
			onLayout={() => {
				ref.current?.scrollTo({ y: selected * ITEM_HEIGHT, animated: false });
			}}
			onMomentumScrollEnd={(e) => {
				const idx = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
				onChange(Math.max(0, Math.min(count - 1, idx)));
			}}
		>
			<View style={{ height: ITEM_HEIGHT }} />
			{Array.from({ length: count }, (_, i) => (
				<View key={i} style={styles.item}>
					<Text style={styles.itemText}>{String(i).padStart(2, "0")}</Text>
				</View>
			))}
			<View style={{ height: ITEM_HEIGHT }} />
		</ScrollView>
	);
}

export function TimePicker({ value, onChange }: { value: Date; onChange: (date: Date) => void }) {
	const update = (h: number, m: number) => {
		const d = new Date(value);
		d.setHours(h);
		d.setMinutes(m);
		onChange(d);
	};

	return (
		<View style={styles.container}>
			<WheelColumn
				count={24}
				selected={value.getHours()}
				onChange={(h) => update(h, value.getMinutes())}
			/>
			<Text style={styles.colon}>:</Text>
			<WheelColumn
				count={60}
				selected={value.getMinutes()}
				onChange={(m) => update(value.getHours(), m)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: "row", alignItems: "center", height: 180 },
	column: { width: 60, height: 180 },
	item: { height: ITEM_HEIGHT, alignItems: "center", justifyContent: "center" },
	itemText: { fontSize: 22 },
	colon: { fontSize: 24, fontWeight: "500", marginHorizontal: 8 },
});
