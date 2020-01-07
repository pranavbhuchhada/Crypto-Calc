import React from 'react';
import { StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Slider} from 'react-native';
import {responsiveFontSize,responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator,TransitionPresets} from 'react-navigation-stack';
// import Slider from '@react-native-community/slider';
// coustom Imports
import Card from './components/Card'; // Card Class import
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
class CeaserCipher extends React.Component{
  constructor(props){
      super(props);
      this.state={
        key:7,
        plaintext:"",
        ciphertext:"Cipher Text Appears here"
      };
      this.styles = StyleSheet.create({
        container:{
          flex:1,
          margin:responsiveWidth(5)
        },
        TextInputStyleClass:{
          textAlign: 'center',
          height: responsiveHeight(33),
          borderWidth: 1,
          borderColor: '#9E9E9E',
          // borderRadius: 20 ,
          backgroundColor : "#FFFFFF",
          fontSize:responsiveFontSize(2.5)
          // margin:responsiveWidth(5)
        },
        cipherout:{
          fontSize:responsiveFontSize(2.5),
          color:"#909090"
        },
        slider:{
          marginTop:responsiveWidth(5),
          marginBottom:responsiveWidth(5),
          width:responsiveWidth(85)
        }
      });
  }
  toCipher = (PlainText,Key)=>{
    this.setState({plaintext: PlainText});
    this.setState({key: Key});
    if (Key < 0)
      return caesarShift(PlainText, Key + 26);
    var output = '';
    for (var i = 0; i < PlainText.length; i ++) {
      var c = PlainText[i];
      if (c.match(/[a-z]/i)) {
        var code = PlainText.charCodeAt(i);
        if ((code >= 65) && (code <= 90))
          c = String.fromCharCode(((code - 65 + Key) % 26) + 65);
        else if ((code >= 97) && (code <= 122))
          c = String.fromCharCode(((code - 97 + Key) % 26) + 97);
      }
      output += c;
    }
    if(output!="")
      this.setState({ciphertext:output});
    else
      this.setState({ciphertext:"Cipher Text Appears here"});
  }
  render(){
      return(
          <View style={this.styles.container}>
              <Text style={{fontSize:responsiveFontSize(3)}}>Plain Text:</Text>
              <TextInput
                style={this.styles.TextInputStyleClass}
                placeholder={"Type Plain text in here"}
                placeholderTextColor={"#e0e0e0"}
                multiline={true}
                onChangeText={PlainText => this.toCipher(PlainText,this.state.key)}
              />
              <View style={{flexDirection:"row"}}>
                <Slider
                  style={this.styles.slider}
                  minimumValue={0}
                  maximumValue={25}
                  step={1}
                  value={7}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  onValueChange={Key=>this.toCipher(this.state.plaintext,Key)}
                />
                <Text style={{marginTop:responsiveWidth(5),fontSize:responsiveFontSize(2.3)}}>{this.state.key}</Text>
              </View>
              <Text style={{fontSize:responsiveFontSize(3),marginTop:responsiveHeight(2)}}>Cipher Text:</Text>
              <ScrollView>
                <Text style={this.styles.cipherout}>{this.state.ciphertext}</Text>
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
    }
    
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