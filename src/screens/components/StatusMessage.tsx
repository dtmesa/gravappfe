import { useEffect, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../../css/color";

export type StatusType = "error" | "success";

type Props = {
	message: string | null;
	type?: "error" | "success";
	duration?: number;
	onClear?: () => void;
};

export function StatusMessage({ message, type = "error", duration = 3000, onClear }: Props) {
	const timeoutRef = useRef<number | null>(null);

	const style = type === "success" ? styles.successText : styles.errorText;

	const onClearRef = useRef(onClear);

	useEffect(() => {
		onClearRef.current = onClear;
	}, [onClear]);

	useEffect(() => {
		if (!message) return;

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			onClearRef.current?.();
		}, duration);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [message, duration]);

	if (!message) return null;

	return <Text style={style}>{message}</Text>;
}

const styles = StyleSheet.create({
	successText: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		textAlign: "center",
		color: colors.text.accent,
	},

	errorText: {
		fontFamily: "Play_400Regular",
		fontSize: 16,
		textAlign: "center",
		color: colors.text.warning,
	},
});
