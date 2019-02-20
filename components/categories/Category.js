import React, { Component } from "react"
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
  ActivityIndicator,
} from "react-native"

class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      clicked: false,
      isLoading: false,
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
    //this.props.scrollTo()
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
    this.onSubmit()
  }

  onSubmit = async () =>{
    this.setState({
      isLoading:true
    })
    if(this.props.connection){
      console.log('submitting category data')
      console.log(this.props.data)
      let postResponse = await fetch(`http://foodapp-backend.serveo.net/api/day/${this.props.apiUrl}`, {
        method: "POST",
        body: JSON.stringify(this.props.data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(postResponse)
      if(postResponse.status == 200){
        this.setState({
          isLoading:false
        })
        //other animation
        this.props.reset()
        let response = await fetch(
          `http://foodapp-backend.serveo.net/api/day/${this.props.apiUrl}/points`
        )
        console.log(response)
        let responseData = await response.json()
        this.props.setProgress(responseData)
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

  render() {
    const { borderRadius, barColor, fillColor, name } = this.props;

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp"
    })

    let dropDownView
    let confirm
    let loading
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
          marginTop: 30,
        }, 
        this.props.style,
        this.props.progress >= this.props.min
          ? {
            shadowOffset:{  width: 0,  height: 0,  },
            shadowColor: '#32913a',
            shadowOpacity: 2,
            elevation:100,
            shadowRadius:10
            }
          : {},
        this.props.progress >= this.props.max
            ?{
              shadowColor: '#bc4b09'
            }:{}
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
          style={styles.contentView}
          onLayout={event => {
            this.setState({
              height: event.nativeEvent.layout.height
            })
          }}
        >
          <Text
            style={{
              color: "#fff",
              alignSelf: "center",
              fontSize: 25,
              marginBottom: 20
            }}
          >
            {name}
          </Text>
          <View
            style={{
              flexDirection: "column"
            }}
          >
            {this.props.children}
            {dropDownView}
            {confirm}
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
