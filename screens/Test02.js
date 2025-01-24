import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import SwipePad01 from "./components/SwipePad01";

export default function Test02({ navigation }) {
  const [padVisible, setPadVisible] = useState(false);
  const [padPositionCenter, setPadPositionCenter] = useState({ x: 0, y: 0 });
  const [actionList, setActionList] = useState([]);
  const [tapDetails, setTapDetails] = useState(null);
  const [tapIsActive, setTapIsActive] = useState(true);

  const circleRadiusMiddle = 70;
  const circleRadiusInner = 25;

  const defaultColors = {
    center: "rgba(150, 150, 150, 0.5)", // Neutral gray
    top: "rgba(170, 170, 170, 0.5)", // Slightly lighter gray
    right: "rgba(130, 130, 130, 0.5)", // Slightly darker gray
    bottom: "rgba(180, 180, 180, 0.5)", // Light gray
    left: "rgba(120, 120, 120, 0.5)", // Darker gray
  };
  const [swipeColorDict, setSwipeColorDict] = useState(defaultColors);

  // Function to temporarily change color
  const handleSwipeColorChange = (direction) => {
    setSwipeColorDict(defaultColors);
    const brightColors = {
      center: "white", // Tomato red
      top: "rgba(30, 144, 255, 0.9)", // Dodger blue
      right: "rgba(50, 205, 50, 0.9)", // Lime green
      bottom: "rgba(255, 165, 0, 0.9)", // Orange
      left: "rgba(128, 0, 128, 0.9)", // Purple
    };

    // if (direction.includes("outer") || direction == "center") {
    setSwipeColorDict((prevColors) => ({
      ...prevColors,
      [direction]: brightColors[direction],
    }));
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
      handleSwipeColorChange("center");
    }
  });

  const gestureSwipeOnChange = Gesture.Pan().onChange((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

    const swipePosX = calculatePadPositionCenter(x, y).x;
    const swipePosY = calculatePadPositionCenter(x, y).y;

    const distanceFromCenter = Math.sqrt(
      Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
        Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    );

    const inInnerCircle = distanceFromCenter < circleRadiusInner;
    const inTopSector = swipePosY < tapDetails.padPosCenterY;

    if (inInnerCircle) {
      handleSwipeColorChange("center");
    } else {
      if (inTopSector) {
        handleSwipeColorChange("top");
      } else {
        handleSwipeColorChange("bottom");
      }
    }
  });

  const gestureSwipeOnEnd = Gesture.Pan().onEnd((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

    const swipePosX = calculatePadPositionCenter(x, y).x;
    const swipePosY = calculatePadPositionCenter(x, y).y;

    const distanceFromCenter = Math.sqrt(
      Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
        Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    );

    if (distanceFromCenter < circleRadiusInner) {
      setPadVisible(false);
      setTapIsActive(true);
    }
  });

  // Combine swipe and tap gestures
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
