import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';
export default class ButtonExample extends Component {

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.props.navigation.navigate('Dashboard')
    }, 2000);
  }

  render() {

    return (
        <ImageBackground
          resizeMode={'center'}
          style={{ flex: 1, backgroundColor:'#1f0800' }}
          source={require('./images/covid19.jpg')}
        >

        </ImageBackground>

      
    );
  }
}