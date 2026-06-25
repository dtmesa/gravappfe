import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../css/color";

export default function NavigationBar() {
    return (
        <LinearGradient
            colors={[colors.bg.primary + "00", colors.bg.primary + "99", colors.bg.primary]}
            locations={[0, 0.6, 1]}
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 50,
                pointerEvents: "none",
            }}
        />
    )
}