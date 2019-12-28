import React from 'react';
import { StyleSheet,
   Text,
   View,
   TouchableHighlight,
   Dimensions,
   ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class Card extends React.Component {
  constructor(props){
    super(props);
    const screenWidth = Math.round(Dimensions.get('window').width);
    this.state = {Width:screenWidth*0.4,Height:screenWidth*0.6,Margin:screenWidth*0.05}
  }
  onPress = ()=>{
    return;
  }
  render() {
    return (
      <View style={{height:this.state.Height,width:this.state.Width,margin:this.state.Margin}}>
        <TouchableHighlight style={styles.card} onPress={this.onPress} activeOpacity = {0.5} underlayColor = {"#F9F9F9"}>
          <View style={{flex:1,width:"100%"}}>
            <View style={styles.cImg} >
              <Text style={{fontSize:25}} >Space For Image</Text>
            </View>
            <Text style={styles.card_text}>{this.props.name}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.Header} >
        <Text style={styles.HeaderText}>Crypto-Calc</Text>
      </View>
      <ScrollView style={styles.sroller}>
        <View style={styles.cRow}>
          <Card name="Pranav Bhuchhada"/>
          <Card name="Stavan Adhyaru"/>
        </View>
        <View style={styles.cRow}>
          <Card name="Pranav Bhuchhada"/>
          <Card name="Stavan Adhyaru"/>
        </View>
        <View style={styles.cRow}>
          <Card name="Pranav Bhuchhada"/>
          <Card name="Stavan Adhyaru"/>
        </View>
        <View style={styles.cRow}>
          <Card name="Pranav Bhuchhada"/>
          <Card name="Stavan Adhyaru"/>
        </View>
        <View style={styles.cRow}>
          <Card name="Pranav Bhuchhada"/>
          <Card name="Stavan Adhyaru"/>
        </View>
        <View style={styles.cRow}>
          <Card name="Pranav Bhuchhada"/>
          <Card name="Stavan Adhyaru"/>
        </View>
        <View style={styles.cRow}>
          <Card name="Pranav Bhuchhada"/>
          <Card name="Stavan Adhyaru"/>
        </View>
        <View style={styles.cRow}>
          <Card name="Pranav Bhuchhada"/>
          <Card name="Stavan Adhyaru"/>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  Header:{
    flex:0.1,
    marginBottom:"5%",
    justifyContent:"center",
    width:"100%",
    backgroundColor:"#36382e",
    elevation:100,
  },
  HeaderText:{
    fontSize:40,
    textAlignVertical:"center",
    color:"#ede6e3",
    textAlign:"left",
    marginLeft:"10%"
  },
  sroller:{
    flex:0.85,
    width:"100%"
  },
  card: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"white",
    borderWidth:0.2,
    borderColor:"#AAA",
    borderRadius:2,
    shadowColor: 'red',
    shadowOffset: {width: 1,height:1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10,
  },
  card_text:{
    flex:1,
    width:"100%",
    fontSize:30,
    textTransform:"uppercase",
    fontFamily:"monospace",
    textShadowColor:"black",
    backgroundColor:"#36382e",
    textAlign:"center",
    textAlignVertical:"center",
    color:"#dadad9"
  },
  cRow:{
    flexDirection:"row",
  },
  cImg:{
    flex:2,
    backgroundColor:"#f06449",
    justifyContent:"center",
    alignItems:"center"
  },
});
