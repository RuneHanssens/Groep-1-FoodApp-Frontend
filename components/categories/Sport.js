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
class Sport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return (
      <Category
            name={"Sport"}
            progress={0}
            duration={500}
            fillColor={"#e5e7ea"}
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
                source={require("../../images/pedestrian-walking.png")}
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/swimming-figure.png")}        
              />
               <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/bicycle-rider.png")}        
              />
               <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/running.png")}        
              />
            </View>
          </Category>
    );
  }
}

const styles = StyleSheet.create({

})
export default Sport;