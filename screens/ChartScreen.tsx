import { useEffect, useMemo, useState } from "react";
import { Text, View } from "../components/Themed";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryVoronoiContainer, Rect } from "victory-native";
import dayjs from "dayjs";
import { ButtonGroup, FAB } from "@rneui/themed";
import Colors from "../constants/Colors";
import { Dimensions, Modal } from "react-native";
import useDateRange from "../hooks/useDateRange";
import useRecords from "../hooks/useRecords";
import { Ionicons } from "@expo/vector-icons";
import { Note } from "../entities/note";
import { findClusters } from "../utils/arrays";

type ChartData = {
  x: Date;
  y?: number | boolean;
};

type ChartMetadata = {
  label: "Mood" | "Libido" | "Acne";
  value: "mood" | "libido" | "acne";
  yTickFormatter: (tick: number) => string;
  yDomain: [number, number];
  tickValues: number[] | string[];
  color: string;
  tint: string;
  highlight: string;
};
const AvailableCharts: ChartMetadata[] = [
  {
    label: "Mood",
    value: "mood",
    yTickFormatter: (tick: number) => `${tick}`,
    yDomain: [1, 5],
    tickValues: [0, 1, 2, 3, 4, 5],
    color: Colors.light.primary,
    tint: Colors.light.primaryTint,
    highlight: Colors.light.primaryHighlight,
  },
  {
    label: "Libido",
    value: "libido",
    yTickFormatter: (tick: number) => `${tick}`,
    yDomain: [1, 5],
    tickValues: [0, 1, 2, 3, 4, 5],
    color: Colors.light.secondary,
    tint: Colors.light.secondaryTint,
    highlight: Colors.light.secondaryHighlight,
  },
  {
    label: "Acne",
    value: "acne",
    yTickFormatter: (tick: number) => (tick === 0 ? "No" : "Yes"),
    yDomain: [0, 1],
    tickValues: ["No", "Yes"],
    color: Colors.light.tertiary,
    tint: Colors.light.tertiaryTint,
    highlight: Colors.light.tertiaryHighlight,
  },
];

const ChartScreen = () => {
  const { data } = useRecords();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [formattedData, setFormattedData] = useState<ChartData[]>([]);
  const [periodDays, setPeriodDays] = useState<ChartData[]>([]);
  const { moveRangeBack, moveRangeForward, dateRange } = useDateRange();
  const [selectedChart, setSelectedChart] = useState<ChartMetadata>(
    AvailableCharts[0]
  );


  const handleChangeChart = (index: 0 | 1 | 2) => {
    const newChart = AvailableCharts[index];
    setSelectedChart(newChart);
  };

  const handleChangeWeek = (index: 0 | 1) => {
    if (index === 0) {
      moveRangeBack(7);
    } else {
      moveRangeForward(7);
    }
  };

  useEffect(() => {
    const formatted = data.map((record, i) => {
      if (selectedChart.value === "acne") {
        return {
          x: dayjs(record.record_date).toDate(),
          y: record.acne ? 1 : 0,
        };
      }
      return {
        x: dayjs(record.record_date).toDate(),
        y: record[selectedChart.value],
      };
    });
    setFormattedData(formatted);
  }, [data, selectedChart]);

  useEffect(() => {
    if(typeof data === 'undefined' || data.length === 0) return;
    const periodDayGroups = findClusters(data, 'on_period');
    console.log(periodDayGroups);
    const onPeriodDays = data.filter((record) => record.on_period);
    const formatted = onPeriodDays.map((d) => {
      if(selectedChart.label === "Acne") {
        return {
          x: dayjs(d.record_date).toDate(),
          y: 2,
        }
      }
      return {
        x: dayjs(d.record_date).toDate(),
        y: selectedChart.yDomain[1],
      }
    });
    setPeriodDays(formatted);
  }, [data, selectedChart])

  const monthLabel = useMemo(() => {
    const dateRangeStartMonth = dayjs(dateRange.start).month();
    const dateRangeEndMonth = dayjs(dateRange.end).month();
    if(dateRangeEndMonth === dateRangeStartMonth){
      return dayjs(dateRange.start).format("MMMM")
    } else {
      return `${dayjs(dateRange.start).format("MMMM")}    -    ${dayjs(dateRange.end).format("MMMM")}`
    }
  }, [dateRange])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ButtonGroup
        selectedButtonStyle={{
          backgroundColor: selectedChart.tint,
          borderColor: selectedChart.color,
        }}
        selectedTextStyle={{
          color: Colors.light.text,
        }}
        textStyle={{ color: selectedChart.color }}
        buttons={["mood", "libido", "acne"]}
        onPress={handleChangeChart}
        selectedIndex={AvailableCharts.findIndex(
          (c) => c.value === selectedChart.value
        )}
      />
      <View
        style={{
          borderRadius: 20,
          shadowColor: "black",
          shadowOffset: { height: 5, width: 0 },
          shadowRadius: 20,
          elevation: 10,
          height: "80%",
        }}
      >
        {data.length > 0 && (
          <VictoryChart
            style={{
              parent: {
                borderColor: selectedChart.tint,
                borderWidth: 5,
                borderRadius: 20,
              },
            }}
            domainPadding={{ x: 10, y: 10 }}
            width={Dimensions.get("window").width - 20}
            height={Dimensions.get("window").height * 0.6}
            containerComponent={<VictoryVoronoiContainer />}
          >
            <VictoryArea
              interpolation="linear"
              domain={{
                y: selectedChart.yDomain,
                x: [dateRange.start, dateRange.end],
              }}
              domainPadding={{ x: 10, y: 10 }}
              data={formattedData}
              animate={{
                duration: 500,
                easing: "cubic",
              }}
              style={{
                data: { fill: selectedChart.color, fillOpacity: 0.3 },
                labels: {
                  stroke: selectedChart.color,
                  outline: "blue",
                  width: 100,
                  height: 100,
                  fontWeight: 200,
                  borderColor: "blue",
                  borderWidth: 1,
                  borderStyle: "solid",
                },
              }}
            />
            <VictoryArea
              interpolation="linear"
              domain={{
                y: selectedChart.yDomain,
                x: [dateRange.start, dateRange.end],
              }}
              domainPadding={{ x: 10, y: 10 }}
              data={periodDays}
              animate={{
                duration: 500,
                easing: "cubic",
              }}
              style={{
                data: { fill: "red", fillOpacity: 0.3 },
              }}
            />
            <VictoryAxis
              dependentAxis
              // data={formattedData}
              tickValues={selectedChart.tickValues}
              style={{
                axis: { stroke: selectedChart.tint },
                ticks: { color: selectedChart.color },
              }}
            />
            <VictoryAxis
              // data={formattedData}
              tickFormat={(tick) => dayjs(tick).format("D")}
              axisValue="x"
              label={monthLabel}
              style={{
                ticks: { color: selectedChart.color },
                tickLabels: { fontSize: 10, color: selectedChart.color },
                axis: { stroke: selectedChart.tint },
                axisLabel: {
                  color: selectedChart.color,
                  padding: 30,
                  stroke: selectedChart.color,
                  fontWeight: 300,
                },
              }}
            />
          </VictoryChart>
        )}
      </View>
      <ButtonGroup
        buttons={[
          <Ionicons size={20} name="arrow-back" />,
          <Ionicons size={20} name="arrow-forward" />,
        ]}
        onPress={handleChangeWeek}
      />
      <Modal visible={selectedNote !== null} presentationStyle="pageSheet">
        <View
          style={{ padding: 10, height: Dimensions.get("window").height * 0.6 }}
        >
          <Text>{selectedNote?.title}</Text>
          <Text>{selectedNote?.text}</Text>
        </View>
        <FAB
          visible={selectedNote !== null}
          onPress={() => setSelectedNote(null)}
        />
      </Modal>
    </View>
  );
};

export default ChartScreen;