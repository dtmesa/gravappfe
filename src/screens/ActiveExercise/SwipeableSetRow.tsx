import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SetRow, type SetVars } from "./SetRow";

type Props = SetVars & {
	index: number;
	onDelete: () => void;
	onChangeWeight?: (val: string) => void;
	onChangeReps?: (val: string) => void;
	onChangeDuration?: (val: string) => void;
	onChangeDistance?: (val: string) => void;
};

export default function SwipeableSetRow({ index, onDelete, ...setProps }: Props) {
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
				<SetRow title={`Set ${index}`} {...setProps} />
			</Animated.View>
		</GestureDetector>
	);
}
