import { Button, ListItem } from "@rneui/base";
import { Canvas, Patch, Rect, rgbaColor, SkiaValue, TwoPointConicalGradient, useClockValue, useComputedValue, useSpring, useValue, vec } from "@shopify/react-native-skia";
import { useMemo, useState } from "react";
import { ScrollView, StyleProp, useWindowDimensions, ViewStyle } from "react-native";
import { View, Text } from "./Themed";

enum PointNames {
  topRight = "topRight",
  bottomRight = "bottomRight",
  topLeft = "topLeft",
  bottomLeft = "bottomLeft",
}

type TwoTuple = [number, number];
type PatchPointValues = {
  pos: TwoTuple;
  c1: TwoTuple;
  c2: TwoTuple;
};
type PatchPoints = {
  [key in PointNames]: PatchPointValues;
};
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 320;
const PatchDemo = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  

  const PADDING = 64;
  const MIN_X = 0 + PADDING / 2,
    MIN_Y = 0 + PADDING / 2,
    MAX_X = CANVAS_WIDTH - PADDING / 2,
    MAX_Y = CANVAS_HEIGHT - PADDING / 2;

  const [patchPoints, setPatchPoints] = useState<PatchPoints>({
    topLeft: {
      c1: [MIN_X, MIN_Y],
      c2: [MIN_X, MIN_Y],
      pos: [MIN_X, MIN_Y],
    },
    topRight: {
      c1: [MAX_X, MIN_Y],
      c2: [MAX_X, MIN_Y],
      pos: [MAX_X, MIN_Y],
    },
    bottomLeft: {
      c1: [MIN_X, MAX_Y],
      c2: [MIN_X, MAX_Y],
      pos: [MIN_X, MAX_Y],
    },
    bottomRight: {
      c1: [MAX_X, MAX_Y],
      c2: [MAX_X, MAX_Y],
      pos: [MAX_X, MAX_Y],
    },
  });

  const increment = (
    point: PointNames,
    val: keyof PatchPointValues,
    index: 0 | 1
  ) => {
    let newTuple = patchPoints[point][val];
    newTuple[index] += 4;
    setPatchPoints({
      ...patchPoints,
      [point]: {
        ...patchPoints[point],
        [val]: newTuple,
      },
    });
  };

  const decrement = (
    point: PointNames,
    val: keyof PatchPointValues,
    index: 0 | 1
  ) => {
    let newTuple = patchPoints[point][val];
    newTuple[index] -= 4;
    setPatchPoints({
      ...patchPoints,
      [point]: {
        ...patchPoints[point],
        [val]: newTuple,
      },
    });
  };

  const colors = ["#61dafb", "#fb61da", "#61fbcf", "#dafb61"];

  return (
    <ScrollView>
      {Object.entries(patchPoints).map(([key, val]) => (
        <ListItem.Accordion
          isExpanded={expanded === key}
          onPress={() =>
            expanded === key ? setExpanded(null) : setExpanded(key)
          }
          key={key}
          content={
            <>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>{key}</Text>
            </>
          }
        >
          {Object.entries(val).map(([k, tuple]) => (
            <View
              key={k}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ fontWeight: "300", fontSize: 14, flex: 1 }}>
                {k}: {tuple[0]},{tuple[1]}
              </Text>
              <Button
                style={{ flex: 0.24 }}
                containerStyle={{}}
                titleStyle={{ fontSize: 14 }}
                onPress={() =>
                  increment(key as PointNames, k as keyof PatchPointValues, 0)
                }
              >
                +x
              </Button>
              <Button
                style={{ flex: 0.24 }}
                containerStyle={{}}
                titleStyle={{ fontSize: 14 }}
                onPress={() =>
                  decrement(key as PointNames, k as keyof PatchPointValues, 0)
                }
              >
                -x
              </Button>
              <Button
                style={{ flex: 0.24 }}
                containerStyle={{}}
                titleStyle={{ fontSize: 14 }}
                onPress={() =>
                  increment(key as PointNames, k as keyof PatchPointValues, 1)
                }
              >
                +y
              </Button>
              <Button
                style={{ flex: 0.24 }}
                containerStyle={{}}
                titleStyle={{ fontSize: 14 }}
                onPress={() =>
                  decrement(key as PointNames, k as keyof PatchPointValues, 1)
                }
              >
                -y
              </Button>
            </View>
          ))}
        </ListItem.Accordion>
      ))}
      <View
        style={{ padding: 20, justifyContent: "center", alignItems: "center" }}
      >
        <Cylinder colors={colors} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} padding={50} canvasStyles={{ borderColor: 'black', borderWidth: 2 }} bottomCurve={45} />
      </View>
    </ScrollView>
  );
};;

export { PatchDemo };


interface ICyclinder {
  height: number;
  width: number;
  padding: number;
  topCurve?: number;
  bottomCurve?: number;
  canvasStyles?: StyleProp<ViewStyle>;
  colors: string[];
}
interface IAnimationExample {
  toggled: boolean;
}
export const AnimationExample = ({ toggled }: IAnimationExample) => {
  const position = useSpring(toggled ? 100 : 0);
  const { width } = useWindowDimensions();
  // Clock for driving the animation
  const clock = useClockValue();
  // Normalize the clock value to a value between 0 and 1
  const normalized = useComputedValue(
    () => (clock.current / 1000) % 1.0,
    [clock]
  );
  // Create a rect as a derived value
  const rect = useComputedValue(
    () => ({ x: 0, y: 10, width: normalized.current * width, height: 200 }),
    [normalized]
  );
  return (
    <>
      <Rect x={position} y={100} width={10} height={10} color={"red"} />
      <Rect rect={rect} color="#8556E5"  />
    </>
  );
};

const getRandomSign = () => {
  const num = Math.random();
  return num > 0.5 ? -1 : 1
} 

const mapValuesToVectors = (values: PatchPointValues) => ({
  pos: vec(values.pos[0], values.pos[1]),
  c1: vec(values.c1[0], values.c1[1]),
  c2: vec(values.c2[0], values.c2[1]),
});
const Cylinder = ({ height, width, padding, topCurve = 24, bottomCurve = 30, canvasStyles, colors }: ICyclinder) => {
  const [toggled, setToggled] = useState(false);

  const handleToggle = () => setToggled(prev => !prev);

  const canvasHeight = height + (padding * 2),
        canvasWidth = width + (padding * 2);
  const MIN_X = padding,
        MIN_Y = padding,
        MAX_X = canvasWidth - padding,
        MAX_Y = canvasHeight - padding;

  const CURVE_TOP = MIN_Y + topCurve,
        CURVE_BOTTOM = MAX_Y + bottomCurve,
        BEND_TOP = MIN_Y - topCurve,
        BEND_BOTTOM = MAX_Y - topCurve;

  const topLeft = useValue(
      mapValuesToVectors({
        c1: [MIN_X, CURVE_TOP],
        c2: [MIN_X, CURVE_TOP],
        pos: [MIN_X, MIN_Y],
      }),
  );
  const topRight = useValue(mapValuesToVectors({
    c1: [MAX_X, CURVE_TOP],
    c2: [MAX_X, CURVE_TOP],
    pos: [MAX_X, MIN_Y]
  }));
  const bottomLeft = useValue(mapValuesToVectors({
    c1: [MIN_X, CURVE_BOTTOM],
    c2: [MIN_X, CURVE_BOTTOM],
    pos: [MIN_X, MAX_Y]
  }));
  const bottomRight = useValue(mapValuesToVectors({
    c1: [MAX_X, CURVE_BOTTOM],
    c2: [MAX_X, CURVE_BOTTOM],
    pos: [MAX_X, MAX_Y]
  }));
  const topLeftBack = useValue(mapValuesToVectors({
    c1: [MIN_X, BEND_TOP],
    c2: [MIN_X, BEND_TOP],
    pos: [MIN_X, MIN_Y]
  }));
  const topRightBack = useValue(mapValuesToVectors({
    c1: [MAX_X, BEND_TOP],
    c2: [MAX_X, BEND_TOP],
    pos: [MAX_X, MIN_Y]
  }));
  const bottomLeftBack = useValue(mapValuesToVectors({
    c1: [MIN_X, BEND_BOTTOM],
    c2: [MIN_X, BEND_BOTTOM],
    pos: [MIN_X, MAX_Y]
  }));
  const bottomRightBack = useValue(mapValuesToVectors({
    c1: [MAX_X, BEND_BOTTOM],
    c2: [MAX_X, BEND_BOTTOM],
    pos: [MAX_X, MAX_Y]
  }));

  return (
    <>
      <Canvas
        style={[{ height: canvasHeight, width: canvasWidth }, canvasStyles]}
      >
        <Rect
          color="white"
          height={canvasHeight}
          width={canvasWidth}
          x={0}
          y={0}
        >
          <TwoPointConicalGradient
            start={vec(width - 100, height + 50)}
            startR={40}
            end={vec(canvasWidth, height + 50)}
            endR={20}
            colors={["white", rgbaColor(0, 0, 0, 0.05)]}
          />
        </Rect>
        <Patch
          patch={[topLeft.current, topRight.current, bottomRight.current, bottomLeft.current]}
          colors={colors}
        />
        <Patch
          patch={[topLeftBack.current, topRightBack.current, bottomRightBack.current, bottomLeftBack.current]}
          colors={colors}
          opacity={0.5}
        />
        <AnimationExample toggled={toggled} />
      </Canvas>
      <Button title="Toggle" onPress={handleToggle} />
    </>
  );
  
}