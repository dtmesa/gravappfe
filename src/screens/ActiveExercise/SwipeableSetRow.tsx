import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SetRow } from "./SetRow";

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

export default function SwipeableSetRow({
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
	const translateX = useSharedValue(0);

	const panGesture = Gesture.Pan()
		.activeOffsetX([-10, 10])
		.runOnJS(true)
		.onUpdate((event) => {
			if (event.translationX < 0) {
				translateX.value = event.translationX;
			}
		})
		.onEnd(() => {
			if (translateX.value < -120) {
				onDelete();
			}
			translateX.value = withSpring(0);
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
			</Animated.View>
		</GestureDetector>
	);
}
