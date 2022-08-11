import Colors from "../constants/Colors";
import useColorScheme from '../hooks/useColorScheme';
import { View } from "./Themed";
import { StyleSheet, ViewProps } from 'react-native';
import { useMemo } from "react";

type IColorBlock = {
    color: keyof typeof Colors.light | keyof typeof Colors.dark;
} & ViewProps;

const ColorBlock = ({ color, style, ...props}: IColorBlock) => {
const colorScheme = useColorScheme();
    const backgroundColor = useMemo(() => Colors[colorScheme][color], [colorScheme, color]);

    return (
        <View style={[styles.container, { backgroundColor }, style]} {...props} />
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        padding: 10,
    }
});

export default ColorBlock