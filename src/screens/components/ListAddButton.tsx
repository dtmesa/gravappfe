import { ListPlus } from "lucide-react-native";
import { Animated, Pressable } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";

type Props = {
	onEdit: () => void;
	color?: string;
};

export default function ListAddButton({ onEdit }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);

	return (
		<Pressable onPress={onEdit} onPressIn={pressIn} onPressOut={pressOut} hitSlop={18}>
			{({ pressed }) => (
				<Animated.View style={{ transform: [{ scale }] }}>
					<ListPlus
						size={26}
						color={pressed ? colors.button.accentLight : colors.button.muted}
						strokeWidth={1.75}
					/>
				</Animated.View>
			)}
		</Pressable>
	);
}
