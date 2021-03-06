import React from "react"
import {
  View,
  Text,
  TextInput,  
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native"
import Header from './../components/Header'

export default class DayScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:'',
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

    login = async () =>{
        let username = this.state.email
        let password = this.state.password
        this.setState({
            email:'',
            password:'',
        })
        if(await this.props.screenProps.getNewToken({username, password})){
            this.props.screenProps.saveUser(username, password)
        }else{
            Alert.alert('', 'Combinatie van gebruikersnaam en wachtwoord klopt niet.')
        }   
    }

    navigateToRegister = () =>{
        this.setState({
            email:'',
            password:'',
        },()=>this.props.navigation.navigate('SignUp'))
    }

  render() {
    return (
      <View
        style={{
            flex:1,
            paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
        }}
      >
        <View style={{
            flex:1, 
            flexDirection:'column',
            alignItems:'center',
        }}>
            <Text style={styles.title}>Log in</Text>
            <Text style={styles.textInputLabel}>Gebruikersnaam</Text>
            <TextInput style={styles.input} textContentType={'emailAddress'} onChangeText={this.setEMail} value={this.state.email}/>
            <Text style={styles.textInputLabel}>Wachtwoord</Text>
            <TextInput style={styles.input} secureTextEntry={true} onChangeText={this.setPassword} value={this.state.password}/>
            <TouchableOpacity style={styles.button} onPress={this.login}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.navigateToRegister}>
                <Text style={styles.buttonText}>Nog geen account?</Text>
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