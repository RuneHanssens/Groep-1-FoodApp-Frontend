import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
import { View, StyleSheet, Image } from "react-native";
import Category from "./Category";
class BreadRicePotatoesPasta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Brood",
      subType: "Wit",
      typeIndex: 0,
    };
  }

  reset = () => {
    this.state = {
      type: "Brood",
      subType: "Wit",
      typeIndex: 0
    };
  };

  subTypeList = () => {
    return [
      [{ value: "Wit" }, { value: "Donker" }],
      [{ value: "Wit" }, { value: "Volkoren" }],
      [
        { value: "Gekookt" },
        { value: "Gebakken" },
        { value: "Gratin" },
        { value: "Frieten" }
      ]
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
            { value: "Cornflakes" }
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
      </View>
    );
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
        data={{ type: this.state.type, subType: this.state.subType }}
        apiUrl={"starchproduct"}
        reset={this.reset}
        setProgress={this.props.setProgress}
        connection={this.props.connection}
        setConnection={this.props.setConnection}
        min={20}
        max={110}
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
