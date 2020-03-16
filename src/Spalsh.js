import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';
export default class ButtonExample extends Component {

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.props.navigation.navigate('Dashboard')
    }, 1000);
  }

  render() {

    return (
      <Container style={{
        flex: 1, backgroundColor: 'black', alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Button onPress={() => this.props.navigation.navigate('Dashboard')}>
          <Text>Click Me!</Text>
        </Button>
      </Container>
    );
  }
}