import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

export default class ConnectionWarning extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  check = () =>{

  }


  render() {
    return (
        <View
          style={{
            height:'100%',
            width:'100%',
            backgroundColor:'white',
            opacity:0.8,
            position:'absolute',
            bottom:0,
            left:0,
            justifyContent:'center',
            alignItems:'center'
          }}
        >
            <Text
                style={{
                    fontSize:30,
                    textAlign:'center',
                    width:'90%',
                }}
            >
                Er is iets misgegaan duw op onderstaande knop en probeer dan nog eens opnieuw.
            </Text>
            <TouchableOpacity  style={styles.button}onPress={this.props.checkServer}>
              <Text style={styles.buttonText}>Controleer</Text>
            </TouchableOpacity>
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
      marginTop:20,
  },
  buttonText:{
      textAlign:'center',
      fontSize:18,
      color:'#fff'
  },
})
