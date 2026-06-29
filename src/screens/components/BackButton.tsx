import { ArrowLeft } from "lucide-react-native";
import { Animated, Pressable } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";

type Props = {
	onBack: () => void;
	color?: string;
};

export function BackButton({ onBack }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);

	return (
		<Pressable onPress={onBack} onPressIn={pressIn} onPressOut={pressOut} hitSlop={12}>
			{({ pressed }) => (
				<Animated.View style={{ transform: [{ scale }] }}>
					<ArrowLeft
						size={35}
						color={pressed ? colors.button.accentHighlight : colors.button.accentDark}
						strokeWidth={1.75}
					/>
				</Animated.View>
			)}
		</Pressable>
	);
}
