import { Text, TextInput, type TextInputProps, View } from "react-native";

import { styles } from "./styles";

type Props = TextInputProps & {
	value: string;
	placeholder: string;
	focused: boolean;
	onFocus: () => void;
	onBlur: () => void;
};

export default function UsernameInput({
	value,
	placeholder,
	focused,
	onFocus,
	onBlur,
	style,
	...props
}: Props) {
	return (
		<View style={[styles.inputWrapper, focused && styles.inputFocused]}>
			<TextInput
				style={[styles.input, style]}
				value={value}
				onFocus={onFocus}
				onBlur={onBlur}
				{...props}
			/>

			{value.length === 0 && !focused && <Text style={styles.placeholder}>{placeholder}</Text>}
		</View>
	);
}
