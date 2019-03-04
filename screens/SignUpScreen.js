import React from "react"
import {
  View,
  Text,
  TextInput,  
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native"
import Header from './../components/Header'

export default class DayScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        email:'',
        password:'',
        passwordRepeat:'',
    }
}

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

  setPasswordRepeat = value =>{
    this.setState({
      passwordRepeat:value
    })
  }

  register = async () =>{
    if(this.state.password == this.state.passwordRepeat){
      let postResponse = await fetch(`http://193.191.177.8:10634/api/sign-up`, {
        method: "POST",
        body: JSON.stringify({password: this.state.password, username: this.state.email}), //change to userName
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(postResponse)
      if(postResponse.status == 200){
        this.setState({
          email:'',
          password:'',
          passwordRepeat:'',
        })
        this.props.navigation.navigate('Login')
      }else{
        alert('Account aanmaken mislukt probeer later opnieuw')
      }
    }else{
      alert('De wachtwoorden komen niet overeen.')
    }
  }

  render() {
    return (
      <View
        style={{
            paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.height,
            flex:1,
        }}
      >
        <View style={{
            flex:1, 
            flexDirection:'column',
            alignItems:'center',
        }}>
            <Text style={styles.title}>Maak een nieuw account</Text>
            
            <Text style={styles.textInputLabel}>Gebruikersnaam</Text>            
            <TextInput style={styles.input} textContentType={'emailAddress'} onChangeText={this.setEMail}/>
            
            <Text style={styles.textInputLabel}>Wachtwoord</Text>
            <TextInput style={styles.input} secureTextEntry={true} onChangeText={this.setPassword}/>

            <Text style={styles.textInputLabel}>Herhaal wachtwoord</Text>
            <TextInput style={styles.input} secureTextEntry={true} onChangeText={this.setPasswordRepeat}/>
            
            <TouchableOpacity style={styles.button} onPress={this.register}>
                <Text style={styles.buttonText}>Registreer</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input:{
      borderColor: 'gray',
      borderWidth: 0.75,
      width: '70%',
      padding:10,
      borderRadius:10,
      marginBottom:15,
  },
  title:{
      fontSize:20,
      fontWeight: 'bold',
      textAlign:'center',
      marginBottom:15,
  },
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
  textInputLabel:{
      color:'gray',
  }
})
