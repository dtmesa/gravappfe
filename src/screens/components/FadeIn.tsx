import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export function FadeIn({ children, visible }: { children: React.ReactNode; visible: boolean }) {
	const opacity = useRef(new Animated.Value(0)).current;
	// Stays mounted through the fade-out so the animation has a frame to play
	// on -- unmounting on the same render that flips `visible` false would cut
	// it off before it's ever drawn.
	const [rendered, setRendered] = useState(visible);

	useEffect(() => {
		if (visible) setRendered(true);

		Animated.timing(opacity, {
			toValue: visible ? 1 : 0,
			duration: 350,
			useNativeDriver: true,
		}).start(({ finished }) => {
			if (finished && !visible) setRendered(false);
		});
	}, [visible]);

	if (!rendered) return null;

	return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}
