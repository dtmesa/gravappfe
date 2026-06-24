import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import type { RootStackParamList } from "../../types/navigation";
import BackButton from "../components/BackButton";
import { StarBackground } from "../components/StarBackground";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "History">;

export default function HistoryScreen({ navigation }: Props) {
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.titleRow}>
					<View style={styles.titleRowLeft}>
						<BackButton onBack={() => navigation.goBack()} />
					</View>
					<Text style={styles.title}>History</Text>
					<View style={styles.titleRowRight} />
				</View>
			</View>
			<StarBackground />
		</View>
	);
}
