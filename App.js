import React from 'react'
import {AppState, AsyncStorage, ActivityIndicator, StyleSheet,View} from 'react-native'
import {createBottomTabNavigator, createAppContainer, createStackNavigator,} from 'react-navigation'

import DayScreen from './screens/DayScreen'
import OverviewScreen from './screens/OverviewScreen'
import UserScreen from './screens/UserScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import SecureStore from 'expo'

import { Ionicons } from 'react-native-vector-icons'

import Global from './Global'

const LoggedOutApp = createStackNavigator({
  Login:{
    screen:LoginScreen,
    navigationOptions: {
      header: null
    },
  },
  SignUp:{screen:SignUpScreen},
})

const LoggedInApp = createBottomTabNavigator({
  Vandaag:{screen:DayScreen},
  Overzicht:{screen:OverviewScreen},
  Gebruiker: {screen:UserScreen},
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Vandaag') {
        iconName = `ios-calendar`;
      } else if (routeName === 'Overzicht') {
        iconName = `ios-podium`;
      } else if ( routeName ==='Gebruiker'){
        iconName = `ios-person`
      }
      return <IconComponent name={iconName} size={25} color={tintColor} />
    },
  }),
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 12,
    },
  },
}
)


export default class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      connection:false,
      hasInternet:true,
      appState: AppState.currentState,
      isLoading: true,
      loggedIn:false,
      validToken:false,
      token: null,

      connectionChecked:false,
    }
  }

  setConnection = (value) =>{
    this.setState({
        connection:false
    })
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.checkServer()
    }
    if(this.state.appState == 'active' && nextAppState.match(/inactive|background/)){
      this.setState({
        connectionChecked:false
      })
    }
    this.setState({appState: nextAppState})
  }

  componentDidMount = async () => {
    AppState.addEventListener('change', this._handleAppStateChange)
    await this.checkAll()
    this.setState({
      isLoading:false
    })
    console.log('checking done')
  }

  
  checkAll = async () =>{
    console.log('Check all')
    await this.checkServer()
    if(this.state.connection && this.state.connectionChecked){
      await this.checkUser()
    }else{
      alert('geen verbinding met de server')
    }
  }

  checkUser = async () =>{
    if(await this.storageHasToken()){
      if (await this.testToken()){
        this.setState({
          loggedIn : true
        })
      } else {
        let user = await this.getUserFromStorage()
        if (user != null){
          console.log(user)
          this.getNewToken(user)
        }else{
          this.goToLogin()
        }
      }
    }else{
      this.goToLogin()
    }
  }

  goToLogin = () =>{
    this.setState({
      loggedIn:false
    })
  }

  storageHasToken = async () =>{
    console.log('Checking authentication token in storage...')
    try {
      let value = await Expo.SecureStore.getItemAsync('token')
      if (value !== null) {
        console.log('Token found: ' + value)
        this.setState({
          token:value
        })
        return true
      }else{
        console.log('No token found')
        this.setState({
          token:null
        })
        return false
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  testToken = async () => {
    console.log('Testing the token')
    let response = await fetch(`${Global.url}/api/user/day`,{
      headers:{
        "Authorization": this.state.token //with bearer 
      }
    })
    let status = await response.status
    console.log(response)
    if(status === 200){
      return true
    }else{
      return false
    }
  }

  getNewToken = async (user) =>{
    let postResponse = await fetch(`${Global.url}/login`, {
      method: "POST",
      body: JSON.stringify(user), //change to userName
      headers: {
      "Content-Type": "application/json"
      }
    })
    console.log(postResponse)
    if(postResponse.status == 200){
      this.saveToken(postResponse.headers.map.authorization)
      return true
    }else{
      return false
    }
  }

  getUserFromStorage = async () =>{
    console.log('Checking user in storage...')
    try {
      const username = await Expo.SecureStore.getItemAsync('username')
      const password = await Expo.SecureStore.getItemAsync('password')
      if (username !== null && password !== null) {
        return {username,password}
      }else{
        console.log('No user found')
        return null
      }
    } catch (error) {
    }
  }

  notLoggedIn = () =>{
    this.setState({
      loggedIn:false,
    })
  }

  saveToken = (token) =>{
    console.log('this is the token')
    console.log(token)
    this.setState({
      token
    })
    Expo.SecureStore.setItemAsync('token', token)
  }

  saveUser = (username, password) =>{
    Expo.SecureStore.setItemAsync('username',username)
    Expo.SecureStore.setItemAsync('password',password)
    this.setState({
      loggedIn:true,
      connection:true,
    })
    
  }

  checkServer = async () => {
    console.log('Checking server status...')
    let response = await fetch(`${Global.url}/api/status`)//change to status call
    let status = await response.status
    if(status === 200){
      console.log('Server status OK')
      this.setState({
        connection:true,
        connectionChecked:true,
      })
    }else{
      console.log('Server status NOK')
      this.setState({
        connection:false,
        connectionChecked:true,
      }) 
    }
  }

  failedConnection = () =>{
    this.setState({
      connection:false,
    })
  }

  logout = () =>{
    Expo.SecureStore.deleteItemAsync('username')
    Expo.SecureStore.deleteItemAsync('password')
    Expo.SecureStore.deleteItemAsync('token')
    this.setState({
      loggedIn:false,
    })
  }

  render(){
    let AppContainer = this.state.loggedIn ? createAppContainer(LoggedInApp) : createAppContainer(LoggedOutApp)
    return(
      !this.state.isLoading ?
        (<AppContainer screenProps={{
          connection:this.state.connection,
          checkServer:this.checkServer,
          failedConnection:this.failedConnection,
          appState:this.state.appState,
          connectionChecked:this.state.connectionChecked,
          setConnection:this.checkAll,
          getNewToken:this.getNewToken,
          saveUser:this.saveUser,
          logout:this.logout,
          token:this.state.token,
        }}/> )
      
      : 
      
      (<View style={styles.mainView}>
        <ActivityIndicator size="large"/>
      </View>)
    )
  }
}

const styles = StyleSheet.create({
  mainView:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  }
})