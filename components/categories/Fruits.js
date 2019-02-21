import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Image
} from "react-native"
import Category from './Category'
import AmountInput from "./../AmountInput"

class Fruits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amountOfFruit:0
    }
  }

  setAmountOfFruit = (value) =>{
    this.setState({
      amountOfFruit:value
    })
  }

  setProgress = (value) =>{
    this.setState({
      progress:value
    })
  }

  reset = () =>{
    this.setState({
      amountOfFruit:0
    })
  }

  scrollTo = (sender) => {
    this.props.scrollTo('fruitView',sender)
  }
  
  render() {
    dropDownView = (
      <View>
        <AmountInput
          value={this.state.amountOfFruit}
          setValue={this.setAmountOfFruit}
        />
      </View>
    )

    return (
      <Category
            ref={'child'}
            name={"Fruit"}
            progress={this.props.progress}
            duration={500}
            fillColor={"#7e9b4e"}
            barColor={"#5b7036"}
            clickEvent={this.props.clickEvent}
            dropDownView={dropDownView}
            data={{amount:this.state.amountOfFruit}}
            apiUrl={'fruit'}
            reset={this.reset}
            setProgress={this.props.setProgress}
            connection={this.props.connection}
            setConnection={this.props.setConnection}
            min={100}
            max={400}
            scrollTo={this.scrollTo}
            setPrev={this.props.setPrev}
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
    )
  }
}

const styles = StyleSheet.create({

})
export default Fruits
