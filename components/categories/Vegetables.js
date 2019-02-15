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
class Vegetables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress:0
    }
  }

  setProgress = (value) =>{
    this.setState({
      progress:value
    })
  }

  render() {
    return (
      <Category
            name={"Groenten"}
            progress={this.state.progress}
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
                source={require("../../images/carrot.png")}
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/broccoli.png")}        
              />
            </View>
          </Category>
    );
  }
}

const styles = StyleSheet.create({

})
export default Vegetables;
