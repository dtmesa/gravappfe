import { SquarePen } from "lucide-react-native";
import { Animated, Pressable } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "./scaleAnim";

type Props = {
	onEdit: () => void;
	active?: boolean;
};

export function ModifyButton({ onEdit, active }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);

	return (
		<Pressable onPress={onEdit} onPressIn={pressIn} onPressOut={pressOut} hitSlop={18}>
			{({ pressed }) => (
				<Animated.View style={{ transform: [{ scale }] }}>
					<SquarePen
						size={24}
						color={
							pressed
								? colors.button.accentLight
								: active
									? colors.button.mutedHighlight
									: colors.button.mutedLight
						}
						strokeWidth={1.75}
					/>
				</Animated.View>
			)}
		</Pressable>
	);
}
