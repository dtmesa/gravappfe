import { Check, Trash, X } from "lucide-react-native";
import { Animated, Modal, Pressable, Text, View } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";
import { styles } from "./styles";

type Props = {
	visible: boolean;
	onDiscard: () => void;
	onCancel: () => void;
	onSave: () => void;
};

type ButtonProps = {
	onAction: () => void;
	color?: string;
};

function TrashButton({ onAction, color = colors.button.mutedLight }: ButtonProps) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);

	return (
		<Pressable onPress={onAction} onPressIn={pressIn} onPressOut={pressOut} hitSlop={12}>
			{({ pressed }) => (
				<Animated.View style={{ transform: [{ scale }] }}>
					<Trash
						size={36}
						color={pressed ? colors.button.accentHighlight : color}
						strokeWidth={1.75}
					/>
				</Animated.View>
			)}
		</Pressable>
	);
}

function CancelButton({ onAction, color = colors.button.mutedLight }: ButtonProps) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);

	return (
		<Animated.View style={{ transform: [{ scale }] }}>
			<Pressable onPress={onAction} onPressIn={pressIn} onPressOut={pressOut} hitSlop={12}>
				{({ pressed }) => (
					<X size={40} color={pressed ? colors.button.accentHighlight : color} strokeWidth={1.75} />
				)}
			</Pressable>
		</Animated.View>
	);
}

function ConfirmButton({ onAction, color = colors.button.mutedLight }: ButtonProps) {
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);

	return (
		<Pressable onPress={onAction} onPressIn={pressIn} onPressOut={pressOut} hitSlop={12}>
			{({ pressed }) => (
				<Animated.View style={{ transform: [{ scale }] }}>
					<Check
						size={40}
						color={pressed ? colors.button.accentHighlight : color}
						strokeWidth={1.75}
					/>
				</Animated.View>
			)}
		</Pressable>
	);
}

export function LeaveAlertModal({ visible, onSave, onDiscard, onCancel }: Props) {
	return (
		<Modal transparent visible={visible} animationType="fade">
			<View style={styles.alertBackground}>
				<View style={styles.alertModal}>
					<Text style={styles.alertTitle}>End Workout?</Text>
					<View style={styles.alertButtons}>
						<ConfirmButton onAction={onSave} />
						<TrashButton onAction={onDiscard} />
						<CancelButton onAction={onCancel} />
					</View>
				</View>
			</View>
		</Modal>
	);
}
