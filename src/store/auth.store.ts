import { create } from "zustand";
import { login as apiLogin, register as apiRegister } from "../api/auth.api";
import { api } from "../api/client.api";
import { deleteToken, getToken, saveToken } from "../api/token.api";

type AuthState = {
	loading: boolean;
	token: string | null;
	username: string | null;

	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
	loading: true,
	token: null,
	username: null,

	login: async (username, password) => {
		const res = await apiLogin(username, password);
		await saveToken(res.token);
		set({ token: res.token, username });
	},

	register: async (username, password) => {
		await apiRegister(username, password);
		await get().login(username, password);
	},

	logout: async () => {
		await deleteToken();
		set({ token: null, username: null });
	},

	checkAuth: async () => {
		try {
			const token = await getToken();

			if (token) {
				const { data } = await api.get("/auth/me");
				set({ token, username: data.username });
			} else {
				set({ token: null, username: null });
			}
		} catch {
			await deleteToken();
			set({ token: null, username: null });
		} finally {
			set({ loading: false });
		}
	},
}));
