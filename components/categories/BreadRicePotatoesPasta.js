import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
  Image
} from "react-native";
import Category from "./Category";
class BreadRicePotatoesPasta extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Category
        name={"Graanproducten"}
        progress={0}
        duration={500}
        fillColor={"#96B057"}
        barColor={"black"}
        onPress={() => console.log("Bread etc pressed!")}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../images/bread.png")}
          />
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../images/pasta.png")}
          />
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../images/rice.png")}
          />
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../images/potatoes.png")}
          />
        </View>
      </Category>
    );
  }
}

const styles = StyleSheet.create({});
export default BreadRicePotatoesPasta;
