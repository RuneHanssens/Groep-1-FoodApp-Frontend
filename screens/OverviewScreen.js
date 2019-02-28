import React from "react";
import { View, Text } from "react-native";
import Header from "./../components/Header";
import { BarChart, YAxis, Grid } from "react-native-svg-charts";
import * as scale from "d3-scale";
import { Dropdown } from "react-native-material-dropdown";
import React from "react"
import {
  View,
  Text,
  Platform,
  StatusBar
} from "react-native"
import Header from './../components/Header'

export default class DayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "BEWEGING"
    };
  }


  getDay = (value) => {
  var d = new Date(value);
  var weekday = new Array(7);
  weekday[0] = "ZO";
  weekday[1] = "MA";
  weekday[2] = "DI";
  weekday[3] = "WO";
  weekday[4] = "DO";
  weekday[5] = "VR";
  weekday[6] = "ZA";

  return weekday[d.getDay()];
  }

  getColor = (isMax, isMin) => {
    if (isMax) {
      return "red"
    } else if (isMin){
      return "orange"
    } else {
      return "green"
    }
  }


  render() {
    let jsonData = [
      {
        date: "2019-07-03",
        points: 10,
        isMax: false,
        isMin: true
      },
      {
        date: "2019-07-04",
        points: 80,
        isMax: false,
        isMin: false
      }, 
      {
        date: "2019-07-05",
        points: 95,
        isMax: false,
        isMin: false
      },
      {
        date: "2019-07-06",
        points: 105,
        isMax: true,
        isMin: false
      },
      {
        date: "2019-07-07",
        points: 95,
        isMax: false,
        isMin: false
      },
      {
        date: "2019-07-08",
        points: 40,
        isMax: false,
        isMin: true
      },
    ];


    let data = [];

    for (var i = 0; i < jsonData.length; i++) {
      data[i] = {
        value: jsonData[i].points,
        svg: { fill: this.getColor(jsonData[i].isMax, jsonData[i].isMin)}, //Nog aangepast na test
        label: this.getDay(jsonData[i].date)
      };
    }

    return (
      <View
        style={{
            flex:1,
            paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.height,
        }}
      >
        <Header text={"Overzicht"} />
        <View style={{ margin: 16 }}>
          <Dropdown
            data={[
              { value: "BEWEGING" },
              { value: "Water" },
              { value: "Groenten" },
              { value: "Fruit" },
              { value: "Graanproducten" }
            ]}
            value={this.state.category}
            onChangeText={value =>
              this.setState({
                category: value
              })
            }
            style={{
              color: "black",
              fontSize: 24
            }}
            itemTextStyle={{
              alignSelf: "center"
            }}
            containerStyle={{
              width: "90%",
              alignSelf: "flex-end"
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <YAxis
              data={data}
              style={{ marginRight: 15, fontWeight: "bold" }}
              yAccessor={({ index }) => index}
              scale={scale.scaleBand}
              contentInset={{ top: 10, bottom: 10 }}
              formatLabel={(_, index) => data[index].label}
            />

            <BarChart
              style={{ flex: 1, height: 300 }}
              data={data}
              yAccessor={({ item }) => item.value}
              horizontal={true}
              contentInset={{ top: 10, bottom: 10 }}
              gridMin={0}
            />
          </View>
        </View>
      </View>
    );
  }
}
