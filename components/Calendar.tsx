import { useMemo } from "react";
import { View, Text } from "./Themed";
import dayjs from "dayjs";
import { Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

interface ICalendar {
    handleClickDate?: (date: string, index: number) => void;
}
const Calendar = ({handleClickDate}: ICalendar) => {
  
  const today = dayjs();
  const monthData = useMemo(() => {
    const daysInMonth = today.daysInMonth();
    const firstDay = today.startOf("month");
    const lastDay = today.endOf("month");

    const firstDayWeekday = firstDay.day();
    const lastDayWeekday = lastDay.day();

    const days = Array(daysInMonth)
      .fill(null)
      .map((_, i) => {
        const date = firstDay.add(i, "day");
        return {
          date: date.format("YYYY-MM-DD"),
          title: date.date(),
          color: date.isSame(today, "day") ? "primary" : undefined,
          is_today: date.isSame(today, "day"),
        };
      });

    const additionalStartDays = Array(firstDayWeekday).fill(null);

    return {
      firstDayWeekday,
      lastDayWeekday,
      days,
      additionalStartDays,
    };
  }, [today]);

  const colorScheme = useColorScheme();
  const handleDate = (date: string, index: number) => {
    if(handleClickDate){
      handleClickDate(date, index)
    }
  };
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        margin: "auto",
      }}
    >
      {monthData.additionalStartDays.map((_, i) => (
        <View
          key={i}
          style={{
            width: Dimensions.get("screen").width / 7.2,
            maxWidth: Dimensions.get("screen").width / 7,
            margin: 3,
            padding: 4,
          }}
        />
      ))}
      {monthData.days.map((day, i) => (
        <TouchableOpacity key={day.date} onPress={() => handleDate(day.date, i)}>
          <View
            style={{
              height: 50,
              width: Dimensions.get("screen").width / 7.2,
              maxWidth: Dimensions.get("screen").width / 7,
              flexGrow: 1,
              flexShrink: 0,
              shadowColor: day.is_today ? Colors[colorScheme].primary : "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: day.is_today ? 0.7 : 0.1,
              shadowRadius: 6,
              margin: 2,
              padding: 4,
            }}
          >
            <Text style={{ textAlign: "right" }}>
              {dayjs(day.date).format("D")}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default Calendar;
