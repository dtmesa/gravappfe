import { Plus } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";
import { styles } from "./styles";

type Props = {
	onPress: () => void;
	disabled?: boolean;
	triggerFade: number;
};

export function PlusRow({ onPress, disabled, triggerFade }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation();
	const opacity = useRef(new Animated.Value(1)).current;
	const prevTrigger = useRef(triggerFade);

	useEffect(() => {
		if (triggerFade === prevTrigger.current) return;
		prevTrigger.current = triggerFade;

		opacity.setValue(1);
		Animated.sequence([
			Animated.timing(opacity, {
				toValue: 0,
				duration: 50,
				useNativeDriver: true,
			}),
			Animated.timing(opacity, {
				toValue: 1,
				duration: 350,
				useNativeDriver: true,
			}),
		]).start();
	}, [triggerFade, opacity]);

	return (
		<View style={styles.plusRowContainer}>
			<Pressable onPress={onPress} disabled={disabled} onPressIn={pressIn} onPressOut={pressOut}>
				{({ pressed }) => (
					<Animated.View
						style={[
							styles.plusRow,
							pressed && styles.plusRowPressed,
							{ transform: [{ scale }], opacity },
						]}
					>
						<Plus
							size={32}
							color={pressed ? colors.button.accentLight : colors.button.mutedSecondary}
							strokeWidth={1.75}
						/>
					</Animated.View>
				)}
			</Pressable>
		</View>
	);
}
