import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Image
} from "react-native"
import Category from './Category'
class FishMilkEggsPoultry extends Component {
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
            name={"Vis, Gevogelte, Eieren en Zuivelproducten "}
            progress={this.state.progress}
            duration={500}
            fillColor={"#ADC460"}
            barColor={"#9cb253"}
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
                source={require("../../images/milk-bottle.png")}
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/roast-chicken.png")}        
              />
               <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/eggs.png")}        
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/fish.png")}
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/cheese.png")}        
              />
            </View>    
          </Category>
    )
  }
}

const styles = StyleSheet.create({

})
export default FishMilkEggsPoultry
