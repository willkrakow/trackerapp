import { createTheme } from "@rneui/themed";
import Colors from "../constants/Colors";

const theme = createTheme({
  components: {
    ListItemTitle: {
      style: {
        fontWeight: "600",
        color: Colors.light.primary,
      },
    },
    FAB: {
      containerStyle: [
        {
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowRadius: 5,
          shadowOpacity: 0.5,
        },
      ],
    },
    SpeedDial: {
      buttonStyle: [
        {
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowRadius: 5,
          shadowOpacity: 0.5,
          elevation: 5,
        },
      ],
    },
    ListItemAccordion: {
      bottomDivider: true,
    },
    ListItem: {
      bottomDivider: true,
    },
    Button: {
      containerStyle: {
        borderRadius: 20,
      },
      buttonStyle: {
        borderRadius: 20,
        shadowColor: "black",
        borderWidth: 2,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: Colors.light.primaryHighlight,
        borderColor: Colors.light.primary,
      },
      titleStyle: {
        fontWeight: "bold",
        color: Colors.light.primary,
      },
      disabledStyle: {
        backgroundColor: "hsl(0, 0%, 90%)",
        borderColor: "hsl(0, 0%, 90%)",
      },
      disabledTitleStyle: {
        color: "hsl(0, 0%, 50%)",
      },
    },
    ButtonGroup: {
      buttonContainerStyle: {
        borderRadius: 20,
      },
      containerStyle: {
        borderRadius: 20,
      },
      buttonStyle: {
        backgroundColor: Colors.light.background,
      },
      selectedButtonStyle: {
        backgroundColor: Colors.light.primary,
      },
      textStyle: {
        color: Colors.light.primary,
        fontSize: 20,
      },
      selectedTextStyle: {
        color: Colors.light.primaryHighlight
      }
    },
    Slider: {
      style: {
        width: "100%",
      },
      thumbStyle: {
        backgroundColor: Colors.light.primary,
        height: 25,
        width: 25,
      },
    },
  },
});

export default theme;
