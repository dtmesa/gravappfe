import { create } from "zustand";
import { login as apiLogin, register as apiRegister } from "../api/auth";
import { api } from "../api/client";
import { deleteToken, getToken, saveToken } from "../api/token";

type AuthState = {
	isLoggedIn: boolean;
	loading: boolean;
	token: string | null;
	username: string | null;

	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
	isLoggedIn: false,
	loading: true,
	token: null,
	username: null,

	login: async (username, password) => {
		const res = await apiLogin(username, password);
		await saveToken(res.token);
		set({ token: res.token, isLoggedIn: true, username });
	},

	register: async (username, password) => {
		await apiRegister(username, password);
		await get().login(username, password);
	},

	logout: async () => {
		await deleteToken();
		set({ token: null, isLoggedIn: false, username: null });
	},

	checkAuth: async () => {
		try {
			const token = await getToken();

			if (token) {
				const { data } = await api.get("/auth/me");
				set({ token, isLoggedIn: true, username: data.username });
			} else {
				set({ token: null, isLoggedIn: false, username: null });
			}
		} catch {
			await deleteToken();
			set({ token: null, isLoggedIn: false, username: null });
		} finally {
			set({ loading: false });
		}
	},
}));
