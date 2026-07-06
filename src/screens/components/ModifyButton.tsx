import { SquarePen } from "lucide-react-native";
import { Animated, Pressable } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "./scaleAnim";

type Props = {
	onEdit: () => void;
	color?: string;
};

export function ModifyButton({ onEdit, color }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);

	return (
		<Pressable onPress={onEdit} onPressIn={pressIn} onPressOut={pressOut} hitSlop={18}>
			{({ pressed }) => (
				<Animated.View style={{ transform: [{ scale }] }}>
					<SquarePen
						size={24}
						color={color ?? (pressed ? colors.button.accentLight : colors.button.mutedLight)}
						strokeWidth={1.75}
					/>
				</Animated.View>
			)}
		</Pressable>
	);
}
