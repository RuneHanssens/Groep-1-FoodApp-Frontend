import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Image
} from "react-native"
import Category from './Category'
class Nuts extends Component {
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
            ref={'child'}
            name={"Noten"}
            progress={this.state.progress}
            duration={500}
            fillColor={"#96B057"}
            barColor={"#809946"}
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
                source={require("../../images/almond.png")}
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/peanut.png")}        
              />
            </View>
          </Category>
    )
  }
}

const styles = StyleSheet.create({

})
export default Nuts
