import React from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,} from 'react-native';
import {responsiveFontSize,
  responsiveWidth} from 'react-native-responsive-dimensions';

export default class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.cardStyle = StyleSheet.create({
      card: {
        flex:1,
        backgroundColor:"white",
        elevation: 10,
        opacity:1,
      },
      card_text:{
        flex:1,
        width:"100%",
        fontSize: responsiveFontSize(2.5),
        textTransform:"uppercase",
        textShadowColor:"black",
        backgroundColor:"#1e3d59",
        textAlign:"center",
        textAlignVertical:"center",
        color:"#e0e0e0"
      },
      cImg:{
        flex:2,
        backgroundColor:"#FFF",
        justifyContent:"center",
        alignItems:"center"
      },
    });
    this.onClick = ()=>{}
    if(this.props.onPress != undefined) this.onClick = this.props.onPress;
  }
  render() {
    return (
      <View style={{height:responsiveWidth(60),width:responsiveWidth(40),margin:responsiveWidth(5)}}>
        <TouchableHighlight style = {this.cardStyle.card} onPress={this.onClick} activeOpacity = {0.5} underlayColor = {"#F9F9F9"}>
          <Animated.View style={{flex:1,width:"100%"}}>
            {/* <View style={this.cardStyle.cImg} >
              <Text style={{fontSize:25,textAlign:"center"}} >Space For Image</Text>
            </View> */}
            <Text style={this.cardStyle.card_text}>{this.props.name}</Text>
          </Animated.View>
        </TouchableHighlight>
      </View>
    );
  }
}