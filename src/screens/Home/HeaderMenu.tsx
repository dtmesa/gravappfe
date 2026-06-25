import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Menu } from "lucide-react-native";
import { useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { colors } from "../../css/color";
import { styles } from "./styles";

export const HeaderMenu = () => {
    const navigation = useNavigation();
    const scale = useRef(new Animated.Value(1)).current;

    const animateIn = () => {
        Animated.spring(scale, {
            toValue: 1.1,
            useNativeDriver: true,
            speed: 15,
            bounciness: 15,
        }).start();
    };

    const animateOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 15,
            bounciness: 15,
        }).start();
    };

    return (
        <View style={styles.headerMenuContainer}>
            <Pressable
                hitSlop={12}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                onPressIn={animateIn}
                onPressOut={animateOut}
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