import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Calendar, LogOut, Settings } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { colors } from "../../css/color";
import { useAuthStore } from "../../store/auth.store";
import { styles } from "./styles";

export default function DrawerContent({ navigation }: DrawerContentComponentProps) {
	const logout = useAuthStore((state) => state.logout);
	const username = useAuthStore((state) => state.username);

	const drawerNav = navigation;

	const handleLogout = async () => await logout();

	const handleSettings = () => {
		drawerNav.closeDrawer();
		drawerNav.getParent()?.navigate("Settings");
	};

	const handleHistory = () => {
		drawerNav.closeDrawer();
		drawerNav.getParent()?.navigate("History");
	};

	return (
		<View>
			<Text numberOfLines={1} style={styles.drawerUserText}>
				{username}
			</Text>

			<Pressable
				onPress={handleHistory}
				style={({ pressed }) => [styles.drawerButton, pressed && styles.drawerButtonPressed]}
			>
				{({ pressed }) => (
					<View style={styles.drawerButtonContent}>
						<Calendar size={20} color={pressed ? colors.text.accent : colors.text.input} />
						<Text style={[styles.drawerText, pressed && styles.drawerTextPressed]}>History</Text>
					</View>
				)}
			</Pressable>

			<Pressable
				onPress={handleSettings}
				style={({ pressed }) => [styles.drawerButton, pressed && styles.drawerButtonPressed]}
			>
				{({ pressed }) => (
					<View style={styles.drawerButtonContent}>
						<Settings size={20} color={pressed ? colors.text.accent : colors.text.input} />
						<Text style={[styles.drawerText, pressed && styles.drawerTextPressed]}>Settings</Text>
					</View>
				)}
			</Pressable>

			<Pressable
				onPress={handleLogout}
				style={({ pressed }) => [styles.drawerButton, pressed && styles.drawerButtonPressed]}
			>
				{({ pressed }) => (
					<View style={styles.drawerButtonContent}>
						<LogOut size={20} color={pressed ? colors.text.accent : colors.text.input} />
						<Text style={[styles.drawerText, pressed && styles.drawerTextPressed]}>Logout</Text>
					</View>
				)}
			</Pressable>
		</View>
	);
}
