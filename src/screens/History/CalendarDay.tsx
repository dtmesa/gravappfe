import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import type { DateData } from "react-native-calendars";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";

type Props = {
	date?: DateData;
	state?: string;
	marking?: any;
	onPress: (dateString: string) => void;
};

export function CalendarDay({ date, state, marking, onPress }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);

	return (
		<Pressable
			onPress={() => date && onPress(date.dateString)}
			onPressIn={pressIn}
			onPressOut={pressOut}
			style={dayStyles.pressable}
		>
			{({ pressed }) => (
				<Animated.View style={{ transform: [{ scale }] }}>
					<View style={[dayStyles.dayCircle, marking?.selected && dayStyles.dayCircleSelected]}>
						<Text
							style={[
								dayStyles.dayText,
								(pressed || marking?.selected) && dayStyles.dayTextSelected,
								state === "today" && !pressed && !marking?.selected && dayStyles.dayTextToday,
							]}
						>
							{date?.day}
						</Text>
						{marking?.marked && (
							<View
								style={[
									dayStyles.dot,
									(pressed || marking?.selected) && dayStyles.dotSelected,
									state === "today" && !pressed && !marking?.selected && dayStyles.dotToday,
								]}
							/>
						)}
					</View>
				</Animated.View>
			)}
		</Pressable>
	);
}

const dayStyles = StyleSheet.create({
	pressable: {
		width: 32,
		height: 32,
		alignItems: "center",
		justifyContent: "center",
	},
	dayCircle: {
		width: 35,
		height: 35,
		borderRadius: 999,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "transparent",
	},
	dayCircleSelected: {
		backgroundColor: colors.bg.inputHighlight,
	},
	dayText: {
		fontFamily: "Play_400Regular",
		fontSize: 14,
		paddingBottom: 2,
		color: colors.text.static,
	},
	dayTextSelected: {
		color: colors.text.accentHighlight,
	},
	dayTextToday: {
		color: colors.text.accent,
	},
	dot: {
		width: 4,
		height: 4,
		borderRadius: 999,
		backgroundColor: colors.text.static,
		position: "absolute",
		bottom: 4,
	},
	dotSelected: {
		backgroundColor: colors.text.accentHighlight,
	},
	dotToday: {
		backgroundColor: colors.text.accent,
	},
});
