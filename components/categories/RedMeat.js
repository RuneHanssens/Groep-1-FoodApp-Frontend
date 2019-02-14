import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
  Image
} from "react-native";
import Category from './Category';
class RedMeat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return (
      <Category
            name={"Rood Vlees en Boter"}
            progress={0}
            duration={500}
            fillColor={"#F7AC4B"}
            barColor={"black"}
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
                source={require("../../images/steak.png")}
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/butter.png")}        
              />
            </View>
          </Category>
    );
  }
}

const styles = StyleSheet.create({

})
export default RedMeat;
