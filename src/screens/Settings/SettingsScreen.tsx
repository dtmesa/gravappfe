import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Animated, LayoutAnimation, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { deleteAccount, updatePassword, updateUsername } from "../../api/auth.api";
import { getApiError } from "../../api/error.api";
import { saveToken } from "../../api/token.api";
import { useAuthStore } from "../../store/auth.store";
import type { RootStackParamList } from "../../types/navigation.types";
import { validatePassword, validateUsername } from "../../util/inputValidation.util";
import { BackButton } from "../components/BackButton";
import { FadeIn } from "../components/FadeIn";
import { StarBackground } from "../components/StarBackground";
import { StatusMessage } from "../components/StatusMessage";
import { useScaleAnimation } from "../components/scaleAnim";
import { EmailSettingsCard } from "./EmailSettingsCard";
import { SettingsCard } from "./SettingsCard";
import { SettingsInput } from "./SettingsInput";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export function SettingsScreen({ navigation }: Props) {
	const username = useAuthStore((t) => t.username);
	const email = useAuthStore((t) => t.email);
	const pendingEmail = useAuthStore((t) => t.pendingEmail);

	const [expandedCard, setExpandedCard] = useState<
		"username" | "password" | "account" | "email" | null
	>(null);
	const [newUsername, setNewUsername] = useState("");
	const [authPassForName, setAuthPassForName] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [authPassForPass, setAuthPassForPass] = useState("");
	const [deletionPassword, setDeletionPassword] = useState("");
	const [deletionAuthPassword, setDeletionAuthPassword] = useState("");
	const [nameStatus, setNameStatus] = useState<{
		message: string;
		type: "success" | "error";
	} | null>(null);
	const [passwordStatus, setPasswordStatus] = useState<{
		message: string;
		type: "success" | "error";
	} | null>(null);
	const [deletionStatus, setDeletionStatus] = useState<{
		message: string;
		type: "success" | "error";
	} | null>(null);
	const [loading, setLoading] = useState(false);
	const anim = useScaleAnimation();

	const toggle = (card: "username" | "password" | "account" | "email") => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setExpandedCard((prev) => (prev === card ? null : card));
	};

	const handleDeleteAccount = async () => {
		if (loading) return;

		if (deletionPassword === "" || deletionAuthPassword === "") {
			setDeletionStatus({ message: "One or more required fields are missing", type: "error" });
			return;
		} else if (deletionPassword !== deletionAuthPassword) {
			setDeletionStatus({ message: "Passwords do not match", type: "error" });
			return;
		}

		setLoading(true);

		try {
			setDeletionStatus(null);
			await deleteAccount(deletionPassword);
			useAuthStore.setState({
				token: null,
				username: null,
				email: null,
				emailConfirmed: false,
				pendingEmail: null,
			});
		} catch {
			setDeletionStatus({ message: "Account deletion failed", type: "error" });
		} finally {
			setLoading(false);
		}
	};

	const handleUsernameChange = async () => {
		if (loading) return;

		const isInvalidUsername = validateUsername(newUsername);

		if (newUsername === username) {
			setNameStatus({
				message: "New username must be different from your current username",
				type: "error",
			});
			return;
		} else if (newUsername === "" || authPassForName === "") {
			setNameStatus({ message: "One or more required fields are missing", type: "error" });
			return;
		} else if (isInvalidUsername) {
			setNameStatus({ message: isInvalidUsername, type: "error" });
			return;
		}

		setLoading(true);

		try {
			setNameStatus(null);
			await updateUsername(newUsername, authPassForName);
			useAuthStore.setState({ username: newUsername });
			setNameStatus({ message: "Username updated", type: "success" });
			setNewUsername("");
			setAuthPassForName("");
		} catch (err: unknown) {
			const code = getApiError(err);
			setNameStatus(
				code === "USERNAME_TAKEN"
					? { message: "Username already exists", type: "error" }
					: { message: "Username change failed", type: "error" },
			);
		} finally {
			setLoading(false);
		}
	};

	const handlePasswordChange = async () => {
		if (loading) return;

		const isInvalidPassword = validatePassword(newPassword);

		if (newPassword === "" || confirmPassword === "" || authPassForPass === "") {
			setPasswordStatus({ message: "One or more required fields are missing", type: "error" });
			return;
		} else if (newPassword === authPassForPass) {
			setPasswordStatus({
				message: "Your new password must be different from your current password",
				type: "error",
			});
			return;
		} else if (isInvalidPassword) {
			setPasswordStatus({ message: isInvalidPassword, type: "error" });
			return;
		} else if (newPassword !== confirmPassword) {
			setPasswordStatus({ message: "Passwords do not match", type: "error" });
			return;
		}

		setLoading(true);

		try {
			setPasswordStatus(null);
			const { token } = await updatePassword(authPassForPass, newPassword);
			await saveToken(token);
			useAuthStore.setState({ token });
			setPasswordStatus({ message: "Password updated", type: "success" });
			setNewPassword("");
			setConfirmPassword("");
			setAuthPassForPass("");
		} catch {
			setPasswordStatus({ message: "Password update failed", type: "error" });
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
					<Text style={styles.title}>Settings</Text>
					<View style={styles.titleRowRight} />
				</View>
			</View>
			<FadeIn visible={true}>
				<View>
					<SettingsCard
						title="Change Username"
						expanded={expandedCard === "username"}
						onToggle={() => toggle("username")}
					>
						<FadeIn visible={expandedCard === "username"}>
							<View style={styles.cardBodyGap}>
								<SettingsInput
									placeholder="New username"
									value={newUsername}
									onChangeText={setNewUsername}
								/>
								<SettingsInput
									placeholder="Current password"
									value={authPassForName}
									onChangeText={setAuthPassForName}
									secureTextEntry
									showToggle={true}
								/>
								<StatusMessage
									message={nameStatus?.message ?? null}
									type={nameStatus?.type ?? "error"}
									onClear={() => setNameStatus(null)}
								/>
								<Animated.View style={{ transform: [{ scale: anim.scale }] }}>
									<Pressable
										style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
										onPress={handleUsernameChange}
										disabled={loading}
										onPressIn={anim.pressIn}
										onPressOut={anim.pressOut}
									>
										<Text style={styles.buttonText}>Update</Text>
									</Pressable>
								</Animated.View>
							</View>
						</FadeIn>
					</SettingsCard>

					<SettingsCard
						title="Change Password"
						expanded={expandedCard === "password"}
						onToggle={() => toggle("password")}
					>
						<FadeIn visible={expandedCard === "password"}>
							<View style={styles.cardBodyGap}>
								<SettingsInput
									placeholder="Current password"
									value={authPassForPass}
									onChangeText={setAuthPassForPass}
									secureTextEntry
									showToggle={true}
								/>
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
									message={passwordStatus?.message ?? null}
									type={passwordStatus?.type ?? "error"}
									onClear={() => setPasswordStatus(null)}
								/>
								<Animated.View style={{ transform: [{ scale: anim.scale }] }}>
									<Pressable
										style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
										onPress={handlePasswordChange}
										disabled={loading}
										onPressIn={anim.pressIn}
										onPressOut={anim.pressOut}
									>
										<Text style={styles.buttonText}>Update</Text>
									</Pressable>
								</Animated.View>
							</View>
						</FadeIn>
					</SettingsCard>

					<EmailSettingsCard
						email={email}
						pendingEmail={pendingEmail}
						expanded={expandedCard === "email"}
						onToggle={() => toggle("email")}
					/>

					<SettingsCard
						title="Delete Account"
						expanded={expandedCard === "account"}
						onToggle={() => toggle("account")}
					>
						<FadeIn visible={expandedCard === "account"}>
							<View style={styles.cardBodyGap}>
								<SettingsInput
									placeholder="Password"
									value={deletionPassword}
									onChangeText={setDeletionPassword}
									secureTextEntry
									showToggle={true}
								/>
								<SettingsInput
									placeholder="Confirm password"
									value={deletionAuthPassword}
									onChangeText={setDeletionAuthPassword}
									secureTextEntry
									showToggle={true}
								/>
								<StatusMessage
									message={deletionStatus?.message ?? null}
									type={deletionStatus?.type ?? "error"}
									onClear={() => setDeletionStatus(null)}
								/>
								<Animated.View style={{ transform: [{ scale: anim.scale }] }}>
									<Pressable
										style={({ pressed }) => [
											styles.buttonDanger,
											pressed && styles.buttonDangerPressed,
										]}
										onPress={handleDeleteAccount}
										disabled={loading}
										onPressIn={anim.pressIn}
										onPressOut={anim.pressOut}
									>
										<Text style={styles.buttonText}>Confirm</Text>
									</Pressable>
								</Animated.View>
							</View>
						</FadeIn>
					</SettingsCard>
				</View>
			</FadeIn>
		</KeyboardAwareScrollView>
	);
}
