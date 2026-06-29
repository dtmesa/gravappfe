import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Calendar, LogOut, Settings } from "lucide-react-native";
import { Animated, Pressable, Text, View } from "react-native";
import { colors } from "../../css/color";
import { useAuthStore } from "../../store/auth.store";
import { useScaleAnimation } from "../components/scaleAnim";
import { styles } from "./styles";

export function DrawerContent({ navigation }: DrawerContentComponentProps) {
	const logout = useAuthStore((state) => state.logout);
	const username = useAuthStore((state) => state.username);
	const historyAnim = useScaleAnimation();
	const settingsAnim = useScaleAnimation();
	const logoutAnim = useScaleAnimation();

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
				onPressIn={historyAnim.pressIn}
				onPressOut={historyAnim.pressOut}
			>
				{({ pressed }) => (
					<Animated.View
						style={[styles.drawerButtonContent, { transform: [{ scale: historyAnim.scale }] }]}
					>
						<Calendar size={20} color={pressed ? colors.text.accent : colors.text.input} />
						<Text style={[styles.drawerText, pressed && styles.drawerTextPressed]}>History</Text>
					</Animated.View>
				)}
			</Pressable>

			<Pressable
				onPress={handleSettings}
				style={({ pressed }) => [styles.drawerButton, pressed && styles.drawerButtonPressed]}
				onPressIn={settingsAnim.pressIn}
				onPressOut={settingsAnim.pressOut}
			>
				{({ pressed }) => (
					<Animated.View
						style={[styles.drawerButtonContent, { transform: [{ scale: settingsAnim.scale }] }]}
					>
						<Settings size={20} color={pressed ? colors.text.accent : colors.text.input} />
						<Text style={[styles.drawerText, pressed && styles.drawerTextPressed]}>Settings</Text>
					</Animated.View>
				)}
			</Pressable>

			<Pressable
				onPress={handleLogout}
				style={({ pressed }) => [styles.drawerButton, pressed && styles.drawerButtonPressed]}
				onPressIn={logoutAnim.pressIn}
				onPressOut={logoutAnim.pressOut}
			>
				{({ pressed }) => (
					<Animated.View
						style={[styles.drawerButtonContent, { transform: [{ scale: logoutAnim.scale }] }]}
					>
						<LogOut size={20} color={pressed ? colors.text.accent : colors.text.input} />
						<Text style={[styles.drawerText, pressed && styles.drawerTextPressed]}>Logout</Text>
					</Animated.View>
				)}
			</Pressable>
		</View>
	);
}
