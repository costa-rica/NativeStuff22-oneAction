import { StyleSheet, Text, View, Dimensions } from "react-native";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import { Polygon, Svg, Circle } from "react-native-svg";

export default function PolygonPoints({ navigation }) {
  const circleRadius = 100;

  // Styles
  const styleTrianlge = {
    position: "absolute",
    top: (-circleRadius * (Math.sqrt(2) - 1)) / 2,
    left: circleRadius - 50,
    backgroundColor: "transparent",
    transform: [{ rotate: "45deg" }],
  };
  const styleTrianlge01 = {
    position: "absolute",
    top: (-circleRadius * (Math.sqrt(2) - 1)) / 2,
    left: circleRadius + (-circleRadius * (Math.sqrt(2) - 1)) / 2,
    backgroundColor: "rgba(125, 150, 100, 0.5)",
    transform: [{ rotate: "75deg" }],
  };

  const point01 = `100,100`;
  const point02 = `0,${circleRadius - 50}`;
  const point03 = `${circleRadius - 50},0`;

  return (
    <ViewTemplate navigation={navigation}>
      <View style={styles.container}>
        <View
          style={{
            width: circleRadius * 2,
            height: circleRadius * 2,
            borderRadius: circleRadius,
            backgroundColor: "purple",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: circleRadius - 5,
              left: circleRadius - 5,
              backgroundColor: "black",
              height: 10,
              width: 10,
              borderRadius: 5,
            }}
          />
          <Svg height={circleRadius} width={circleRadius} style={styleTrianlge}>
            <Polygon
              points={`${point01} ${point02} ${point03}`}
              fill={"blue"}
            />
            <View
              style={{
                position: "absolute",
                top: parseInt(point01.split(",")[1]),
                left: parseInt(point01.split(",")[0]),
              }}
            >
              <Text style={{ color: "white" }}>{point01}</Text>
            </View>
            <View
              style={{
                position: "absolute",
                top: parseInt(point02.split(",")[1]),
                left: parseInt(point02.split(",")[0]),
              }}
            >
              <Text style={{ color: "white" }}>{point02}</Text>
            </View>
            <View
              style={{
                position: "absolute",
                top: parseInt(point03.split(",")[1]),
                left: parseInt(point03.split(",")[0]),
              }}
            >
              <Text style={{ color: "white" }}>{point03} (point03)</Text>
            </View>
          </Svg>
          <Svg
            height={circleRadius}
            width={circleRadius}
            style={styleTrianlge01}
          >
            <Polygon points={`${point01} ${point02} ${point03}`} fill={"red"} />
          </Svg>
        </View>
      </View>
    </ViewTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
