import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens_core/Home";
import WelcomeScreen from "./screens/WelcomeScreen";
import Test01 from "./screens/Test01";
import Test02 from "./screens/Test02";
import Test03 from "./screens/Test03";
import Test04 from "./screens/Test04";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
