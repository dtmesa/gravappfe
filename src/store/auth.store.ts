import { create } from "zustand";
import { login as apiLogin, register as apiRegister } from "../api/auth.api";
import { api } from "../api/client.api";
import { deleteToken, getToken, saveToken } from "../api/token.api";

type AuthState = {
	loading: boolean;
	token: string | null;
	username: string | null;
	email: string | null;
	emailConfirmed: boolean;
	pendingEmail: string | null;

	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
	refreshUser: () => Promise<void>;
};

const loggedOutState = {
	token: null,
	username: null,
	email: null,
	emailConfirmed: false,
	pendingEmail: null,
};

export const useAuthStore = create<AuthState>((set, get) => ({
	loading: true,
	...loggedOutState,

	login: async (username, password) => {
		const res = await apiLogin(username, password);
		await saveToken(res.token);
		set({ token: res.token });
		await get().refreshUser();
	},

	register: async (username, password) => {
		await apiRegister(username, password);
		await get().login(username, password);
	},

	logout: async () => {
		await deleteToken();
		set(loggedOutState);
	},

	refreshUser: async () => {
		const { data } = await api.get("/auth/me");
		set({
			username: data.username,
			email: data.email,
			emailConfirmed: data.emailConfirmed,
			pendingEmail: data.pendingEmail,
		});
	},

	checkAuth: async () => {
		try {
			const token = await getToken();

			if (token) {
				set({ token });
				await get().refreshUser();
			} else {
				set(loggedOutState);
			}
		} catch {
			await deleteToken();
			set(loggedOutState);
		} finally {
			set({ loading: false });
		}
	},
}));
