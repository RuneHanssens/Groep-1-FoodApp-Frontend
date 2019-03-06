import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
import { View, StyleSheet, Image } from "react-native";
import Category from "./Category";
import { CheckBox } from 'react-native-elements';

class BreadRicePotatoesPasta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Brood",
      subType: "Wit",
      typeIndex: 0,
      outdoors:false,
    };
  }

  reset = () => {
    this.state = {
      type: "Brood",
      subType: "Wit",
      typeIndex: 0,
      outdoors:false,
    };
  };

  subTypeList = () => {
    return [
      [{ value: "WitteBoterham", label: 'Witte Boterham' }, { value: "DonkereBoterham", label: 'Donkere Boterham' }, {value: "Broodje"}],
      [{ value: "Wit" }, { value: "Volkoren" }],
      [
        { value: "Gekookt" },
        { value: "Gebakken" },
        { value: "Gratin" },
        { value: "Frieten" }
      ],
      [{ value: "Wit" }, { value: "Donker" }],
    ];
  };

  onTypeClick = value => {
    let index;
    switch (value) {
      case "Brood":
        index = 0;
        break;
      case "Rijst":
        index = 1;
        break;
      case "Aardappelen":
        index = 2;
        break;
      case "Pasta":
        index = 1;
        break;
      case "Wrap":
      index = 3;
      break;
        
      default:
        index = null;
        break;
    }

    if (index != null) {
      subType = this.subTypeList()[index][0].value;
    } else {
      subType = null;
    }
    this.setState({
      typeIndex: index,
      type: value,
      subType: subType
    });
  };

  scrollTo = () => {
    this.props.scrollTo('cerealView')
  }

  render() {
    let subTypeInput;
    if (this.state.typeIndex != null) {
      subTypeInput = (
        <Dropdown
          label="Selecteer het specifieke type"
          data={this.subTypeList()[this.state.typeIndex]}
          value={this.state.subType}
          onChangeText={value => this.setState({ subType: value })}
          style={{
            color: "#fff",
            fontSize: 20
          }}
          itemTextStyle={{
            alignSelf: "center"
          }}
          containerStyle={{
            width: "85%",
            alignSelf: "center"
          }}
        />
      );
    }

    dropDownView = (
      <View>
        <Dropdown
          label="Selecteer het graanproduct"
          data={[
            { value: "Brood" },
            { value: "Pasta" },
            { value: "Rijst" },
            { value: "Aardappelen" },
            { value: "Granola of Havermout" },
            { value: "Cornflakes" },
            { value: "Wrap" },
          ]}
          value={this.state.type}
          onChangeText={value => this.onTypeClick(value)}
          style={{
            color: "#fff",
            fontSize: 20
          }}
          itemTextStyle={{
            alignSelf: "center"
          }}
          containerStyle={{
            width: "85%",
            alignSelf: "center"
          }}
        />
        {subTypeInput}
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
    );

    let warningData = [
      {data:{type:'Cornflakes'},message:'Cornflakes zijn zeer ongezond!'},
      {data:{type:'Pasta',subType:'Wit'}, message:'Witte pasta is niet zo gezond!'},
      {data:{type:'Rijst',subType:'Wit'}, message:'Witte rijst is niet zo gezond, kies liever voor volkoren of zilvervliesrijst!'},
      {data:{type:'Aardappelen',subType:'Frieten'}, message:'Je mag maximaal 1 keer per week frieten eten!'},
      {data:{type:'Brood',subType:'Wit'}, message:'Wit brood is niet zo gezond, kies liever voor volkoren!'},
    ]
    return (
      <Category
        ref={"child"}
        name={"Graanproducten"}
        progress={this.props.progress}
        duration={500}
        fillColor={"#96B057"}
        barColor={"#809946"}
        clickEvent={this.props.clickEvent}
        dropDownView={dropDownView}
        data={{ type: this.state.type, subType: this.state.subType, outdoors:this.state.outdoors }}
        apiUrl={"starchproduct"}
        reset={this.reset}
        setProgress={this.props.setProgress}
        connection={this.props.connection}
        setConnection={this.props.setConnection}
        min={20}
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
