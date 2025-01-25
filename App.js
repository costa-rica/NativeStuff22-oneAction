import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens_core/Home";
import WelcomeScreen from "./screens/WelcomeScreen";
import Test01 from "./screens/Test01";
import Test02 from "./screens/Test02";
import Test03 from "./screens/Test03";
import Test04 from "./screens/Test04";
import Test05 from "./screens/Test05";
import Test06 from "./screens/Test06";
import Test07 from "./screens/Test07";
import Test08 from "./screens/Test08";
import PolygonPoints from "./screens/PolygonPoints";
import PolygonPoints02 from "./screens/PolygonPoints02";
import PolygonPoints03 from "./screens/PolygonPoints03";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Test01" component={Test01} />
        <Stack.Screen name="Test02" component={Test02} />
        <Stack.Screen name="Test03" component={Test03} />
        <Stack.Screen name="Test04" component={Test04} />
        <Stack.Screen name="Test05" component={Test05} />
        <Stack.Screen name="Test06" component={Test06} />
        <Stack.Screen name="Test07" component={Test07} />
        <Stack.Screen name="Test08" component={Test08} />
        <Stack.Screen name="PolygonPoints" component={PolygonPoints} />
        <Stack.Screen name="PolygonPoints02" component={PolygonPoints02} />
        <Stack.Screen name="PolygonPoints03" component={PolygonPoints03} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
