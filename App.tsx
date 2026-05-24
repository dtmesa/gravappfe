import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAppFonts } from "./src/css/fonts";
import ActiveExerciseScreen from "./src/screens/ActiveExercise/ActiveExerciseScreen";
import ActiveWorkoutScreen from "./src/screens/ActiveWorkout/ActiveWorkoutScreen";
import ExerciseScreen from "./src/screens/Exercise/ExerciseScreen";
import HomeScreen from "./src/screens/Home/HomeScreen";
import LoginScreen from "./src/screens/Login/LoginScreen";
import RegisterScreen from "./src/screens/Register/RegisterScreen";
import SettingsScreen from "./src/screens/Settings/SettingsScreen";
import WorkoutScreen from "./src/screens/Workout/WorkoutScreen";
import { useAuthStore } from "./src/store/auth.store";
import type { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	const { isLoggedIn, checkAuth, loading } = useAuthStore();

	const fontsLoaded = useAppFonts();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (!fontsLoaded || loading) {
		return null;
	}

	return (
		<GestureHandlerRootView>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{ statusBarStyle: "light", headerShown: false, animation: "none" }}
				>
					{isLoggedIn ? (
						<>
							<Stack.Screen name="Home" component={HomeScreen} />
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
		</GestureHandlerRootView>
	);
}
