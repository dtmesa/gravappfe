import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useRef } from "react";
import { Animated } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { colors } from "../../css/color";
import type { WorkoutSession } from "../../types/workoutSession";
import { CalendarDay } from "./CalendarDay";

type Props = {
	selected: string;
	setSelected: (date: string) => void;
	onMonthChange: (month: string) => void;
	sessionsByDay: Record<string, WorkoutSession[]>;
};

LocaleConfig.locales["en-short"] = {
	...LocaleConfig.locales[""],
	dayNamesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
};
LocaleConfig.defaultLocale = "en-short";

export default function CalendarDisplay({
	selected,
	setSelected,
	onMonthChange,
	sessionsByDay,
}: Props) {
	const opacity = useRef(new Animated.Value(1)).current;

	const fadeTransition = () => {
		Animated.sequence([
			Animated.timing(opacity, { toValue: 0, duration: 35, useNativeDriver: true }),
			Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
		]).start();
	};

	const touchStartX = useRef(0);

	return (
		<Animated.View
			style={{ opacity }}
			onTouchStart={(e) => {
				touchStartX.current = e.nativeEvent.pageX;
			}}
			onTouchMove={(e) => {
				const dx = Math.abs(e.nativeEvent.pageX - touchStartX.current);
				if (dx > 30) fadeTransition();
			}}
		>
			<Calendar
				enableSwipeMonths={true}
				onMonthChange={(month) => onMonthChange(month.dateString.slice(0, 7))}
				disableArrowLeft={true}
				disableArrowRight={true}
				hideExtraDays={true}
				onDayPress={(day) => {
					setSelected(day.dateString);
				}}
				markedDates={{
					...Object.keys(sessionsByDay).reduce(
						(acc, day) => {
							acc[day] = { marked: true };
							return acc;
						},
						{} as Record<string, any>,
					),
					...(selected && { [selected]: { selected: true, marked: !!sessionsByDay[selected] } }),
				}}
				renderArrow={(direction) =>
					direction === "left" ? (
						<ChevronLeft color={colors.button.primary} size={20} />
					) : (
						<ChevronRight color={colors.button.primary} size={20} />
					)
				}
				dayComponent={({ date, state, marking }) => (
					<CalendarDay
						key={date?.dateString}
						date={date}
						state={state}
						marking={marking}
						onPress={setSelected}
					/>
				)}
				theme={{
					...({
						"stylesheet.calendar.header": {
							header: {
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								marginTop: 8,
								marginBottom: 8,
							},
						},
					} as any),

					monthTextColor: colors.text.static,
					textMonthFontFamily: "Syncopate_400Regular",
					textMonthFontSize: 18,

					textSectionTitleColor: colors.text.muted,
					textDayHeaderFontFamily: "Play_400Regular",
					textDayHeaderFontSize: 14,

					selectedDayBackgroundColor: colors.bg.inputHighlight,
					selectedDayTextColor: colors.text.accentHighlight,

					todayTextColor: colors.text.accent,

					calendarBackground: colors.bg.transparent,
				}}
			/>
		</Animated.View>
	);
}
