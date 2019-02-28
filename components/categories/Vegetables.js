import React, { Component } from "react"
import RadioForm from 'react-native-simple-radio-button'
import { CheckBox } from 'react-native-elements'

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
      outdoors:false,
    }
  }

  setProgress = (value) =>{
    this.setState({
      progress:value
    })
  }

  reset = () =>{
    this.setState({
      moreThan400g:false,
      outdoors:false,
    })
  }

  scrollTo = (sender) => {
    this.props.scrollTo('vegetableView',sender)
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
            name={"Groenten"}
            progress={this.props.progress}
            duration={500}
            fillColor={"#7e9b4e"}
            barColor={"#5b7036"}
            dropDownView={dropDownView}
            data={{more:this.state.moreThan400g, outdoors:this.state.outdoors}}
            apiUrl={'vegetable'}
            reset={this.reset}
            setProgress={this.props.setProgress}
            clickEvent={this.props.clickEvent}
            connection={this.props.connection}
            setConnection={this.props.setConnection}
            min={100}
            max={400}
            scrollTo={this.scrollTo}
            setPrev={this.props.setPrev}
            token={this.props.token}
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
