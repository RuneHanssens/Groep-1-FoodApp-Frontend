import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import Category from "./components/Category.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressTest: 0
    };
  }

  addProgress = () => {
    console.log("add progress");
    let newProgress = 0;
    if (this.state.progressTest >= 100) {
      newProgress = 0;
    } else {
      newProgress = this.state.progressTest + 10;
    }
    console.log(newProgress);
    this.setState({
      progressTest: newProgress
    });
  };

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity
          style={styles.categoryContainer}
          onPress={this.addProgress}
        >
          <Category
            name={"Groenten"}
            progress={this.state.progressTest}
            duration={500}
            fillColor={'#7e9b4e'}
            barColor={'#758e48'}
            height={130}
          >
            <View
              style={{
                flex:1,
                flexDirection: 'row',
                justifyContent:'space-evenly',

              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require('./images/carrot.png')}
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require('./images/broccoli.png')}
              />
            </View>
          </Category>
        </TouchableOpacity>

        <View style={styles.categoryContainer}>
          <Category
              name={"Fruit"}
              progress={this.state.progressTest}
              duration={500}
              fillColor={'#7e9b4e'}
              barColor={'#758e48'}
              height={130}
            >
              <View
                style={{
                  flex:1,
                  flexDirection: 'row',
                  justifyContent:'space-evenly',

                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('./images/carrot.png')}
                />
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('./images/broccoli.png')}
                />
              </View>
            </Category>
          </View>

          <View style={styles.categoryContainer}>
          <Category
              name={"Fruit"}
              progress={this.state.progressTest}
              duration={500}
              fillColor={'#7e9b4e'}
              barColor={'#758e48'}
              height={130}
            >
              <View
                style={{
                  flex:1,
                  flexDirection: 'row',
                  justifyContent:'space-evenly',

                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('./images/carrot.png')}
                />
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('./images/broccoli.png')}
                />
              </View>
            </Category>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 20,
    justifyContent: 'space-evenly',
    flexDirection:'column',
    
  },
  categoryContainer: {
    alignItems: "center",
    flexDirection: "row",
    width: "90%"
  }
});
