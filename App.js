import React from 'react';
import { StyleSheet,View,ScrollView,Text, Alert} from 'react-native';
import {responsiveFontSize, responsiveWidth,} from 'react-native-responsive-dimensions';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator,TransitionPresets} from 'react-navigation-stack';
import Card from './components/Card'; // Card Class import
import {CeaserCipher,MultiplicativeCipher, AffineCipher, AutoKeyCipher, PlayfairCipher,VigenereCipher, HillCipher} from './components/SymmetricAlgorithms'; 
import {RSACipher,DiffieHellmanCipher} from './components/AsymmetricAlgorithms'; 
import {HashingAlgorithm} from './components/HashingAlgorithm';
import {GCD,Modulas,PrimeTest,ModularInverse,PrimitiveRoots,CRT} from './components/OtherAlgorithms';
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
            <Card name="Ceaser Cipher" onPress = {() => this.props.navigation.navigate('CeaserCipher')}/>
            <Card name="Multiplicative Cipher" onPress = {() => this.props.navigation.navigate('MultiplicativeCipher')}/>
          </View>
          <View style={styles.cRow}>
            <Card name="Affine Cipher" onPress = {() => this.props.navigation.navigate('AffineCipher')}/>
            <Card name="AutoKey Cipher" onPress = {() => this.props.navigation.navigate('AutoKeyCipher')}/>
          </View>
          <View style={styles.cRow}>
            <Card name="PlayFair Cipher" onPress = {() => this.props.navigation.navigate('PlayfairCipher')}/>
            <Card name="Vigenère Cipher" onPress = {() => this.props.navigation.navigate('VigenereCipher')}/>
          </View>
          <View style={styles.cRow}>
            <Card name="Hill Cipher" onPress = {() => this.props.navigation.navigate('HillCipher')}/>
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
                <Card name="Diffie Hellman Key Exchange" onPress = {() => this.props.navigation.navigate('DiffieHellman')}/>
                <Card name="RSA" onPress = {() => this.props.navigation.navigate('RSACipher')}/>
            </View>
            </ScrollView>
        </View>
        );
    }
}
class OtherAlgorithm extends React.Component{
  static navigationOptions = {
      title: 'Mathematics',
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
            <Card name="Chinese Remainder Theorem" onPress = {() => this.props.navigation.navigate('chineseRemainderTheorem')}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}
class CryptoCalc extends React.Component{
  static navigationOptions = {
    title: 'Crypto Calc',
    headerRight: () => (
      <Text
        style={{color:"#FFF",marginRight:responsiveWidth(5)}}
        onPress={()=>{Alert.alert("About","The app is made available only for learning purposes.\n\nDeveloped by:\n\nPranav Bhuchhada\n  pranavbhuchhada@gmail.com\nStavan Adhyaru\n  stavanadhyaru@gmail.com")}}>About</Text>
    ),
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
            <Card name="Mathematics" onPress = {() => this.props.navigation.navigate('OtherAlgorithm')}/>
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
    VigenereCipher:{
      screen: VigenereCipher, 
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
    chineseRemainderTheorem:{
      screen:CRT,
    },
    DiffieHellman:{
      screen:DiffieHellmanCipher,
    },
    HillCipher:{
      screen:HillCipher,
    }
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#1e3d59',
    },
    headerTintColor: '#e0e0e0',
    headerTitleStyle: {
      fontSize: responsiveFontSize(3.5),
    },
    ...TransitionPresets.SlideFromRightIOS,
  },
}
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    backgroundColor: '#FFF',
  },
  sroller:{
    flex:1,
    width:"100%"
  },
  cRow:{
    flexDirection:"row",
  },
});
export default createAppContainer(root);