import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import ButtonKv from "../screens_core/components/ButtonKv";
import SwipePadFourAndFourOptions from "./components/SwipePadFourAndFourOptions";

export default function Test05({ navigation }) {
  const [padVisible, setPadVisible] = useState(false);
  const [padPositionCenter, setPadPositionCenter] = useState({ x: 0, y: 0 });
  const [actionList, setActionList] = useState([]);
  const [tapDetails, setTapDetails] = useState(null);
  const [tapIsActive, setTapIsActive] = useState(true);
  const [currentActionType, setCurrentActionType] = useState(null);

  const circleRadiusMiddle = 70;
  const circleRadiusInner = 25;
  const circleRadiusOuter = 140;

  const defaultColors = {
    toptop: "rgba(100, 125, 150, 0.25)",
    center: "rgba(150, 150, 150, .1)", // Neutral gray
    top: "rgba(100, 125, 150, 0.5)",
    right: "rgba(125, 150, 100, 0.5)",
    bottom: "rgba(150, 100, 125, 0.5)",
    left: "rgba(125, 100, 150, 0.5)",
  };
  const [swipeColorDict, setSwipeColorDict] = useState(defaultColors);

  const calculateDistanceFromCenter = (swipePosX, swipePosY) => {
    return Math.sqrt(
      Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
        Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    );
  };

  const addAction = (direction) => {
    if (direction === null) return;
    if (actionList?.length > 0) {
      setActionList([...actionList, direction]);
    } else {
      setActionList([direction]);
    }
  };

  // Function to temporarily change color
  const handleSwipeColorChange = (direction, outerDirection = false) => {
    setSwipeColorDict(defaultColors);
    const brightColors = {
      toptop: "rgba(175, 255, 255, 1)",
      center: "rgba(255, 255, 255, 1)", // white
      top: "rgba(175, 200, 255, 1)",
      right: "rgba(50, 205, 50, 0.9)",
      bottom: "rgba(255, 165, 0, 0.9)",
      left: "rgba(200, 175, 255, 0.9)",
    };

    if (!outerDirection) {
      setSwipeColorDict((prevColors) => ({
        ...prevColors,
        [direction]: brightColors[direction],
      }));
    } else {
      setSwipeColorDict((prevColors) => ({
        ...prevColors,
        [direction]: brightColors[direction],
        [outerDirection]: brightColors[outerDirection],
      }));
    }
  };

  const calculatePadPositionCenter = (x, y) => {
    const centeredX = x - circleRadiusOuter;
    const centeredY = y - circleRadiusOuter;
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
  const gestureTapOnEnd = Gesture.Tap()
    .maxDuration(2000)
    .onEnd((event) => {
      console.log("- tap on end");
      const { x, y, absoluteX, absoluteY } = event;

      const swipePosX = calculatePadPositionCenter(x, y).x;
      const swipePosY = calculatePadPositionCenter(x, y).y;

      const distanceFromCenter = Math.sqrt(
        Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
          Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
      );

      if (distanceFromCenter < circleRadiusInner) {
        // setPadVisible(false); <----- Turned off for dev
        setTapIsActive(true);
      }
    });

  const gestureSwipeOnChange = Gesture.Pan().onChange((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

    const swipePosX = calculatePadPositionCenter(x, y).x;
    const swipePosY = calculatePadPositionCenter(x, y).y;

    const distanceFromCenter = calculateDistanceFromCenter(
      swipePosX,
      swipePosY
    );

    const relativeToPadCenterX = swipePosX - tapDetails.padPosCenterX;
    const relativeToPadCenterY = swipePosY - tapDetails.padPosCenterY;

    const inInnerCircle = distanceFromCenter < circleRadiusInner;
    const inMiddleCircle = distanceFromCenter < circleRadiusMiddle;

    if (inInnerCircle) {
      handleSwipeColorChange("center");
      setCurrentActionType(null);
    } else {
      if (
        relativeToPadCenterY < 0 &&
        Math.abs(relativeToPadCenterX) < Math.abs(relativeToPadCenterY)
      ) {
        handleSwipeColorChange("top");
        setCurrentActionType("top");
        if (!inMiddleCircle) {
          handleSwipeColorChange("top", "toptop");
          setCurrentActionType("toptop");
        }
      } else if (
        relativeToPadCenterX > 0 &&
        Math.abs(relativeToPadCenterX) > Math.abs(relativeToPadCenterY)
      ) {
        handleSwipeColorChange("right");
        setCurrentActionType("right");
      } else if (
        relativeToPadCenterY > 0 &&
        Math.abs(relativeToPadCenterX) < Math.abs(relativeToPadCenterY)
      ) {
        handleSwipeColorChange("bottom");
        setCurrentActionType("bottom");
      } else if (
        relativeToPadCenterX < 0 &&
        Math.abs(relativeToPadCenterX) > Math.abs(relativeToPadCenterY)
      ) {
        handleSwipeColorChange("left");
        setCurrentActionType("left");
      } else {
        handleSwipeColorChange("center");
        setCurrentActionType(null);
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

    if (distanceFromCenter > circleRadiusInner) {
      addAction(currentActionType);
    }
    setPadVisible(false);
    setTapIsActive(true);
  });

  // Combine swipe and tap gestures
  const combinedGestures = Gesture.Simultaneous(
    gestureTapBegin,
    gestureTapOnEnd,
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
              <SwipePadFourAndFourOptions
                circleRadiusInner={circleRadiusInner}
                circleRadiusMiddle={circleRadiusMiddle}
                styleVwMainPosition={styleVwMainPosition}
                swipeColorDict={swipeColorDict}
                circleRadiusOuter={circleRadiusOuter}
              />
            )}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          width: Dimensions.get("window").width,
          alignItems: "flex-end",
          // padding: 20,
        }}
      >
        <ButtonKv
          colorBackground={"blue"}
          width={150}
          onPress={() => setActionList([])}
        >
          Send Action
        </ButtonKv>
      </View>
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
