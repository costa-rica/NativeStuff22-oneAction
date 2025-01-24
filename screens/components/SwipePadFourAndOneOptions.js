import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Polygon, Svg, Circle } from "react-native-svg";

export default function SwipePadFourAndOneOptions(props) {
  // Dynamic Styles
  const styleVwOuter = {
    width: props.circleRadiusOuter * 2,
    height: props.circleRadiusOuter * 2,
    borderRadius: props.circleRadiusOuter,
    backgroundColor: "rgba(70,130,180,.4)",
    overflow: "hidden",
  };

  const styleTopTopTriangle = {
    position: "absolute",
    top: -(props.circleRadiusOuter * (Math.sqrt(2) - 1)) / 2,
    left: props.circleRadiusOuter / 2,
    transform: [{ rotate: "-45deg" }],
    backgroundColor: props.swipeColorDict["toptop"],
  };

  // ------ Middle Circle ------
  const styleVwMiddleCircle = {
    position: "absolute",
    width: props.circleRadiusMiddle * 2,
    height: props.circleRadiusMiddle * 2,
    top: props.circleRadiusOuter / 2,
    left: props.circleRadiusOuter / 2,
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
    left: props.circleRadiusMiddle / 2,
    transform: [{ rotate: "-45deg" }],
    backgroundColor: props.swipeColorDict["top"],
  };
  const styleRightTriangle = {
    position: "absolute",
    top: props.circleRadiusMiddle / 2,

    right: -(props.circleRadiusMiddle * (Math.sqrt(2) - 1)) / 2, // <--- Key Algo: This places the corner of a rotated in the middle of the parent square.
    backgroundColor: props.swipeColorDict["right"],
    transform: [{ rotate: "45deg" }],
  };
  const styleBottomTriangle = {
    position: "absolute",
    top:
      props.circleRadiusMiddle +
      (props.circleRadiusMiddle * (Math.sqrt(2) - 1)) / 2,
    left: props.circleRadiusMiddle / 2,
    transform: [{ rotate: "-45deg" }],
    backgroundColor: props.swipeColorDict["bottom"],
  };
  const styleLeftTriangle = {
    position: "absolute",
    top: props.circleRadiusMiddle / 2,
    left: -(props.circleRadiusMiddle * (Math.sqrt(2) - 1)) / 2, // <--- Key Algo: This places the corner of a rotated in the middle of the parent square.
    backgroundColor: props.swipeColorDict["left"],
    transform: [{ rotate: "45deg" }],
    zIndex: 1,
  };

  return (
    <View style={[props.styleVwMainPosition, styleVwOuter]}>
      <Svg
        height={`${props.circleRadiusOuter}`}
        width={`${props.circleRadiusOuter}`}
        style={styleTopTopTriangle}
      >
        <Polygon
          points={`0,0 0,${props.circleRadiusOuter} ${props.circleRadiusOuter},${props.circleRadiusOuter}`}
          fill={"transparent"}
        />
      </Svg>

      <View style={styleVwMiddleCircle}>
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

        <Svg
          height={`${props.circleRadiusMiddle}`}
          width={`${props.circleRadiusMiddle}`}
          style={styleRightTriangle}
        >
          <Polygon
            points={`0,0 0,${props.circleRadiusMiddle} ${props.circleRadiusMiddle},${props.circleRadiusMiddle}`}
            fill={"transparent"}
          />
        </Svg>
        <Svg
          height={`${props.circleRadiusMiddle}`}
          width={`${props.circleRadiusMiddle}`}
          style={styleBottomTriangle}
        >
          <Polygon
            points={`0,0 0,${props.circleRadiusMiddle} ${props.circleRadiusMiddle},${props.circleRadiusMiddle}`}
            fill={"transparent"}
          />
        </Svg>
        <Svg
          height={`${props.circleRadiusMiddle}`}
          width={`${props.circleRadiusMiddle}`}
          style={styleLeftTriangle}
        >
          <Polygon
            points={`0,0 0,${props.circleRadiusMiddle} ${props.circleRadiusMiddle},${props.circleRadiusMiddle}`}
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
            // stroke="black"
            // strokeWidth="1"
            fill={props.swipeColorDict["center"]}
          />
        </Svg>
      </View>

      {/* ---- Test outer ---- */}
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
