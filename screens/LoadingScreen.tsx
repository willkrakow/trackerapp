import { ActivityIndicator } from "react-native";
import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
export default function LoadingScreen() {
    return (
        <View style={styles.container}>
        <ActivityIndicator size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});