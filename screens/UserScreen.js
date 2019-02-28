import React from "react"
import {
  View,
  Text,
  TextInput,  
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
  StatusBar,
} from "react-native"
import Header from './../components/Header'

export default class DayScreen extends React.Component {

    setEMail = (value) =>{
        this.setState({
            email:value
        })
    }

    setPassword = (value) =>{
        this.setState({
            password:value
        })
    }

    login = () =>{
        console.log(this.state.email)
        console.log(this.state.password)
    }

  render() {
    return (
      <View
        style={{
            flex:1,
            paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.height,
        }}
      >
        <Header text={'Gebruiker'}/>
        <View
            style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity onPress={this.props.screenProps.logout} style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
      backgroundColor:'#ADC460',
      padding:15,
      borderRadius:10,
      width:'70%',
      marginBottom:15,
  },
  buttonText:{
      textAlign:'center',
      fontSize:18,
      color:'#fff'
  },
})