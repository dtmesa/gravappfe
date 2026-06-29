import { Plus } from "lucide-react-native";
import { Animated, Pressable, View } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";
import { styles } from "./styles";

type Props = {
	onPress: () => void;
	disabled?: boolean;
};

export function PlusRow({ onPress, disabled }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation();

	return (
		<View style={styles.plusRowContainer}>
			<Pressable onPress={onPress} disabled={disabled} onPressIn={pressIn} onPressOut={pressOut}>
				{({ pressed }) => (
					<Animated.View
						style={[styles.plusRow, pressed && styles.plusRowPressed, { transform: [{ scale }] }]}
					>
						<Plus
							size={32}
							color={pressed ? colors.button.accentLight : colors.button.muted}
							strokeWidth={1.75}
						/>
					</Animated.View>
				)}
			</Pressable>
		</View>
	);
}
