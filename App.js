import React from 'react';
import { createstackNavigator } from 'react-navigation';
//import  SymmetricAlgorithms from './components/Algorithms/SymmetricAlgorithms'
import { StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  Animated,
  ToastAndroid} from 'react-native';
import {responsiveFontSize,
  responsiveWidth} from 'react-native-responsive-dimensions';

// coustom Imports
import Card from './components/Card'; // Card Class import

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.Header} >
        <Text style={styles.HeaderText}>Crypto-Calc</Text>
      </View>
      <ScrollView style={styles.sroller}>
        <View style={styles.cRow}>
          <Card name="Symmetric Algorithms" />
          <Card name="Asymmetric Algorithms"/>
        </View>
        <View style={styles.cRow}>
          <Card name="Hashing Algorithms"/>
          <Card name="Other Algorithms"/>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    backgroundColor: '#5bc3eb',
  },
  Header:{
    flex:0.1,
    marginBottom:"5%",
    justifyContent:"center",
    width:"100%",
    backgroundColor:"#36382e",
  },
  HeaderText:{
    fontSize:responsiveFontSize(4),
    textAlignVertical:"center",
    color:"#ede6e3",
    marginLeft:"5%"
  },
  sroller:{
    flex:0.85,
    width:"100%"
  },

  cRow:{
    flexDirection:"row",
  },
});
