import React from "react"
import {
  View,
  Text,
  Platform
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
          elevation: 10,
          zIndex:10,
          paddingTop:Platform.OS === 'ios' ? 0 : 10,
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