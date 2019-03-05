import React from "react";
import Header from "./../components/Header";
import { BarChart, YAxis, Grid } from "react-native-svg-charts";
import * as scale from "d3-scale";
import { Dropdown } from "react-native-material-dropdown";
import Global from "./../Global";
// import { SecureStore } from 'expo';
// import * as SecureStore from 'expo-secure-store';
import { View, Text, Platform, StatusBar, Button } from "react-native";
import { parse } from "querystring";

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
  }
];  

export default class DayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "Beweging",
      data: null
    };

    this.props.navigation.addListener('didFocus', () => this.componentDidMount())
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
    weekday[0] = " ZO ";
    weekday[1] = " MA ";
    weekday[2] = " DI ";
    weekday[3] = " WO  ";
    weekday[4] = " DO ";
    weekday[5] = " VR ";
    weekday[6] = " ZA ";

    return weekday[d.getDay()];
  };

  getColor = (isMax, isMin) => {
    if (isMax) {
      return "#c4452d"; //'rgba(255, 99, 132, 0.2)'  //red
    } else if (isMin) {
      return "#7e9b4e"; //'rgba(255, 206, 86, 0.2)'  //green
    } else {
      return "#F7AC4B"; //'rgba(75, 192, 192, 0.2)'  //orange
    }
  };

  getBorderColor = (isMax, isMin) => {
    console.log("ismax = " + isMax + " isMin = " + isMin)
    if (isMax) {
      return "#7c2413"; //'rgba(255,99,132,1)'  //red
    } else if (isMin) {
      return "#5b7036"; //'rgba(255, 206, 86, 1)'  //green
    } else {
      return "#d18b32"; //'rgba(75, 192, 192, 1)'  //orange
    }
  };

  formatDate = date => {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    let result = dd + "/" + mm + "/" + yyyy;
    return result;
  };

  getUsername = async () => {
    username = await Expo.SecureStore.getItemAsync("username")
    if(username !== null) {
      return username
    } else {
      alert("Meld je opnieuw aan")
    }
  }
  getDataSorted = async () => {
    // try {
      if (
        this.props.screenProps.connection &&
        this.props.screenProps.connectionChecked
      ) {
        
        let response = await fetch(
          `${
            Global.url
          }/api/user/dayrange?startDate=${this.formatDate(this.getTodayMinus6())}&endDate=${this.formatDate(new Date())}&category=${this.getUrl(this.state.category)}&username=${await this.getUsername()}`,
          { 
            headers: {
              Authorization: this.props.screenProps.token
            }
          }
        );
        let dataJson = await response.json();
        let data = []
        Object.keys(dataJson).forEach((key,index) => {
          let el = dataJson[key]
          data.push( {
            value: parseInt(el.Points),
            svg: {
              fill: this.getColor( el.OverMax == "true", el.OverMin == "true"),
              stroke: this.getBorderColor(el.OverMax == "true", el.OverMin == "true")
            },
            label: this.getDay(key),
            date: this.getDate(key)
          });
      })
      data.sort(function(a, b) {
        return a.date - b.date;
      });
  
      this.setState({data})

      } else {
        console.log("Cancelled loadProgress: no connection to server");
      }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  componentDidMount = () => {
    if (
      this.props.screenProps.connection &&
      this.props.screenProps.connectionChecked
    ) {
      this.submit(this.state.category);
    }
  };

  // getTestData = () => {
  //   let data = [];
  //   for (var i = 0; i < jsonData.length; i++){
  //     data.push({
  //       value: jsonData[i].points,
  //       svg: {
  //         fill: this.getColor(jsonData[i].isMax,
  //           jsonData[i].isMin)
  //       },
  //       label: this.getDay(jsonData[i].date),
  //       date: this.getDate(jsonData[i].date)
  //     })
  //   }

  //   data.sort(function(a, b){
  //     return a.date - b.date;
  //   })
  //   this.setState({data})
  // }
 
  submit = value => {
    console.log(
      "Get days from " +
        this.formatDate(this.getTodayMinus6()) +
        " To " +
        this.formatDate(new Date()) +
        " with url: " +
        this.getUrl(value)
    );
    this.setState({ category: value });
    this.getDataSorted();
  };

  render() {
    let graph = this.state.data ? (
      <View style={{ flexDirection: "row", height:'75%'}}>
        <YAxis
          data={this.state.data}
          style={{ marginRight: 15 }}
          svg={{ fontSize: 15 }}
          yAccessor={({ index }) => index}
          scale={scale.scaleBand}
          contentInset={{ top: 10, bottom: 10 }}
          formatLabel={(_, index) => this.state.data[index].label}
        />

        <BarChart
          style={{ flex: 1}}
          data={this.state.data}
          yAccessor={({ item }) => item.value}
          horizontal={true}
          contentInset={{ top: 10, bottom: 10 }}
          gridMin={0}
          gridMax={200}
          spacingInner={0.2}
          animate={true}
        />

        <Grid/>
      </View>
    ) : null;

    return (
      <View
        style={{
            flex:1,
            paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
            height:'100%',
            width:'100%',
        }}
      >
        <Header text={"Overzicht"} />
        <View style={{ margin: 16, height:'100%' }}>
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
            dropdownPosition={0}
          />

          {graph}
        </View>
      </View>
    );
  }
}
