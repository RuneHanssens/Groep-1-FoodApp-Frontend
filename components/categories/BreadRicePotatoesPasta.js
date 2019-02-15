import React, { Component } from "react";
import { Dropdown } from 'react-native-material-dropdown';
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
  Image
} from "react-native";
import Category from "./Category";
class BreadRicePotatoesPasta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress:0
    };
  }

  setProgress = (value) =>{
    this.setState({
      progress:value
    })
  }

  render() {
    let data = [{
      value: 'Brood',
    }, {
      value: 'Pasta',
    }, {
      value: 'Rijst',
    },{
      value:'Aardappelen',
    }];


    dropDownView = (
      <View>
        <Dropdown 
          label='Selecteer het graanproduct'
          data={data} 
          value={data[0].value}
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
          pickerStyle={{
            
          }}
          />
      </View>
    )
    return (
      <Category
        name={"Graanproducten"}
        progress={this.state.progress}
        duration={500}
        fillColor={"#96B057"}
        barColor={"#809946"}
        dropDownView={dropDownView}
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
            source={require("../../images/bread.png")}
          />
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../images/pasta.png")}
          />
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../images/rice.png")}
          />
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../images/potatoes.png")}
          />
        </View>
      </Category>
    );
  }
}

const styles = StyleSheet.create({});
export default BreadRicePotatoesPasta;
