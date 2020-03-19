import { StyleSheet } from "react-native";
import Colors from './Colors';

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.White
  },

  appTitle: {
    color: Colors.BurningRed,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: Colors.Gray,
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 8,
  },

  searchIcon: {
    fontSize: 25,
    color: Colors.BurningRed,
    flex: 1
  },

  searchBox: {
    margin:8,
    backgroundColor: Colors.White,
    borderRadius: 40,
    width: 300,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation:10
  },

  inputs: {
    height: 45,
    flex: 6,
    marginLeft: 20
  },

  itemContainer: {
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 8,
    padding: 10,
    height: 200,
    backgroundColor: Colors.DarkGray,
    elevation: 8
  },

  itemName: {
    fontSize: 16,
    color: Colors.White,
    fontWeight: '600',
    fontWeight: 'bold',

  },

  cases: {
    fontSize: 20,
    color: Colors.Blue,
    fontWeight: 'bold',
    textShadowColor: Colors.Black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },

  casesT: {
    fontSize: 12,
    color: Colors.Blue,
    fontWeight: 'normal',
    textShadowColor: Colors.Black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },

  recovered: {
    fontSize: 20,
    color: Colors.Green,
    fontWeight: 'bold',
    textShadowColor: Colors.Black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },

  recoveredT: {
    fontSize: 12,
    color: Colors.Green,
    fontWeight: 'normal',
    textShadowColor: Colors.Black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },


  deaths: {
    fontSize: 20,
    color: Colors.Red,
    fontWeight: 'bold',
    textShadowColor: Colors.Black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,

  },
  deathsT: {
    fontSize: 12,
    color: Colors.Red,
    fontWeight: 'normal',
    textShadowColor: Colors.Black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,

  },

  

  largeText: {
    fontSize: 28,
    color: Colors.White,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowColor: Colors.Black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },

  smallText: {
    fontSize: 18,
    color: Colors.White,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowColor: Colors.Black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },

});
