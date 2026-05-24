import { Eye, EyeOff } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { colors } from "../../css/color";

type Props = {
	visible: boolean;
	onToggle: () => void;
	color?: string;
	size?: number;
};

export default function PasswordToggleButton({
	visible,
	onToggle,
	color = colors.button.muted,
	size = 22,
}: Props) {
	return (
		<TouchableOpacity onPress={onToggle} hitSlop={10}>
			{visible ? (
				<Eye size={size} color={color} strokeWidth={1.75} />
			) : (
				<EyeOff size={size} color={color} strokeWidth={1.75} />
			)}
		</TouchableOpacity>
	);
}
