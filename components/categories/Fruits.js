import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Image
} from "react-native"
import Category from './Category'
import AmountInput from "./../AmountInput"
import { CheckBox } from 'react-native-elements'
class Fruits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amountOfFruit:0,
      outdoors:false,
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
        <CheckBox
          center
          title='Buitenshuis'
          checkedColor={'#fff'}
          uncheckedColor={'#fff'}
          size={30}
          checked={this.state.outdoors}
          onPress={() => this.setState({outdoors: !this.state.outdoors})}
          containerStyle={{
            backgroundColor:null,
            borderWidth:0,
            margin:0,
            padding:0,
            marginTop:10
          }}
          textStyle={{
            color:'#fff',
            fontWeight:'normal'
          }}
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
            data={{amount:this.state.amountOfFruit, outdoors:this.state.outdoors}}
            apiUrl={'fruit'}
            reset={this.reset}
            setProgress={this.props.setProgress}
            connection={this.props.connection}
            setConnection={this.props.setConnection}
            min={100}
            max={400}
            scrollTo={this.scrollTo}
            setPrev={this.props.setPrev}
            token={this.props.token}
            date={this.props.date}
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
