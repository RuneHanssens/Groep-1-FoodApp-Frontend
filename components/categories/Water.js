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
import AmountInput from "./../AmountInput";
class Water extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cupsOfWater: 0
    };
  }

  setCupsOfWater = value => {
    this.setState({
      cupsOfWater: value
    });
  };

  submit = () => {
    console.log("submit water");
    let data = {
      amount: this.state.cupsOfWater
    };
    console.log(data);
    console.log("sending data to server");

    fetch("http://foodapp-backend.serveo.net/api/day/water", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => console.log(res));
  };

  render() {
    dropDownView = (
      <View>
        <AmountInput
          value={this.state.cupsOfWater}
          setValue={this.setCupsOfWater}
        />
      </View>
    );

    return (
      <Category
        name={"Water"}
        progress={0}
        duration={500}
        fillColor={"#B9CED5"}
        barColor={"black"}
        onSubmit={this.submit}
        dropDownView={dropDownView}
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
            source={require("../../images/glass-of-water.png")}
          />
        </View>
      </Category>
    );
  }
}

const styles = StyleSheet.create({});
export default Water;
