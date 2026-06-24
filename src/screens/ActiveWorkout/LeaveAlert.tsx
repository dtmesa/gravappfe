import { Check, Trash, X } from "lucide-react-native";
import { Modal, Pressable, Text, View } from "react-native";
import { colors } from "../../css/color";
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

function TrashButton({ onAction, color = colors.button.muted }: ButtonProps) {
	return (
		<Pressable onPress={onAction} hitSlop={12}>
			{({ pressed }) => (
				<Trash
					size={36}
					color={pressed ? colors.button.accentHighlight : color}
					strokeWidth={1.75}
				/>
			)}
		</Pressable>
	);
}

function CancelButton({ onAction, color = colors.button.muted }: ButtonProps) {
	return (
		<Pressable onPress={onAction} hitSlop={12}>
			{({ pressed }) => (
				<X size={40} color={pressed ? colors.button.accentHighlight : color} strokeWidth={1.75} />
			)}
		</Pressable>
	);
}

function ConfirmButton({ onAction, color = colors.button.muted }: ButtonProps) {
	return (
		<Pressable onPress={onAction} hitSlop={8}>
			{({ pressed }) => (
				<Check
					size={40}
					color={pressed ? colors.button.accentHighlight : color}
					strokeWidth={1.75}
				/>
			)}
		</Pressable>
	);
}

export function LeaveAlert({ visible, onSave, onDiscard, onCancel }: Props) {
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
