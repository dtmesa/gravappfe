import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export function LeaveAlert({ visible, onConfirm, onCancel }: Props) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.alertBackground}>
                <View style={styles.alertModal}>
                    <Text style={styles.alertTitle}>End Workout?</Text>
                    <Text style={styles.alertText}>You have a workout in progress. All data will be lost if you leave without submitting.</Text>
                    <View style={styles.alertButtons}>
                        <Pressable
                            style={({ pressed }) => [styles.alertCancel, pressed && styles.alertCancelPressed]}
                            onPress={onCancel}
                        >
                            {({ pressed }) => (
                                <Text style={[styles.alertCancelText, pressed && styles.alertCancelTextPressed]}>Cancel</Text>
                            )}
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [styles.alertConfirm, pressed && styles.alertConfirmPressed]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.alertConfirmText}>Leave</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}