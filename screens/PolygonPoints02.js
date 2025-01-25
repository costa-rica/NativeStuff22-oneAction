import { StyleSheet, Text, View } from "react-native";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import { Polygon, Svg } from "react-native-svg";

export default function PolygonPoints02({ navigation }) {
  const circleRadius = 100; // Radius of the circle
  const cx = circleRadius; // Center x-coordinate
  const cy = circleRadius; // Center y-coordinate
  const numTriangles = 12; // Number of triangles

  // Generate triangle points for each triangle
  const triangles = Array.from({ length: numTriangles }).map((_, index) => {
    const angle = (index * 360) / numTriangles; // Divide circle into 12 parts
    const rad = (Math.PI / 180) * angle; // Convert to radians

    // Base points on the circle perimeter
    const base1X = cx + circleRadius * Math.cos(rad);
    const base1Y = cy + circleRadius * Math.sin(rad);

    const base2X = cx + circleRadius * Math.cos(rad + Math.PI / 6); // 30 degrees in radians
    const base2Y = cy + circleRadius * Math.sin(rad + Math.PI / 6);

    // Apex point in the center
    const apexX = cx;
    const apexY = cy;

    // Create points string for Polygon
    return `${apexX},${apexY} ${base1X},${base1Y} ${base2X},${base2Y}`;
  });

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
          <Svg height={circleRadius * 2} width={circleRadius * 2}>
            {triangles.map((points, index) => (
              <Polygon
                key={index}
                points={points}
                fill="blue"
                stroke="black"
                strokeWidth="1"
                opacity={0.5}
              />
            ))}
          </Svg>
        </View>
      </View>
    </ViewTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
