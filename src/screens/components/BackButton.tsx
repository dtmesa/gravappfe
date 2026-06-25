import { ArrowLeft } from "lucide-react-native";
import { useRef } from "react";
import { Animated, Pressable } from "react-native";
import { colors } from "../../css/color";

type Props = {
    onBack: () => void;
    color?: string;
};

export default function BackButton({ onBack }: Props) {
    const translateX = useRef(new Animated.Value(0)).current;

    const animateIn = () => {
        Animated.spring(translateX, {
            toValue: -8,
            useNativeDriver: true,
            speed: 15,
            bounciness: 15,
        }).start();
    };

    const animateOut = () => {
        Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            speed: 15,
            bounciness: 15,
        }).start();
    };

    return (
        <Pressable
            onPress={onBack}
            onPressIn={animateIn}
            onPressOut={animateOut}
            hitSlop={12}
        >
            {({ pressed }) => (
                <Animated.View style={{ transform: [{ translateX }] }}>
                    <ArrowLeft
                        size={35}
                        color={pressed ? colors.button.accentHighlight : colors.button.accentDark}
                        strokeWidth={1.75}
                    />
                </Animated.View>
            )}
        </Pressable>
    );
}