import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Menu } from "lucide-react-native";
import { Animated, Pressable, View } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";
import { styles } from "./styles";

export const HeaderMenu = () => {
	const navigation = useNavigation();
	const { scale, pressIn, pressOut } = useScaleAnimation(0.9);

	return (
		<View style={styles.headerMenuContainer}>
			<Pressable
				hitSlop={12}
				onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
				onPressIn={pressIn}
				onPressOut={pressOut}
			>
				{({ pressed }) => (
					<Animated.View style={{ transform: [{ scale }] }}>
						<Menu
							size={28}
							color={pressed ? colors.button.accentHighlight : colors.button.accentDark}
							strokeWidth={1.75}
						/>
					</Animated.View>
				)}
			</Pressable>
		</View>
	);
};
