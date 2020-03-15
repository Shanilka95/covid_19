import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ActivityIndicator, AsyncStorage, TouchableOpacity } from 'react-native';

import { FlatGrid } from 'react-native-super-grid';
import { Container, Icon, Badge } from 'native-base';
import Flag from 'react-native-flags';
import { flagList } from './FlagList';

export default class Example extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coronaData: [],
      localData: [],
      countryName: '',
      isLoading: true

    };
  }

  componentDidMount() {
    this.getCountryData();
  }

  // async getallData() {
  //   try {
  //     try {
  //       const response = await fetch('https://corona.lmao.ninja/all', {
  //         method: 'GET',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         }
  //       });
  //       const responseJson = await response.json();
  //       this.setState({
  //         coronaData: responseJson
  //       });
  //     }
  //     catch (error) {
  //       console.log(error);
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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

  async getFilteredData() {
    if (!this.state.countryName == "") {
      this.setState({
        localData: JSON.parse(await AsyncStorage.getItem('coronaData')).filter(x => x.country === this.state.countryName),
      })
    } else {
      this.retrieveData();
    }
  }

  async storedata() {
    await AsyncStorage.setItem('coronaData', JSON.stringify(this.state.coronaData));
  }

  async retrieveData() {
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
    return country === 'Bosnia and Herzegovina' || 
    country === 'Antigua and Barbuda' || 
    country === 'St. Vincent Grenadines' ? styles.itemTitle2 : styles.itemTitle
  }

  render() {
    const { countryName } = this.state;
    const countryX = this.findCountry(countryName);
    const compare = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <Container style={{ flex: 1, flexDirection: 'column', backgroundColor: '#2e2e2e' }}>

        <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>COVID - 19</Text>

        <View style={styles.searchBox}>
          <TextInput style={styles.inputs}
            placeholder="Search Country..."
            placeholderTextColor={'gray'}
            keyboardType="default"
            underlineColorAndroid='transparent'
            onChangeText={text => this.setState({ countryName: text })}
          />
          <Icon name='md-search' style={{ fontSize: 25, color: 'red', flex: 1 }} />
        </View>

        <ActivityIndicator
          size={"large"}
          color={"red"}
          animating={this.state.isLoading}
        />

        <FlatGrid
          itemDimension={250}
          items={countryX.length === 1 && compare(countryName, countryX[0].country) ? [] : countryX}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.itemContainer}>

              <View style={{ flexDirection: 'row' }}>
                <Flag
                  code={this.findFlag(item.country)}
                  size={48}
                />

                <Text style={this.titleStyleCondition(item.country)}>{item.country}</Text>
              </View>

              <Text style={styles.itemName2}>Cases : {item.cases}</Text>

              <Text style={styles.itemName2}>Today Cases : {item.todayCases}</Text>

              <Text style={styles.itemRecovered}>Recovered : {item.recovered}</Text>

              <Text style={styles.itemDeaths}>{item.deaths} Deaths</Text>

            </TouchableOpacity>
          )}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  searchBox: {
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 0.5,
    width: 330,
    height: 45,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'

  },
  inputs: {
    height: 45,
    flex: 6,
    marginLeft: 20
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor: 'red'
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    fontWeight: 'bold'
  },

  itemRecovered: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  itemDeaths: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },

  itemName2: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemTitle: {
    marginLeft: 5,
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },

  itemTitle2: {
    marginLeft: 5,
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },

  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
});