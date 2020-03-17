import React, { Component } from 'react';
import { View, Text, TextInput, ActivityIndicator, AsyncStorage, TouchableOpacity, StatusBar } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Container, Icon, Fab, Button, Card, CardItem, Body } from 'native-base';
import AnimateNumber from 'react-native-animate-number'
import Flag from 'react-native-flags';
import { flagList } from './assets/FlagList';
import AppStyles from './css/AppStyles';
import Colors from './css/Colors';

var cases, deaths, recovered = 0;

export default class Example extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coronaData: [],
      localData: [],
      countryName: '',
      isLoading: true,
      active: false,

      globeData: null,
      localGlobeData: null,
    };
  }

  componentDidMount() {
    this.retrieveData();
    this.getGlobeData();
  }

  async getGlobeData() {
    try {
      return fetch('https://corona.lmao.ninja/all', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })

        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson != null) {
            this.setState({
              globeData: responseJson,
            })
          }

          this.getCountryData();

        })
        .catch((error) => {
          console.log(error)
        });

    } catch (error) {
      console.log(error);
    }
  }

  async getCountryData() {
    try {
      return fetch('https://corona.lmao.ninja/countries', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })

        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson != null) {
            this.setState({
              coronaData: responseJson,
              isLoading: false
            })
            this.storedata();
          }
          this.retrieveData();
        })

        .catch((error) => {
          console.log(error)
        });

    } catch (error) {
      console.log(error);
    }
  }

  async storedata() {
    await AsyncStorage.setItem('globeData', JSON.stringify(this.state.globeData));
    await AsyncStorage.setItem('coronaData', JSON.stringify(this.state.coronaData));
  }

  async retrieveData() {
    this.setState({
      localGlobeData: JSON.parse(await AsyncStorage.getItem('globeData')),
    })

    cases = this.state.localGlobeData.cases;
    deaths = this.state.localGlobeData.deaths;
    recovered = this.state.localGlobeData.recovered;

    this.setState({
      localData: JSON.parse(await AsyncStorage.getItem('coronaData'))
    })

  }

  findCountry(query) {
    if (query === '') {
      return this.state.localData;
    }
    const { localData } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return localData.filter(x => x.country.search(regex) >= 0);
  }

  findFlag(country) {
    for (var i = 0; i < flagList.length; i++) {
      if (flagList[i].Country === country) {
        return flagList[i].Code;
      }
    }
  }

  titleStyleCondition(country) {
    return country === 'Bosnia and Herzegovina'
      || country === 'Antigua and Barbuda'
      || country === 'St. Vincent Grenadines'
      || country === 'Dominican Republic'
      || country === 'Dominican Republic'
      || country === 'Diamond Princess'
      || country === 'Trinidad and Tobago'
      || country === 'Equatorial Guinea'
      || country === 'U.S. Virgin Islands'
      ? AppStyles.smallText : AppStyles.largeText
  }

  render() {
    const { countryName } = this.state;
    const countryX = this.findCountry(countryName);
    const compare = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <Container style={AppStyles.container}>
        <StatusBar barStyle="" hidden={false} backgroundColor={Colors.Black} />
        <Text style={AppStyles.appTitle}>COVID - 19</Text>

        <View style={AppStyles.searchBox}>
          <TextInput style={AppStyles.inputs}
            placeholder="Search Country..."
            placeholderTextColor={'gray'}
            keyboardType="default"
            underlineColorAndroid='transparent'
            onChangeText={text => this.setState({ countryName: text })}
          />
          <Icon name='md-search' style={AppStyles.searchIcon} />
        </View>

        <Card transparent style={{ width: 300 }}>
          <CardItem style={{borderRadius:10}}>
            <Body>
            <Text style={{alignSelf:'center', fontSize:20, color:Colors.DarkGray, fontWeight:'bold'}}>Global Statistics</Text>
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', margin: 5 }}>
                  <View style={{ width: 80, height: 80, borderColor: Colors.Blue, borderRadius: 60, borderWidth:1, justifyContent: 'center', alignItems: 'center' }}>
                    <AnimateNumber
                      value={cases}
                      interval={15}
                      style={{fontSize:16, fontWeight:'bold', color:Colors.Blue}}
                      formatter={(val) => {
                        return parseInt(val)
                      }}
                    />

                  </View>
                  <Text style={{fontSize:16, color:Colors.Blue,fontWeight:'bold'}}>Cases</Text>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', margin: 5 }}>
                  <View style={{ width: 80, height: 80, borderColor: Colors.Green, borderRadius: 60, borderWidth:1, justifyContent: 'center', alignItems: 'center' }}>
                    <AnimateNumber
                      value={recovered}
                      interval={15}
                      style={{fontSize:16, fontWeight:'bold', color:Colors.Green}}
                      formatter={(val) => {
                        return parseInt(val)
                      }}
                    />

                  </View>
                  <Text style={{fontSize:16, color:'green', fontWeight:'bold'}}>Recovered</Text>
                </View>
                

                <View style={{ flexDirection: 'column', alignItems: 'center', margin: 5 }}>
                  <View style={{ width: 80, height: 80, borderColor: Colors.BurningRed, borderRadius: 60, borderWidth:1, justifyContent: 'center', alignItems: 'center' }}>
                    <AnimateNumber
                      value={deaths}
                      interval={15}
                      style={{fontSize:16, fontWeight:'bold', color:Colors.BurningRed}}
                      formatter={(val) => {
                        return parseInt(val)
                      }}
                    />

                  </View>
                  <Text style={{fontSize:16, color:Colors.BurningRed, fontWeight:'bold'}}>Deaths</Text>
                </View>

                

              </View>    
            </Body>
          </CardItem>
        </Card>

        

        <ActivityIndicator
          size={"large"}
          color={Colors.BurningRed}
          animating={this.state.isLoading}
        />

        <FlatGrid
          itemDimension={250}
          style={{ flex: 1, width: 320 }}
          items={countryX.length === 1 && compare(countryName, countryX[0].country) ? [] : countryX}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={AppStyles.itemContainer}>

              <View style={{ flexDirection: 'row' }}>
                <Flag
                  code={this.findFlag(item.country)}
                  size={48}
                />

                <Text style={this.titleStyleCondition(item.country)}>{item.country}</Text>
              </View>

              <Text style={AppStyles.cases}>Cases : {item.cases}</Text>



              <Text style={AppStyles.cases}>Today Cases : {item.todayCases}</Text>

              <Text style={AppStyles.recovered}>Recovered : {item.recovered}</Text>

              <Text style={AppStyles.deaths}>{item.deaths} Deaths</Text>

            </TouchableOpacity>
          )}
        />

        {/* <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: 'black' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="share" />
          <Button style={{ backgroundColor: '#34A34F' }}>
            <Icon name="logo-whatsapp" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name="logo-facebook" />
          </Button>
          <Button disabled style={{ backgroundColor: '#DD5144' }}>
            <Icon name="mail" />
          </Button>
        </Fab> */}
      </Container>
    );
  }
}