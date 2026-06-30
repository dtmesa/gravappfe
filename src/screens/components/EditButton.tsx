import { Pencil } from "lucide-react-native";
import { Animated, Pressable } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";

type Props = {
	onEdit: () => void;
	color?: string;
};

export function EditButton({ onEdit }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);

	return (
		<Pressable onPress={onEdit} onPressIn={pressIn} onPressOut={pressOut} hitSlop={16}>
			{({ pressed }) => (
				<Animated.View style={{ transform: [{ scale }] }}>
					<Pencil
						size={23}
						color={pressed ? colors.button.accentHighlight : colors.button.accentDark}
						strokeWidth={1.75}
					/>
				</Animated.View>
			)}
		</Pressable>
	);
}
