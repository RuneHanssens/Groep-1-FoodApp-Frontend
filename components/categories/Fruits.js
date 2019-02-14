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
class Fruits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return (
      <Category
            name={"Fruit"}
            progress={0}
            duration={500}
            fillColor={"#7e9b4e"}
            barColor={"#758e48"}
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
                source={require("../../images/apple.png")}
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/pear.png")}        
              />
               <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/cherries.png")}        
              />
            </View>
          </Category>
    );
  }
}

const styles = StyleSheet.create({

})
export default Fruits;
