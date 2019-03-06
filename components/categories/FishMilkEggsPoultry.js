import React, { Component } from "react"
import { Dropdown } from 'react-native-material-dropdown'
import AmountInput from "./../AmountInput"
import {
  View,
  StyleSheet,
  Image
} from "react-native"
import Category from './Category'
import { CheckBox } from 'react-native-elements';

class FishMilkEggsPoultry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type:'Vis',
      amount: 0,
      subType:'Hollandse Kaas',
      outdoors:false,
    }
  }

  reset = () =>{
    this.setState({
      type:'Vis',
      amount: 0,
      subType:'Hollandse Kaas',
      outdoors:false,
    })
  }

  setAmount = (value) =>{
    this.setState({
      amount:value
    })
  }

  scrollTo = (sender) => {
    this.props.scrollTo('fishEtcView',sender)
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
          data={[{value:'Vis',},{value:'Kip of Kalkoen',},{value:'Eieren',},{value:'Zuivelproducten'}]} 
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

    let warningData = [{
      data:{type:'Zuivelproducten', subType:'Hollandse Kaas'},message:'Kaas bevat veel vetten!',
    }]

    return (
      <Category
            ref={'child'}
            name={"Vis, Gevogelte, Eieren en Zuivelproducten "}
            progress={this.props.progress}
            duration={500}
            fillColor={"#ADC460"}
            barColor={"#889b47"}
            clickEvent={this.props.clickEvent}
            dropDownView={dropDownView}
            data={this.state.type == 'Zuivelproducten' ? {type:this.state.type, subType:this.state.subType, amount:this.state.amount, outdoors:this.state.outdoors} : {type:this.state.type, amount:this.state.amount, outdoors:this.state.outdoors}}
            apiUrl={'dairyfishpoultry'}
            reset={this.reset}
            setProgress={this.props.setProgress}
            connection={this.props.connection}
            setConnection={this.props.setConnection}
            min={40}
            max={110}
            scrollTo={this.scrollTo}
            setPrev={this.props.setPrev}
            warningData={warningData}
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
