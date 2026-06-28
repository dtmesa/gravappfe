import { Animated, Pressable, View } from "react-native";
import { useScaleAnimation } from "../components/scaleAnim";
import { styles } from "./styles";

type Props = {
	val: { id: number; name: string };
	onPress: () => void;
};

export default function ClickableRow({ val, onPress }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9375);

	return (
		<View style={styles.rowContainer}>
			<Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
				{({ pressed }) => (
					<View style={[styles.rowWrapper, pressed && styles.rowWrapperPressed]}>
						<Animated.Text
							numberOfLines={1}
							style={[styles.rowText, pressed && styles.rowTextPressed, { transform: [{ scale }] }]}
						>
							{val.name}
						</Animated.Text>
					</View>
				)}
			</Pressable>
		</View>
	);
}
