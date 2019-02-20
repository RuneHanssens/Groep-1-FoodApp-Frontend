import React, { Component } from "react"
import { Dropdown } from 'react-native-material-dropdown'
import {
  View,
  StyleSheet,
  Image
} from "react-native"
import Category from './Category'
class Sport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type:'Wandelen',
      time:30,
    }
  }

  reset = () =>{
    this.setState({
      type:'Wandelen',
      time:30,
    })
  }

  render() {
    let sportData =
    dropDownView = (
      <View>
        <Dropdown 
          onChangeText={(value) => this.setState({type:value})}
          label='Selecteer de sport'
          data={[{value:'Wandelen'},{value:'Lopen'},{value:'Zwemmen'},{value:'Fietsen'},{value:'Anders'}]}
          value={this.state.type}
          style={{
            color:'#000',
            fontSize: 20,
          }}
          itemTextStyle={{
            alignSelf:'center',
          }}
          containerStyle={{
            width:'85%',
            alignSelf: 'center',
          }}
          />
          <Dropdown 
          onChangeText={(value) => this.setState({time:value})}
          label='Selecteer het aantal minuten'
          data={[{value:30},{value:60}]} 
          value={this.state.time}
          style={{
            color:'#000',
            fontSize: 20,
          }}
          itemTextStyle={{
            alignSelf:'center',
          }}
          containerStyle={{
            width:'85%',
            alignSelf: 'center',
          }}
          />
      </View>
    )

   

    return (
      <Category
            ref={'child'}
            name={"Sport"}
            progress={this.props.progress}
            duration={500}
            fillColor={"#e5e7ea"}
            barColor={"#c6c9ce"}
            clickEvent={this.props.clickEvent}
            dropDownView={dropDownView}
            data={{
                type:this.state.type,
                time:this.state.time}}
            apiUrl={'movement'}
            reset={this.reset}
            setProgress={this.props.setProgress}
            connection={this.props.connection}
            setConnection={this.props.setConnection}
            min={100}
            max={1000}
            scrollTo={this.props.scrollTo}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly"
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/pedestrian-walking.png")}
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/swimming-figure.png")}        
              />
               <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/bicycle-rider.png")}        
              />
               <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/running.png")}        
              />
            </View>
          </Category>
    );
  }
}

const styles = StyleSheet.create({

})
export default Sport
