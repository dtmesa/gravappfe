import { Plus } from "lucide-react-native";
import { Animated, Pressable } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";

type Props = {
	onAdd: () => void;
	color?: string;
};

export function AddButton({ onAdd, color = colors.button.muted }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);

	return (
		<Pressable onPress={onAdd} onPressIn={pressIn} onPressOut={pressOut} hitSlop={12}>
			{({ pressed }) => (
				<Animated.View style={{ transform: [{ scale }] }}>
					<Plus
						size={27}
						color={pressed ? colors.button.accentHighlight : color}
						strokeWidth={1.75}
					/>
				</Animated.View>
			)}
		</Pressable>
	);
}
