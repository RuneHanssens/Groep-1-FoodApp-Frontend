import React from "react"
import {
  View,
  Text,
} from "react-native"


export default class ButtonHeader extends React.Component {
  render() {
    
    let date
    let text
    if(this.props.dateOnly){

        text = (<Text style={{
            fontSize:30,
            textAlign:'center',
            }}>{this.props.date}</Text>)
    }else{

        text = (<Text style={{
            fontSize:30,
            textAlign:'center',
            }}>{this.props.text}</Text>)
        date = (<Text style={{textAlign:'center'}}>{this.props.date}</Text>)
    }
    
    return (
        <View
        style={{
          backgroundColor:'#fff',
          shadowOffset:{  width: 5,  height: 4,  },
          shadowColor: 'black',
          shadowOpacity: 0.1,
          elevation: 10,
          zIndex:10,
          justifyContent:'center',
          alignItems: 'center',
          paddingBottom: 10,
          height:'10%',
            }}
        >
            <View
                style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width:'90%'
                }}
            >
                {this.props.backButton}
                <View>
                    {text}
                    {date}
                </View>
                {this.props.nextButton}
            </View>
        </View>
    )
  }
}