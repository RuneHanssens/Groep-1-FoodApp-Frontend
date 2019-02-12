import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Animated, Image } from "react-native";
import Category from "./components/Category.js";

export default class App extends React.Component {

  constructor(props){
    super(props)

  }

/*  render() {
    return (
      <View style={styles.container}>
      <ProgressBar
          row
          progress={0.5}
          duration={500}
      >
        <Text>Hello world!</Text>
      </ProgressBar>
      </View>
    );
  }*/
  render(){
    return (
      <View style={styles.container}>
        <Category
          row
          progress={0.1}
          duration={500}
        >
        </Category>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
});
