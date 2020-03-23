import React, { Component } from "react";
import { View, Animated, StyleSheet, Text } from "react-native";
import LoginScreen from "./LoginScreen";

export default class LoadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: new Animated.Value(0),
      endValue: 1,
      duration: 3000,
      bandera : false
    };

   
  }

  componentDidMount() {
Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
      duration: this.state.duration,
      useNativeDriver: true
    }).start(() => {
    console.log(this.state.bandera);
      this.setState({
        bandera:true
      })          
       console.log(this.state.bandera);

    });
  }

  render() {
    const  { bandera } =this.state;
    return (
     <View style={styles.container}>
     { bandera ? (<LoginScreen/>) : (<View style={styles.container}>
        <Animated.View
          style={[styles.square, { opacity: this.state.startValue }]}
        >
          <Text style={styles.texto} >VAGARY</Text>
        </Animated.View>
      </View>
   
      )
         }
      </View>
     
      
      );  
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  square: {
     flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  texto: {
    fontSize: 28,
    textAlign: "center",
    margin: 10
  }
});
