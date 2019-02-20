import React, { Component } from "react"
import { Dropdown } from 'react-native-material-dropdown'
import {
  View,
  StyleSheet,
  Image
} from "react-native"
import Category from './Category'
class RedMeat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type:'Rood Vlees'
    }
  }

  setProgress = (value) =>{
    this.setState({
      progress:value
    })
  }

  reset = () =>{
    this.setState({
      type:'Rood Vlees'
    })
  }

  render() {
    dropDownView = (
      <Dropdown 
          label='Selecteer het product'
          data={[{value:'Rood Vlees',},{value:'Bewerkt Vlees',},{value:'Boter',}]} 
          value={this.state.type}
          onChangeText={(value)=>this.setState({type:value})}
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
    return (
      <Category
            ref={'child'} 
            name={"Vlees en Boter"}
            progress={this.props.progress}
            duration={500}
            fillColor={"#F7AC4B"}
            barColor={"#ed9f3b"}
            style={{marginBottom: 30,}}
            clickEvent={this.props.clickEvent}
            dropDownView={dropDownView}
            data={{type:this.state.type}}
            apiUrl={'fattyfood'}
            reset={this.reset}
            setProgress={this.props.setProgress}
            connection={this.props.connection}
            setConnection={this.props.setConnection}
            min={0}
            max={50}
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
                source={require("../../images/steak.png")}
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/butter.png")}        
              />
            </View>
          </Category>
    );
  }
}

const styles = StyleSheet.create({

})
export default RedMeat
