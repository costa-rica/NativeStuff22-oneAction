import { useState } from "react";
import { View, Modal, Text, StyleSheet, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

import { Polygon, Svg, Circle } from "react-native-svg";

export default function SwipePad01(props) {
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
  };

  return (
    <View style={[props.styleVwMainPosition, styleVwMain]}>
      <View
        style={{
          position: "absolute",
          backgroundColor: props.swipeColorDict["top"],
          width: props.circleRadiusMiddle * 2,
          height: props.circleRadiusMiddle,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: props.circleRadiusMiddle,
          backgroundColor: props.swipeColorDict["bottom"],
          width: props.circleRadiusMiddle * 2,
          height: props.circleRadiusMiddle,
        }}
      />
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
          //   onLayout={(event) => {
          //     console.log(`circle event (inner):`);
          //     console.log(event.nativeEvent.layout);
          //   }}
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
