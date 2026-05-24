import axios from "axios";

export const getApiError = (err: unknown): string | null => {
	if (axios.isAxiosError(err)) return err.response?.data?.error ?? null;

	return null;
};
