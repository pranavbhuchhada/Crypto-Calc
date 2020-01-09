import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput
} from 'react-native';
import {responsiveFontSize,responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';
import { TouchableHighlight } from 'react-native-gesture-handler';

class RSACipher extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      p:0,
      q:0,
      n:0,
      phi:0,
      e:5,
      d:5,
      plaintext:"",
      ciphertext:""
    };
    this.styles=StyleSheet.create({
      container:{
        flex:1,
        margin:responsiveWidth(5)
      },
      halfinput:{
        textAlign:"left",
        fontSize:responsiveFontSize(2.5),
        height:responsiveHeight(7),
        width:responsiveWidth(44),
        borderWidth:0.5,
        borderRadius:5,
        borderColor:"#000",
        padding:responsiveWidth(2)
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
      button:{
        backgroundColor:"#087f23",
        height:responsiveHeight(7),
        width:responsiveWidth(90),
        marginTop:responsiveWidth(1),
        marginBottom:responsiveWidth(1),
        alignSelf:"center",
        borderRadius:5,
        justifyContent:"center",
      },
      textarea:{
        textAlign:"center",
        height: responsiveHeight(33),
        width:responsiveWidth(90),
        marginTop:responsiveWidth(1),
        marginBottom:responsiveWidth(1),
        borderWidth: 1,
        borderRadius: 5,
        fontSize:responsiveFontSize(2.5)
      },
    }); 
  }
  filterNumber = (text)=>{
    text=text.toString();
    return Number(text.replace(/[^0-9]/g, ''));
  }
  pChanged = (P)=>{
    this.setState({p: this.filterNumber(P)},()=>{
        this.setState({n: this.state.p*this.state.q});
        this.setState({phi: (this.state.p-1)*(this.state.q-1)});    
    });
    
  }
  qChanged = (Q)=>{
    this.setState({q: this.filterNumber(Q)},()=>{
        this.setState({n: this.state.p*this.state.q});
        this.setState({phi: (this.state.p-1)*(this.state.q-1)});
    });
    
  }
  generatePQ = ()=>{
    
  }
  render(){
    return(
     <View style={this.styles.container}>
       <ScrollView>
         <View style={{flexDirection:"row"}}>
          <TextInput 
            style={this.styles.halfinput}
            placeholder={"Enter prime p"}
            placeholderTextColor={"#909090"}
            keyboardType={"number-pad"}
            onChangeText={ P => this.pChanged(P)}
          />
          <View style={{width:responsiveWidth(2)}}></View>
          <TextInput 
            style={this.styles.halfinput}
            placeholder={"Enter prime q"}
            placeholderTextColor={"#909090"}
            keyboardType={"number-pad"}
            onChangeText={Q=>this.qChanged(Q)}
          />
        </View>
        <TouchableHighlight style={this.styles.button} onPress={()=>{this.generatePQ()}} underlayColor = {"#0ba82f"}>
           <Text style={{textAlign:"center",textAlignVertical:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Generate p and q</Text>
        </TouchableHighlight>
        <TextInput 
          style={this.styles.fullinput}
          editable={false}
          value={"n = "+this.state.n.toString()}/>
        <TextInput 
          style={this.styles.fullinput}
          editable={false}
          value={"phi = "+this.state.phi.toString()}/>
        <TextInput 
          style={this.styles.fullinput}
          placeholder={"Enter e"}
          placeholderTextColor={"#909090"}
          keyboardType={"number-pad"}/>
        <TouchableHighlight style={this.styles.button} onPress={()=>{}} underlayColor = {"#0ba82f"}>
           <Text style={{textAlign:"center",textAlignVertical:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Generate e</Text>
        </TouchableHighlight>
        <TextInput 
          style={this.styles.fullinput}
          placeholder={"Enter d"}
          placeholderTextColor={"#909090"}
          keyboardType={"number-pad"}/>
        <TouchableHighlight style={this.styles.button} onPress={()=>{}} underlayColor = {"#0ba82f"}>
           <Text style={{textAlign:"center",textAlignVertical:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Generate d</Text>
        </TouchableHighlight>
        <Text style={{fontSize:responsiveFontSize(3)}}>Plain Text:</Text>
        <TextInput
          style={this.styles.textarea}
          placeholder={"Type Plain text in here"}
          placeholderTextColor={"#e0e0e0"}
          multiline={true}
          // onChangeText={PlainText => this.toCipher(PlainText,this.state.key)}
          // value={this.state.plaintext}
          // onFocus={()=>this.state.isOnPlain=true}
        />
        <Text style={{fontSize:responsiveFontSize(3)}}>Cipher Text:</Text>
        <TextInput
          style={this.styles.textarea}
          placeholder={"Type Cipher text in here"}
          placeholderTextColor={"#e0e0e0"}
          multiline={true}
          // onChangeText={PlainText => this.toCipher(PlainText,this.state.key)}
          // value={this.state.plaintext}
          // onFocus={()=>this.state.isOnPlain=true}
        />
       </ScrollView>
     </View> 
    );
  }
}
export {
    RSACipher
}