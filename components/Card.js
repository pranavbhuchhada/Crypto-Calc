import React from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableHighlight} from 'react-native';
import {responsiveFontSize,
  responsiveWidth} from 'react-native-responsive-dimensions';

export default class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.cardStyle = StyleSheet.create({
      card: {
        elevation: 10,
        opacity:1,
        flex:1,
        width:"100%",
        backgroundColor:"#1e3d59",
        justifyContent:"center",
        padding:responsiveWidth(2),
        borderRadius:responsiveWidth(5)
      },
      card_text:{
        textAlign:"center",
        textShadowColor:"black",
        fontSize: responsiveFontSize(2.5),
        color:"#e0e0e0"
      }
    });
    this.onClick = ()=>{}
    if(this.props.onPress != undefined) this.onClick = this.props.onPress;
  }
  render() {
    return (
      <View style={{height:responsiveWidth(40),width:responsiveWidth(40),margin:responsiveWidth(5)}}>
        <TouchableHighlight style = {this.cardStyle.card} onPress={this.onClick} activeOpacity = {0.5} underlayColor = {"#3c5a78"}>
            <Text style={this.cardStyle.card_text}>{this.props.name}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}