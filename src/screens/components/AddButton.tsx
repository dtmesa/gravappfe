import { Plus } from "lucide-react-native";
import { useRef } from "react";
import { Animated, Pressable } from "react-native";
import { colors } from "../../css/color";

type Props = {
    onAdd: () => void;
    color?: string;
};

export default function AddButton({ onAdd, color = colors.button.muted }: Props) {
    const rotation = useRef(new Animated.Value(0)).current;

    const animateIn = () => {
        Animated.spring(rotation, {
            toValue: 1,
            useNativeDriver: true,
            speed: 10,
            bounciness: 10,
        }).start();
    };

    const animateOut = () => {
        Animated.spring(rotation, {
            toValue: 0,
            useNativeDriver: true,
            speed: 10,
            bounciness: 10,
        }).start();
    };

    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "90deg"],
    });

    return (
        <Pressable
            onPress={onAdd}
            onPressIn={animateIn}
            onPressOut={animateOut}
            hitSlop={12}
        >
            {({ pressed }) => (
                <Animated.View style={{ transform: [{ rotate }] }}>
                    <Plus
                        size={27}
                        color={pressed ? colors.button.accentHighlight : color}
                        strokeWidth={1.75}
                    />
                </Animated.View>
            )}
        </Pressable>
    );
}