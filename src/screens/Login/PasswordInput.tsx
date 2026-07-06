import { Text, TextInput, type TextInputProps, View } from "react-native";
import { colors } from "../../css/color";
import { PasswordToggleButton } from "../components/PasswordToggleButton";
import { styles } from "./styles";

type Props = TextInputProps & {
	value: string;
	focused: boolean;
	visible: boolean;
	placeholder: string;
	onChangeText: (text: string) => void;
	onFocus: () => void;
	onBlur: () => void;
	onToggleVisibility: () => void;
};

export default function PasswordInput({
	value,
	focused,
	placeholder,
	visible,
	onChangeText,
	onFocus,
	onBlur,
	onToggleVisibility,
	...props
}: Props) {
	return (
		<View style={[styles.inputWrapper, focused && styles.inputFocused]}>
			<TextInput
				style={styles.input}
				secureTextEntry={!visible}
				autoCorrect={false}
				autoCapitalize="none"
				value={value}
				onChangeText={onChangeText}
				onFocus={onFocus}
				onBlur={onBlur}
				{...props}
			/>

			{value.length === 0 && !focused && <Text style={styles.placeholderText}>{placeholder}</Text>}

			<PasswordToggleButton
				visible={visible}
				onToggle={onToggleVisibility}
				color={focused ? colors.button.mutedLight : colors.button.mutedSecondary}
			/>
		</View>
	);
}
