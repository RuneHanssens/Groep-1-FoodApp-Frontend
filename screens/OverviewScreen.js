import React from "react"
import {
  View,
  Text,
  Platform,
  StatusBar
} from "react-native"
import Header from './../components/Header'

export default class DayScreen extends React.Component {
  render() {
    return (
      <View
        style={{
            flex:1,
            paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.height,
        }}
      >
        <Header text={'Overzicht'}/>
        <Text
            style={{textAlign:'center', alignSelf: 'center', marginTop: 200,}}
        >Hier komt de overzichtspagina per week/maand/...</Text>
      </View>
    )
  }
}