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
            name={"Rood Vlees en Boter"}
            progress={this.state.progress}
            duration={500}
            fillColor={"#F7AC4B"}
            barColor={"#ed9f3b"}
            style={{marginBottom: 20,}}
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
