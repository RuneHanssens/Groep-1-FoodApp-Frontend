import React from "react"
import {
  View,
  Text,
} from "react-native"


export default class Header extends React.Component {
  render() {
    return (
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
                }}>{this.props.text}</Text>  
        </View>
    )
  }
}