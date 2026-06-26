import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "./src/css/color";
import { useAppFonts } from "./src/css/fonts";
import ActiveExerciseScreen from "./src/screens/ActiveExercise/ActiveExerciseScreen";
import ActiveWorkoutScreen from "./src/screens/ActiveWorkout/ActiveWorkoutScreen";
import { NavigationBar, TopBar } from "./src/screens/components/NavigationBars";
import ExerciseScreen from "./src/screens/Exercise/ExerciseScreen";
import HistoryScreen from "./src/screens/History/HistoryScreen";
import HomeDrawer from "./src/screens/Home/HomeDrawer";
import LoginScreen from "./src/screens/Login/LoginScreen";
import RegisterScreen from "./src/screens/Register/RegisterScreen";
import SettingsScreen from "./src/screens/Settings/SettingsScreen";
import WorkoutScreen from "./src/screens/Workout/WorkoutScreen";
import { useAuthStore } from "./src/store/auth.store";
import type { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

export default function App() {
	const { isLoggedIn, checkAuth, loading } = useAuthStore();
	const fontsLoaded = useAppFonts();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (fontsLoaded && !loading) SplashScreen.hideAsync();
	}, [fontsLoaded, loading]);

	return (
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg.primary }}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{isLoggedIn ? (
						<>
							<Stack.Screen name="Home" component={HomeDrawer} />
							<Stack.Screen name="History" component={HistoryScreen} />
							<Stack.Screen name="Settings" component={SettingsScreen} />
							<Stack.Screen name="Workout" component={WorkoutScreen} />
							<Stack.Screen name="Exercise" component={ExerciseScreen} />
							<Stack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} />
							<Stack.Screen name="ActiveExercise" component={ActiveExerciseScreen} />
						</>
					) : (
						<>
							<Stack.Screen name="Login" component={LoginScreen} />
							<Stack.Screen name="Register" component={RegisterScreen} />
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
			<TopBar />
			<NavigationBar />
		</GestureHandlerRootView>
	);
}
