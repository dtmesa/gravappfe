import { CircleCheck } from "lucide-react-native";
import { Pressable } from "react-native";
import { colors } from "../../css/color";

type Props = {
	onSave: () => void;
	color?: string;
	size?: number;
};

export default function SaveButton({ onSave }: Props) {
	return (
		<Pressable onPress={onSave} hitSlop={12}>
			{({ pressed }) => (
				<CircleCheck
					size={32}
					color={pressed ? colors.button.accentHighlight : colors.button.accentDark}
					strokeWidth={1.75}
				/>
			)}
		</Pressable>
	);
}
