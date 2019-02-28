import React, { Component } from "react"
import { Dropdown } from 'react-native-material-dropdown'
import {
  View,
  StyleSheet,
  Image
} from "react-native"
import Category from './Category'
import { CheckBox } from 'react-native-elements';

class RedMeat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type:'Rood Vlees',
      outdoors:false,
    }
  }

  setProgress = (value) =>{
    this.setState({
      progress:value
    })
  }

  reset = () =>{
    this.setState({
      type:'Rood Vlees'
    })
  }

  scrollTo = (sender) => {
    this.props.scrollTo('redMeatView',sender)
  }

  render() {
    dropDownView = (
      <View>
        <Dropdown 
            label='Selecteer het product'
            data={[{value:'Rood Vlees',},{value:'Bewerkt Vlees',},{value:'Boter',},{value:'Beleg',}]} 
            value={this.state.type}
            onChangeText={(value)=>this.setState({type:value})}
            style={{
              color:'#fff',
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
         <CheckBox
          center
          title='Buitenshuis'
          checkedColor={'#fff'}
          uncheckedColor={'#fff'}
          size={30}
          checked={this.state.outdoors}
          onPress={() => this.setState({outdoors: !this.state.outdoors})}
          containerStyle={{
            backgroundColor:null,
            borderWidth:0,
            margin:0,
            padding:0,
            marginTop:10
          }}
          textStyle={{
            color:'#fff',
            fontWeight:'normal'
          }}
        />
      </View>
    )
    return (
      <Category
            ref={'child'} 
            name={"Vlees en Boter"}
            progress={this.props.progress}
            duration={500}
            fillColor={"#F7AC4B"}
            barColor={"#d18b32"}
            clickEvent={this.props.clickEvent}
            dropDownView={dropDownView}
            data={{type:this.state.type, outdoors:this.state.outdoors}}
            apiUrl={'fattyfood'}
            reset={this.reset}
            setProgress={this.props.setProgress}
            connection={this.props.connection}
            setConnection={this.props.setConnection}
            min={0}
            max={50}
            scrollTo={this.scrollTo}
            setPrev={this.props.setPrev}
            token={this.props.token}
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
                source={require("../../images/steak.png")}
              />
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../images/butter.png")}        
              />
            </View>
          </Category>
    );
  }
}

const styles = StyleSheet.create({

})
export default RedMeat
