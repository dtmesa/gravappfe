import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { PasswordToggleButton } from "../components/PasswordToggleButton";
import { styles } from "./styles";

type Props = {
	placeholder: string;
	value: string;
	onChangeText: (v: string) => void;
	secureTextEntry?: boolean;
	showToggle?: boolean;
};

export function SettingsInput({
	placeholder,
	value,
	onChangeText,
	secureTextEntry = false,
	showToggle = false,
}: Props) {
	const [focused, setFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View style={[styles.inputWrapper, focused && styles.inputFocused]}>
			{value.length === 0 && !focused && <Text style={styles.placeholder}>{placeholder} </Text>}
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={onChangeText}
				secureTextEntry={secureTextEntry && !showPassword}
				autoCapitalize="none"
				autoCorrect={false}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
			{showToggle && secureTextEntry && (
				<PasswordToggleButton visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />
			)}
		</View>
	);
}
