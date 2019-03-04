import React from "react";
import Header from "./../components/Header";
import { BarChart, YAxis, Grid } from "react-native-svg-charts";
import * as scale from "d3-scale";
import { Dropdown } from "react-native-material-dropdown";
import Global from "./../Global";

import { View, Text, Platform, StatusBar, Button } from "react-native";

const categories = [
  { value: "Beweging", url: "movement" },
  { value: "Water", url: "water" },
  { value: "Groenten", url: "vegetable" },
  { value: "Fruit", url: "fruit" },
  { value: "Graanproducten", url: "starchproduct" },
  {
    value: "Vis, Gevogelte, Eieren en Zuivelproducten",
    url: "dairyfishpoultry"
  },
  { value: "Vlees en Boter", url: "fattyfood" },
  { value: "Rest groep", url: "snack" }
];

const staticData= [{
  value: 0,
  svg: {
    fill: 'white',
    stroke: 'white'
  },
  label: "ljlj",
  date: ''
}
]

const jsonData = [
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
  {
    date: "2019-07-02",
    points: 40,
    isMax: false,
    isMin: true
  },

];

export default class DayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "Beweging",
      data: []
    };
  }

  getDate = value => {
    return new Date(value);
  };

  getUrl = value => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].value == value) {
        return categories[i].url;
      }
    }
  };

  getTodayMinus6 = () => {
    let date1 = new Date();
    date1.setDate(date1.getDate() - 6);
    return date1;
  };

  getDay = value => {
    var d = this.getDate(value);
    var weekday = new Array(7);
    weekday[0] = "ZO";
    weekday[1] = "MA";
    weekday[2] = "DI";
    weekday[3] = "WO";
    weekday[4] = "DO";
    weekday[5] = "VR";
    weekday[6] = "ZA";

    return weekday[d.getDay()];
  };

  getColor = (isMax, isMin) => {
    if (isMax) {
      return "#c4452d"; //'rgba(255, 99, 132, 0.2)'  //red
    } else if (isMin) {
      return "#F7AC4B"; //'rgba(255, 206, 86, 0.2)'  //orange
    } else {
      return "#7e9b4e"; //'rgba(75, 192, 192, 0.2)'  //green
    }
  };

  getBorderColor = (isMax, isMin) => {
    if (isMax) {
      return "#7c2413"; //'rgba(255,99,132,1)'  //red
    } else if (isMin) {
      return "#d18b32"; //'rgba(255, 206, 86, 1)'  //orange
    } else {
      return "#5b7036"; //'rgba(75, 192, 192, 1)'  //green
    }
  };

  formatDate = (date) =>{
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    let result = dd + '/' + mm + '/' + yyyy;
    return result
}
  
  getDataSorted = (jsonData) => {   //async
      // try{
      //   if(this.props.screenProps.connection && this.props.screenProps.connectionChecked){
      //     console.log('Loading progress...')
      //     let response = await fetch(`${Global.url}/api/user/dayrange?startDate=25/02/2019&endDate=03/03/2019&category=movement&username=A`,
      //     {
      //       headers: {
      //       "Authorization":this.props.screenProps.token
      //     }})
      //     let data = await response.json()
      //     console.log(data)
      //    }else{
      //     console.log('Cancelled loadProgress: no connection to server')
      //   }
      // } catch {
      //   console.log("FAILED GETDATASORTED")
      // }
      let data = []
    for (var i = 0; i < jsonData.length; i++) {
      data[i] = {
        value: jsonData[i].points,
        svg: {
          fill: this.getColor(jsonData[i].isMax, jsonData[i].isMin),
          stroke: this.getBorderColor(jsonData[i].isMax, jsonData[i].isMin)
        },
        label: this.getDay(jsonData[i].date),
        date: this.getDate(jsonData[i].date)
      };
    }

    data.sort(function(a, b){
      return a.date - b.date
    } );

    this.state.data = data;
  }

  componentDidMount = () =>{
    console.log('OverviewScreen mounted')
    if(this.props.screenProps.connection && this.props.screenProps.connectionChecked){
      this.submit("Beweging")
    }
  }

  submit = value => {
    console.log(
      "Get days from " +
        this.formatDate(this.getTodayMinus6()) +
        " To " +
        this.formatDate(new Date()) +
        " with url: " +
        this.getUrl(value)
    );

    console.log("Submit before data sorted")
    this.setState({ category: value });
    this.getDataSorted(jsonData);
    console.log("Submit na data sorted")
  };

  render() {
    console.log(this.state.data.length == 0 ? "StaticData" : "stateData")
    console.log(this.state.data)
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 30 : StatusBar.height
        }}
      >
        <Header text={"Overzicht"} />
        <View style={{ margin: 16 }}>
          <Dropdown
            data={categories}
            value={this.state.category}
            onChangeText={value => {
              this.submit(value);
            }}
            style={{
              color: "black",
              fontSize: 24
            }}
            itemTextStyle={{
              alignSelf: "center"
            }}
            containerStyle={{
              width: "70%",
              alignSelf: "center"
            }}
          />


          <View style={{ flexDirection: "row" }}>
            <YAxis
              data={this.state.data.length === 0 ? staticData : this.state.data }
              // data={staticData}
              style={{ marginRight: 15 }}
              svg={{ fontSize: 14 }}
              yAccessor={({ index }) => index}
              scale={scale.scaleBand}
              contentInset={{ top: 10, bottom: 10 }}
              formatLabel={(_, index) => this.state.data.length === 0 ? staticData[index].label : this.state.data[index].label}
              // formatLabel={(_, index) => staticData[index].label}
            />

            <BarChart
              style={{ flex: 1, height: 450 }}
              data={this.state.data.lenght === 0 ? staticData : this.state.data}
              // data={staticData}
              yAccessor={({ item }) => item.value}
              horizontal={true}
              contentInset={{ top: 10, bottom: 10 }}
              gridMin={0}
              spacingInner={0.2}
              animate={true}
            />
          </View>
        </View>
      </View>
    );
  }
}
