import type { User } from "../types/user.types";
import { api } from "./client.api";

export const register = async (username: string, password: string): Promise<User> => {
	const res = await api.post("/auth/register", { username, password });
	return res.data;
};

export const login = async (username: string, password: string): Promise<{ token: string }> => {
	const res = await api.post("/auth/login", { username, password });
	return res.data;
};

export const updateUsername = async (newUsername: string, password: string): Promise<User> => {
	const res = await api.patch("/auth/username", { newUsername, password });
	return res.data;
};

export const updatePassword = async (
	currentPassword: string,
	newPassword: string,
): Promise<{ token: string }> => {
	const res = await api.patch("/auth/password", { currentPassword, newPassword });
	return res.data;
};

export const deleteAccount = async (password: string): Promise<void> => {
	await api.delete("/auth/delete", { data: { password } });
};

export const forgotUsername = async (email: string): Promise<{ message: string }> => {
	const res = await api.post("/auth/forgot-username", { email });
	return res.data;
};

export const requestPasswordReset = async (email: string): Promise<{ message: string }> => {
	const res = await api.post("/auth/password-reset/request", { email });
	return res.data;
};

export const verifyResetCode = async (
	email: string,
	code: string,
	newPassword: string,
): Promise<{ token: string }> => {
	const res = await api.post("/auth/password-reset/verify", { email, code, newPassword });
	return res.data;
};

export const addEmail = async (
	email: string,
	password: string,
): Promise<{ pendingEmail: string }> => {
	const res = await api.post("/auth/email", { email, password });
	return res.data;
};

export const resendEmailConfirmation = async (): Promise<{ pendingEmail: string }> => {
	const res = await api.post("/auth/email/resend");
	return res.data;
};

export const confirmEmail = async (
	code: string,
): Promise<{ email: string; emailConfirmed: boolean }> => {
	const res = await api.post("/auth/email/confirm", { code });
	return res.data;
};

export const changeEmail = async (
	newEmail: string,
	password: string,
): Promise<{ pendingEmail: string }> => {
	const res = await api.patch("/auth/email", { newEmail, password });
	return res.data;
};
