import { VictoryChart, VictoryArea, VictoryAxis } from "victory-native";
import dayjs from "dayjs";
import useDateRange from "../hooks/useDateRange";

const DateChart = () => {
  const { handleChangeEndDate, handleChangeStartDate, dateRange } =
    useDateRange();
  const sampleData = [
    { x: dayjs().subtract(5, "days").toDate(), y: 1 },
    { x: dayjs().subtract(4, "days").toDate(), y: 2 },
    { x: dayjs().subtract(3, "days").toDate(), y: 3 },
    { x: dayjs().subtract(2, "days").toDate(), y: 4 },
    { x: dayjs().subtract(1, "days").toDate(), y: 3 },
    { x: dayjs().subtract(0, "days").toDate(), y: 4 },
  ];
  return (
    <VictoryChart>
      <VictoryArea
        domain={{ x: [dateRange.start, dateRange.end] }}
        data={sampleData}
      />
      <VictoryAxis dependentAxis />
      <VictoryAxis tickFormat={(tick) => dayjs(tick).format("MM/DD")} />
    </VictoryChart>
  );
};

export default DateChart;
