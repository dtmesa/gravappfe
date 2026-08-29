export function validatePassword(password: string): string | null {
	if (password !== password.trim()) return "Password cannot start or end with spaces";

	if (password.length < 8) return "Password must be at least 8 characters.";

	if (password.length > 32) return "Password must be fewer than 32 characters.";

	return null;
}

export function validateUsername(username: string): string | null {
	if (username !== username.trim()) return "Password cannot start or end with spaces";

	if (username.length < 3) return "Username must be at least 3 characters";

	if (username.length > 20) return "Password must be fewer than 20 characters";

	return null;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
	if (email !== email.trim()) return "Email cannot start or end with spaces";

	if (email === "") return "Email is required";

	if (email.length > 254) return "Email is too long";

	if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address";

	return null;
}

export function validateJoint(username: string, password: string): string | null {
	if (username === "" || password === "") return "One or more required fields are missing";

	const isValidUsername = validateUsername(username);
	if (isValidUsername) return isValidUsername;

	const isValidPassword = validatePassword(password);
	if (isValidPassword) return isValidPassword;

	return null;
}
