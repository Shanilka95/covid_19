import React, { Component } from 'react';
import { View, Text, TextInput, ActivityIndicator, AsyncStorage, TouchableOpacity, StatusBar, Image, Linking } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Container, Icon, Fab, Button, Card, CardItem, Body, Badge } from 'native-base';
import AnimateNumber from 'react-native-animate-number'
import Flag from 'react-native-flags';
import { flagList } from './assets/FlagList';
import AppStyles from './css/AppStyles';
import Colors from './css/Colors';
import Modal from "react-native-modal";
import { } from 'react-native-gesture-handler';

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
      click: false,

      globeData: null,
      localGlobeData: null,
      visible: false
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

  renderSearchBox() {
    return (
      <View style={AppStyles.searchBox}>
        <TextInput style={AppStyles.inputs}
          placeholder="Search Country..."
          placeholderTextColor={Colors.DarkGray}
          keyboardType="default"
          underlineColorAndroid='transparent'
          onChangeText={text => this.setState({ countryName: text })}
        />
        <Icon name='md-search' style={AppStyles.searchIcon} />
      </View>
    );
  }

  renderGlobalBox() {
    return (
      <Card transparent style={{ width: 320, }}>
        <CardItem style={{ borderRadius: 10, backgroundColor: Colors.DarkGray, borderColor: Colors.Black, borderWidth: 0.5, elevation: 10, height:180,  }}>
          <Body style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{
              alignSelf: 'center',
              fontSize: 22,
              color: 'white',
              fontWeight: 'bold',
              textShadowColor: Colors.Black,
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 1,
            }}>Global Statistics</Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <View style={{ flexDirection: 'column', alignItems: 'center', margin: 5 }}>
                <View style={{
                  width: 90,
                  height: 90,
                  borderColor: Colors.Blue,
                  borderRadius: 60,
                  borderWidth: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Image
                    source={require("./images/case.png")}
                    style={{ width: 30, height: 30 }}
                  />
                  <AnimateNumber
                    value={cases}
                    interval={15}
                    style={{
                      fontSize: 16, fontWeight: 'bold', color: Colors.Blue,
                      textShadowColor: Colors.Black,
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 1,
                    }}
                    formatter={(val) => {
                      return parseInt(val)
                    }}
                  />

                  <Text style={AppStyles.casesT}> Cases </Text>

                </View>
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'center', margin: 5 }}>
                <View style={{ width: 90, height: 90, borderColor: Colors.Green, borderRadius: 60, borderWidth: 3, justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require("./images/recover.png")}
                    style={{ width: 30, height: 30 }}
                  />

                  <AnimateNumber
                    value={recovered}
                    interval={15}
                    style={{
                      fontSize: 16, fontWeight: 'bold', color: Colors.Green, textShadowColor: Colors.Black,
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 1
                    }}
                    formatter={(val) => {
                      return parseInt(val)
                    }}
                  />

                  <Text style={AppStyles.recoveredT}> Cured </Text>

                </View>
              </View>


              <View style={{ flexDirection: 'column', alignItems: 'center', margin: 5 }}>
                <View style={{ width: 90, height: 90, borderColor: Colors.Red, borderRadius: 60, borderWidth: 3, justifyContent: 'center', alignItems: 'center' }}>

                  <Image
                    source={require("./images/boot.png")}
                    style={{ width: 30, height: 30 }}
                  />

                  <AnimateNumber
                    value={deaths}
                    interval={15}
                    style={{
                      fontSize: 16, fontWeight: 'bold', color: Colors.Red,
                      textShadowColor: Colors.Black,
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 1,
                    }}
                    formatter={(val) => {
                      return parseInt(val)
                    }}
                  />
                  <Text style={AppStyles.deathsT}> Deaths </Text>


                </View>

              </View>

            </View>
          </Body>
        </CardItem>
      </Card>
    );
  }

  renderLoading() {
    return (
      <ActivityIndicator
        size={"large"}
        color={Colors.BurningRed}
        animating={this.state.isLoading}
      />
    );
  }

  // returnCount(type, count) {
  //   if (type === "Cases") {
  //     return count === 1 ? count + " Case      " : count + " Cases      "
  //   } else {
  //     return count === 1 ? count + " Death " : count + " Deaths "
  //   }
  // }
  visibleDialog() {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    const { countryName } = this.state;
    const countryX = this.findCountry(countryName);
    const compare = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <Container style={AppStyles.container}>
        <StatusBar barStyle="" hidden={false} backgroundColor={Colors.Black} />

        {this.renderLoading()}

        <Text style={AppStyles.appTitle}>  COVID-19  </Text>

        {this.renderGlobalBox()}

        {this.renderSearchBox()}

        <FlatGrid
          itemDimension={300}
          staticDimension={320}
          items={countryX.length === 1 && compare(countryName, countryX[0].country) ? [] : countryX}
          renderItem={({ item, index }) => (
            <Card style={AppStyles.itemContainer}>

              <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Flag
                  style={{}}
                  code={this.findFlag(item.country)}
                  size={48}
                />
                <Text style={this.titleStyleCondition(item.country)}> {item.country} </Text>

              </View>

              <View style={{ width: 1, height: 10 }}></View>


              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 1 }}>
                  <Image
                    source={require("./images/case.png")}
                    style={{ width: 25, height: 25 }}
                  />
                  <Text style={AppStyles.cases}> {item.cases} </Text>
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 1, marginLeft: 30, marginRight: 30 }}>
                  <Image
                    source={require("./images/recover.png")}
                    style={{ width: 25, height: 25 }}
                  />
                  <Text style={AppStyles.recovered}> {item.recovered} </Text>
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 1 }}>
                  <Image
                    source={require("./images/boot.png")}
                    style={{ width: 25, height: 25 }}
                  />
                  <Text style={AppStyles.deaths}> {item.deaths} </Text>
                </View>

              </View>

              <View style={{ flexDirection: 'row', alignContent: 'center', margin: 20 }}>
                <Text style={{
                  fontSize: 16,
                  color: Colors.White,
                  fontWeight: 'bold',
                  textShadowColor: Colors.Black,
                  textShadowOffset: { width: 1, height: 2 },
                  textShadowRadius: 1,
                }}>Today  » </Text>

                <Text style={{
                  fontSize: 16,
                  color: Colors.White,
                  fontWeight: 'bold',
                  textShadowColor: Colors.Black,
                  textShadowOffset: { width: 1, height: 2 },
                  textShadowRadius: 5,
                }}> {item.todayCases} Cases </Text>

                {/* <Image
                  source={require("./images/today_cases.png")}
                  style={{ width: 25, height: 25 }}
                /> */}

                <Text style={{
                  fontSize: 16,
                  color: Colors.White,
                  fontWeight: 'bold',
                  textShadowColor: Colors.Black,
                  textShadowOffset: { width: 1, height: 2 },
                  textShadowRadius: 5,
                }}>  •   {item.todayDeaths} Deaths </Text>

                {/* <Image
                  source={require("./images/today_boot.png")}
                  style={{ width: 25, height: 25 }}
                /> */}

              </View>
            </Card>
          )}
        />

        <Modal
          style={{ justifyContent: 'center', alignItems: 'center' }}
          isVisible={this.state.visible}
          animationIn={'slideInDown'}
          animationOut={'slideOutDown'}
          animationInTiming={500}
          animationOutTiming={500}
        >
          <View
            style={{ width: 300, height: 400, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.White, borderRadius: 10 }}>

            <Image
              source={require("./images/cvd.jpg")}
              style={{ width: 280, height: 150, borderRadius: 10, }}
              resizeMode={'center'}
            />

            <Text style={{ fontSize:14,color: Colors.BurningRed, fontWeight: 'bold', marginTop:20 }}> DEVELOPMENT </Text>

            <View style={{ flexDirection: 'row', marginBottom:20 }}>
              <Text style={{ color: Colors.Black, fontSize: 20, }}> Shanilka Liyanage </Text>
              <Icon name="logo-linkedin" style={{ fontSize: 30, color: '#0e76a8', marginLeft: 5 }} onPress={() => Linking.openURL('https://www.linkedin.com/in/shanilka-liyanage9/')} />
              <Icon name="logo-facebook" style={{ fontSize: 30, color: '#3b5998', marginLeft: 5 }} onPress={() => Linking.openURL('https://www.facebook.com/shanilka95')} />
            </View>


            <Text style={{ fontSize: 14,color: Colors.BurningRed, fontWeight: 'bold' }}> IDEA & SUPPORT </Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: Colors.Black,fontSize: 20 }}> Danidu Chamikara </Text>
              <Icon name="logo-linkedin" style={{ fontSize: 30, color: '#0e76a8', marginLeft: 5 }} onPress={() => Linking.openURL('https://www.linkedin.com/in/danidu-chamikara-02a17811a/')} />
              <Icon name="logo-facebook" style={{ fontSize: 30, color: '#3b5998', marginLeft: 5 }} onPress={() => Linking.openURL('https://www.facebook.com/danidu.chamikara')} />
            </View>

            <View style={{ flexDirection: 'row', marginBottom:20 }}>
              <Text style={{ color: Colors.Black, fontSize: 20 }}> Udith Perera </Text>
              <Icon name="logo-linkedin" style={{ fontSize: 30, color: '#0e76a8', marginLeft: 5 }} onPress={() => Linking.openURL('https://www.linkedin.com/in/udithonline/')} />
              <Icon name="logo-facebook" style={{ fontSize: 30, color: '#3b5998', marginLeft: 5 }} onPress={() => Linking.openURL('https://www.facebook.com/udithonline')} />
            </View>

            <Button style={{ width: 80, height: 40, borderRadius: 5, padding: 5, justifyContent: 'center', alignItems: 'center', elevation: 8, backgroundColor: Colors.DarkGray }} onPress={() => this.visibleDialog()}>
              <Text style={{ color: Colors.White }}> OK </Text>
            </Button>
          </View>
        </Modal>



        <Fab
          active={this.state.active}
          direction="down"
          containerStyle={{}}
          style={{ backgroundColor: 'black', width: 50, height: 50, elevation: 10 }}
          position="topRight"
          onPress={() => this.visibleDialog()}>
          <Icon name="md-pulse" />
        </Fab>
      </Container>
    );
  }
}