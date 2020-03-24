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
import {gcd,isPrime,modInverse} from './UtilityFunctions.js';

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

class Modulas extends React.Component{
  constructor(props){
    super(props);
    this.state={
      Num1:"",
      Num2:"",
      output:""
    };
    this.styles = StyleSheet.create({
      container:{
        flex:1,
        margin:responsiveWidth(5)
      },
      button:{
        backgroundColor:"#087f23",
        padding:responsiveWidth(3),
        marginTop:responsiveWidth(8),
        marginBottom:responsiveWidth(2),
        alignSelf:"center",
        borderRadius:5,
        justifyContent:"center",
      },
      fullinput:{
        textAlign:"left",
        fontSize:responsiveFontSize(2.5),
        height:responsiveHeight(7),
        width:responsiveWidth(90),
        borderWidth:0.5,
        borderRadius:5,
        borderColor:"#000",
        marginTop:responsiveWidth(1),
        marginBottom:responsiveWidth(1),
        padding:responsiveWidth(2),
      },
    });
  }
  filterNumber = (text)=>{
    if(text == "" || text == "-")
      return text;
    text=text.toString();
    return Number(text.replace(/[^0-9-]/g, ''));
  }
  calculateMOD = ()=>{
    this.setState({output:this.filterNumber((this.state.Num1%this.state.Num2 + this.state.Num2)%this.state.Num2)});
  }
  render(){
      return(
        <ScrollView ref={ref => this.scroll = ref}>
          <View style={this.styles.container}>
            <TextInput 
              style={this.styles.fullinput}
              placeholder={"Dividend"}
              keyboardType={"numeric"}
              value={this.state.Num1.toString()}
              onChangeText={N=>this.setState({Num1:this.filterNumber(N)})}/>
            <Text style={{alignSelf:"center",fontSize:responsiveFontSize(4),padding:responsiveWidth(5)}}>MOD</Text>
            <TextInput 
              style={this.styles.fullinput}
              placeholder={"Divider"}
              keyboardType={"numeric"}
              value={this.state.Num2.toString()}
              onChangeText={N=>this.setState({Num2:this.filterNumber(N)})}/>
            <TouchableHighlight style={this.styles.button} onPress={()=>{this.calculateMOD()}} underlayColor = {"#0ba82f"}>
                <Text style={{textAlign:"center",textAlignVertical:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Calculate</Text>
            </TouchableHighlight>
            <Text style={{
                color:"blue",
                fontSize:responsiveFontSize(4),
                textAlign:"center",
                marginTop:responsiveHeight(5),
            }}>Remainder = {this.state.output.toString()}</Text>
          </View>
        </ScrollView>
      );
  }
}
class ModularInverse extends React.Component{
  constructor(props){
    super(props);
    this.state={
      domain:"",
      num:"",
      output:""
    };
    this.styles = StyleSheet.create({
      container:{
        flex:1,
        margin:responsiveWidth(5)
      },
      button:{
        backgroundColor:"#087f23",
        padding:responsiveWidth(3),
        marginTop:responsiveWidth(8),
        marginBottom:responsiveWidth(2),
        alignSelf:"center",
        borderRadius:5,
        justifyContent:"center",
      },
      fullinput:{
        textAlign:"left",
        fontSize:responsiveFontSize(2.5),
        height:responsiveHeight(7),
        width:responsiveWidth(90),
        borderWidth:0.5,
        borderRadius:5,
        borderColor:"#000",
        marginTop:responsiveWidth(1),
        marginBottom:responsiveWidth(1),
        padding:responsiveWidth(2),
      },
    });
  }
  filterNumber = (text)=>{
    if(text == "" || text == "-")
      return text;
    text=text.toString();
    return Number(text.replace(/[^0-9-]/g, ''));
  }
  calculateInverse = ()=>{
    let x = modInverse(this.state.num,this.state.domain);
    if(x){
      this.setState({output:this.filterNumber(x)});
    }else{
      this.setState({output:"Not Possible"});
    }
  }
  render(){
      return(
        <ScrollView ref={ref => this.scroll = ref}>
          <View style={this.styles.container}>
            <TextInput 
              style={this.styles.fullinput}
              placeholder={"Domain"}
              keyboardType={"numeric"}
              value={this.state.domain.toString()}
              onChangeText={N=>this.setState({domain:this.filterNumber(N)})}/>
            <TextInput 
              style={this.styles.fullinput}
              placeholder={"Number"}
              keyboardType={"numeric"}
              value={this.state.num.toString()}
              onChangeText={N=>this.setState({num:this.filterNumber(N)})}/>
            <TouchableHighlight style={this.styles.button} onPress={()=>{this.calculateInverse()}} underlayColor = {"#0ba82f"}>
                <Text style={{textAlign:"center",textAlignVertical:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Calculate</Text>
            </TouchableHighlight>
            <Text style={{
                color:"blue",
                fontSize:responsiveFontSize(4),
                textAlign:"center",
                marginTop:responsiveHeight(5),
            }}>Modular Inverse = {this.state.output.toString()}</Text>
          </View>
        </ScrollView>
      );
  }
}
class PrimeTest extends React.Component{
  constructor(props){
    super(props);
    this.state={
      Num:"",
      output:""
    };
    this.styles = StyleSheet.create({
      container:{
        flex:1,
        margin:responsiveWidth(5),
      },
      button:{
        backgroundColor:"#087f23",
        padding:responsiveWidth(3),
        marginTop:responsiveWidth(8),
        marginBottom:responsiveWidth(2),
        alignSelf:"center",
        borderRadius:5,
        justifyContent:"center",
      },
      fullinput:{
        textAlign:"left",
        fontSize:responsiveFontSize(2.5),
        height:responsiveHeight(7),
        width:responsiveWidth(90),
        borderWidth:0.5,
        borderRadius:5,
        borderColor:"#000",
        marginTop:responsiveWidth(1),
        marginBottom:responsiveWidth(1),
        padding:responsiveWidth(2),
      },
    });
  }
  filterNumber = (text)=>{
    if(text == "")
      return text;
    text=text.toString();
    return Number(text.replace(/[^0-9]/g, ''));
  }
  checkPrime = ()=>{
    this.setState({output:isPrime(this.state.Num)});
  }
  render(){
    return(
      <ScrollView ref={ref => this.scroll = ref}>
        <View style={this.styles.container}>
          <TextInput 
            style={this.styles.fullinput}
            placeholder={"Enter a positive interger"}
            keyboardType={"numeric"}
            value={this.state.Num.toString()}
            onChangeText={N=>this.setState({Num:this.filterNumber(N)},()=>{this.checkPrime();})}/>
          <Text style={{
              color:"blue",
              fontSize:responsiveFontSize(4),
              textAlign:"center",
              marginTop:responsiveHeight(5),
            }}>{this.state.Num == 0?"":(this.state.output?"Prime":"Composite")}</Text>
        </View>
      </ScrollView>
    );
  }
}
class PrimitiveRoots extends React.Component{
  constructor(props){
    super(props);
    this.state={
      num:"",
      output:""
    };
    this.styles = StyleSheet.create({
      container:{
        flex:1,
        margin:responsiveWidth(5)
      },
      button:{
        backgroundColor:"#087f23",
        padding:responsiveWidth(3),
        marginTop:responsiveWidth(8),
        marginBottom:responsiveWidth(2),
        alignSelf:"center",
        borderRadius:5,
        justifyContent:"center",
      },
      fullinput:{
        textAlign:"left",
        fontSize:responsiveFontSize(2.5),
        height:responsiveHeight(7),
        width:responsiveWidth(90),
        borderWidth:0.5,
        borderRadius:5,
        borderColor:"#000",
        marginTop:responsiveWidth(1),
        marginBottom:responsiveWidth(1),
        padding:responsiveWidth(2),
      },
    });
  }
  filterNumber = (text)=>{
    if(text == "" || text == "-")
      return text;
    text=text.toString();
    return Number(text.replace(/[^0-9-]/g, ''));
  }
  calculateRoot = ()=>{
    if(isPrime(this.state.num)){
      
    }else{
      alert("Please enter a prime number");
    }
  }
  render(){
      return(
        <ScrollView>
          <View style={this.styles.container}>
            <TextInput 
              style={this.styles.fullinput}
              placeholder={"Number"}
              keyboardType={"numeric"}
              value={this.state.num.toString()}
              autoFocus={true}
              onChangeText={N=>this.setState({num:this.filterNumber(N)})}/>
            <TouchableHighlight style={this.styles.button} onPress={()=>{this.calculateRoot()}} underlayColor = {"#0ba82f"}>
                <Text style={{textAlign:"center",textAlignVertical:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Calculate Primitive Roots</Text>
            </TouchableHighlight>
            <Text style={{
                color:"blue",
                fontSize:responsiveFontSize(4),
                textAlign:"center",
                marginTop:responsiveHeight(5),
            }}>{this.state.output.toString()}</Text>
          </View>
        </ScrollView>
      );
  }
}
export{
    GCD,
    Modulas,
    PrimeTest,
    ModularInverse,
    PrimitiveRoots
}
