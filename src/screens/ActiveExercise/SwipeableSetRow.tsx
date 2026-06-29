import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { colors } from "../../css/color";
import { SetRow } from "./SetRow";
import { styles } from "./styles";

type Props = {
	index: number;
	weight: string | null;
	reps: string | null;
	duration: string | null;
	distance: string | null;
	onDelete: () => void;
	onChangeWeight?: (val: string) => void;
	onChangeReps?: (val: string) => void;
	onChangeDuration?: (val: string) => void;
	onChangeDistance?: (val: string) => void;
};

export function SwipeableSetRow({
	index,
	onDelete,
	weight,
	reps,
	duration,
	distance,
	onChangeWeight,
	onChangeReps,
	onChangeDuration,
	onChangeDistance,
}: Props) {
	const [swiping, setSwiping] = useState(false);
	const translateX = useSharedValue(0);

	const panGesture = Gesture.Pan()
		.activeOffsetX([-10, 10])
		.runOnJS(true)
		.onUpdate((event) => {
			if (event.translationX > 0) {
				translateX.value = event.translationX;
				setSwiping(true);
			}
		})
		.onEnd(() => {
			if (translateX.value > 120) {
				onDelete();
			}
			translateX.value = withSpring(0);
			setSwiping(false);
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View style={animatedStyle}>
				<SetRow
					title={`Set ${index}`}
					weight={weight}
					reps={reps}
					duration={duration}
					distance={distance}
					onChangeWeight={onChangeWeight}
					onChangeReps={onChangeReps}
					onChangeDuration={onChangeDuration}
					onChangeDistance={onChangeDistance}
				/>
				<View style={styles.setChevronContainer}>
					<ChevronRight
						size={22}
						color={swiping ? colors.text.accent : colors.button.muted}
						strokeWidth={1.75}
					/>
				</View>
			</Animated.View>
		</GestureDetector>
	);
}
