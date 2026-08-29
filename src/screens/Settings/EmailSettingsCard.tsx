import { useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { addEmail, changeEmail, confirmEmail, resendEmailConfirmation } from "../../api/auth.api";
import { getApiError } from "../../api/error.api";
import { useAuthStore } from "../../store/auth.store";
import { validateEmail } from "../../util/inputValidation.util";
import { FadeIn } from "../components/FadeIn";
import { StatusMessage } from "../components/StatusMessage";
import { useScaleAnimation } from "../components/scaleAnim";
import { SettingsCard } from "./SettingsCard";
import { SettingsInput } from "./SettingsInput";
import { styles } from "./styles";

type Status = { message: string; type: "success" | "error" } | null;

type Props = {
	email: string | null;
	pendingEmail: string | null;
	expanded: boolean;
	onToggle: () => void;
};

export function EmailSettingsCard({ email, pendingEmail, expanded, onToggle }: Props) {
	const [newEmail, setNewEmail] = useState("");
	const [emailPassword, setEmailPassword] = useState("");
	const [code, setCode] = useState("");
	const [status, setStatus] = useState<Status>(null);
	const [loading, setLoading] = useState(false);
	const anim = useScaleAnimation();

	const handleAddEmail = async () => {
		if (loading) return;

		const isInvalidEmail = validateEmail(newEmail);

		if (isInvalidEmail) {
			setStatus({ message: isInvalidEmail, type: "error" });
			return;
		} else if (emailPassword === "") {
			setStatus({ message: "One or more required fields are missing", type: "error" });
			return;
		}

		setLoading(true);

		try {
			setStatus(null);
			const res = await addEmail(newEmail, emailPassword);
			useAuthStore.setState({ pendingEmail: res.pendingEmail });
			setStatus({ message: "Confirmation code sent", type: "success" });
			setNewEmail("");
			setEmailPassword("");
		} catch (err: unknown) {
			const errCode = getApiError(err);
			setStatus({
				message:
					errCode === "INVALID_PASSWORD"
						? "Incorrect password"
						: errCode === "RATE_LIMITED"
							? "Too many attempts. Try again later."
							: "Could not add email",
				type: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleChangeEmail = async () => {
		if (loading) return;

		const isInvalidEmail = validateEmail(newEmail);

		if (isInvalidEmail) {
			setStatus({ message: isInvalidEmail, type: "error" });
			return;
		} else if (emailPassword === "") {
			setStatus({ message: "One or more required fields are missing", type: "error" });
			return;
		} else if (newEmail === email) {
			setStatus({ message: "New email must be different from your current email", type: "error" });
			return;
		}

		setLoading(true);

		try {
			setStatus(null);
			const res = await changeEmail(newEmail, emailPassword);
			useAuthStore.setState({ pendingEmail: res.pendingEmail });
			setStatus({ message: "Confirmation code sent", type: "success" });
			setNewEmail("");
			setEmailPassword("");
		} catch (err: unknown) {
			const errCode = getApiError(err);
			setStatus({
				message:
					errCode === "INVALID_PASSWORD"
						? "Incorrect password"
						: errCode === "RATE_LIMITED"
							? "Too many attempts. Try again later."
							: "Failed to change email",
				type: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleConfirm = async () => {
		if (loading) return;

		if (code.length !== 6) {
			setStatus({ message: "Incorrect code", type: "error" });
			return;
		}

		setLoading(true);

		try {
			setStatus(null);
			const res = await confirmEmail(code);
			useAuthStore.setState({
				email: res.email,
				emailConfirmed: res.emailConfirmed,
				pendingEmail: null,
			});
			setStatus({ message: "Email confirmed", type: "success" });
			setCode("");
		} catch (err: unknown) {
			const errCode = getApiError(err);
			setStatus({
				message:
					errCode === "EMAIL_TAKEN"
						? "That email is already in use on another account"
						: errCode === "RATE_LIMITED"
							? "Too many attempts. Try again later."
							: "Invalid code",
				type: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleResend = async () => {
		if (loading) return;

		setLoading(true);

		try {
			setStatus(null);
			await resendEmailConfirmation();
			setStatus({ message: "Code resent", type: "success" });
		} catch {
			setStatus({ message: "Failed to resend code", type: "error" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<SettingsCard
			title={email ? "Update Email" : "Add an Email"}
			expanded={expanded}
			onToggle={onToggle}
		>
			<FadeIn visible={expanded}>
				<View style={styles.cardBodyGap}>
					{pendingEmail ? (
						<>
							<View style={styles.linkContainer}>
								<Text style={[styles.statusText, styles.error]}>Confirmation pending</Text>
								<Text style={[styles.statusText, styles.error]}>{pendingEmail}</Text>
							</View>
							<SettingsInput placeholder="Enter the code" value={code} onChangeText={setCode} />
							<StatusMessage
								message={status?.message ?? null}
								type={status?.type ?? "error"}
								onClear={() => setStatus(null)}
							/>
							<Animated.View style={{ transform: [{ scale: anim.scale }] }}>
								<Pressable
									style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
									onPress={handleConfirm}
									disabled={loading}
									onPressIn={anim.pressIn}
									onPressOut={anim.pressOut}
								>
									<Text style={styles.buttonText}>Confirm</Text>
								</Pressable>
							</Animated.View>
							<Pressable onPress={handleResend} disabled={loading}>
								<Text style={styles.resendLink}>Resend code</Text>
							</Pressable>
						</>
					) : email ? (
						<>
							<Text style={[styles.statusText, styles.accent]}>{email}</Text>
							<SettingsInput placeholder="New email" value={newEmail} onChangeText={setNewEmail} />
							<SettingsInput
								placeholder="Password"
								value={emailPassword}
								onChangeText={setEmailPassword}
								secureTextEntry
								showToggle={true}
							/>
							<StatusMessage
								message={status?.message ?? null}
								type={status?.type ?? "error"}
								onClear={() => setStatus(null)}
							/>
							<Animated.View style={{ transform: [{ scale: anim.scale }] }}>
								<Pressable
									style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
									onPress={handleChangeEmail}
									disabled={loading}
									onPressIn={anim.pressIn}
									onPressOut={anim.pressOut}
								>
									<Text style={styles.buttonText}>Update</Text>
								</Pressable>
							</Animated.View>
						</>
					) : (
						<>
							<SettingsInput placeholder="Email" value={newEmail} onChangeText={setNewEmail} />
							<SettingsInput
								placeholder="Password"
								value={emailPassword}
								onChangeText={setEmailPassword}
								secureTextEntry
								showToggle={true}
							/>
							<StatusMessage
								message={status?.message ?? null}
								type={status?.type ?? "error"}
								onClear={() => setStatus(null)}
							/>
							<Animated.View style={{ transform: [{ scale: anim.scale }] }}>
								<Pressable
									style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
									onPress={handleAddEmail}
									disabled={loading}
									onPressIn={anim.pressIn}
									onPressOut={anim.pressOut}
								>
									<Text style={styles.buttonText}>Confirm</Text>
								</Pressable>
							</Animated.View>
						</>
					)}
				</View>
			</FadeIn>
		</SettingsCard>
	);
}
