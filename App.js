import React from 'react';
import { StyleSheet,
  View,
  ScrollView} from 'react-native';
import {responsiveFontSize,responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator,TransitionPresets} from 'react-navigation-stack';
import Card from './components/Card'; // Card Class import
import {CeaserCipher,MultiplicativeCipher, AffineCipher, AutoKeyCipher, PlayfairCipher} from './components/SymmetricAlgorithms'; 
import {RSACipher} from './components/AsymmetricAlgorithms'; 
import {HashingAlgorithm} from './components/HashingAlgorithm';
import {GCD,Modulas,PrimeTest,ModularInverse,PrimitiveRoots} from './components/OtherAlgorithms';
class SymmetricAlgorithm extends React.Component{
  static navigationOptions = {
    title: 'Symmetric Algorithm',
  };
  constructor(props){
    super(props);
  }
  render(){
    return (
      <View style={styles.container}>
        <ScrollView style={styles.sroller}>
          <View style={styles.cRow}>
            <Card name="Additive Cipher" onPress = {() => this.props.navigation.navigate('CeaserCipher')}/>
            <Card name="Multiplicative Cipher" onPress = {() => this.props.navigation.navigate('MultiplicativeCipher')}/>
          </View>
          <View style={styles.cRow}>
            <Card name="Affine Cipher" onPress = {() => this.props.navigation.navigate('AffineCipher')}/>
            <Card name="AutoKey Cipher" onPress = {() => this.props.navigation.navigate('AutoKeyCipher')}/>
          </View>
          <View style={styles.cRow}>
            <Card name="PlayFair Cipher" onPress = {() => this.props.navigation.navigate('PlayfairCipher')}/>
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
                <Card name="RSA" onPress = {() => this.props.navigation.navigate('RSACipher')}/>
            </View>
            </ScrollView>
        </View>
        );
    }
}
class OtherAlgorithm extends React.Component{
  static navigationOptions = {
      title: 'Other Algorithms',
  };
  constructor(props){
      super(props);
  }
  render(){
    return (
      <View style={styles.container}>
        <ScrollView style={styles.sroller}>
          <View style={styles.cRow}>
            <Card name="GCD (Greatest common divisor)" onPress = {() => this.props.navigation.navigate('GCD')}/>
            <Card name="Modulus Operator" onPress = {() => this.props.navigation.navigate('Modulas')}/>
          </View>
          <View style={styles.cRow}>
            <Card name="Prime Test" onPress = {() => this.props.navigation.navigate('PrimeTest')}/>
            <Card name="Modular Inverse" onPress = {() => this.props.navigation.navigate('ModularInverse')}/>
          </View>
          <View style={styles.cRow}>
            <Card name="Primitive Root" onPress = {() => this.props.navigation.navigate('PrimitiveRoots')}/>
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
class CryptoCalc extends React.Component{
  static navigationOptions = {
    title: 'Crypto Calc',
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.sroller}>
          <View style={styles.cRow}>
            <Card name="Symmetric Algorithms" onPress = {() => this.props.navigation.navigate('SymmetricAlgorithm')}/>
            <Card name="Asymmetric Algorithms" onPress = {() => this.props.navigation.navigate('AsymmetricAlgorithm')}/>
          </View>
          <View style={styles.cRow}>
            <Card name="Hashing Algorithms" onPress = {() => this.props.navigation.navigate('HashingAlgorithm')}/>
            <Card name="Other Algorithms" onPress = {() => this.props.navigation.navigate('OtherAlgorithm')}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const config = {
  animation: 'timing',
  config: {
    duration : 1,
  },
};
const root = createStackNavigator({
    Home: {
      screen:CryptoCalc,
    },
    SymmetricAlgorithm: {
      screen: SymmetricAlgorithm
    },
    AsymmetricAlgorithm: {
      screen: AsymmetricAlgorithm
    },
    HashingAlgorithm: {
      screen: HashingAlgorithm
    },
    OtherAlgorithm: {
      screen: OtherAlgorithm
    },
    CeaserCipher: {
      screen: CeaserCipher
    },
    MultiplicativeCipher:{
      screen: MultiplicativeCipher,
    },
    RSACipher:{
      screen: RSACipher,
    },
    AffineCipher:{
      screen: AffineCipher,
    },
    AutoKeyCipher:{
     screen: AutoKeyCipher, 
    },
    PlayfairCipher:{
      screen: PlayfairCipher, 
    },
    GCD:{
      screen: GCD,
    },
    Modulas:{
      screen:Modulas,
    },
    PrimeTest:{
      screen:PrimeTest,
    },
    ModularInverse:{
      screen:ModularInverse,
    },
    PrimitiveRoots:{
      screen:PrimitiveRoots,
    },
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#087f23',
    },
    headerTintColor: '#e0e0e0',
    headerTitleStyle: {
      fontSize: responsiveFontSize(3.5),
    },
    ...TransitionPresets.SlideFromRightIOS,
  },
}
);
 
export default createAppContainer(root);

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
  },
});