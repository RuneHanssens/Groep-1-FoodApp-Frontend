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

   constructor(props){
     super(props)
     this.state = {
        username:null
     }
   }

    componentDidMount = () =>{
        this.getUsername()
    }


  getUsername = async () =>{
    try {
      const username = await Expo.SecureStore.getItemAsync('username')
      if (username !== null) {
        this.setState({username})
      }else{
        console.log('No user found')
        return null
      }
    } catch (error) {
    }
  }

  render() {
    let welcome = (this.state.username ? <Text style={styles.welcome}>Welkom {this.state.username}!</Text> : null)
    return (
      <View
        style={{
            flex:1,
            paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
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
              {welcome}
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
  welcome:{
    fontSize:20,
    marginBottom:20,
  }
})