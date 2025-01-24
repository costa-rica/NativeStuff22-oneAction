import { useState } from "react";
import { View, Modal, Text, StyleSheet, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
// import ViewTemplate from "../screens_core/components/ViewTemplate";
// import CircleSwipePad03 from "./components/CircleSwipePad03";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import ButtonKv from "../screens_core/components/ButtonKv";
import { Polygon, Svg, Circle } from "react-native-svg";

export default function Test01({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [actionList, setActionList] = useState([]);
  const [tapDetails, setTapDetails] = useState(null);

  const circleRadius = 100;
  const innerCircleRadius = 25;

  const gestureTapBegin = Gesture.Tap().onBegin((event) => {
    // console.log(event);
    const timestamp = new Date().toISOString();
    const { x, y, absoluteX, absoluteY } = event;
    // setModalPosition({ x: absoluteX, y: absoluteY });
    setModalPosition({ x: x - circleRadius, y: y - circleRadius });
    setModalVisible(true);
    setTapDetails({ timestamp, modalPosX: x - 50, modalPosY: y - 50 });
  });
  const gestureTapEnd = Gesture.Tap().onEnd((event) => {
    console.log("onEnd");
    console.log(event);
    // const timestamp = new Date().toISOString();
    const { x, y, absoluteX, absoluteY } = event;
    // // setModalPosition({ x: absoluteX, y: absoluteY });
    // setModalPosition({ x: x - circleRadius, y: y - circleRadius });
    // setModalVisible(false);
    // setTapDetails({ timestamp, modalPosX: x - 50, modalPosY: y - 50 });
  });

  const gestureSwipeScripting = Gesture.Pan().onEnd((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;
    console.log("-- new swipe ---");
    console.log(`x:${x - 50}, y:${y - 50}`);
    setModalVisible(false);

    const distance = Math.sqrt(
      Math.pow(x - circleRadius, 2) + Math.pow(y - circleRadius, 2)
    );

    // --- Logic for closing modal ---
    if (distance <= innerCircleRadius) {
      console.log("Swipe ended inside the inner circle.");
      //   console.log(`actionsList: ${props.actionList.length}`);
      props.setActionList([]);

      // !props.inGestureScreen && props.setDemoOption(0);
      props.setModalVisible(false);
      //   console.log(`actionsList: ${props.actionList.length}`);
      return;
    }
  });

  const gestureSwipeDuring = Gesture.Pan().onChange((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;
    // console.log("-- swipe onChange ---");
    console.log(`[onChange] x:${x - 50}, y:${y - 50}`);
  });

  // Combine swipe and tap gestures
  const combinedGestures = Gesture.Race(
    gestureTapBegin,
    gestureSwipeScripting,
    // gestureTapEnd,
    gestureSwipeDuring
  );

  // Dynamic Styles
  const styleVwMain = {
    width: circleRadius * 2,
    height: circleRadius * 2,
    borderRadius: circleRadius,
    backgroundColor: "rgba(70,130,180,.4)",
    overflow: "hidden",

    position: "absolute",
    left: modalPosition.x, // Center modal horizontally
    top: modalPosition.y, // Center modal vertically
  };
  const styleCircleInner = {
    position: "absolute",
    top: circleRadius - innerCircleRadius,
    left: circleRadius - innerCircleRadius,
    height: innerCircleRadius * 2,
    width: innerCircleRadius * 2,
  };

  return (
    <ViewTemplate navigation={navigation}>
      <GestureHandlerRootView style={styles.container}>
        {/* <TapGestureHandler onActivated={handleTap}> */}
        <GestureDetector gesture={combinedGestures}>
          <View style={styles.tapArea}>
            <View style={styles.vwRegisterTaps}>
              {tapDetails && (
                <View>
                  <Text>Time: {tapDetails.timestamp}</Text>
                  <Text>
                    Coordinates: X:{tapDetails.modalPosX}, Y:
                    {tapDetails.modalPosY}
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
            {modalVisible && (
              // <Modal
              //   transparent={true}
              //   animationType="none"
              //   visible={modalVisible}
              //   onRequestClose={() => setModalVisible(false)}
              // >
              // <View style={styles.modalOverlay}>
              // <View
              //   style={[
              //     styles.modalContent,
              //     {
              //       position: "absolute",
              //       left: modalPosition.x, // Center modal horizontally
              //       top: modalPosition.y, // Center modal vertically
              //       height: circleRadius,
              //       width: circleRadius,
              //       backgroundColor: "green",
              //     },
              //   ]}
              // >
              <View style={styleVwMain}>
                <Svg
                  height={innerCircleRadius * 2}
                  width={innerCircleRadius * 2}
                  style={styleCircleInner}
                >
                  <Circle
                    cx={innerCircleRadius} // Centering horizontally (x coords w/ respect to parent <Svg/>)
                    cy={innerCircleRadius} // Centering vertically (y coords w/ respect to parent <Svg/>)
                    r={innerCircleRadius}
                    stroke="black"
                    strokeWidth="1"
                    fill="rgba(255,255,255,1)"
                    onLayout={(event) => {
                      console.log(`circle event (inner):`);
                      console.log(event.nativeEvent.layout);
                    }}
                  />
                </Svg>
              </View>
              // </View>
              // </View>
              // </Modal>
            )}
          </View>
        </GestureDetector>
        {/* </TapGestureHandler> */}
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
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
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
