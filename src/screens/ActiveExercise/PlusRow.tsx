import { Plus } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { colors } from "../../css/color";
import { styles } from "./styles";

type Props = {
	onPress: () => void;
	disabled?: boolean;
};

export default function PlusRow({ onPress, disabled }: Props) {
	return (
		<View style={styles.plusRowContainer}>
			<Pressable onPress={onPress} disabled={disabled}>
				{({ pressed }) => (
					<View style={[styles.plusRow, pressed && styles.plusRowPressed]}>
						<Plus
							size={32}
							color={pressed ? colors.button.accentLight : colors.button.muted}
							strokeWidth={1.75}
						/>
					</View>
				)}
			</Pressable>
		</View>
	);
}
