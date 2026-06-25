import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getApiError } from "../../api/apiError";
import { useAuthStore } from "../../store/auth.store";
import type { RootStackParamList } from "../../types/navigation";
import { validateJoint } from "../../util/inputValidation";
import { StarBackground } from "../components/StarBackground";
import StatusMessage from "../components/StatusMessage";
import PasswordInput from "../Login/PasswordInput";
import { styles } from "../Login/styles";
import UsernameInput from "../Login/UsernameInput";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
	const register = useAuthStore((state) => state.register);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const breathe = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(breathe, { toValue: 1, duration: 3500, useNativeDriver: false }),
				Animated.timing(breathe, { toValue: 0, duration: 3500, useNativeDriver: false }),
			]),
		).start();
	}, [breathe]);

	const letterSpacing = breathe.interpolate({ inputRange: [0, 1], outputRange: [2, 4] });

	const handleRegister = async () => {
		if (loading) return;

		const isInvalidInputs = validateJoint(username, password);

		if (isInvalidInputs) {
			setError(isInvalidInputs);
			return;
		}
		try {
			setLoading(true);
			setError("");
			await register(username, password);
			navigation.replace("Home");
		} catch (err: unknown) {
			const code = getApiError(err);

			if (code === "USERNAME_TAKEN") {
				setError("Username already exists");
			} else {
				setError("Registration failed");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAwareScrollView
			contentContainerStyle={styles.scrollContainer}
			keyboardShouldPersistTaps="handled"
			enableOnAndroid={true}
			enableAutomaticScroll={true}
			extraScrollHeight={20}
			extraHeight={20}
		>
			<StarBackground />
			<View style={styles.innerContainer}>
				<Animated.Text style={[styles.regTitle, { letterSpacing }]}>Register</Animated.Text>
				<UsernameInput
					value={username}
					onChangeText={setUsername}
					placeholder="Username"
					keyboardType="visible-password"
					autoCapitalize="none"
					focused={focusedField === "username"}
					onFocus={() => setFocusedField("username")}
					onBlur={() => setFocusedField(null)}
				/>

				<PasswordInput
					value={password}
					visible={showPassword}
					focused={focusedField === "password"}
					placeholder="Password"
					onChangeText={setPassword}
					onFocus={() => setFocusedField("password")}
					onBlur={() => setFocusedField(null)}
					onToggleVisibility={() => setShowPassword((v) => !v)}
				/>

				<StatusMessage message={error} type="error" onClear={() => setError("")} />

				<Pressable
					style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
					onPress={handleRegister}
					disabled={loading}
				>
					<Text style={styles.buttonText}>Submit</Text>
				</Pressable>

				<Pressable
					style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
					onPress={() => navigation.navigate("Login")}
					disabled={loading}
				>
					<Text style={styles.buttonText}>Return to Login</Text>
				</Pressable>
			</View>
		</KeyboardAwareScrollView>
	);
}
