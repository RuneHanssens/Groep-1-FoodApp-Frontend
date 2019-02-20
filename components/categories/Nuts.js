import React, { Component } from "react"
import RadioForm from 'react-native-simple-radio-button'
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
      salted:false
    }
  }

  setProgress = (value) =>{
    this.setState({
      progress:value
    })
  }

  reset = () =>{
    this.setState({
      salted:false
    })
  }

  render() {
    let radio_props = [
      {label: 'Natuur', value: false },
      {label: 'Gezouten Gekruid of Gesuikerd', value: true },
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
          onPress={(value) => {this.setState({salted:value})}}
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
            name={"Noten"}
            progress={this.props.progress}
            duration={500}
            fillColor={"#96B057"}
            barColor={"#809946"}
            dropDownView={dropDownView}
            data={{salted:this.state.salted}}
            apiUrl={'nuts'}
            reset={this.reset}
            setProgress={this.props.setProgress}
            clickEvent={this.props.clickEvent}
            connection={this.props.connection}
            setConnection={this.props.setConnection}
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
