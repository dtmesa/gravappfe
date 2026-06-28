import { Animated, Pressable, Text } from "react-native";
import { useScaleAnimation } from "../components/scaleAnim";
import { styles } from "./styles";

interface Props {
	onPress: () => void;
	label: string;
}

export default function InsertButton({ onPress, label }: Props) {
	const { scale, pressIn, pressOut } = useScaleAnimation();

	return (
		<Animated.View style={[styles.inputContainer, { transform: [{ scale }] }]}>
			<Pressable
				style={({ pressed }) => [styles.inputWrapper, pressed && styles.inputFocused]}
				onPress={onPress}
				onPressOut={pressOut}
				onPressIn={pressIn}
			>
				{({ pressed }) => (
					<Text style={[styles.placeholderText, pressed && styles.textHighlight]}>{label}</Text>
				)}
			</Pressable>
		</Animated.View>
	);
}
