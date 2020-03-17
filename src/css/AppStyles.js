import { StyleSheet } from "react-native";
import Colors from './Colors';

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.DarkGray
  },

  appTitle: {
    color: Colors.BurningRed,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
    textShadowColor:Colors.Black,
    textShadowOffset:{width:1, height:4},
    textShadowRadius:1,
  },

  searchIcon: {
    fontSize: 25,
    color: Colors.BurningRed,
    flex: 1
  },

  searchBox: {
    borderColor: Colors.Black,
    backgroundColor: Colors.White,
    borderRadius: 40,
    borderWidth: 0.5,
    width: 300,
    height: 45,
    marginBottom:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputs: {
    height: 45,
    flex: 6,
    marginLeft: 20
  },

  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 8,
    borderColor: Colors.White,
    borderWidth: 0.5,
    padding: 10,
    height: 150,
    backgroundColor: Colors.BurningRed,
  },

  itemName: {
    fontSize: 16,
    color: Colors.White,
    fontWeight: '600',
    fontWeight: 'bold',
    
  },

  recovered: {
    fontSize: 20,
    color: Colors.White,
    fontWeight: 'bold',
  },

  deaths: {
    fontSize: 18,
    color: Colors.Black,
    fontWeight: 'bold',
  },

  cases: {
    fontSize: 16,
    color: Colors.White,
    fontWeight: '600',
  },

  largeText: {
    marginLeft: 5,
    fontSize: 30,
    color: Colors.DarkGray,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowColor:Colors.White,
    textShadowOffset:{width:1, height:0.5},
    textShadowRadius:1,
  },

  smallText: {
    marginLeft: 5,
    fontSize: 20,
    color: Colors.DarkGray,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowColor:Colors.White,
    textShadowOffset:{width:1, height:0.5},
    textShadowRadius:1,
  },

});
