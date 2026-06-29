import { ChevronDown } from "lucide-react-native";
import type React from "react";
import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { colors } from "../../css/color";
import { useScaleAnimation } from "../components/scaleAnim";
import { styles } from "./styles";

type Props = {
	title: string;
	expanded: boolean;
	onToggle: () => void;
	children: React.ReactNode;
};

export function SettingsCard({ title, expanded, onToggle, children }: Props) {
	const rotation = useRef(new Animated.Value(0)).current;
	const { scale, pressIn, pressOut } = useScaleAnimation();
	const rotate = rotation.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "180deg"],
	});

	useEffect(() => {
		Animated.timing(rotation, {
			toValue: expanded ? 1 : 0,
			duration: 350,
			useNativeDriver: true,
		}).start();
	}, [expanded, rotation]);

	return (
		<View style={styles.card}>
			<Animated.View style={{ transform: [{ scale }] }}>
				<Pressable
					style={({ pressed }) => [styles.cardHeader, pressed && styles.cardHeaderPressed]}
					onPress={onToggle}
					onPressIn={pressIn}
					onPressOut={pressOut}
				>
					{({ pressed }) => (
						<>
							<Text style={[styles.cardHeaderText, pressed && styles.cardHeaderTextPressed]}>
								{title}
							</Text>
							<Animated.View style={{ transform: [{ rotate }] }}>
								<ChevronDown
									size={25}
									color={pressed ? colors.text.accentLight : colors.text.static}
								/>
							</Animated.View>
						</>
					)}
				</Pressable>
			</Animated.View>

			{expanded && <View style={styles.cardBody}>{children}</View>}
		</View>
	);
}
