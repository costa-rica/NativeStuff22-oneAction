import { useState } from "react";
import { View, Modal, Text, StyleSheet, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
// import ViewTemplate from "../screens_core/components/ViewTemplate";
// import CircleSwipePad03 from "./components/CircleSwipePad03";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import ButtonKv from "../screens_core/components/ButtonKv";
import { Polygon, Svg, Circle } from "react-native-svg";
import SwipePad01 from "./components/SwipePad01";

export default function Test02({ navigation }) {
  const [padVisible, setPadVisible] = useState(false);
  // const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [padPositionCenter, setPadPositionCenter] = useState({ x: 0, y: 0 });
  const [actionList, setActionList] = useState([]);
  const [tapDetails, setTapDetails] = useState(null);
  const [tapIsActive, setTapIsActive] = useState(true);

  const circleRadiusMiddle = 70;
  const circleRadiusInner = 25;

  const [swipeColorDict, setSwipeColorDict] = useState({
    outerTop: "rgba(255,255,0,.4)", //rgb(255,255,0)
    outerBottom: "rgba(186,85,211,.4)", //rgb(186,85,211)
    topLeft: "rgba(255,100,100,1)",
    topRight: "rgba(255,165,0,1)",
    right: "rgba(70,130,180,1)", //rgb(70,130,180)
    bottom: "rgba(30,144,255,1)", //rgb(30,144,255)
    left: "rgba(50,205,50,1)", //rgb(50,205,50)
  });

  const defaultColors = {
    outerTop: "rgba(255,255,0,.4)", //rgb(255,255,0)
    outerBottom: "rgba(186,85,211,.4)", //rgb(186,85,211)
    topLeft: "rgba(255,100,100,1)",
    topRight: "rgba(255,165,0,1)",
    right: "rgba(70,130,180,1)", //rgb(70,130,180)
    bottom: "rgba(30,144,255,1)", //rgb(30,144,255)
    left: "rgba(50,205,50,1)", //rgb(50,205,50)
  };

  // Function to temporarily change color
  const handleSwipeColorChange = (direction) => {
    console.log(`handleSwipeColorChange: ${direction}`);
    // if (actionList?.length > 0) {
    //   setActionList([...actionList, direction]);
    // } else {
    //   setActionList([direction]);
    // }
    if (direction.includes("outer")) {
      setSwipeColorDict((prevState) => ({
        ...prevState,
        [direction]: "white",
      }));
    } else {
      setSwipeColorDict((prevState) => ({
        ...prevState,
        [direction]: "gray",
      }));
    }

    // setTimeout(() => {
    //   setSwipeColorDict((prevState) => ({
    //     ...prevState,
    //     [direction]: defaultColors[direction],
    //   }));
    // }, 250);
  };

  const calculatePadPositionCenter = (x, y) => {
    const centeredX = x - circleRadiusMiddle;
    const centeredY = y - circleRadiusMiddle;
    return { x: centeredX, y: centeredY };
  };

  const gestureTapBegin = Gesture.Tap().onBegin((event) => {
    if (tapIsActive) {
      const timestamp = new Date().toISOString();
      const { x, y, absoluteX, absoluteY } = event;

      setPadPositionCenter({
        x: calculatePadPositionCenter(x, y).x,
        y: calculatePadPositionCenter(x, y).y,
      });
      setPadVisible(true);
      setTapDetails({
        timestamp,
        padPosCenterX: calculatePadPositionCenter(x, y).x,
        padPosCenterY: calculatePadPositionCenter(x, y).y,
      });
      setTapIsActive(false);
    }
  });
  const gestureTapOnEnd = Gesture.Tap().onEnd((event) => {
    // console.log("onEnd");
    // console.log(event);
    // const timestamp = new Date().toISOString();
    const { x, y, absoluteX, absoluteY } = event;
    console.log(
      `[tapOnEnd] x:${calculatePadPositionCenter(x, y).x}, y:${
        calculatePadPositionCenter(x, y).y
      }`
    );
    setTapIsActive(true);
    setPadVisible(false);
    // // setModalPosition({ x: absoluteX, y: absoluteY });
    // setModalPosition({ x: x - circleRadius, y: y - circleRadius });
    // setModalVisible(false);
    // setTapDetails({ timestamp, padPosCenterX: x - 50, padPosCenterY: y - 50 });
    //     setSwipeColorDict((prevState) => ({
    //   ...prevState,
    //   [direction]: defaultColors[direction],
    // }));
  });

  const gestureSwipeOnEnd = Gesture.Pan().onEnd((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;
    console.log("-- swipe onEnd ---");
    setTapIsActive(true);
    setSwipeColorDict(defaultColors);
    setPadVisible(false);
    // const swipePosX = calculatePadPositionCenter(x, y).x;
    // const swipePosY = calculatePadPositionCenter(x, y).y;
    // console.log(`[onEnd] x:${swipePosX}, y:${swipePosY}`);
    // console.log("-- new swipe ---");
    // console.log(`x:${x - 50}, y:${y - 50}`);

    // const distance = Math.sqrt(
    //   Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
    //     Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    // );

    // // --- Logic for closing modal ---
    // if (distance <= circleRadiusInner) {
    //   console.log("Swipe ended inside the inner circle.");
    //   setActionList([]);
    //   setPadVisible(false);
    //   return;
    // }

    /// -- include
    // const swipePosX = calculatePadPositionCenter(x, y).x;
    // const swipePosY = calculatePadPositionCenter(x, y).y;
    // // console.log(`[swipeOnChange] x:${swipePosX}, y:${swipePosY}`);
    // console.log(
    //   `[swipeOnChange]  y:${swipePosY} vs tapDetails.padPosCenterY:${tapDetails.padPosCenterY}`
    // );

    // const distance = Math.sqrt(
    //   Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
    //     Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    // );
    // console.log(`distance: ${distance}`);

    // if (distance <= circleRadiusInner) {
    //   console.log("close");
    // }
    // setSwipeColorDict(defaultColors);
  });

  const gestureSwipeOnChange = Gesture.Pan().onChange((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;
    console.log("-- swipe onChange ---");

    const swipePosX = calculatePadPositionCenter(x, y).x;
    const swipePosY = calculatePadPositionCenter(x, y).y;
    // console.log(`[swipeOnChange] x:${swipePosX}, y:${swipePosY}`);
    // console.log(
    //   `[swipeOnChange]  y:${swipePosY} vs tapDetails.padPosCenterY:${tapDetails.padPosCenterY}`
    // );

    // const distance = Math.sqrt(
    //   Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
    //     Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    // );
    // console.log(`distance: ${distance}`);

    // if (distance <= circleRadiusInner) {
    //   console.log("close");
    // }

    if (swipePosY < tapDetails.padPosCenterY) {
      handleSwipeColorChange("topLeft");
    }
  });

  // Combine swipe and tap gestures
  // const combinedGestures = Gesture.Race(
  //   // gestureTapBegin,
  //   // gestureTapOnEnd,
  //   gestureSwipeOnEnd,
  //   gestureSwipeOnChange
  // );
  const combinedGestures = Gesture.Simultaneous(
    gestureTapBegin,
    gestureSwipeOnEnd,
    gestureSwipeOnChange
  );

  // Dynamic Styles
  const styleVwMainPosition = {
    position: "absolute",
    left: padPositionCenter.x, // Center modal horizontally
    top: padPositionCenter.y, // Center modal vertically
  };

  return (
    <ViewTemplate navigation={navigation}>
      <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={combinedGestures}>
          <View style={styles.tapArea}>
            <View style={styles.vwRegisterTaps}>
              {tapDetails && (
                <View>
                  <Text>Time: {tapDetails.timestamp}</Text>
                  <Text>
                    Coordinates: X:{tapDetails.padPosCenterX}, Y:
                    {tapDetails.padPosCenterY}
                  </Text>
                </View>
              )}
              {actionList.length > 0 &&
                actionList.map((elem, index) => {
                  return (
                    <View key={index}>
                      <Text style={styles.txtAction}>Action: {elem}</Text>
                    </View>
                  );
                })}
            </View>
            <Text style={styles.tapText}>Tap anywhere inside this view</Text>
            {padVisible && (
              <SwipePad01
                circleRadiusInner={circleRadiusInner}
                circleRadiusMiddle={circleRadiusMiddle}
                styleVwMainPosition={styleVwMainPosition}
                swipeColorDict={swipeColorDict}
              />
            )}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </ViewTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  tapArea: {
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  tapText: {
    fontSize: 16,
    color: "#333",
  },
  vwRegisterTaps: {
    position: "absolute",
    top: 0,
    right: 0,
    // width: 100,
    // height: 100,
    // backgroundColor: "tan",
    padding: 3,
    borderRadius: 5,
  },
  // ---- MOdal ---
  modalOverlay: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    alignItems: "center",
    position: "absolute",
    // backgroundColor: "purple",
  },
  txtAction: {
    backgroundColor: "gray",
    alignSelf: "center",
    margin: 1,
  },
});
