import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Platform
} from 'react-native';
import {responsiveFontSize,responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {gcd} from './UtilityFunctions.js';

class GCD extends React.Component{
  constructor(props){
    super(props);
    this.state={
      Numbers:"",
      output:"",
      numbers:[]
    };
    this.styles = StyleSheet.create({
      container:{
        flex:1,
        margin:responsiveWidth(5)
      },
      textarea:{
        textAlign:"center",
        height: responsiveHeight(33),
        borderWidth: 1,
        borderColor: '#9E9E9E',
        backgroundColor : "#FFFFFF",
        fontSize:responsiveFontSize(2.5)
      },
      button:{
        backgroundColor:"#087f23",
        padding:responsiveWidth(3),
        marginTop:responsiveWidth(2),
        marginBottom:responsiveWidth(2),
        alignSelf:"center",
        borderRadius:5,
        justifyContent:"center",
      }
    });
  }
  filterNumber = (text)=>{
    if(text == "")
      return "";
    text=text.toString();
    return String(text.replace(/[^0-9 ,]/g, ''));
  }
  calculateGCD = ()=>{
      var numbers = this.state.Numbers.split(/[, ]/).filter(function(num){return num!="";}).map(function(num){return parseInt(num)});
      this.setState({numbers:numbers});
      var temp = numbers[0];
      for (let i = 1; i < numbers.length; i++) {
          temp = gcd(temp,numbers[i]);
      }      
      this.setState({output:temp});
  }
  render(){
      return(
        <ScrollView ref={ref => this.scroll = ref}>
          <View style={this.styles.container}>
            <Text style={{fontSize:responsiveFontSize(3)}}>Numbers:</Text>
            <TextInput
              style={this.styles.textarea}
              placeholder={"Enter Space or Comma Seprated Numbers in here."}
              placeholderTextColor={"#e0e0e0"}
              keyboardType={Platform.OS === 'ios' ? "numbers-and-punctuation" :"numeric"}
              multiline={true}
              autoFocus={true}
              onChangeText={N => this.setState({Numbers:this.filterNumber(N)})}
              value={this.state.Numbers}
            />
            <TouchableHighlight style={this.styles.button} onPress={()=>{this.calculateGCD();}} underlayColor = {"#0ba82f"}>
                <Text style={{textAlign:"center",textAlignVertical:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Calculate GCD</Text>
            </TouchableHighlight>
            <Text style={{
                fontSize:responsiveFontSize(2),
                textAlign:"center",
                marginTop:responsiveHeight(5),
            }}>Numbers :{"\n"}{this.state.numbers.join(", ")}</Text>
            <Text style={{
                color:"blue",
                fontSize:responsiveFontSize(4),
                textAlign:"center",
                marginTop:responsiveHeight(5),
            }}>GCD = {this.state.output}</Text>
          </View>
        </ScrollView>
      );
  }
}

export{
    GCD
}
