import React, { Component } from "react"
import { Dropdown } from 'react-native-material-dropdown'
import AmountInput from "./../AmountInput"
import {
  View,
  StyleSheet,
  Image
} from "react-native"
import Category from './Category'
class Rest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type:'Alcohol',
      subType: null,
      typeIndex: 0
    }
  }

  reset = () =>{
    this.setState({
      type:'Alcohol',
      subType: null,
      typeIndex: 0
    })
  }

  subTypeList = () =>{
    return ([
      [{value:'Light'},{value:'Gewoon'}],
      [{value:'Snoep'},{value:'Chocolade'},{value:'Koeken'},{value:'Gebak'}]])
  }

  onTypeClick = (value) =>{
    let index
    switch (value) {
      case 'Frisdrank':
        index = 0
        break;
      case 'Zoetigheid':
        index = 1
        break;
      default:
        index = null
          break;
    }
    
    if(index != null){
      subType = this.subTypeList()[index][0].value
    }else{
      subType = null
    }
    this.setState({
      typeIndex:index,
      type:value,
      subType: subType
    })
  }

  scrollTo = (sender) => {
    this.props.scrollTo('restView',sender)
  }

  render() {
    let subType
    if(this.state.type =='Frisdrank' || this.state.type == 'Zoetigheid'){
      subType = (
      <Dropdown 
        label='Selecteer het specifieke product'
        data={this.subTypeList()[this.state.typeIndex]} 
        value={this.state.subType}
        onChangeText={(value)=>this.setState({subType:value})}
        style={{
          color:'#fff',
          fontSize: 20,
        }}
        itemTextStyle={{
          alignSelf:'center',
        }}
        containerStyle={{
          width:'85%',
          alignSelf: 'center',
        }}
        />)
    }

    dropDownView = (
      <View>
        <Dropdown 
          label='Selecteer het product'
          data={[{value:'Alcohol',},{value:'Frisdrank',},{value:'Zoetigheid',},{value:'Fastfood',},{value:'Saus'}]} 
          value={this.state.type}
          onChangeText={(value)=>this.onTypeClick(value)}
          style={{
            color:'#fff',
            fontSize: 20,
          }}
          itemTextStyle={{
            alignSelf:'center',
          }}
          containerStyle={{
            width:'85%',
            alignSelf: 'center',
          }}
          />
          {subType}
      </View>
    )

    return (
      <Category
            ref={'child'}
            name={"Rest groep"}
            progress={this.props.progress}
            duration={500}
            fillColor={"#c4452d"}
            barColor={"#7c2413"}
            style={{marginBottom: 20,}}
            clickEvent={this.props.clickEvent}
            dropDownView={dropDownView}
            data={{type:this.state.type, subType:this.state.subType}}
            apiUrl={'snack'}
            reset={this.reset}
            setProgress={this.props.setProgress}
            connection={this.props.connection}
            setConnection={this.props.setConnection}
            min={0}
            max={50}
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
                source={require("../../images/burger.png")}
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/glass.png")}        
              />
               <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/pizza.png")}        
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/can.png")}
              />
            </View>    
          </Category>
    )
  }
}

const styles = StyleSheet.create({

})
export default Rest
