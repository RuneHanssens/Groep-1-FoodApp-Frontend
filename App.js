import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      number: 0
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.categoryContainer}>
          <Text>Category</Text>
        </View>
        <Button title='test' onPress={this.testfunc}/>
        <Text>{this.state.number}</Text>
      </View>
    );
  }

  testfunc = () => {
    alert('this is a test!')
    let x = this.state.number + 1;
    this.setState({
      number: x
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  categoryContainer: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 20,
    marginTop: 10,
    backgroundColor:'green',
    width: '80%',
  }
});
