import React, { Component } from "react"
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert
} from "react-native"
import { Button } from "react-native-elements";
import Global from "./../../Global"
class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      clicked: false,
      isLoading: false,
      key:null,
      deletable:false,
    }
  }

  componentWillMount = () => {
    this.animation = new Animated.Value(this.props.progress);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration
      }).start()
    }
  }

 
  onClick = () => {
    this.props.clickEvent(this)
    let clicked = !this.state.clicked
    this.setState({
      clicked
    })
  }

  handleClickEvent = (sender) => {
    if(sender != this){
      this.setState({
        clicked:false
      })
    }
  }

  submit = () => {
    if(this.props.warningData){
      for (let i = 0; i < this.props.warningData.length; i++) {
        let data = JSON.parse(JSON.stringify(this.props.data))
        delete data.outdoors
        if(JSON.stringify(data) ==  JSON.stringify(this.props.warningData[i].data)){
          Alert.alert('Pas op', this.props.warningData[i].message)
        }
      }
    }
    this.onSubmit()
  }

  onSubmit = async () =>{
    console.log('this is the token!!!')
    console.log(this.props.token)
    this.setState({
      isLoading:true
    })
    if(this.props.connection){
      console.log('submitting category data')
      console.log(this.props.data)
      let postResponse = await fetch(`${Global.url}/api/user/day/${this.props.apiUrl}`, {
        method: "POST",
        body: JSON.stringify(this.props.data),
        headers: {
          "Content-Type": "application/json",
          "Authorization":this.props.token
        }
      })
      console.log(postResponse)
      if(postResponse.status == 200){
        this.setState({
          isLoading:false,
          deletable:true
        })
        this.props.reset()
        this.props.setProgress(await postResponse.json())
        
      }else if(postResponse.status == 403){
         
      }else{
        this.props.setConnection(false)
        this.setState({
          isLoading:false
        })
      } 
    }
    this.setState({
      clicked: false
    })
  }

  undo = async () =>{
    console.log('undoing')
    
    if(this.props.connection){
      console.log('submitting category data')
      console.log(this.props.data)
      let postResponse = await fetch(`${Global.url}/api/user/day/${this.props.apiUrl}/undo`, {
        headers: {
          "Authorization":this.props.token
        }
      })
      console.log(postResponse)
      if(postResponse.status == 200){
        this.props.setProgress(await postResponse.json())
      }
    }
    this.setState({
      deletable:false
    })
  }

  render() {
    const { borderRadius, barColor, fillColor, name } = this.props;

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp"
    })

    let dropDownView
    let confirm
    let undo
    if (this.state.clicked) {
      dropDownView = this.props.dropDownView;
      confirm = (
        <View
          style={{
            flex:1,
            flexDirection:'row',
            justifyContent:'space-evenly',
            alignItems:'center'
          }}
        >
          <ActivityIndicator hidesWhenStopped={true} animating={false} size='large'/>
          <TouchableOpacity
            onPress={this.submit}
            disabled={this.state.isLoading}
            style={{
              alignSelf: "center",
              backgroundColor: "#fff",
              borderRadius: 10,
              marginTop:20,
              marginBottom:5,
              
            }}
          >
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                color: '#000',
                padding: 10
              }}
            >
              Opslaan
            </Text>
          </TouchableOpacity>
          <ActivityIndicator hidesWhenStopped={true} animating={this.state.isLoading} color={'#fff'} size='large'/>
        </View>
      )
      if(this.state.deletable){
        undo = (
          <TouchableOpacity onPress={this.undo} style={{position:'absolute', bottom:5, right:5}}>
            <Image style={{width:30, height:30, }} source={require('../../images/undo-arrow.png')}/>
          </TouchableOpacity>
        )
      }
    } 

    let minMaxCheck
    if(this.props.progress >= this.props.min && this.props.progress < this.props.max){
        minMaxCheck = <Image style={{width:40,height:40}}source={require('../../images/checked.png')}/>
    }else if (this.props.progress > this.props.max) {
        minMaxCheck = <Image style={{width:40,height:40}}source={require('../../images/stop.png')}/>
    }

    return (
      <TouchableOpacity
        onPress={this.onClick}
        style={[{
          flexDirection: "row",
          height: this.state.height,
          borderRadius,
          alignItems: "center",
          width: "100%",
          marginTop: 20,
        }, 
        this.props.style,
      ]}
      >
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: fillColor,
              borderRadius
            }
          ]}
        />
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              backgroundColor: barColor,
              width: widthInterpolated
            },
            this.props.progress >= 100
              ? {
                  borderRadius,
                }
              : {
                  borderTopLeftRadius: borderRadius,
                  borderBottomLeftRadius: borderRadius
                }
          ]}
        />
        <View
          key={this.state.key}
          style={styles.contentView}
          onLayout={event => {
            if(this.state.clicked){
              this.props.scrollTo()
            }
            this.setState({
              height: event.nativeEvent.layout.height
            },()=>{
            })
          }}
        >
        <View
            style={{
                flexDirection:'row',
                justifyContent:'space-between',
            }}
        >
          <Text
            style={{
              color: "#fff",
              width:'80%',
              fontSize: 25,
              marginBottom: 20
            }}
          >
            {name}
          </Text>
          {minMaxCheck}
        </View>
          <View
            style={{
              flexDirection: "column"
            }}
          >
            {this.props.children}
            {dropDownView}
            {confirm}
            {undo}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

Category.defaultProps = {
  borderRadius: 10,
  barColor: "orange",
  fillColor: "blue",
  duration: 500,
  name: "default name"
}

const styles = StyleSheet.create({
  contentView: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    padding: 10
  },
  animatedContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0
  }
})
export default Category
