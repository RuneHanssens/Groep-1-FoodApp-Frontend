import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  AppState
} from "react-native";
import Vegetables from './components/categories/Vegetables.js';
import Fruits from './components/categories/Fruits.js';
import Water from './components/categories/Water.js';
import Nuts from './components/categories/Nuts.js';
import FishMilkEggsPoultry from './components/categories/FishMilkEggsPoultry.js';
import RedMeat from './components/categories/RedMeat';
import BreadRicePotatoesPasta from './components/categories/BreadRicePotatoesPasta';
import Sport from './components/categories/Sport';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
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
    console.log('load progress')
    let response = await fetch('http://foodapp-backend.serveo.net/api/day/points')
    let data = await response.json()
    console.log(data)
    this.refs.waterCategory.setProgress(data.WATER)
    this.refs.vegetableCategory.setProgress(data.VEGETABLE)
    this.refs.fruitCategory.setProgress(data.FRUIT)
    this.refs.nutCategory.setProgress(data.NUTS)
    this.refs.starchCategory.setProgress(data.STARCHPRODUCT)
    this.refs.dairyFishPoultryCategory.setProgress(data.DAIRYFISHPOULTRY)
    this.refs.redMeatCategory.setProgress(data.FATTYFOOD)
    //TODO
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View
          style={{
            backgroundColor:'#fff',
            shadowOffset:{  width: 5,  height: 4,  },
            shadowColor: 'black',
            shadowOpacity: 0.1,
          }}
        >
          <Text style={{
                fontSize:30,
                textAlign:'center',
                marginBottom: 10,
              }}>Food app</Text>  
        </View>
        <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewContentStyle}>
          <Sport/>
          <Water ref='waterCategory'/>
          <Vegetables ref='vegetableCategory'/>
          <Fruits ref='fruitCategory'/>
          <Nuts ref='nutCategory'/>
          <BreadRicePotatoesPasta ref='starchCategory'/>
          <FishMilkEggsPoultry ref='dairyFishPoultryCategory'/>
          <RedMeat ref='redMeatCategory'/>
        </ScrollView>
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
    position: 'relative',
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
