import type { User } from "../types/user";
import { api } from "./client";

export const register = async (username: string, password: string): Promise<User> => {
	const res = await api.post("/auth/register", { username, password });
	return res.data;
};

export const login = async (
	username: string,
	password: string,
): Promise<{ token: string; user: User }> => {
	const res = await api.post("/auth/login", { username, password });
	return res.data;
};

export const updateUsername = async (newUsername: string, password: string): Promise<User> => {
	const res = await api.put("/auth/username", { newUsername, password });
	return res.data;
};

export const updatePassword = async (
	currentPassword: string,
	newPassword: string,
): Promise<void> => {
	const res = await api.put("/auth/password", { currentPassword, newPassword });
	return res.data;
};

export const deleteAccount = async (password: string): Promise<void> => {
	await api.delete("/auth/delete", { data: { password }});
};