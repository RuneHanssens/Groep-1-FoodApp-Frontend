import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet
} from "react-native";

class AmountInput extends Component {
  /**
    props:
        value (number)
        setValue (func)
    */
  constructor(props) {
    super(props);
    this.state = {};
  }

  add = () => {
    let value = this.props.value;
    value += 1;
    this.props.setValue(value);
  };

  remove = () => {
    let value = this.props.value;
    if(value > 0){
        value -= 1;
        this.props.setValue(value);
    }
  };

  render() {
    let addBtn;
    let removeBtn;
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableOpacity style={styles.button} onPress={this.remove}>
          <Text style={styles.textStyle}>-</Text>
        </TouchableOpacity>
        <Text
          style={[
            {
              marginLeft: 10,
              marginRight: 10,
              width: 35,
              textAlign:'center',
            },
            styles.textStyle
          ]}
        >
          {this.props.value}
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.add}>
          <Text style={styles.textStyle}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    fontSize: 25
  }
});
export default AmountInput;
