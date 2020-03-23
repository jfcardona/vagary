import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoadScreen from './components/LoadScreen';
import LoginScreen from './components/LoginScreen';

const RootStack = createStackNavigator(
{
  loadscreen: { screen: LoadScreen },
  loginscreen: { screen: LoginScreen },
},
{
    initialRouteName: 'loadscreen',
}

);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

