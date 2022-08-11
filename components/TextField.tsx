import { Input, InputProps } from "@rneui/base";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

const TextField = (props: InputProps) => {
    const colorscheme = useColorScheme();
    return (
      // @ts-ignore
      <Input
        inputStyle={[
          {
            borderRadius: 5,
            borderWidth: 1,
            borderColor: Colors[colorscheme].tabIconSelected,
            padding: 8,
          },
        ]}
        inputContainerStyle={[{
            borderBottomWidth: 0,
            paddingTop: 5,
        }, props.inputContainerStyle]}
        {...props}
      />
    );
}

export default TextField;