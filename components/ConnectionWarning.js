import React from "react"
import {
  View,
  Text,
  Button,
} from "react-native"

export default class ConnectionWarning extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
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
                Geen verbinding met de server. Controleer je internetverbinding.
            </Text>
            <Button title='Probeer opnieuw' onPress={this.props.checkConnection}/>
        </View>
    )
  }
}