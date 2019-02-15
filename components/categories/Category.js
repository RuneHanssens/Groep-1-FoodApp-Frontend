import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
  Image
} from "react-native";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      clicked: false
    };
  }
  componentWillMount = () => {
    this.animation = new Animated.Value(this.props.progress);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration
      }).start();
    }
  };

  onClick = () => {
    let clicked = !this.state.clicked;
    this.setState({
      clicked
    });
  };

  submit = () => {
    //closes itself + call parent submit
    this.props.onSubmit();
    this.setState({
      clicked: false
    });
  };

  render() {
    const { borderRadius, barColor, fillColor, name, height } = this.props;

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp"
    });

    let dropDownView;
    let confirmButton;
    if (this.state.clicked) {
      dropDownView = this.props.dropDownView;
      confirmButton = (
        <TouchableOpacity
          onPress={this.submit}
          style={{
            alignSelf: "center",
            backgroundColor: "#fff",
            borderRadius: 10
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: fillColor,
              padding: 10
            }}
          >
            Opslaan
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={this.onClick}
        style={[{
          flexDirection: "row",
          height: this.state.height,
          borderRadius,
          alignItems: "center",
          width: "100%",
          marginTop: 20,
        },this.props.style]}
      >
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: fillColor,
              borderRadius
            }
          ]}
        />
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              backgroundColor: barColor,
              width: widthInterpolated
            },
            this.props.progress >= 100
              ? {
                  borderRadius
                }
              : {
                  borderTopLeftRadius: borderRadius,
                  borderBottomLeftRadius: borderRadius
                }
          ]}
        />
        <View
          style={styles.contentView}
          onLayout={event => {
            this.setState({
              height: event.nativeEvent.layout.height
            });
          }}
        >
          <Text
            style={{
              color: "#fff",
              alignSelf: "center",
              fontSize: 25,
              marginBottom: 20
            }}
          >
            {name}
          </Text>
          <View
            style={{
              flexDirection: "column"
            }}
          >
            {this.props.children}
            {dropDownView}
            {confirmButton}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

Category.defaultProps = {
  borderRadius: 10,
  barColor: "orange",
  fillColor: "blue",
  duration: 100,
  name: "default name"
};

const styles = StyleSheet.create({
  contentView: {
    position: "absolute",
    left: 0,

    top: 0,
    width: "100%",
    padding: 10
  },
  animatedContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0
  }
});
export default Category;
