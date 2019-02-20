import React from 'react'
import {AppState,} from 'react-native'
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'

import DayScreen from './screens/DayScreen'
import OverviewScreen from './screens/OverviewScreen'

import { Ionicons } from 'react-native-vector-icons'

const AppNav = createBottomTabNavigator({
  Vandaag:{screen:DayScreen},
  Overzicht:{screen:OverviewScreen}
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
//TODO add icons etc...
const AppContainer = createAppContainer(AppNav)

export default class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      connection:true,
      connectionChecked:false,
      appState: AppState.currentState
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
      this.checkConnection()
    }
    console.log(nextAppState)
    this.setState({appState: nextAppState})
  }

  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange)
    console.log('App.js mounted')
    this.checkConnection()
  }

  checkConnection = async (callback) => {
    console.log('checking connection to server...')
    let response = await fetch('http://foodapp-backend.serveo.net/api/day/points')//change to status call
    let status = await response.status
    console.log(status)
    if(status === 200){
      console.log('Connection OK')
      this.setState({
        connection:true,
        connectionChecked:true,
      },() => {
        if(callback){
          if(typeof callback === 'function'){
            callback()
          }
        }
      })
    }else{
      console.log('Connection NOK')
      this.setState({
        connection:true,
        //CHANGE THIS TO FALSE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        connectionChecked:true,
      }) 
    }
  }

  failedConnection = () =>{
    this.setState({
      connection:false
    })
  }

  render(){
    return(
      <AppContainer screenProps={{
        connection:this.state.connection,
        checkConnection:this.checkConnection,
        failedConnection:this.failedConnection,
        appState:this.state.appState,
        connectionChecked:this.state.connectionChecked,
        setConnection:this.setConnection,
      }}/>
    )
  }
}

