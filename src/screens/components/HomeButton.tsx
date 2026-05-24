import { Home } from "lucide-react-native";
import { Pressable } from "react-native";
import { colors } from "../../css/color";

type Props = {
	navHome: () => void;
	color?: string;
	size?: number;
};

export default function HomeButton({ navHome }: Props) {
	return (
		<Pressable onPress={navHome} hitSlop={12}>
			{({ pressed }) => (
				<Home
					size={26}
					color={pressed ? colors.button.accentHighlight : colors.button.accentDark}
					strokeWidth={1.75}
				/>
			)}
		</Pressable>
	);
}
