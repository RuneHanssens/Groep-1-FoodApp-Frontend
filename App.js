import React from 'react'
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
      connection:false
    }
  }

  componentDidMount = () => {
    this.checkConnection()
  }

  checkConnection = async () => {
    console.log('checking connection to server')
    let response = await fetch('http://foodapp-backend.serveo.net/api/day/points')//change to status call
    let status = await response.status
    console.log(status)
    if(status === 200){
      this.setState({
        connection:true
      })
    }else{
      this.setState({
        connection:true
        //CHANGE THIS TO FALSE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
      }}/>
    )
  }
}

