import React from "react"
import {
  View,
  Text,
} from "react-native"
import Header from './../components/Header'

export default class DayScreen extends React.Component {
  render() {
    return (
      <View
        style={{
            paddingTop:30,
            flex:1,
        }}
      >
        <Header text={'Overzicht'}/>
        <Text
            style={{textAlign:'center'}}
        >Hier komt de overzichtspagina per week/maand/...</Text>
      </View>
    )
  }
}