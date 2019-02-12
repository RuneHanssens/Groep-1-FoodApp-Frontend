import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet
} from "react-native";

class Category extends Component {
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

  render() {
    const {
      borderRadius,
      barColor,
      fillColor,
      duration,
      name,
      height
    } = this.props;

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp"
    });

    return (
      <View
        style={{
          flexDirection: "row",
          height,
          borderRadius,
          alignItems: "center",
          width: "100%"
        }}
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
            {
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              backgroundColor: barColor,
              width: widthInterpolated
            },
            this.props.progress == 100
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
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            top: 0,
            width: "100%",
            padding: 10
          }}
        >
          <Text
            style={{
              color: "#fff",
              alignSelf: "center",
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            {name}
          </Text>
          {this.props.children}
        </View>
      </View>
    );
  }
}
Category.defaultProps = {
  borderRadius: 10,
  barColor: "orange",
  fillColor: "blue",
  duration: 100,
  name: "default name",
  height: 100
};

export default Category;
