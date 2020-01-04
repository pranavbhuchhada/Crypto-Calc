import React from 'react';
import {StyleSheet,
  View,
  ScrollView,} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
// coustom Imports
import Card from './Card';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: '#e0e0e0',
    },
    sroller:{
      flex:0.85,
      width:"100%"
    },
    cRow:{
      flexDirection:"row",
    }
});
class SymmetricAlgorithm extends React.Component{
  static navigationOptions = {
    title: 'Symmetric Algorithm',
    headerStyle: {
      backgroundColor: '#087f23',
    },
    headerTintColor: '#e0e0e0',
    headerTitleStyle: {
      fontSize: responsiveFontSize(3.5),
    },
  };
  constructor(props){
    super(props);
  }
  render(){
    return (
      <View style={styles.container}>
        <ScrollView style={styles.sroller}>
          <View style={styles.cRow}>
            <Card name="Additive Cipher" />
            <Card name="Multiplicative Cipher" />
          </View>
          <View style={styles.cRow}>
            <Card name="Affine Cipher" />
            <Card name="AutoKey Cipher" />
          </View>
          <View style={styles.cRow}>
            <Card name="PlayFair Cipher" />
            <Card name="Vigenere Cipher" />
          </View>
          <View style={styles.cRow}>
            <Card name="Hill Cipher" />
          </View>
        </ScrollView>
      </View>
    );
  }
}
class AsymmetricAlgorithm extends React.Component{
    static navigationOptions = {
        title: 'Asymmetric Algorithm',
        headerStyle: {
            backgroundColor: '#087f23',
        },
        headerTintColor: '#e0e0e0',
        headerTitleStyle: {
            fontSize: responsiveFontSize(3.5),
        },
    };
    constructor(props){
        super(props);
    }
    render(){
        return (
        <View style={styles.container}>
            <ScrollView style={styles.sroller}>
            <View style={styles.cRow}>
                <Card name="Diffie Hellman Cipher" />
                <Card name="RSA Cipher" />
            </View>
            </ScrollView>
        </View>
        );
    }
}
class HashingAlgorithm extends React.Component{
  static navigationOptions = {
      title: 'Hashing Algorithm',
      headerStyle: {
          backgroundColor: '#087f23',
      },
      headerTintColor: '#e0e0e0',
      headerTitleStyle: {
          fontSize: responsiveFontSize(3.5),
      },
  };
  constructor(props){
      super(props);
  }
  render(){
    return (
      <View style={styles.container}>
        <ScrollView style={styles.sroller}>
          <View style={styles.cRow}>
            <Card name="MD-5"/>
            <Card name="SHA-1"/>
          </View>
          <View style={styles.cRow}>
            <Card name="SHA-224"/>
            <Card name="SHA-256"/>
          </View>
          <View style={styles.cRow}>
            <Card name="SHA-384"/>
            <Card name="SHA-512"/>
          </View>
        </ScrollView>
      </View>
    );
  }
}
class OtherAlgorithm extends React.Component{
  static navigationOptions = {
      title: 'Other Algorithm',
      headerStyle: {
          backgroundColor: '#087f23',
      },
      headerTintColor: '#e0e0e0',
      headerTitleStyle: {
          fontSize: responsiveFontSize(3.5),
      },
  };
  constructor(props){
      super(props);
  }
  render(){
    return (
      <View style={styles.container}>
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
}
export {
    SymmetricAlgorithm,
    AsymmetricAlgorithm,
    HashingAlgorithm,
    OtherAlgorithm
}