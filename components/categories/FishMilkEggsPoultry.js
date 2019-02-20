import React, { Component } from "react"
import { Dropdown } from 'react-native-material-dropdown'
import AmountInput from "./../AmountInput"
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
      type:'Vis',
      amount: 0,
      subType:'Hollandse Kaas'
    }
  }

  reset = () =>{
    this.setState({
      type:'Vis',
      amount: 0,
      subType:'Hollandse Kaas'
    })
  }

  setAmount = (value) =>{
    this.setState({
      amount:value
    })
  }

  render() {
    let amountInput
    if(this.state.type == 'Eieren' || this.state.subType == 'Melk'){
      amountInput = (
      <AmountInput
          value={this.state.amount}
          setValue={this.setAmount}
        />
      )
    }

    let dairyInput
    if(this.state.type == 'Zuivelproducten'){
      dairyInput = (
        <Dropdown 
          label='Selecteer het type'
          data={[{value:'Hollandse Kaas',},{value:'Smeerkaas',},{value:'Melk',},{value:'Natuur Yoghurt',},{value:'Andere Yoghurt'}]} 
          value={this.state.subType}
          onChangeText={(value)=>this.setState({subType:value, amount:0})}
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
      )
    }

    dropDownView = (
      <View>
        <Dropdown 
          label='Selecteer het product'
          data={[{value:'Vis',},{value:'Kip',},{value:'Kalkoen',},{value:'Eieren',},{value:'Zuivelproducten'}]} 
          value={this.state.type}
          onChangeText={(value)=>this.setState({type:value, amount:0})}
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
          {dairyInput}
          {amountInput}
      </View>
    )

    return (
      <Category
            ref={'child'}
            name={"Vis, Gevogelte, Eieren en Zuivelproducten "}
            progress={this.props.progress}
            duration={500}
            fillColor={"#ADC460"}
            barColor={"#9cb253"}
            clickEvent={this.props.clickEvent}
            dropDownView={dropDownView}
            data={this.state.type == 'Zuivelproducten' ? {type:this.state.type, subType:this.state.subType, amount:this.state.amount} : {type:this.state.type, amount:this.state.amount}}
            apiUrl={'dairyfishpoultry'}
            reset={this.reset}
            setProgress={this.props.setProgress}
            connection={this.props.connection}
            setConnection={this.props.setConnection}
            min={40}
            max={110}
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
