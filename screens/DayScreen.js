import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  findNodeHandle,
  Platform,
  StatusBar
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
import Rest from './../components/categories/Rest';

import Global from './../Global'

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
      restProgress:0,
    }
  }

  componentDidMount = () =>{
    console.log('Dayscreen mounted')
    if(this.props.screenProps.appState == 'active' && this.props.screenProps.connection && this.props.screenProps.connectionChecked){
      this.loadProgress()
    }
  }

  componentDidUpdate = (prevProps, prevState) =>{
    console.log('update')
    if((prevProps.screenProps.appState == 'background' && this.props.screenProps.appState == 'active')){
      console.log('hier!!!!!')
      this.loadProgress()
    }
  }

  loadProgress = async () => {
    if(this.props.screenProps.connection && this.props.screenProps.connectionChecked){
        console.log('Loading progress...')
        let response = await fetch(`${Global.url}/api/user/day/points`,
        {
          headers: {
          "Authorization":this.props.screenProps.token
        }})
        let data = await response.json()
        console.log(data)
        this.setState({
          sportsProgress:data.MOVEMENT.Points,
          waterProgress:data.WATER.Points,
          vegetablesProgress:data.VEGETABLE.Points,
          fruitsProgress:data.FRUIT.Points,
          nutsProgress:data.NUTS.Points,
          cerealProgress:data.STARCHPRODUCT.Points,
          fishEtcProgress:data.DAIRYFISHPOULTRY.Points,
          redMeatProgress:data.FATTYFOOD.Points,
          restProgress:data.SNACK.Points,
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
    this.refs.rest.refs.child.handleClickEvent(sender)
  }
  setWaterProgress = (value) =>{
    this.setState({
      waterProgress:value
    })
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
  setFishEtcProgress = (value) =>{
    this.setState({
      fishEtcProgress:value
    })
  }
  setMeatProgress = (value) =>{
    this.setState({
      redMeatProgress:value
    })
  }
  setRestProgress = (value) =>{
    this.setState({
      restProgress:value
    })
  }

  scrollToCategory = (category) =>{
    setTimeout(()=>{
      this.refs[category].measureLayout(
        findNodeHandle(this.refs.categoryScrollView),
        (x, y) => {
          this.refs.categoryScrollView.scrollTo({y})
        }, 
        function(error) {
          console.log(error)
        }
      )
    })
  }

  render() {
    let connectionWarning
    if(!this.props.screenProps.connection){
        connectionWarning = <ConnectionWarning checkServer={this.props.screenProps.checkServer}/>
    }
    return (
      <View ref='view' style={styles.mainView}>
        <Header text={'Vandaag'}/>
        <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewContentStyle} ref={'categoryScrollView'}>
          <View
            ref={'sportView'}
            style={[{width:'100%'}, this.refs.sport ? this.refs.sport.refs.child.state.height : 0]}
          >
            <Sport 
              progress={this.state.sportsProgress} 
              clickEvent={this.categoryClickEvent} 
              ref={'sport'} 
              connection={this.props.screenProps.connection} 
              setConnection={this.props.screenProps.setConnection} 
              setProgress={this.setSportProgress}
              scrollTo={this.scrollToCategory}
              y={this.state.sportsY}
              token={this.props.screenProps.token}
            />
          </View>
          <View 
            ref={'waterView'}
            style={[{width:'100%'}, this.refs.water ? this.refs.water.refs.child.state.height : 0]}
          >
            <Water 
              progress={this.state.waterProgress} 
              clickEvent={this.categoryClickEvent}
              ref={'water'}
              connection={this.props.screenProps.connection}
              setProgress={this.setWaterProgress}
              setConnection={this.props.screenProps.setConnection}
              scrollTo={this.scrollToCategory}
              y={this.state.waterY}
              token={this.props.screenProps.token}
              />
          </View>
          <View 
            ref={'vegetableView'}
            style={[{width:'100%'}, this.refs.vegetables ? this.refs.vegetables.refs.child.state.height : 0]}
          >
            <Vegetables
              progress={this.state.vegetablesProgress}
              clickEvent={this.categoryClickEvent}
              ref={'vegetables'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setVegetablesProgress}
              scrollTo={this.scrollToCategory}
              token={this.props.screenProps.token}
              />
          </View>
          <View 
            ref={'fruitView'}
            style={[{width:'100%'}, this.refs.fruits ? this.refs.fruits.refs.child.state.height : 0]} 
          >
            <Fruits
              progress={this.state.fruitsProgress}
              clickEvent={this.categoryClickEvent}
              ref={'fruits'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setFruitsProgress}
              scrollTo={this.scrollToCategory}
              token={this.props.screenProps.token}
              />
          </View>
          <View 
            ref={'nutsView'}
            style={[{width:'100%'}, this.refs.nuts ? this.refs.nuts.refs.child.state.height : 0]} 
          >
            <Nuts
              progress={this.state.nutsProgress}
              clickEvent={this.categoryClickEvent}
              ref={'nuts'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setNutsProgress}
              scrollTo={this.scrollToCategory}
              token={this.props.screenProps.token}
              />
          </View>
          <View 
            ref={'cerealView'}
            style={[{width:'100%'}, this.refs.cereal ? this.refs.cereal.refs.child.state.height : 0]}
          >
            <BreadRicePotatoesPasta
              progress={this.state.cerealProgress}
              clickEvent={this.categoryClickEvent}
              ref={'cereal'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setCerealProgress}
              scrollTo={this.scrollToCategory}
              token={this.props.screenProps.token}
              />
          </View>
          <View 
            ref={'fishEtcView'}
            style={[{width:'100%'}, this.refs.fishEtc ? this.refs.fishEtc.refs.child.state.height : 0]}
          >
            <FishMilkEggsPoultry
              progress={this.state.fishEtcProgress}
              clickEvent={this.categoryClickEvent}
              ref={'fishEtc'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setFishEtcProgress}
              scrollTo={this.scrollToCategory}
              token={this.props.screenProps.token}
              />
          </View>
          <View 
            ref={'redMeatView'}
            style={[{width:'100%'}, this.refs.redMeat ? this.refs.redMeat.refs.child.state.height : 0]}
          >
            <RedMeat
              progress={this.state.redMeatProgress}
              clickEvent={this.categoryClickEvent}
              ref={'redMeat'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setMeatProgress}
              scrollTo={this.scrollToCategory}
              token={this.props.screenProps.token}
              />
          </View>
          <View 
            ref={'restView'}
            style={[{width:'100%'}, this.refs.rest ? this.refs.rest.refs.child.state.height : 0]}  
          >
            <Rest
              progress={this.state.restProgress}
              clickEvent={this.categoryClickEvent}
              ref={'rest'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setRestProgress}
              scrollTo={this.scrollToCategory}
              token={this.props.screenProps.token}
            />
          </View>
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
    paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.height,
  },
  scrollViewContentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf:'center'
  },
})