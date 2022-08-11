import { Button as RNEUIButton, ButtonProps } from "@rneui/base";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

interface IVariantButtonProps extends ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
}

const VariantButton = (props: IVariantButtonProps) => {
  const colorscheme = useColorScheme();

  const styles = StyleSheet.create({
    button: {
      borderRadius: 20,
      fontWeight: "bold",
      shadowColor: "black",
      borderWidth: 2,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    primary: {
      backgroundColor: Colors[colorscheme].primary,
      borderColor: Colors[colorscheme].primary,
      color: Colors[colorscheme].text,
    },
    primaryText: {
      color: Colors[colorscheme].background,
    },
    secondary: {
      backgroundColor: Colors[colorscheme].background,
      borderColor: Colors[colorscheme].primary,
      color: Colors[colorscheme].primary,
    },
    secondaryText: {
      color: Colors[colorscheme].primary,
    },
    tertiary: {
      backgroundColor: Colors[colorscheme].tertiary,
      borderColor: Colors[colorscheme].tertiary,
      color: Colors[colorscheme].text,
    },
    tertiaryText: {
      color: Colors[colorscheme].background,
    },
  });

  const _variant = useMemo(() => {
    return props.variant || "primary";
  }, [props]);
  return (
    <RNEUIButton
      {...props}
      buttonStyle={[styles[_variant], styles.button, props.buttonStyle]}
      titleStyle={[styles[`${_variant}Text`], props.titleStyle]}
    />
  );
};

export default VariantButton;
