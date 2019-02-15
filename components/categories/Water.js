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
      cupsOfWater: 0,
      progress: 0
    };
  }

  setProgress = value => {
    this.setState({
      progress: value
    });
  };

  setCupsOfWater = value => {
    this.setState({
      cupsOfWater: value
    });
  };

  submit = async () => {
    let data = {
      amount: this.state.cupsOfWater
    };
    //http://foodapp-backend.serveo.net/api/day/water
    //http://foodapp-backend.serveo.net/api/day/water/points
    await fetch("http://foodapp-backend.serveo.net/api/day/water", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(console.log("then callback"));

    this.setState({
      cupsOfWater: 0
    });

    let response = await fetch(
      "http://foodapp-backend.serveo.net/api/day/water/points"
    );
    let responseData = await response.json();
    this.setState({
      progress: responseData
    });
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
        ref={this.childRef}
        name={"Water"}
        progress={this.state.progress}
        duration={500}
        fillColor={"#B9CED5"}
        barColor={"#a9c3cc"}
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
