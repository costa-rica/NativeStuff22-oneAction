import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Polygon, Svg, Circle } from "react-native-svg";

export default function SwipePadFourOptions(props) {
  // Dynamic Styles
  const styleVwMain = {
    width: props.circleRadiusMiddle * 2,
    height: props.circleRadiusMiddle * 2,
    borderRadius: props.circleRadiusMiddle,
    backgroundColor: "rgba(70,130,180,.4)",
    overflow: "hidden",
  };
  const styleCircleInner = {
    position: "absolute",
    top: props.circleRadiusMiddle - props.circleRadiusInner,
    left: props.circleRadiusMiddle - props.circleRadiusInner,
    height: props.circleRadiusInner * 2,
    width: props.circleRadiusInner * 2,
    zIndex: 3,
  };
  const styleTopTriangle = {
    position: "absolute",
    top: -(props.circleRadiusMiddle * (Math.sqrt(2) - 1)) / 2,
    // left: props.circleRadiusMiddle - innerCircleRadius,
    transform: [{ rotate: "-45deg" }],
    backgroundColor: props.swipeColorDict["top"],
  };

  const styleLeftTriangle = {
    position: "absolute",
    // top: props.circleRadiusMiddle - props.circleRadiusInner,
    left: -(props.circleRadiusMiddle * (Math.sqrt(2) - 1)) / 2, // <--- Key Algo: This places the corner of a rotated in the middle of the parent square.
    top: props.circleRadiusMiddle * 0.5,
    // left:props.circleRadiusMiddle * 0.5,
    backgroundColor: props.swipeColorDict["left"],
    transform: [{ rotate: "45deg" }],
    zIndex: 1,
  };

  return (
    <View style={[props.styleVwMainPosition, styleVwMain]}>
      <Svg
        height={`${props.circleRadiusMiddle}`}
        width={`${props.circleRadiusMiddle}`}
        style={styleTopTriangle}
      >
        <Polygon
          points={`0,0 0,${props.circleRadiusMiddle} ${props.circleRadiusMiddle},${props.circleRadiusMiddle}`}
          fill={"transparent"}
        />
      </Svg>
      {/* <View
        style={{
          position: "absolute",
          backgroundColor: props.swipeColorDict["top"],
          width: props.circleRadiusMiddle * 2,
          height: props.circleRadiusMiddle,
        }}
      /> */}
      {/* <View
        style={{
          position: "absolute",
          top: props.circleRadiusMiddle,
          backgroundColor: props.swipeColorDict["bottom"],
          width: props.circleRadiusMiddle * 2,
          height: props.circleRadiusMiddle,
        }}
      /> */}
      <Svg
        height={`${props.circleRadiusMiddle}`}
        width={`${props.circleRadiusMiddle}`}
        style={styleLeftTriangle}
      >
        <Polygon
          points={`0,0 0,${props.circleRadiusMiddle} ${props.circleRadiusMiddle},${props.circleRadiusMiddle}`}
          // fill={props.swipeColorDict["left"]}
          fill={"transparent"}
        />
      </Svg>
      {/* ---- Inner circle ---- */}
      <Svg
        height={props.circleRadiusInner * 2}
        width={props.circleRadiusInner * 2}
        style={styleCircleInner}
      >
        <Circle
          cx={props.circleRadiusInner} // Centering horizontally (x coords w/ respect to parent <Svg/>)
          cy={props.circleRadiusInner} // Centering vertically (y coords w/ respect to parent <Svg/>)
          r={props.circleRadiusInner}
          stroke="black"
          strokeWidth="1"
          fill={props.swipeColorDict["center"]}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "#f5f5f5",
  //   },
  //   tapArea: {
  //     width: "80%",
  //     height: "80%",
  //     // width: Dimensions.get("window").width,
  //     // height: Dimensions.get("window").height,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "#ddd",
  //     borderRadius: 10,
  //   },
  //   tapText: {
  //     fontSize: 16,
  //     color: "#333",
  //   },
  //   vwRegisterTaps: {
  //     position: "absolute",
  //     top: 0,
  //     right: 0,
  //     // width: 100,
  //     // height: 100,
  //     // backgroundColor: "tan",
  //     padding: 3,
  //     borderRadius: 5,
  //   },
  //   // ---- MOdal ---
  //   modalOverlay: {
  //     flex: 1,
  //     // backgroundColor: "rgba(0, 0, 0, 0.5)",
  //   },
  //   modalContent: {
  //     alignItems: "center",
  //     position: "absolute",
  //     // backgroundColor: "purple",
  //   },
  //   txtAction: {
  //     backgroundColor: "gray",
  //     alignSelf: "center",
  //     margin: 1,
  //   },
});
