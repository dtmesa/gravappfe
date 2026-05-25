import { Play_400Regular, Play_700Bold } from "@expo-google-fonts/play";
import { Syncopate_400Regular, Syncopate_700Bold } from "@expo-google-fonts/syncopate";
import { useFonts } from "expo-font";

export function useAppFonts() {
	return useFonts({
		Play_400Regular,
		Play_700Bold,
		Syncopate_400Regular,
		Syncopate_700Bold,
	});
}
