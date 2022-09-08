import { Canvas, Patch, Rect, rgbaColor, TwoPointConicalGradient, useValue, vec } from "@shopify/react-native-skia";
import { ScrollView, StyleProp, ViewStyle } from "react-native";
import { View } from "./Themed";

type TwoTuple = [number, number];
type PatchPointValues = {
  pos: TwoTuple;
  c1: TwoTuple;
  c2: TwoTuple;
};

const PatchDemo = () => {

  return (
    <ScrollView>
      <View
        style={{ padding: 20, justifyContent: "center", alignItems: "center" }}
      >
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

const mapValuesToVectors = (values: PatchPointValues) => ({
  pos: vec(values.pos[0], values.pos[1]),
  c1: vec(values.c1[0], values.c1[1]),
  c2: vec(values.c2[0], values.c2[1]),
});
export const Cylinder = ({ height, width, padding, topCurve = 24, bottomCurve = 30, canvasStyles, colors }: ICyclinder) => {
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
      </Canvas>
    </>
  );
  
}