import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Menu } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "../../css/color";

export const HeaderMenu = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Pressable hitSlop={12} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
				{({ pressed }) => (
					<Menu
						size={28}
						color={pressed ? colors.button.accentHighlight : colors.button.accentDark}
						strokeWidth={1.75}
					/>
				)}
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
	},
});
