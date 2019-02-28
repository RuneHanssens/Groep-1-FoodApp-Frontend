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
        if(await this.props.screenProps.getNewToken({userName:this.state.email, password:this.state.password})){
            this.props.screenProps.saveUser(this.state.email, this.state.password)
        }else{
            Alert.alert('', 'Combinatie van gebruikersnaam en wachtwoord klopt niet.')
        }   
        this.setState({
            email:'',
            password:'',
        })
    }

    navigateToRegister = () =>{
        this.props.navigation.navigate('SignUp')
    }

  render() {
    return (
      <View
        style={{
            flex:1,
            paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.height,
        }}
      >
        <View style={{
            flex:1, 
            flexDirection:'column',
            alignItems:'center',
        }}>
            <Text style={styles.title}>Log in</Text>
            <Text style={styles.textInputLabel}>Email</Text>
            <TextInput style={styles.input} textContentType={'emailAddress'} onChangeText={this.setEMail}/>
            <Text style={styles.textInputLabel}>Wachtwoord</Text>
            <TextInput style={styles.input} secureTextEntry={true} onChangeText={this.setPassword}/>
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