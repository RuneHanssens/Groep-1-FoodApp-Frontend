import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Button
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
import Fade from './../components/Fade';

export default class DayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log('DayScreen mounted')
    this.loadProgress()
  }

  componentDidUpdate = (prevProps, prevState) =>{
    console.log('updated')
    if(
      (this.props.screenProps.connection && this.props.screenProps.connectionChecked != prevProps.screenProps.connectionChecked) 
      || 
      (prevProps.screenProps.appState == 'background' && this.props.screenProps.appState == 'active' && this.props.screenProps.connection))
    {
      this.props.screenProps.checkConnection(this.loadProgress)
    }
  }

  loadProgress = async () => {
    console.log('load progress check')
    if(this.props.screenProps.connection && this.props.screenProps.connectionChecked){
        console.log('load progress')
        let response = await fetch('http://foodapp-backend.serveo.net/api/day/points')
        let data = await response.json()
        console.log(data)
        this.setState({
          sportsProgress:data.MOVEMENT,
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

  setSportProgress = (value) =>{
    this.setState({
      sportsProgress:value
    })
  }

  setVegetablesProgress = (value) =>{
    this.setState({
      vegetablesProgress:value
    })
  }

  setFruitsProgress = (value) =>{
    this.setState({
      fruitsProgress:value
    })
  }

  setNutsProgress = (value) =>{
    this.setState({
      nutsProgress:value
    })
  }

  setCerealProgress = (value) =>{
    this.setState({
      cerealProgress:value
    })
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
          <Sport 
            progress={this.state.sportsProgress} 
            clickEvent={this.categoryClickEvent} 
            ref={'sport'} 
            connection={this.props.screenProps.connection} 
            setConnection={this.props.screenProps.setConnection} 
            setProgress={this.setSportProgress}/>
          <Water 
          progress={this.state.waterProgress} 
            clickEvent={this.categoryClickEvent}
            ref={'water'}
            connection={this.props.screenProps.connection}
            setProgress={this.setWaterProgress}
            setConnection={this.props.screenProps.setConnection}/>
          <Vegetables
            progress={this.state.vegetablesProgress}
            clickEvent={this.categoryClickEvent}
            ref={'vegetables'}
            connection={this.props.screenProps.connection}
            setConnection={this.props.screenProps.setConnection}
            setProgress={this.setVegetablesProgress}/>
          <Fruits
            progress={this.state.fruitsProgress}
            clickEvent={this.categoryClickEvent}
            ref={'fruits'}
            connection={this.props.screenProps.connection}
            setConnection={this.props.screenProps.setConnection}
            setProgress={this.setFruitsProgress}
            />
          <Nuts
            progress={this.state.nutsProgress}
            clickEvent={this.categoryClickEvent}
            ref={'nuts'}
            connection={this.props.screenProps.connection}
            setConnection={this.props.screenProps.setConnection}
            progress={this.state.nutsProgress}
            setProgress={this.setNutsProgress}
            />
          <BreadRicePotatoesPasta
            progress={this.state.cerealProgress}
            clickEvent={this.categoryClickEvent}
            ref={'cereal'}
            connection={this.props.screenProps.connection}
            setConnection={this.props.screenProps.setConnection}
            progress={this.state.cerealProgress}
            setProgress={this.setCerealProgress}
            />
          <FishMilkEggsPoultry
            progress={this.state.fishEtcProgress}
            clickEvent={this.categoryClickEvent}
            ref={'fishEtc'}
            connection={this.props.screenProps.connection}
            setConnection={this.props.screenProps.setConnection}/>
          <RedMeat
            progress={this.state.redMeatProgress}
            clickEvent={this.categoryClickEvent}
            ref={'redMeat'}
            connection={this.props.screenProps.connection}
            setConnection={this.props.screenProps.setConnection}/>
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