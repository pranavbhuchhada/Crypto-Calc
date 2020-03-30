import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Alert
} from 'react-native';
import {responsiveFontSize,responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {isPrime,randPrime,gcd,modInverse,powerMod} from './UtilityFunctions.js';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class RSACipher extends React.Component{
  constructor(props){
    super(props);
    Alert.alert("Disclaimer","This is not actual implementation of RSA. This for demo purpose only.");
    this.state = {
      p:"",
      q:"",
      n:"",
      phi:"",
      e:"",
      d:"",
      plaintext:"",
      ciphertext:"",
      isOnPlain:true
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
        backgroundColor:"#1e3d59",
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
    if(text == "")
      return "";
    text=text.toString();
    return Number(text.replace(/[^0-9]/g, ''));
  }
  pChanged = (P)=>{
    this.setState({p: this.filterNumber(P)},()=>{
        if(this.state.p == ""){
          this.setState({n:0});
          this.setState({phi:0});
          this.setState({e:""});
          this.setState({d:""})    
        }
        else{
          this.setState({n: this.state.p*this.state.q});
          this.setState({phi: (this.state.p-1)*(this.state.q-1)});    
        }
    });
    
  }
  qChanged = (Q)=>{
    this.setState({q: this.filterNumber(Q)},()=>{
      if(this.state.p == ""){
        this.setState({n:0});
        this.setState({phi:0});
        this.setState({e:""});
        this.setState({d:""})    
      }
      else{
        this.setState({n: this.state.p*this.state.q});
        this.setState({phi: (this.state.p-1)*(this.state.q-1)});
      }
    });
    
  }
  generatePQ = ()=>{
    var P = randPrime();
    var Q = randPrime();
    while (P==Q) {
      Q = randPrime();
    }
    this.setState({p:P});
    this.setState({q:Q},()=>{
        this.setState({n: this.state.p*this.state.q});
        this.setState({phi: (this.state.p-1)*(this.state.q-1)});
        this.etext.focus();    
    });
  }
  generateE = ()=>{
    for(var i = 2;i<this.state.phi;i++){
      if(gcd(i,this.state.phi) == 1){
        this.setState({e:i},()=>{
          this.dtext.focus();
        });   
        return;
      }
    }
    alert("For given value of 'p' and 'q', 'e' does not exists.");
    this.etext.focus();
  }
  generateD = ()=>{
    var D = modInverse(this.state.e,this.state.phi);
    if(D){
      this.setState({d:D});
    }
    else{
      alert("Inverse of the given 'e' does not exists.");
      this.setState({d:""});
    }
  }
  toCipher = (text)=>{
    if(this.state.n=="" || this.state.n==0 || this.state.e == "" || this.state.e == 0){
      alert("Enter valid n and e.");
      return;
    }
    this.setState({plaintext:text},()=>{
      text = text.charCodeAt(0);
      let output = powerMod(text,this.state.e,this.state.n);
      this.setState({ciphertext:output.toString()})
    });
  }
  toPlain = (text)=>{
    text = this.filterNumber(text);
    if(this.state.n=="" || this.state.n==0 || this.state.d == "" || this.state.d == 0){
      alert("Enter valid n and d.");
      return;
    }
    this.setState({ciphertext:text},()=>{
      if(text == "") return;
      let output = powerMod(text,this.state.d,this.state.n);
      output = String.fromCharCode(output);
      console.log(output);
      this.setState({plaintext:output});
    });
  }
  render(){
    return(
     <View style={this.styles.container}>
       <ScrollView ref={ref => this.scroll = ref}>
         <View style={{flexDirection:"row"}}>
          <TextInput 
            ref={ref => this.ptext = ref}
            style={this.styles.halfinput}
            placeholder={"Enter prime p"}
            placeholderTextColor={"#909090"}
            keyboardType={"number-pad"}
            onChangeText={ P => this.pChanged(P)}
            value={this.state.p.toString()}
            onBlur={()=>{if( this.state.p!="" && !isPrime(this.state.p)){
              alert("Please Enter a Prime Nuber");
              this.setState({p:""});
              this.ptext.focus();
            }
            }}
          />
          <View style={{width:responsiveWidth(2)}}></View>
          <TextInput 
            ref={ref => this.qtext = ref}
            style={this.styles.halfinput}
            placeholder={"Enter prime q"}
            placeholderTextColor={"#909090"}
            keyboardType={"number-pad"}
            onChangeText={Q=>this.qChanged(Q)}
            value={this.state.q.toString()}
            onBlur={()=>{if(this.state.q!="" && !isPrime(this.state.q)){
              alert("Please Enter a Prime Nuber");
              this.setState({p:""});
              this.qtext.focus();
            }
            }}
          />
        </View>
        <TouchableHighlight style={this.styles.button} onPress={()=>{this.generatePQ()}} underlayColor = {"#3c5a78"}>
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
          ref={ref => this.etext = ref}
          style={this.styles.fullinput}
          placeholder={"Enter e"}
          placeholderTextColor={"#909090"}
          keyboardType={"number-pad"}
          onChangeText={(E)=>{
            this.setState({e:this.filterNumber(E)});
          }}
          value={this.state.e.toString()}
          onBlur={()=>{
            if(this.state.e!="" && gcd(this.state.phi,this.state.e) != 1 || this.state.phi < this.state.e){
              alert("Please Enter a Number which is relatively prime to phi.");
              this.setState({e:""});
              // this.etext.focus();
            }
          }}
          />
        <TouchableHighlight style={this.styles.button} onPress={()=>{this.generateE()}} underlayColor = {"#3c5a78"}>
           <Text style={{textAlign:"center",textAlignVertical:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Generate e</Text>
        </TouchableHighlight>
        <TextInput
          ref={ref => this.dtext = ref}
          style={this.styles.fullinput}
          placeholder={"Enter d"}
          placeholderTextColor={"#909090"}
          keyboardType={"number-pad"}
          onChangeText={(D)=>{
            this.setState({d:this.filterNumber(D)});
          }}
          value={this.state.d.toString()}
          onBlur={()=>{
            if( this.state.d!="" && ((this.state.e * this.state.d)%this.state.phi != 1)){
              alert("Please Enter a 'd' which is multiplicative inverse of 'e'");
              this.setState({d:""});
            }
          }}
          />
        <TouchableHighlight style={this.styles.button} onPress={()=>{this.generateD()}} underlayColor = {"#3c5a78"}>
           <Text style={{textAlign:"center",textAlignVertical:"center",color:"#e0e0e0",fontSize:responsiveFontSize(3)}}>Generate d</Text>
        </TouchableHighlight>
        <Text style={{fontSize:responsiveFontSize(3)}}>Plain Text:</Text>
        <TextInput
          style={this.styles.fullinput}
          placeholder={"Type single character"}
          placeholderTextColor={"#e0e0e0"}
          textAlign={"center"}
          onChangeText={PlainText => this.toCipher(PlainText)}
          value={this.state.plaintext.toString()}
          maxLength={1}
          onFocus={()=>this.state.isOnPlain=true}
        />
        <Text style={{fontSize:responsiveFontSize(3)}}>Cipher Text:</Text>
        <TextInput
          style={this.styles.fullinput}
          textAlign={"center"}
          placeholder={"Type Cipher text in here"}
          placeholderTextColor={"#e0e0e0"}
          keyboardType={"numeric"}
          onChangeText={CipherText => this.toPlain(CipherText)}
          value={this.state.ciphertext.toString()}
          onFocus={()=>{this.state.isOnPlain=false;this.scroll.scrollToEnd({animated:true});}}
        />
        <KeyboardSpacer/>
       </ScrollView>
     </View> 
    );
  }
}
export {
    RSACipher
}