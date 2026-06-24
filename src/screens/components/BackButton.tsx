import { ArrowLeft } from "lucide-react-native";
import { Pressable } from "react-native";
import { colors } from "../../css/color";

type Props = {
	onBack: () => void;
	color?: string;
};

export default function BackButton({ onBack }: Props) {
	return (
		<Pressable onPress={onBack} hitSlop={12}>
			{({ pressed }) => (
				<ArrowLeft
					size={35}
					color={pressed ? colors.button.accentHighlight : colors.button.accentDark}
					strokeWidth={1.75}
				/>
			)}
		</Pressable>
	);
}
