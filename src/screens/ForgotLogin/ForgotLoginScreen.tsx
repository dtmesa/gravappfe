import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Animated, LayoutAnimation, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { forgotUsername, requestPasswordReset, verifyResetCode } from "../../api/auth.api";
import { getApiError } from "../../api/error.api";
import { saveToken } from "../../api/token.api";
import { useAuthStore } from "../../store/auth.store";
import type { RootStackParamList } from "../../types/navigation.types";
import { validateEmail, validatePassword } from "../../util/inputValidation.util";
import { BackButton } from "../components/BackButton";
import { FadeIn } from "../components/FadeIn";
import { StarBackground } from "../components/StarBackground";
import { StatusMessage } from "../components/StatusMessage";
import { useScaleAnimation } from "../components/scaleAnim";
import { SettingsCard } from "../Settings/SettingsCard";
import { SettingsInput } from "../Settings/SettingsInput";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "ForgotLogin">;

type Status = { message: string; type: "success" | "error" } | null;

export function ForgotLoginScreen({ navigation }: Props) {
	const refreshUser = useAuthStore((t) => t.refreshUser);

	const [expandedCard, setExpandedCard] = useState<"username" | "password" | null>(null);
	const [loading, setLoading] = useState(false);
	const anim = useScaleAnimation();

	// Forgot username
	const [usernameEmail, setUsernameEmail] = useState("");
	const [usernameStatus, setUsernameStatus] = useState<Status>(null);

	// Reset password
	const [resetEmail, setResetEmail] = useState("");
	const [codeSent, setCodeSent] = useState(false);
	const [code, setCode] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [resetStatus, setResetStatus] = useState<Status>(null);

	const toggle = (card: "username" | "password") => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setExpandedCard((prev) => (prev === card ? null : card));
	};

	const handleForgotUsername = async () => {
		if (loading) return;

		const isInvalidEmail = validateEmail(usernameEmail);

		if (isInvalidEmail) {
			setUsernameStatus({ message: isInvalidEmail, type: "error" });
			return;
		}

		setLoading(true);

		try {
			setUsernameStatus(null);
			await forgotUsername(usernameEmail);
			// Deliberately generic -- the backend never reveals whether the
			// email is registered, so neither does this message.
			setUsernameStatus({
				message: "If registered, an email has been sent with your username",
				type: "success",
			});
		} catch (err: unknown) {
			const code = getApiError(err);
			setUsernameStatus({
				message:
					code === "RATE_LIMITED" ? "Too many attempts. Try again later." : "Something went wrong",
				type: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleRequestReset = async () => {
		if (loading) return;

		const isInvalidEmail = validateEmail(resetEmail);

		if (isInvalidEmail) {
			setResetStatus({ message: isInvalidEmail, type: "error" });
			return;
		}

		setLoading(true);

		try {
			setResetStatus(null);
			await requestPasswordReset(resetEmail);
			setCodeSent(true);
			setResetStatus({
				message: "If registered, an email has been sent with your reset code",
				type: "success",
			});
		} catch (err: unknown) {
			const code = getApiError(err);
			setResetStatus({
				message:
					code === "RATE_LIMITED" ? "Too many attempts. Try again later." : "Something went wrong",
				type: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyReset = async () => {
		if (loading) return;

		const isInvalidPassword = validatePassword(newPassword);

		if (code.length !== 6) {
			setResetStatus({ message: "Enter the code", type: "error" });
			return;
		} else if (newPassword === "" || confirmPassword === "") {
			setResetStatus({ message: "One or more required fields are missing", type: "error" });
			return;
		} else if (isInvalidPassword) {
			setResetStatus({ message: isInvalidPassword, type: "error" });
			return;
		} else if (newPassword !== confirmPassword) {
			setResetStatus({ message: "Passwords do not match", type: "error" });
			return;
		}

		setLoading(true);

		try {
			setResetStatus(null);
			const res = await verifyResetCode(resetEmail, code, newPassword);
			await saveToken(res.token);
			useAuthStore.setState({ token: res.token });
			await refreshUser();
			navigation.replace("Home");
		} catch (err: unknown) {
			const errCode = getApiError(err);
			setResetStatus({
				message:
					errCode === "INVALID_RESET_CODE"
						? "Invalid or expired code"
						: errCode === "RATE_LIMITED"
							? "Too many attempts. Try again later."
							: "Something went wrong",
				type: "error",
			});
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
			extraScrollHeight={140}
			extraHeight={140}
		>
			<StarBackground />
			<View style={styles.headerContainer}>
				<View style={styles.titleRow}>
					<View style={styles.titleRowLeft}>
						<BackButton onBack={() => navigation.goBack()} />
					</View>
					<Text style={styles.title}>Account Recovery</Text>
					<View style={styles.titleRowRight} />
				</View>
			</View>
			<FadeIn visible={true}>
				<View>
					<SettingsCard
						title="Forgot Username"
						expanded={expandedCard === "username"}
						onToggle={() => toggle("username")}
					>
						<FadeIn visible={expandedCard === "username"}>
							<View style={styles.cardBodyGap}>
								<SettingsInput
									placeholder="Email"
									value={usernameEmail}
									onChangeText={setUsernameEmail}
								/>
								<StatusMessage
									message={usernameStatus?.message ?? null}
									type={usernameStatus?.type ?? "error"}
									onClear={() => setUsernameStatus(null)}
								/>
								<Animated.View style={{ transform: [{ scale: anim.scale }] }}>
									<Pressable
										style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
										onPress={handleForgotUsername}
										disabled={loading}
										onPressIn={anim.pressIn}
										onPressOut={anim.pressOut}
									>
										<Text style={styles.buttonText}>Send Name</Text>
									</Pressable>
								</Animated.View>
							</View>
						</FadeIn>
					</SettingsCard>

					<SettingsCard
						title="Reset Password"
						expanded={expandedCard === "password"}
						onToggle={() => toggle("password")}
					>
						<FadeIn visible={expandedCard === "password"}>
							<View style={styles.cardBodyGap}>
								<FadeIn visible={codeSent}>
									<View style={styles.cardBodyGap}>
										<SettingsInput placeholder="Code" value={code} onChangeText={setCode} />
										<SettingsInput
											placeholder="New password"
											value={newPassword}
											onChangeText={setNewPassword}
											secureTextEntry
											showToggle={true}
										/>
										<SettingsInput
											placeholder="Confirm new password"
											value={confirmPassword}
											onChangeText={setConfirmPassword}
											secureTextEntry
											showToggle={true}
										/>
										<StatusMessage
											message={resetStatus?.message ?? null}
											type={resetStatus?.type ?? "error"}
											onClear={() => setResetStatus(null)}
										/>
										<Animated.View style={{ transform: [{ scale: anim.scale }] }}>
											<Pressable
												style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
												onPress={handleVerifyReset}
												disabled={loading}
												onPressIn={anim.pressIn}
												onPressOut={anim.pressOut}
											>
												<Text style={styles.buttonText}>Confirm</Text>
											</Pressable>
										</Animated.View>
										<Pressable onPress={handleRequestReset} disabled={loading}>
											<Text style={styles.resendLink}>Resend code</Text>
										</Pressable>
									</View>
								</FadeIn>
								<FadeIn visible={!codeSent}>
									<View style={styles.cardBodyGap}>
										<SettingsInput
											placeholder="Email"
											value={resetEmail}
											onChangeText={setResetEmail}
										/>
										<StatusMessage
											message={resetStatus?.message ?? null}
											type={resetStatus?.type ?? "error"}
											onClear={() => setResetStatus(null)}
										/>
										<Animated.View style={{ transform: [{ scale: anim.scale }] }}>
											<Pressable
												style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
												onPress={handleRequestReset}
												disabled={loading}
												onPressIn={anim.pressIn}
												onPressOut={anim.pressOut}
											>
												<Text style={styles.buttonText}>Send Code</Text>
											</Pressable>
										</Animated.View>
									</View>
								</FadeIn>
							</View>
						</FadeIn>
					</SettingsCard>
				</View>
			</FadeIn>
		</KeyboardAwareScrollView>
	);
}
