import React, { Component } from "react"
import RadioForm from 'react-native-simple-radio-button'
import {
  View,
  StyleSheet,
  Image
} from "react-native"
import Category from './Category'
class Vegetables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moreThan400g:false,
    }
  }

  setProgress = (value) =>{
    this.setState({
      progress:value
    })
  }

  reset = () =>{
    this.setState({
      moreThan400g:false
    })
  }
  render() {
    let radio_props = [
      {label: 'Minder dan 400 gram', value: false },
      {label: 'Meer dan 400 gram', value: true }
    ]

    dropDownView = (
      <View
        style={{
          marginTop:20,
          marginBottom:5,
          alignSelf:'center'
        }}
      >
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({moreThan400g:value})}}
          buttonColor={'#fff'}
          selectedButtonColor={'#fff'}
          labelColor={'#fff'}
          selectedLabelColor={'#fff'}
          buttonSize={30}
        />
      </View>
    )
    return (
      <Category
            ref={'child'}
            name={"Groenten"}
            progress={this.props.progress}
            duration={500}
            fillColor={"#7e9b4e"}
            barColor={"#758e48"}
            dropDownView={dropDownView}
            data={{more:this.state.moreThan400g}}
            apiUrl={'vegetable'}
            reset={this.reset}
            setProgress={this.props.setProgress}
            clickEvent={this.props.clickEvent}
            connection={this.props.connection}
            setConnection={this.props.setConnection}
            min={100}
            max={400}
            scrollTo={this.props.scrollTo}
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
    )
  }
}

const styles = StyleSheet.create({

})
export default Vegetables
