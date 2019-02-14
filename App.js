import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text
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
      progressTest: 0
    }
  }

  addProgress = () => {
    console.log("add progress");
    let newProgress = 0;
    if (this.state.progressTest >= 100) {
      newProgress = 0;
    } else {
      newProgress = this.state.progressTest + 10;
    }
    this.setState({
      progressTest: newProgress
    });
  };

  render() {
    return (
      <View style={styles.mainView}>
        <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewContentStyle}>
          <Text style={{
            fontSize:30,
            textAlign:'center',
            marginBottom: 10,
          }}>Food app</Text>
          <Sport/>
          <Water/>
          <Vegetables/>
          <Fruits/>
          <Nuts/>
          <BreadRicePotatoesPasta/>
          <FishMilkEggsPoultry/>
          <RedMeat/>
        </ScrollView>
      </View>
    );
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  scrollViewContentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf:'center'
  },
});
