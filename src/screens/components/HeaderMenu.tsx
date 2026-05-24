
import { Menu } from "lucide-react-native";
import { useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { colors } from "../../css/color";

type Props = {
	onSettings: () => void;
	logout: () => void;
};

export const HeaderMenu = ({ onSettings, logout }: Props) => {
	const [open, setOpen] = useState(false);
	const [menuTop, setMenuTop] = useState(0);
	const buttonRef = useRef<View>(null);
	const scale = useSharedValue(0);
	const opacity = useSharedValue(0);

	const openMenu = () => {
		buttonRef.current?.measure((_x, _y, _w, h, _pageX, pageY) => {
			setMenuTop(pageY + h + 4);
			setOpen(true);
			scale.value = withSpring(1);
			opacity.value = withTiming(1);
		});
	};

	const closeMenu = () => {
		scale.value = withTiming(0, { duration: 120 });
		opacity.value = withTiming(0, { duration: 120 });

		setTimeout(() => setOpen(false), 120);
	};

	const animatedMenu = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value,
	}));

	return (
		<View style={styles.container}>
			<Pressable ref={buttonRef} onPress={openMenu} hitSlop={12}>
				{({ pressed }) => (
					<Menu
						size={28}
						color={pressed ? colors.button.accentHighlight : colors.button.accentDark}
						strokeWidth={1.75}
					/>
				)}
			</Pressable>

			<Modal transparent visible={open} onRequestClose={closeMenu}>
				<Pressable style={styles.backdrop} onPress={closeMenu} />

				<Animated.View style={[styles.wrapper, animatedMenu, { top: menuTop }]}>
					<View style={styles.menu}>
						<Pressable
							style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
							onPress={() => {
								closeMenu();
								onSettings();
							}}
						>
							{({ pressed }) => (
								<Text style={[styles.text, pressed && styles.textPressed]}>Settings</Text>
							)}
						</Pressable>

						<Pressable
							style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
							onPress={() => {
								closeMenu();
								logout();
							}}
						>
							{({ pressed }) => (
								<Text style={[styles.text, pressed && styles.textPressed]}>Logout</Text>
							)}
						</Pressable>
					</View>
				</Animated.View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "transparent",
	},
	menu: {
		borderRadius: 12,
		paddingVertical: 6,
		minWidth: 120,
		borderWidth: 1,
		backgroundColor: colors.bg.secondary,
		borderColor: colors.border.secondary,
		overflow: "hidden",
	},
	item: {
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	itemPressed: {
		backgroundColor: colors.bg.inputHighlight,
		elevation: 4,
		shadowColor: colors.bg.inputHighlight
	},
	text: {
		fontFamily: "Play_400Regular",
		color: colors.text.static,
		textAlign: "center",
	},
	textPressed: {
		fontFamily: "Play_400Regular",
		color: colors.text.accent,
		textAlign: "center",
	},
	wrapper: {
		position: "absolute",
		right: 18,
		zIndex: 100,
	},
});
