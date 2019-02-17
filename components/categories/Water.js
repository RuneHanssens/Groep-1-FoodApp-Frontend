import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Image
} from "react-native"
import Category from "./Category"
import AmountInput from "./../AmountInput"

class Water extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cupsOfWater: 0,
    }
  }

  setCupsOfWater = value => {
    this.setState({
      cupsOfWater: value
    })
  }

  reset = () => {
    this.setState({
      cupsOfWater:0
    })
  }

  render() {
    dropDownView = (
      <View>
        <AmountInput
          value={this.state.cupsOfWater}
          setValue={this.setCupsOfWater}
        />
      </View>
    )

    return (
      <Category
        ref={'child'}
        name={"Water"}
        progress={this.props.progress}
        fillColor={"#B9CED5"}
        barColor={"#a9c3cc"}
        dropDownView={dropDownView}
        data={{amount:this.state.cupsOfWater}}
        apiUrl={'water'}
        reset={this.reset}
        setProgress={this.props.setProgress}
        clickEvent={this.props.clickEvent}
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
    )
  }
}

const styles = StyleSheet.create({})
export default Water
