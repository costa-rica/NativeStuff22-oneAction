import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import BtnHomNav from "./components/BtnHomeNav";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.vwTitle}>
        <Text style={styles.txtTitle}>Home Screen</Text>
      </View>
      <ScrollView>
        <View style={styles.vwButtons}>
          <BtnHomNav
            goTo={"Test08"}
            title={"Test08"}
            description={
              "Test07 -> SwipePadFourAndEightOptions -> AndEight is for 8 outer circle options"
            }
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"PolygonPoints03"}
            title={"PolygonPoints03"}
            description={
              "PolygonPoints02 - traingles extended beyond the circle"
            }
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"PolygonPoints02"}
            title={"PolygonPoints02"}
            description={"ChatGPT implementation of 12"}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"PolygonPoints"}
            title={"PolygonPoints"}
            description={"Understand how the polygon points work"}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test07"}
            title={"Test07"}
            description={
              "Test06 -> SwipePadFourAndFiveOptions -> AndFive is for 5 outer circle options"
            }
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test06"}
            title={"Test06"}
            description={
              "Test05 -> SwipePadFourAndFourOptions -> AndFour is for outer circle"
            }
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test05"}
            title={"Test05"}
            description={
              "Test04 -> SwipePadFourAndOneOptions -> AndOne is for outer circle"
            }
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test04"}
            title={"Test04"}
            description={"Test03 -> uses SwipePadFourOptions"}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test03"}
            title={"Test03"}
            description={"Test02 -> register actions"}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test02"}
            title={"Test02"}
            description={
              "Test01 -> swipe pad in sepereate file. Modal - Sh-modal.. who needs modals 💁🏼"
            }
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test01"}
            title={"Test01"}
            description={"tap with no modal - but a pad appears"}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"WelcomeScreen"}
            title={"Welcome Screen"}
            description={"How this works"}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.2)",
    alignItems: "center",
  },
  vwTitle: {
    paddingTop: 50,
    paddingBottom: 100,
  },
  txtTitle: { fontSize: 30 },
  vwButtons: {
    gap: 5,
    padding: 10,
  },
});
