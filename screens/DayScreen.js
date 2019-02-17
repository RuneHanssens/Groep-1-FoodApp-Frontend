import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  AppState,
  TouchableOpacity
} from "react-native";

import Vegetables from './../components/categories/Vegetables.js';
import Fruits from './../components/categories/Fruits.js';
import Water from './../components/categories/Water.js';
import Nuts from './../components/categories/Nuts.js';
import FishMilkEggsPoultry from './../components/categories/FishMilkEggsPoultry.js';
import RedMeat from './../components/categories/RedMeat';
import BreadRicePotatoesPasta from './../components/categories/BreadRicePotatoesPasta';
import Sport from './../components/categories/Sport';
import ConnectionWarning from './../components/ConnectionWarning';
import Header from './../components/Header';

export default class DayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      waterProgress:0,
      vegetablesProgress:0,
      fruitsProgress:0,
      nutsProgress:0,
      cerealProgress:0,
      fishEtcProgress:0,
      redMeatProgress:0,
      sportsProgress:0,
    }
  }

  componentDidMount = () =>{
    AppState.addEventListener('change', this._handleAppStateChange)
    this.loadProgress()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.loadProgress()
    }
    this.setState({appState: nextAppState})
  }

  loadProgress = async () => {
    if(this.props.screenProps.connection){
        console.log('load progress')
        let response = await fetch('http://foodapp-backend.serveo.net/api/day/points')
        let data = await response.json()
        console.log(data)
        this.setState({
        waterProgress:data.WATER,
        vegetablesProgress:data.VEGETABLE,
        fruitsProgress:data.FRUIT,
        nutsProgress:data.NUTS,
        cerealProgress:data.STARCHPRODUCT,
        fishEtcProgress:data.DAIRYFISHPOULTRY,
        redMeatProgress:data.FATTYFOOD,
        })
    }else{
        console.log('Cancelled loadProgress: no connection to server')
    }
  }

  categoryClickEvent = (sender) =>{
    this.refs.water.refs.child.handleClickEvent(sender)
    this.refs.sport.refs.child.handleClickEvent(sender)
    this.refs.vegetables.refs.child.handleClickEvent(sender)
    this.refs.fruits.refs.child.handleClickEvent(sender)
    this.refs.nuts.refs.child.handleClickEvent(sender)
    this.refs.cereal.refs.child.handleClickEvent(sender)
    this.refs.fishEtc.refs.child.handleClickEvent(sender)
    this.refs.redMeat.refs.child.handleClickEvent(sender)
  }

  setWaterProgress = (value) =>{
    this.setState({
      waterProgress:value
    })
    //TODO andere categories
  }

  render() {
    let connectionWarning
    if(!this.props.screenProps.connection){
        connectionWarning = <ConnectionWarning checkConnection={this.props.screenProps.checkConnection}/>
    }
    return (
      <View style={styles.mainView}>
        <Header text={'Vandaag'}/>
        <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewContentStyle}>
          <Sport progress={this.state.sportsProgress} clickEvent={this.categoryClickEvent} ref={'sport'}/>
          <Water progress={this.state.waterProgress} clickEvent={this.categoryClickEvent} ref={'water'}/>
          <Vegetables progress={this.state.vegetablesProgress} clickEvent={this.categoryClickEvent} ref={'vegetables'}/>
          <Fruits progress={this.state.fruitsProgress} clickEvent={this.categoryClickEvent} ref={'fruits'}/>
          <Nuts progress={this.state.nutsProgress} clickEvent={this.categoryClickEvent} ref={'nuts'}/>
          <BreadRicePotatoesPasta progress={this.state.cerealProgress} clickEvent={this.categoryClickEvent} ref={'cereal'}/>
          <FishMilkEggsPoultry progress={this.state.fishEtcProgress} clickEvent={this.categoryClickEvent} ref={'fishEtc'}/>
          <RedMeat progress={this.state.redMeatProgress} clickEvent={this.categoryClickEvent} ref={'redMeat'}/>    
        </ScrollView>
        {connectionWarning}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  categoriesContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "90%",
    alignSelf: "center"
  },
  mainView: {
    flex: 1,
    paddingTop:30,
  },
  scrollViewStyle: {

  },
  scrollViewContentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf:'center'
  },
})