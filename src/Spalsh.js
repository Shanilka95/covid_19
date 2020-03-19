import React, { Component } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { StackActions } from '@react-navigation/native'
import Modal from "react-native-modal";
import Colors from './css/Colors';


export default class ButtonExample extends Component {

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace('Dashboard'));
    }, 2000);
  }

  render() {

    return (
      <ImageBackground
        resizeMode={'center'}
        style={{ flex: 1, backgroundColor: Colors.DarkBrown }}
        source={require('./images/covid19.jpg')}
      >
        {/* <View>
          <Modal 
          isVisible={true}
          animationIn={'zoomIn'}
          animationInTiming={1000}
          >
            <View style={{ flex: 1, alignItems:'center', justifyContent:'center',backgroundColor:Colors.White, borderRadius:10 }}>
              <Text style={{ backgroundColor: Colors.White }}>I am the modal content!</Text>
            </View>
          </Modal>
        </View> */}

      </ImageBackground>


    );
  }
}