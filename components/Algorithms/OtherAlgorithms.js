import React from 'react';
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
        <Text style={styles.HeaderText}>Symmetric Algorithms</Text>
      </View>
      <ScrollView style={styles.sroller}>
        <View style={styles.cRow}>
          <Card name="GCD Euclidean"/>
          <Card name="Modulus"/>
        </View>
        <View style={styles.cRow}>
          <Card name="Prime Number"/>
          <Card name="Multiplicative Inverse"/>
        </View>
        <View style={styles.cRow}>
          <Card name="Miller Rabin Algorithm"/>
          <Card name="Chinese Remainder Theorem"/>
        </View>
        <View style={styles.cRow}>
          <Card name="Square and Multiply"/>
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
