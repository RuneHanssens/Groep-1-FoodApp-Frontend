import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  findNodeHandle,
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
import Category from './../components/categories/Category';

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
      prev:null,
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
  setPrev = (value) =>{
    this.setState({
      prev:value
    })
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
    /*setTimeout(()=>{
      if(category == 'redMeatView' || category == 'restView'){
        this.refs.categoryScrollView.scrollToEnd()
      }else{
        this.refs[category].measure((ox, oy, width, height, px, py)=>{
          console.log(oy)
          this.refs.categoryScrollView.scrollTo({y:oy})
        })
      }
    })*/

    this.refs[category].measureLayout(
      findNodeHandle(this.refs.categoryScrollView),
      (x, y) => {
        this.refs.categoryScrollView.scrollTo({y})
      }, 
      function(error) {
        console.log(error)
      }
    )
  }

  render() {
    let connectionWarning
    if(!this.props.screenProps.connection){
        connectionWarning = <ConnectionWarning checkConnection={this.props.screenProps.checkConnection}/>
    }
    return (
      <View ref='view' style={styles.mainView}>
        <Header text={'Vandaag'}/>
        <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewContentStyle} ref={'categoryScrollView'}>
          <View
            ref={'sportView'}
            style={[{width:'100%'}, this.refs.sport ? this.refs.sport.refs.child.state.height : 0]}
            renderToHardwareTextureAndroid={true}
            collapsable={false}
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
            />
          </View>
          <View 
            ref={'waterView'}
            style={[{width:'100%'}, this.refs.water ? this.refs.water.refs.child.state.height : 0]}
            renderToHardwareTextureAndroid={true}
            onLayout={() => {}}
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
              setPrev={this.setPrev}
              />
          </View>
          <View 
            ref={'vegetableView'}
            style={[{width:'100%'}, this.refs.vegetables ? this.refs.vegetables.refs.child.state.height : 0]}
            renderToHardwareTextureAndroid={true}
          >
            <Vegetables
              progress={this.state.vegetablesProgress}
              clickEvent={this.categoryClickEvent}
              ref={'vegetables'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setVegetablesProgress}
              scrollTo={this.scrollToCategory}
              setPrev={this.setPrev}
              />
          </View>
          <View 
            ref={'fruitView'}
            style={[{width:'100%'}, this.refs.fruits ? this.refs.fruits.refs.child.state.height : 0]} 
            renderToHardwareTextureAndroid={true}
          >
            <Fruits
              progress={this.state.fruitsProgress}
              clickEvent={this.categoryClickEvent}
              ref={'fruits'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setFruitsProgress}
              scrollTo={this.scrollToCategory}
              setPrev={this.setPrev}
              />
          </View>
          <View 
            ref={'nutsView'}
            style={[{width:'100%'}, this.refs.nuts ? this.refs.nuts.refs.child.state.height : 0]} 
            renderToHardwareTextureAndroid={true} 
          >
            <Nuts
              progress={this.state.nutsProgress}
              clickEvent={this.categoryClickEvent}
              ref={'nuts'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setNutsProgress}
              scrollTo={this.scrollToCategory}
              setPrev={this.setPrev}
              />
          </View>
          <View 
            ref={'cerealView'}
            style={[{width:'100%'}, this.refs.cereal ? this.refs.cereal.refs.child.state.height : 0]}
            renderToHardwareTextureAndroid={true}
          >
            <BreadRicePotatoesPasta
              progress={this.state.cerealProgress}
              clickEvent={this.categoryClickEvent}
              ref={'cereal'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setCerealProgress}
              scrollTo={this.scrollToCategory}
              setPrev={this.setPrev}
              />
          </View>
          <View 
            ref={'fishEtcView'}
            style={[{width:'100%'}, this.refs.fishEtc ? this.refs.fishEtc.refs.child.state.height : 0]}
            renderToHardwareTextureAndroid={true}
          >
            <FishMilkEggsPoultry
              progress={this.state.fishEtcProgress}
              clickEvent={this.categoryClickEvent}
              ref={'fishEtc'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setFishEtcProgress}
              scrollTo={this.scrollToCategory}
              setPrev={this.setPrev}
              />
          </View>
          <View 
            ref={'redMeatView'}
            style={[{width:'100%'}, this.refs.redMeat ? this.refs.redMeat.refs.child.state.height : 0]}
            renderToHardwareTextureAndroid={true}
          >
            <RedMeat
              progress={this.state.redMeatProgress}
              clickEvent={this.categoryClickEvent}
              ref={'redMeat'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setMeatProgress}
              scrollTo={this.scrollToCategory}
              setPrev={this.setPrev}
              />
          </View>
          <View 
            ref={'restView'}
            style={[{width:'100%'}, this.refs.rest ? this.refs.rest.refs.child.state.height : 0]}  
            renderToHardwareTextureAndroid={true}
          >
            <Rest
              progress={this.state.restProgress}
              clickEvent={this.categoryClickEvent}
              ref={'rest'}
              connection={this.props.screenProps.connection}
              setConnection={this.props.screenProps.setConnection}
              setProgress={this.setRestProgress}
              scrollTo={this.scrollToCategory}
              setPrev={this.setPrev}
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
    paddingTop:30,
  },
  scrollViewContentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf:'center'
  },
})