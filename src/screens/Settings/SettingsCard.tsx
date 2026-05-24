import { ChevronDown } from "lucide-react-native";
import type React from "react";
import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { colors } from "../../css/color";
import { styles } from "./styles";

type Props = {
	title: string;
	expanded: boolean;
	onToggle: () => void;
	isLast?: boolean;
	children: React.ReactNode;
};

export default function SettingsCard({ title, expanded, onToggle, isLast, children }: Props) {
	const rotation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(rotation, {
			toValue: expanded ? 1 : 0,
			duration: 250,
			useNativeDriver: true,
		}).start();
	}, [expanded, rotation]);

	const rotate = rotation.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "180deg"],
	});

	return (
		<View style={[styles.card, isLast && styles.rowLast]}>
			<Pressable
				style={({ pressed }) => [styles.cardHeader, pressed && styles.cardHeaderPressed]}
				onPress={onToggle}
			>
				{({ pressed }) => (
					<>
						<Text style={[styles.cardHeaderText, pressed && styles.cardHeaderTextPressed]}>
							{title}
						</Text>
						<Animated.View style={{ transform: [{ rotate }] }}>
							<ChevronDown
								size={22}
								color={pressed ? colors.text.accentLight : colors.text.static}
							/>
						</Animated.View>
					</>
				)}
			</Pressable>

			{expanded && <View style={styles.cardBody}>{children}</View>}
		</View>
	);
}
