import { Eye, EyeOff } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { colors } from "../../css/color";

type Props = {
	visible: boolean;
	onToggle: () => void;
	color?: string;
};

export default function PasswordToggleButton({
	visible,
	onToggle,
	color = colors.button.muted,
}: Props) {
	return (
		<TouchableOpacity onPress={onToggle} hitSlop={10}>
			{visible ? (
				<Eye size={22} color={color} strokeWidth={1.75} />
			) : (
				<EyeOff size={22} color={color} strokeWidth={1.75} />
			)}
		</TouchableOpacity>
	);
}
