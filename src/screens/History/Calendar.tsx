import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { Calendar, type DateData, LocaleConfig } from "react-native-calendars";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";

type Props = {
	selected: string;
	setSelected: (date: string) => void;
};

LocaleConfig.locales["en-short"] = {
	...LocaleConfig.locales[""],
	dayNamesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
};
LocaleConfig.defaultLocale = "en-short";

function CalendarDay({
	date,
	state,
	marking,
	onPress,
}: {
	date?: DateData;
	state?: string;
	marking?: any;
	onPress: (dateString: string) => void;
}) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);

	return (
		<Pressable
			onPress={() => date && onPress(date.dateString)}
			onPressIn={pressIn}
			onPressOut={pressOut}
			android_ripple={null}
			style={{ width: 32, height: 32, alignItems: "center", justifyContent: "center" }}
		>
			{({ pressed }) => (
				<Animated.View style={{ transform: [{ scale }] }}>
					<View
						style={{
							width: 35,
							height: 35,
							borderRadius: 999,
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: marking?.selected ? colors.bg.inputHighlight : "transparent",
						}}
					>
						<Text
							style={{
								fontFamily: "Play_700Bold",
								fontSize: 14,
								paddingBottom: 2,
								color:
									pressed || marking?.selected
										? colors.text.accentHighlight
										: state === "today"
											? colors.text.accent
											: colors.text.static,
							}}
						>
							{date?.day}
						</Text>
					</View>
				</Animated.View>
			)}
		</Pressable>
	);
}

export default function CalendarDisplay({ selected, setSelected }: Props) {
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
				disableArrowLeft={true}
				disableArrowRight={true}
				hideExtraDays={true}
				onDayPress={(day) => {
					setSelected(day.dateString);
				}}
				markedDates={{ [selected]: { selected: true } }}
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
