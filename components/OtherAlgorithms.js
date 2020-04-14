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
import { Table, Rows} from 'react-native-table-component';
import {gcd,isPrime,modInverse,primitiveRoots,cal_CRT} from './UtilityFunctions.js';

class GCD extends React.Component{
  static navigationOptions = {
    title: 'Greatest Common Divisor',
  };
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
        borderRadius:5,
        borderColor: '#9E9E9E',
        backgroundColor : "#FFFFFF",
        fontSize:responsiveFontSize(2.5)
      },
      button:{
        backgroundColor:"#1e3d59",
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
    if(text.match(/^[^0-9]/g) || text=="")
      return "";
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
            <TouchableHighlight style={this.styles.button} onPress={()=>{this.calculateGCD();}} underlayColor = {"#3c5a78"}>
                <Text style={{textAlign:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Calculate GCD</Text>
            </TouchableHighlight>
            <Text style={{
                fontSize:responsiveFontSize(2),
                textAlign:"center",
                marginTop:responsiveHeight(5),
            }}>Numbers :{"\n"}{this.state.numbers.join(", ")}</Text>
            <Text style={{
                color:"#1e3d59",
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
  static navigationOptions = {
    title: 'Modulas Operator',
  };
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
        backgroundColor:"#1e3d59",
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
    if(text.match(/^[^0-9]/g)||text=="")
      return "";
    return Number(text.replace(/[^0-9-]/g, ''));
  }
  calculateMOD = ()=>{
    this.setState({output:this.filterNumber(((this.state.Num1%this.state.Num2 + this.state.Num2)%this.state.Num2).toString())});
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
          <TouchableHighlight style={this.styles.button} onPress={()=>{this.calculateMOD()}} underlayColor = {"#3c5a78"}>
              <Text style={{textAlign:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Calculate</Text>
          </TouchableHighlight>
          <Text style={{
              color:"#1e3d59",
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
  static navigationOptions = {
    title: 'Modular Inverse',
  };
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
        backgroundColor:"#1e3d59",
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
    if(text.match(/^[^0-9]/g)||text=="")
      return "";
    return Number(text.replace(/[^0-9-]/g, ''));
  }
  calculateInverse = ()=>{
    let x = modInverse(this.state.num,this.state.domain);
    if(x){
      this.setState({output:x});
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
            <TouchableHighlight style={this.styles.button} onPress={()=>{this.calculateInverse()}} underlayColor = {"#3c5a78"}>
                <Text style={{textAlign:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Calculate</Text>
            </TouchableHighlight>
            <Text style={{
                color:"#1e3d59",
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
  static navigationOptions = {
    title: 'Prime Test',
  };
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
        backgroundColor:"#1e3d59",
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
    if(text.match(/^[^0-9]/g)||text=="")
      return "";
    return Number(text.replace(/[^0-9]/g, ''));
  }
  checkPrime = ()=>{
    this.setState({output:isPrime(this.state.Num)});
  }
  render(){
      let primetext = (
        <Text style={{
          color:"#008000",
          fontSize:responsiveFontSize(4),
          textAlign:"center",
          marginTop:responsiveHeight(5),
        }}>Prime</Text>
      );
      let comptext = (
        <Text style={{
          color:"#DC143C",
          fontSize:responsiveFontSize(4),
          textAlign:"center",
          marginTop:responsiveHeight(5),
        }}>Composite</Text>
      );
    return(
      <ScrollView ref={ref => this.scroll = ref}>
        <View style={this.styles.container}>
          <TextInput 
            style={this.styles.fullinput}
            placeholder={"Enter a positive interger"}
            keyboardType={"numeric"}
            value={this.state.Num.toString()}
            onChangeText={N=>this.setState({Num:this.filterNumber(N)},()=>{this.checkPrime();})}/>
            
        {this.state.Num == 0?(<Text></Text>):(this.state.output?primetext:comptext)}
        </View>
      </ScrollView>
    );
  }
}
class PrimitiveRoots extends React.Component{
  static navigationOptions = {
    title: 'Primitive Roots',
  };
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
        backgroundColor:"#1e3d59",
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
      tcell:{
        color:"#555",
        textAlign:"center",
        fontSize:responsiveFontSize(3),
        fontStyle:"italic"
      },
      table:{
        marginLeft:responsiveWidth(8),
        marginRight:responsiveWidth(8),
        marginTop:responsiveWidth(4),
        marginBottom:responsiveWidth(4),
      }
    });
  }
  filterNumber = (text)=>{
    if(text.match(/^[^0-9]/g)||text=="")
      return "";
    return Number(text.replace(/[^0-9-]/g, ''));
  }
  calculateRoot = ()=>{
    if(isPrime(this.state.num)){
      let arr= primitiveRoots(this.state.num);
      var newArr = [];
      while(arr.length) newArr.push(arr.splice(0,5));
      this.setState({output:newArr});
    }else{
      this.setState({output:""});
      alert("Please enter a prime number");
    }
  }
  render(){
      return(
        <ScrollView>
          <View style={this.styles.container}>
            <TextInput 
              style={this.styles.fullinput}
              placeholder={"Enter a Prime Number"}
              keyboardType={"numeric"}
              value={this.state.num.toString()}
              autoFocus={true}
              onChangeText={N=>this.setState({num:this.filterNumber(N)})}/>
            <TouchableHighlight style={this.styles.button} onPress={()=>{this.calculateRoot()}} underlayColor = {"#3c5a78"}>
                <Text style={{textAlign:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Calculate Primitive Roots</Text>
            </TouchableHighlight>
            <Text style={{
                color:"#1e3d59",
                fontSize:responsiveFontSize(4),
                textAlign:"center",
                marginTop:responsiveHeight(5),
            }}>Primitive Root(s) :</Text>
            <Table style={this.styles.table}>
              <Rows data={this.state.output} textStyle={this.styles.tcell}/>
            </Table>
          </View>
        </ScrollView>
      );
  }
}
class CRT extends React.Component{
  static navigationOptions = {
    title: 'C R T',
  };
  constructor(props){
    super(props);
    this.state={
      N:2,
      n_arr:{},
      a_arr:{},
      output:[],
      ele_arr:[],
      temp:"",
      n1:"",
      n2:"",
      a1:"",
      a2:"",
    };
    this.styles = StyleSheet.create({
      container:{
        flex:1,
        margin:responsiveWidth(5)
      },
      button:{
        backgroundColor:"#1e3d59",
        padding:responsiveWidth(3),
        marginTop:responsiveWidth(8),
        marginHorizontal:responsiveWidth(2),
        marginBottom:responsiveWidth(2),
        alignSelf:"center",
        borderRadius:5,
        justifyContent:"center",
      },
      boxinput:{
        textAlign:"center",
        fontSize:responsiveFontSize(2.5),
        height:responsiveHeight(8),
        width:responsiveHeight(8),
        borderWidth:0.5,
        borderRadius:5,
        borderColor:"#000",
        marginTop:responsiveWidth(1),
        marginBottom:responsiveWidth(1),
        padding:responsiveWidth(2),
      },
    });
  }
  getEle = (N)=>{
    return(
      <View key={"crt_"+N.toString()} style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:responsiveFontSize(4)}}>x ≅ </Text>
        <TextInput 
          style={this.styles.boxinput}
          placeholder={"a"+N.toString()}
          keyboardType={"numeric"}
          onChangeText={(V)=>{this.state["a"+N.toString()] = V}}
          maxLength={3}
          />
        <Text style={{fontSize:responsiveFontSize(3)}}> (mod) </Text>
        <TextInput 
          style={this.styles.boxinput}
          placeholder={"n"+N.toString()}
          keyboardType={"numeric"}
          onChangeText={(V)=>{this.state["n"+N.toString()] = V}}
          maxLength={3}
          />
      </View>
    );
  }
  addEle = ()=>{
    let N = this.state.N;
    N = N+1;
    if(N<6){
    this.setState({N:N},()=>{
      this.state["n"+N.toString()] = "";
      this.state["a"+N.toString()] = "";
      let my_arr = this.state.ele_arr;
      my_arr.push(this.getEle(N));
      this.setState({ele_arr:my_arr});
    });
  }else{
    alert("Maximum 5 Equtions can be solved here.")
  }
  }
  delEle = ()=>{
    let N = this.state.N;
    if(N>2){
      N = N-1;
      this.setState({N:N},()=>{
        let my_arr = this.state.ele_arr;
        my_arr.pop()
        this.setState({ele_arr:my_arr});
      });
    }else{
      alert("Minimum 2 Equtions are required.")
    }
  }
  checkNumber = (text)=>{
    if(text.toString().match(/([^0-9])/g,)) return false;
    if(text.toString() == "") return false;
    return true;
  }
  calculateCRT = ()=>{
    let a =[]
    let n =[]
    for (let i = 1; i <= this.state.N; i++) {
      let _a = this.state["a"+i];
      let _n = this.state["n"+i];
      if(this.checkNumber(_a) && this.checkNumber(_n)){
        a.push(Number(this.state["a"+i]))
        n.push(Number(this.state["n"+i]))
      }else{
        alert("Enter a valid positive number.");
        return;
      }

    }
    this.setState({output:cal_CRT(a,n)});
  }
  render(){
    let Arr = this.state.ele_arr.map((a) => {
      return a;
    });
    return(
      <ScrollView>
        <View style={this.styles.container}>
          {this.getEle(1)}
          {this.getEle(2)}
          {Arr}
          <View style={{flexDirection:"row",justifyContent:"center"}}>
          <TouchableHighlight style={this.styles.button} onPress={()=>{this.addEle()}} underlayColor = {"#3c5a78"}>
              <Text style={{textAlign:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Add</Text>
          </TouchableHighlight>
          <TouchableHighlight style={this.styles.button} onPress={()=>{this.delEle()}} underlayColor = {"#3c5a78"}>
              <Text style={{textAlign:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Remove</Text>
          </TouchableHighlight>
          </View>
          <TouchableHighlight style={this.styles.button} onPress={()=>{this.calculateCRT()}} underlayColor = {"#3c5a78"}>
              <Text style={{textAlign:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Calculate</Text>
          </TouchableHighlight>
          <Text style={{
              color:"#1e3d59",
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
    PrimitiveRoots,
    CRT
}
