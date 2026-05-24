import { Plus } from "lucide-react-native";
import { Pressable } from "react-native";
import { colors } from "../../css/color";

type Props = {
	onAdd: () => void;
	color?: string;
};

export default function AddButton({ onAdd, color = colors.button.primary }: Props) {
	return (
		<Pressable onPress={onAdd} hitSlop={12}>
			{({ pressed }) => (
				<Plus
					size={26}
					color={pressed ? colors.button.accentHighlight : color}
					strokeWidth={1.75}
				/>
			)}
		</Pressable>
	);
}
