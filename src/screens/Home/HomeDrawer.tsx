import { createDrawerNavigator } from "@react-navigation/drawer";
import { colors } from "../../css/color";
import DrawerContent from "./DrawerContent";
import HomeScreen from "./HomeScreen";

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
	return (
		<Drawer.Navigator
			drawerContent={(props) => <DrawerContent {...props} />}
			screenOptions={{
				headerShown: false,
				drawerPosition: "right",
				drawerStyle: {
					width: "75%",
					backgroundColor: colors.bg.input,
					borderTopLeftRadius: 0,
					borderBottomLeftRadius: 0,
					borderTopRightRadius: 0,
					borderBottomRightRadius: 0,
				},
				overlayColor: colors.bg.darken,
			}}
		>
			<Drawer.Screen name="Main" component={HomeScreen} />
		</Drawer.Navigator>
	);
}
