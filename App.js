import React from 'react';
import { StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Easing} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// coustom Imports
import Card from './components/Card'; // Card Class import
import {SymmetricAlgorithm,AsymmetricAlgorithm,HashingAlgorithm,OtherAlgorithm} from './components/Algorithms'

class CryptoCalc extends React.Component{
  static navigationOptions = {
    title: 'Crypto Calc',
    headerStyle: {
      backgroundColor: '#087f23',
    },
    headerTintColor: '#e0e0e0',
    headerTitleStyle: {
      fontSize: responsiveFontSize(3.5),
    },
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

const root = createStackNavigator({
    Home: {
      screen:CryptoCalc
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

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
 
      const thisSceneIndex = scene.index;
      const width = layout.initWidth;
 
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [-width, 0],
        extrapolate: 'clamp'
      });
 
      return {
        transform: [{ translateX }]
      }
    }
  }
}