import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Animated, LayoutAnimation, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getApiError } from "../../api/apiError";
import { deleteAccount, updatePassword, updateUsername } from "../../api/auth";
import { useAuthStore } from "../../store/auth.store";
import type { RootStackParamList } from "../../types/navigation";
import { validatePassword, validateUsername } from "../../util/inputValidation";
import BackButton from "../components/BackButton";
import { StarBackground } from "../components/StarBackground";
import { useScaleAnimation } from "../components/scaleAnim";
import SettingsCard from "./SettingsCard";
import SettingsInput from "./SettingsInput";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export default function SettingsScreen({ navigation }: Props) {
	const username = useAuthStore((t) => t.username);

	const [expandedCard, setExpandedCard] = useState<"username" | "password" | "account" | null>(null);
	const [newUsername, setNewUsername] = useState("");
	const [authPassForName, setAuthPassForName] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [authPassForPass, setAuthPassForPass] = useState("");
	const [deletionPassword, setDeletionPassword] = useState("");
	const [deletionAuthPassword, setDeletionAuthPassword] = useState("")
	const [passwordError, setPasswordError] = useState("");
	const [nameError, setNameError] = useState("");
	const [deletionError, setDeletionError] = useState("");
	const [loading, setLoading] = useState(false);
	const anim = useScaleAnimation();

	React.useEffect(() => {
		if (!nameError) return;
		const t = setTimeout(() => setNameError(""), 3000);
		return () => clearTimeout(t);
	}, [nameError]);

	React.useEffect(() => {
		if (!passwordError) return;
		const t = setTimeout(() => setPasswordError(""), 3000);
		return () => clearTimeout(t);
	}, [passwordError]);

	const toggle = (card: "username" | "password" | "account") => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setExpandedCard((prev) => (prev === card ? null : card));
	};

	const handleDeleteAccount = async () => {
		if (loading) return;

		if (deletionPassword === "" || deletionAuthPassword === "") {
			setDeletionError("One or more required fields are missing");
			return;
		} else if (deletionPassword !== deletionAuthPassword) {
			setDeletionError("Passwords do not match");
			return;
		}

		setLoading(true);

		try {
			setDeletionError("");
			await deleteAccount(deletionPassword)
			useAuthStore.setState({ token: null, username: null });
		} catch (err) {
			setDeletionError("Account deletion failed");
		} finally {
			setLoading(false);
		}
	}

	const handleUsernameChange = async () => {
		if (loading) return;

		const isInvalidUsername = validateUsername(newUsername);

		if (newUsername === username) {
			setNameError("New username must be different from your current username");
			return;
		} else if (newUsername === "" || authPassForName === "") {
			setNameError("One or more required fields are missing");
			return;
		} else if (isInvalidUsername) {
			setNameError(isInvalidUsername);
			return;
		}

		setLoading(true);

		try {
			setNameError("");
			await updateUsername(newUsername, authPassForName);
			useAuthStore.setState({ username: newUsername });
			setNameError("Username updated");
			setNewUsername("");
			setAuthPassForName("");
		} catch (err: unknown) {
			const code = getApiError(err);
			setNameError(
				code === "USERNAME_TAKEN" ? "Username already exists" : "Username change failed",
			);
		} finally {
			setLoading(false);
		}
	};

	const handlePasswordChange = async () => {
		if (loading) return;

		const isInvalidPassword = validatePassword(newPassword);

		if (newPassword === authPassForPass) {
			setPasswordError("New password must be different from your current password");
			return;
		} else if (newPassword === "" || confirmPassword === "" || authPassForPass === "") {
			setPasswordError("One or more required fields are missing");
			return;
		} else if (isInvalidPassword) {
			setPasswordError(isInvalidPassword);
			return;
		} else if (newPassword !== confirmPassword) {
			setPasswordError("Passwords do not match");
			return;
		}

		setLoading(true);

		try {
			setPasswordError("");
			await updatePassword(authPassForPass, newPassword);
			setPasswordError("Password updated");
			setNewPassword("");
			setConfirmPassword("");
			setAuthPassForPass("");
		} catch {
			setPasswordError("Password update failed");
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
			<View>
				<SettingsCard
					title="Change Username"
					expanded={expandedCard === "username"}
					onToggle={() => toggle("username")}
				>
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
					{nameError ? (
						<Text
							style={[
								styles.statusText,
								nameError === "Username updated" ? styles.success : styles.error,
							]}
						>
							{nameError}
						</Text>
					) : null}
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
				</SettingsCard>

				<SettingsCard
					title="Change Password"
					expanded={expandedCard === "password"}
					onToggle={() => toggle("password")}
				>
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
					{passwordError ? (
						<Text
							style={[
								styles.statusText,
								passwordError === "Password updated" ? styles.success : styles.error,
							]}
						>
							{passwordError}
						</Text>
					) : null}
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
				</SettingsCard>

				<SettingsCard
					title="Delete Account"
					expanded={expandedCard === "account"}
					onToggle={() => toggle("account")}
				>
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
					{deletionError ? (
						<Text
							style={[
								styles.statusText,
								deletionError === "Account deleted" ? styles.success : styles.error,
							]}
						>
							{deletionError}
						</Text>
					) : null}
					<Animated.View style={{ transform: [{ scale: anim.scale }] }}>
						<Pressable
							style={({ pressed }) => [styles.buttonDanger, pressed && styles.buttonDangerPressed]}
							onPress={handleDeleteAccount}
							disabled={loading}
							onPressIn={anim.pressIn}
							onPressOut={anim.pressOut}
						>
							<Text style={styles.buttonText}>Confirm</Text>
						</Pressable>
					</Animated.View>
				</SettingsCard>
			</View>
		</KeyboardAwareScrollView>
	);
}
