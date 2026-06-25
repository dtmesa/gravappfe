import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getApiError } from "../../api/apiError";
import { useAuthStore } from "../../store/auth.store";
import type { RootStackParamList } from "../../types/navigation";
import { StarBackground } from "../components/StarBackground";
import StatusMessage from "../components/StatusMessage";
import PasswordInput from "./PasswordInput";
import { styles } from "./styles";
import UsernameInput from "./UsernameInput";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
	const login = useAuthStore((state) => state.login);

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

	const handleLogin = async () => {
		if (loading) return;
		try {
			setLoading(true);
			setError("");
			await login(username, password);
		} catch (err: unknown) {
			const code = getApiError(err);
			if (username === "") {
				if (password === "") {
					setError("Missing username and password");
				} else {
					setError("Missing username");
				}
			} else if (password === "") {
				setError("Missing password");
			} else if (code === "USER_NOT_FOUND") {
				setError("Invalid username or password");
			} else if (code === "INVALID_PASSWORD") {
				setError("Invalid username or password");
			} else if (code === "RATE_LIMITED") {
				setError("Too many attempts. You have been timed out.");
			} else {
				setError("Login failed");
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
				<Animated.Text style={[styles.title, { letterSpacing }]}>Gravity</Animated.Text>
				<UsernameInput
					value={username}
					onChangeText={setUsername}
					placeholder="Username "
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
					placeholder="Password "
					onChangeText={setPassword}
					onFocus={() => setFocusedField("password")}
					onBlur={() => setFocusedField(null)}
					onToggleVisibility={() => setShowPassword((v) => !v)}
				/>

				<StatusMessage message={error} type="error" onClear={() => setError("")} />

				<Pressable
					style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
					onPress={handleLogin}
					disabled={loading}
				>
					<Text style={styles.buttonText}>Login</Text>
				</Pressable>

				<Pressable
					style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
					onPress={() => navigation.navigate("Register")}
					disabled={loading}
				>
					<Text style={styles.buttonText}>Register</Text>
				</Pressable>
			</View>
		</KeyboardAwareScrollView>
	);
}
