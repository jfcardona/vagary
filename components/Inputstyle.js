import React, { Component } from 'react';
import { View, StatusBar, TextInput, Animated } from 'react-native';

export default class Inputstyle extends React.Component {
  state = {
    isFocused: false,
    isBig: this.props.isBig,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1
    );
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const { label, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
       fontWeight: 'bold',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#000'],
      }),
    };
    return (
      <View style={{  width: "80%"  }}>
{this.props.isBig ? ( <View style={{ paddingTop: 18, width: "100%"  }}><Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
                     multiline
              numberOfLines={4}
              editable
          style={{
            width: "100%",
            maxHeight: "73%",
            marginBottom: 10,
            color: '#000',
            borderBottomWidth: 1,
            borderBottomColor: '#555',
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        </View>
):(<View style={{ paddingTop: 18, width: "100%"  }}><Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
          style={{
            width: "100%",
            marginBottom: 10,
            color: '#000',
            borderBottomWidth: 1,
            borderBottomColor: '#555',
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
        </View>)}
      </View>
    );
  }
}

