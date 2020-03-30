import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Slider,
    Picker,
    Alert
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {responsiveFontSize,responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';

class CeaserCipher extends React.Component{
  constructor(props){
    super(props);
    this.state={
      key:7,
      plaintext:"",
      ciphertext:"",
      isOnPlain:true
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
        borderRadius:5,
        fontSize:responsiveFontSize(2.5)
      },
      cipherout:{
        fontSize:responsiveFontSize(2.5),
        color:"#909090"
      },
      slider:{
        marginTop:responsiveHeight(2.5),
        marginBottom:responsiveHeight(2.5),
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
    this.setState({ciphertext:output});
  }
  toPlain = (CipherText,Key)=>{
    this.setState({ciphertext: CipherText});
    this.setState({key: Key});
    if (Key < 0)
      return caesarShift(CipherText, Key + 26);
    var output = '';
    for (var i = 0; i < CipherText.length; i ++) {
      var c = CipherText[i];
      if (c.match(/[a-z]/i)) {
        var code = CipherText.charCodeAt(i);
        if ((code >= 65) && (code <= 90)){
          c = String.fromCharCode((((code - 65 - Key) % 26)+26)%26 + 65);
        }
        else if ((code >= 97) && (code <= 122))
          c = String.fromCharCode((((code - 97 - Key) % 26)+26)%26 + 97);
      }
      output += c;
    }
    this.setState({plaintext:output});
  }
  onSliderChange = (Key)=>{
    if(this.state.isOnPlain){
      // this.toPlain(this.state.ciphertext,Key);
      this.toCipher(this.state.plaintext,Key);
    }
    else{
      // this.toCipher(this.state.plaintext,Key);
      this.toPlain(this.state.ciphertext,Key);
    }
  }

  render(){
      return(
        <ScrollView ref={ref => this.scroll = ref}>
          <View style={this.styles.container}>
            <Text style={{fontSize:responsiveFontSize(3)}}>Plain Text:</Text>
            <TextInput
              style={this.styles.textarea}
              placeholder={"Type Plain text in here"}
              placeholderTextColor={"#e0e0e0"}
              multiline={true}
              autoFocus={true}
              onChangeText={PlainText => this.toCipher(PlainText,this.state.key)}
              value={this.state.plaintext}
              onFocus={()=>this.setState({isOnPlain:true})}
            />
            <Text style={{fontSize:responsiveFontSize(3),}}>Key :</Text>
            <View style={{flexDirection:"row"}}>
              <Slider
                style={this.styles.slider}
                minimumValue={0}
                maximumValue={25}
                step={1}
                value={7}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(Key)=>{this.onSliderChange(Key)}}
              />
              <Text style={{marginTop:responsiveWidth(5),fontSize:responsiveFontSize(2.3)}}>{this.state.key}</Text>
            </View>
            <Text style={{fontSize:responsiveFontSize(3),}}>Cipher Text:</Text>
            <TextInput
              style={this.styles.textarea}
              placeholder={"Type Cipher text in here"}
              placeholderTextColor={"#e0e0e0"}
              multiline={true}
              onChangeText={CipherText => this.toPlain(CipherText,this.state.key)}
              value={this.state.ciphertext}
              onFocus={()=>{this.setState({isOnPlain:false});this.scroll.scrollToEnd({animated:true});}}
            />
            <KeyboardSpacer/>
          </View>
        </ScrollView>
      );
  }
}
class MultiplicativeCipher extends React.Component{
  constructor(props){
    super(props);
    this.state={
      Key:7,
      plaintext:"",
      ciphertext:"",
      isOnPlain:true
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
        borderRadius: 5 ,
        backgroundColor : "#FFFFFF",
        fontSize:responsiveFontSize(2.5)
        // margin:responsiveWidth(5)
      },
      cipherout:{
        fontSize:responsiveFontSize(2.5),
        color:"#909090"
      },
      slider:{
        marginTop:responsiveHeight(2.5),
        marginBottom:responsiveHeight(2.5),
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
          c = String.fromCharCode((((code - 65) * Key) % 26) + 65);
        else if ((code >= 97) && (code <= 122))
          c = String.fromCharCode((((code - 97) * Key) % 26) + 97);
      }
      output += c;
    }
    this.setState({ciphertext:output});
  }
  toPlain = (CipherText,Key)=>{
    this.scroll.scrollToEnd({animated:true});
    this.setState({ciphertext: CipherText});
    this.setState({key: Key});
    this.state={
      Key2:15
    }
    switch(Key){
      case 1:
        this.setState({Key2: 1});
        break;
      case 3:
        this.setState({Key2: 1});
        break;
      case 5:
        this.setState({Key2: 1});
        break;
      case 7:
        this.setState({Key2: 1});
        break;
      case 9:
        break;
      case 11:
        this.setState({Key2: 1});
        break;
      case 15:
        this.setState({Key2: 1});
        break;
      case 17:
        this.setState({Key2: 1});
        break;
    }
    
    var output = '';
    for (var i = 0; i < CipherText.length; i ++) {
      var c = CipherText[i];
      if (c.match(/[a-z]/i)) {
        var code = CipherText.charCodeAt(i);
        if ((code >= 65) && (code <= 90)){
          c = String.fromCharCode((((code - 65) * Key2) % 26) + 65);
        }
        else if ((code >= 97) && (code <= 122))
          c = String.fromCharCode((((code - 97) * Key2) % 26) + 97);
      }
      output += c;
    }
    this.setState({plaintext:output});
  }
  

  render(){
      return(
        <ScrollView ref={ref => this.scroll = ref}>
          <View style={this.styles.container}>
            <Text style={{fontSize:responsiveFontSize(3)}}>Plain Text:</Text>
            <TextInput
              style={this.styles.textarea}
              placeholder={"Type Plain text in here"}
              placeholderTextColor={"#e0e0e0"}
              multiline={true}
              autoFocus={true}
              onChangeText={PlainText => this.toCipher(PlainText,this.state.Key)}
              value={this.state.plaintext}
              onFocus={()=>this.setState({isOnPlain:true})}
            />
            <Text style={{fontSize:responsiveFontSize(3),}}>Key :</Text>
            <Picker
              selectedValue={this.state.Key}
              onValueChange={(itemValue, itemIndex) => this.setState({Key: itemValue})} >
              <Picker.Item label="1" value={1} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="5" value={5} />
              <Picker.Item label="7" value={7} />
              <Picker.Item label="9" value={9} />
              <Picker.Item label="11" value={11} />
              <Picker.Item label="15" value={15} />
              <Picker.Item label="17" value={17} />
            </Picker>
            <Text style={{fontSize:responsiveFontSize(3),}}>Cipher Text:</Text>
            <TextInput
              style={this.styles.textarea}
              placeholder={"Type Cipher text in here"}
              placeholderTextColor={"#e0e0e0"}
              multiline={true}
              onChangeText={CipherText => this.toPlain(CipherText,this.state.key)}
              value={this.state.ciphertext}
              onFocus={()=>this.setState({isOnPlain:false})}
            />
            <KeyboardSpacer/>
          </View>
        </ScrollView>
      );
  }
}
class AffineCipher extends React.Component{
  constructor(props){
    super(props);
    this.state={
      key:7,
      key2:7,
      plaintext:"",
      ciphertext:"",
      isOnPlain:true
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
        borderRadius:5,
        backgroundColor : "#FFFFFF",
        fontSize:responsiveFontSize(2.5)
      },
      cipherout:{
        fontSize:responsiveFontSize(2.5),
        color:"#909090"
      },
      slider:{
        marginTop:responsiveHeight(2.5),
        marginBottom:responsiveHeight(2.5),
        width:responsiveWidth(85)
      }
    });
  }
  toCipher = (PlainText,Key,key2)=>{
    this.setState({plaintext: PlainText});
    this.setState({key: Key});
    var output = '';
    for (var i = 0; i < PlainText.length; i ++) {
      var c = PlainText[i];
      if (c.match(/[a-z]/i)) {
        var code = PlainText.charCodeAt(i);
        if ((code >= 65) && (code <= 90))
          c = String.fromCharCode((((((code - 65) * key2)% 26)+Key)%26) + 65);
        else if ((code >= 97) && (code <= 122))
          c = String.fromCharCode(((((code - 97)*key2)%26+ Key) % 26) + 97);
      }
      output += c;
    }
    this.setState({ciphertext:output});
  }
  toPlain = (CipherText,Key)=>{
    this.scroll.scrollToEnd({animated:true});
    this.setState({ciphertext: CipherText});
    this.setState({key: Key});
    if (Key < 0)
      return caesarShift(CipherText, Key + 26);
    var output = '';
    for (var i = 0; i < CipherText.length; i ++) {
      var c = CipherText[i];
      if (c.match(/[a-z]/i)) {
        var code = CipherText.charCodeAt(i);
        if ((code >= 65) && (code <= 90)){
          c = String.fromCharCode((((code - 65 - Key) %26) +26)%26 + 65);
        }
        else if ((code >= 97) && (code <= 122))
          c = String.fromCharCode((((code - 97 - Key) % 26)+26)%26 + 97);
      }
      output += c;
    }
    this.setState({plaintext:output});
  }
  onSliderChange = (Key)=>{
    if(this.state.isOnPlain){
      this.toPlain(this.state.ciphertext,Key);
      this.toCipher(this.state.plaintext,Key);
    }
    else{
      this.toCipher(this.state.plaintext,Key);
      this.toPlain(this.state.ciphertext,Key);
    }
  }

  render(){
      return(
        <ScrollView ref={ref => this.scroll = ref}>
          <View style={this.styles.container}>
            <Text style={{fontSize:responsiveFontSize(3)}}>Plain Text:</Text>
            <TextInput
              style={this.styles.textarea}
              placeholder={"Type Plain text in here"}
              placeholderTextColor={"#e0e0e0"}
              multiline={true}
              autoFocus={true}
              onChangeText={PlainText => this.toCipher(PlainText,this.state.key,this.state.key2)}
              value={this.state.plaintext}
              onFocus={()=>this.state.isOnPlain=true}
            />
                        <Text style={{fontSize:responsiveFontSize(3),}}>Key 1:</Text>
            <View style={{flexDirection:"row"}}>

              <Slider
                style={this.styles.slider}
                minimumValue={0}
                maximumValue={25}
                step={1}
                value={7}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(Key)=>{this.onSliderChange(Key)}}
              />
              <Text style={{marginTop:responsiveWidth(5),fontSize:responsiveFontSize(2.3)}}>{this.state.key}</Text>
            </View>
            <View>
            <Text style={{fontSize:responsiveFontSize(3),}}>Key 2:</Text>  
            <Picker
              selectedValue={this.state.key2}
              onValueChange={(itemValue, itemIndex) => this.setState({key2: itemValue})} >
              <Picker.Item label="1" value={1} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="5" value={5} />
              <Picker.Item label="7" value={7} />
              <Picker.Item label="9" value={9} />
              <Picker.Item label="11" value={11} />
              <Picker.Item label="15" value={15} />
              <Picker.Item label="17" value={17} />
            </Picker>
            </View>
            <Text style={{fontSize:responsiveFontSize(3),}}>Cipher Text:</Text>
            <TextInput
              style={this.styles.textarea}
              placeholder={"Type Cipher text in here"}
              placeholderTextColor={"#e0e0e0"}
              multiline={true}
              onChangeText={CipherText => this.toPlain(CipherText,this.state.key)}
              value={this.state.ciphertext}
              onFocus={()=>this.state.isOnPlain=false}
            />
            <KeyboardSpacer/>
          </View>
        </ScrollView>
      );
  }
}
class AutoKeyCipher extends React.Component{
  constructor(props){
    super(props);
    this.state={
      key:7,
      plaintext:"",
      ciphertext:"",
      isOnPlain:true
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
      cipherout:{
        fontSize:responsiveFontSize(2.5),
        color:"#909090"
      },
      slider:{
        marginTop:responsiveHeight(2.5),
        marginBottom:responsiveHeight(2.5),
        width:responsiveWidth(85)
      }
    });
  }
  filterAlpha = (text)=>{
    text=text.toString();
    return String(text.replace(/[^a-z]/i, ''));
  }
  toCipher = (PlainText,Key)=>{
    this.setState({plaintext: this.filterAlpha(PlainText)},()=>{
      this.setState({key: Key});
      var output = '';
      for (var i = 0; i < PlainText.length; i ++) {
        var c = PlainText[i];
        // if (c.match(/[a-z]/i)) {
          var code = PlainText.charCodeAt(i);
          var code2 =PlainText.charCodeAt(i-1);
          if(i==0){
            if ((code >= 65) && (code <= 90))
              c = String.fromCharCode(((code - 65 + Key) % 26) + 65);
            else if ((code >= 97) && (code <= 122))
              c = String.fromCharCode(((code - 97 + Key) % 26) + 97);  
          }
          else{
            if ((code >= 65) && (code <= 90)){
              if((code2 >= 65) && (code2 <= 90))
                c = String.fromCharCode(((code - 65 + (code2-65)) % 26) + 65);
              else if((code2 >= 97) && (code2 <= 122))
                c = String.fromCharCode(((code - 65 + (code2-97)) % 26) + 65);
              else
                c = String.fromCharCode(((code - 65 + (code2)) % 26) + 65);
            }
            else if((code >= 97) && (code <= 122)){
              if((code2 >= 65) && (code2 <= 90))
                c = String.fromCharCode(((code - 97 + (code2-65)) % 26) + 97);
              else if((code2 >= 97) && (code2 <= 122))
                c = String.fromCharCode(((code - 97 + (code2-97)) % 26) + 97);
              else
                c = String.fromCharCode(((code - 97 + (code2)) % 26) + 97);
            }
          }
        // }
        output += c;
      }
      this.setState({ciphertext:output});
    });
  }
  toPlain = (CipherText,Key)=>{
    this.scroll.scrollToEnd({animated:true});
    this.setState({ciphertext: this.filterAlpha(CipherText)},()=>{
    this.setState({key: Key});
    var output = '';
    var tempkey = 0;
    for (var i = 0; i < CipherText.length; i++) {
      var c = CipherText[i];
      // if (c.match(/[a-z]/i)) {
        var code = CipherText.charCodeAt(i);
        // var code2 = CipherText.charCodeAt(i-1);
        if(i==0){
          if ((code >= 65) && (code <= 90)){
            tempkey = ((code - 65 - Key )+26)%26;
            c = String.fromCharCode(tempkey + 65);
          }
          else if ((code >= 97) && (code <= 122)){
            tempkey = ((code - 97 - Key )+26)%26;
            c = String.fromCharCode(tempkey + 97);
          }
        }
        else{
          if ((code >= 65) && (code <= 90)){
            tempkey  = (code - 65 - tempkey + 26)% 26;
            c = String.fromCharCode(tempkey + 65);
          }
          else if ((code >= 97) && (code <= 122)){
            tempkey  = (code - 97 - tempkey + 26)% 26;
            c = String.fromCharCode(tempkey + 97);
          }
        }
      // }
      output += c;
    }
    this.setState({plaintext:output});
    });
  }
  onSliderChange = (Key)=>{
    if(this.state.isOnPlain){
      // this.toPlain(this.state.ciphertext,Key);
      this.toCipher(this.state.plaintext,Key);
    }
    else{
      // this.toCipher(this.state.plaintext,Key);
      this.toPlain(this.state.ciphertext,Key);
    }
  }

  render(){
      return(
        <ScrollView ref={ref => this.scroll = ref}>
          <View style={this.styles.container}>
            <Text style={{fontSize:responsiveFontSize(3)}}>Plain Text:</Text>
            <TextInput
              style={this.styles.textarea}
              placeholder={"Type Plain text in here"}
              placeholderTextColor={"#e0e0e0"}
              multiline={true}
              autoFocus={true}
              onChangeText={PlainText => this.toCipher(PlainText,this.state.key)}
              value={this.state.plaintext}
              onFocus={()=>{this.setState({isOnPlain:true});}}
            />
            <Text style={{fontSize:responsiveFontSize(3),}}>Key :</Text>
            <View style={{flexDirection:"row"}}>
              <Slider
                style={this.styles.slider}
                minimumValue={0}
                maximumValue={25}
                step={1}
                value={7}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(Key)=>{this.onSliderChange(Key)}}
              />
              <Text style={{marginTop:responsiveWidth(5),fontSize:responsiveFontSize(2.3)}}>{this.state.key}</Text>
            </View>
            <Text style={{fontSize:responsiveFontSize(3),}}>Cipher Text:</Text>
            <TextInput
              style={this.styles.textarea}
              placeholder={"Type Cipher text in here"}
              placeholderTextColor={"#e0e0e0"}
              multiline={true}
              onChangeText={CipherText => this.toPlain(CipherText,this.state.key)}
              value={this.state.ciphertext}
              onFocus={()=>{this.setState({isOnPlain:false});}}
            />
            <KeyboardSpacer/>
          </View>
        </ScrollView>
      );
  }
}
class PlayfairCipher extends React.Component{
  constructor(props){
    super(props);
    Alert.alert("Discalimer","1. 'J' is replaced with 'I' to fit 5x5 square\n2. 'X' is used as substitution in case you need to fill second letter in the digram, or split two identical letters")
    this.state={
      key:"",
      plaintext:"",
      ciphertext:"",
      isOnPlain:true,
      playfair: [
        ['A','B','C','D','E'],
        ['F','G','H','I','K'],
        ['L','M','N','O','P'],
        ['Q','R','S','T','U'],
        ['V','W','X','Y','Z'],
      ],
      playfairLookup:{        
        "A":{"column": 0,"row": 0,},
        "B":{"column": 1,"row": 0,},
        "C":{"column": 2,"row": 0,},
        "D":{"column": 3,"row": 0,},
        "E":{"column": 4,"row": 0,},
        "F":{"column": 0,"row": 1,},
        "G":{"column": 1,"row": 1,},
        "H":{"column": 2,"row": 1,},
        "I":{"column": 3,"row": 1,},
        "K":{"column": 4,"row": 1,},
        "L":{"column": 0,"row": 2,},
        "M":{"column": 1,"row": 2,},
        "N":{"column": 2,"row": 2,},
        "O":{"column": 3,"row": 2,},
        "P":{"column": 4,"row": 2,},
        "Q":{"column": 0,"row": 3,},
        "R":{"column": 1,"row": 3,},
        "S":{"column": 2,"row": 3,},
        "T":{"column": 3,"row": 3,},
        "U":{"column": 4,"row": 3,},
        "V":{"column": 0,"row": 4,},
        "W":{"column": 1,"row": 4,},
        "X":{"column": 2,"row": 4,},
        "Y":{"column": 3,"row": 4,},
        "Z":{"column": 4,"row": 4,}
      },
    };
    this.styles = StyleSheet.create({
      container:{
        flex:1,
        margin:responsiveWidth(5),
      },
      textarea:{
        textAlign:"center",
        height: responsiveHeight(33),
        borderWidth: 1,
        borderColor: '#9E9E9E',
        borderRadius:5,
        backgroundColor : "#FFFFFF",
        fontSize:responsiveFontSize(2.5)
      },
      fullinput:{
        fontSize:responsiveFontSize(2.5),
        height:responsiveHeight(7),
        width:responsiveWidth(90),
        borderWidth:1,
        borderRadius:5,
        borderColor: '#9E9E9E',
        backgroundColor : "#FFFFFF",
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
  pushSquare = (letter)=> {
    if (!letter.match(/[a-z]/i))
        return;
    var uLetter = letter.toUpperCase();
    if (uLetter == 'J') uLetter = 'I';
    if (playfairLookup[uLetter])
        return;
    if (column == 5) {
        playfair.push([]);
        column = 0;
    }
    playfair[playfair.length-1].push(uLetter);
    column++;
    playfairLookup[uLetter] = { row: playfair.length-1, column: playfair[playfair.length-1].length-1 };
  }
  generatePlaySquare=(key)=>{
    var playfair = [];
    var playfairLookup = {};
    var column = 5;
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    key.split('').forEach(letter => {
      if (!letter.match(/[a-z]/i))
          return;
      var uLetter = letter.toUpperCase();
      if (uLetter == 'J') uLetter = 'I';
      if (playfairLookup[uLetter])
          return;
      if (column == 5) {
          playfair.push([]);
          column = 0;
      }
      playfair[playfair.length-1].push(uLetter);
      column++;
      playfairLookup[uLetter] = { row: playfair.length-1, column: playfair[playfair.length-1].length-1 };
    });
    alphabet.split('').forEach(letter => {
      if (!letter.match(/[a-z]/i))
          return;
      var uLetter = letter.toUpperCase();
      if (uLetter == 'J') uLetter = 'I';
      if (playfairLookup[uLetter])
          return;
      if (column == 5) {
          playfair.push([]);
          column = 0;
      }
      playfair[playfair.length-1].push(uLetter);
      column++;
      playfairLookup[uLetter] = { row: playfair.length-1, column: playfair[playfair.length-1].length-1 };
    });
    this.setState({playfair:playfair,playfairLookup:playfairLookup});
    console.log(playfairLookup);
  }
  keyChanged = (text)=>{
    this.setState({key:text},()=>{
      this.generatePlaySquare(this.state.key);
      if(this.state.isOnPlain)
        this.toCipher(this.state.plaintext);
      else
        this.toPlain(this.state.ciphertext)
    });
  }
  EncryptBigramm = (first, second, square) => {
    var playfairLookup = this.state.playfairLookup;
    var transform = '';
    var posFirst = playfairLookup[first];
    var posSecond = playfairLookup[second];
    if (posFirst.row == posSecond.row) {
        transform += square[posFirst.row][posFirst.column == 4 ? 0 : posFirst.column+1];
        transform += square[posSecond.row][posSecond.column == 4 ? 0 : posSecond.column+1];
    } else if (posFirst.column == posSecond.column) {
        transform += square[posFirst.row == 4 ? 0 : posFirst.row+1][posFirst.column];
        transform += square[posSecond.row == 4 ? 0 : posSecond.row+1][posSecond.column];
    } else {
        transform += square[posFirst.row][posSecond.column];
        transform += square[posSecond.row][posFirst.column];
    }
    return transform;
  }
  DecryptBigramm=(first, second, square) => {
    var playfairLookup = this.state.playfairLookup;
    var transform = '';
    var posFirst = playfairLookup[first];
    var posSecond = playfairLookup[second];
    if (posFirst.row == posSecond.row) {
        transform += square[posFirst.row][posFirst.column == 0 ? 4 : posFirst.column-1];
        transform += square[posSecond.row][posSecond.column == 0 ? 4 : posSecond.column-1];
    } else if (posFirst.column == posSecond.column) {
        transform += square[posFirst.row == 0 ? 4 : posFirst.row-1][posFirst.column];
        transform += square[posSecond.row == 0 ? 4 : posSecond.row-1][posSecond.column];
    } else {
        transform += square[posFirst.row][posSecond.column];
        transform += square[posSecond.row][posFirst.column];
    }
    return transform;
  }
  toCipher = (text)=>{
    // this.scroll.scrollToEnd({animated:true});
    this.setState({plaintext:text});
    if(this.state.isOnPlain){
      var letters = text.toUpperCase().split('').filter(function(item){ return item.match(/[a-z]/i);}).map(function(item){ return item == 'J' ? 'I' : item; });
      var transformed = '';
      var playfair = this.state.playfair;
      for(var i = 0; i < letters.length; i += 2) {
          var first = letters[i];
          var second = (i + 1) >= letters.length ? 'X' : letters[i+1];
          if (first == second) {
              second = 'X';
              i--; //start from second
          }
          transformed += this.EncryptBigramm(first, second, playfair);     
      }
      this.setState({ciphertext:transformed});
    }
  }
  toPlain = (text)=>{
    // this.scroll.scrollToEnd({animated:true});
    this.setState({ciphertext:text});
    if(!this.state.isOnPlain){
      var letters = text.toUpperCase().split('').filter(function(item){ return item.match(/[a-z]/i);}).map(function(item){ return item == 'J' ? 'I' : item; });
      var transformed = '';
      var playfair = this.state.playfair;
      for(var i = 0; i < letters.length; i += 2) {
          var first = letters[i];
          var second = (i + 1) >= letters.length ? 'X' : letters[i+1];
          if (first == second) {
              second = 'X';
              i--; //start from second
          }
          transformed += this.DecryptBigramm(first, second, playfair);     
      }
      this.setState({plaintext:transformed});
    }
  }
  render(){
      return(
        <ScrollView ref={ref => this.scroll = ref}>
          <View style={this.styles.container}>
            <Text style={{fontSize:responsiveFontSize(3)}}>Plain Text:</Text>
            <TextInput
              style={this.styles.textarea}
              placeholder={"Type Plain text in here"}
              placeholderTextColor={"#e0e0e0"}
              multiline={true}
              onChangeText={(text) => this.toCipher(text,this.state.key)}
              value={this.state.plaintext}
              onFocus={()=>this.state.isOnPlain=true}
            />
            <Text style={{fontSize:responsiveFontSize(3),}}>Key:</Text>
            <TextInput
              style={this.styles.fullinput}
              placeholderTextColor={"#e0e0e0"}
              placeholder={"Enter Playfair Keyword"}
              textAlign={"center"}            
              onChangeText={(key)=>this.keyChanged(key)}
              value={this.state.key} />
            <Text style={{fontSize:responsiveFontSize(3),}}>Playfair Square:</Text>
            <Table style={this.styles.table}>
              <Rows data={this.state.playfair} textStyle={this.styles.tcell}/>
            </Table>
            <Text style={{fontSize:responsiveFontSize(3),}}>Cipher Text:</Text>
            <TextInput
              style={this.styles.textarea}
              placeholder={"Type Cipher text in here"}
              placeholderTextColor={"#e0e0e0"}
              multiline={true}
              onChangeText={text => this.toPlain(text,this.state.key)}
              value={this.state.ciphertext}
              onFocus={()=>this.state.isOnPlain=false}
            />
            <KeyboardSpacer/>
          </View>
        </ScrollView>
      );
  }
}
class VigenereCipher extends React.Component{
  constructor(props){
    super(props);
    this.state={
      key:"",
      plaintext:"",
      ciphertext:"",
      isOnPlain:true
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
      cipherout:{
        fontSize:responsiveFontSize(2.5),
        color:"#909090"
      },
      keyinput:{
        textAlign:"left",
        height: responsiveHeight(5),
        borderWidth: 1,
        borderColor: '#9E9E9E',
        backgroundColor : "#FFFFFF",
        fontSize:responsiveFontSize(2.5)
      },
      slider:{
        marginTop:responsiveHeight(2.5),
        marginBottom:responsiveHeight(2.5),
        width:responsiveWidth(85)
      }
    });
  }
  toCipher = (PlainText,key)=>{
    this.scroll.scrollToEnd({animated:true});
    this.setState({plaintext: PlainText});
    this.setState({key: key});
    var output = "";
    for (var i = 0, j = 0; i < PlainText.length; i++) {
      if (PlainText[i].match(/[a-z]/i)){
      var c = PlainText.charCodeAt(i);
      var temp=j%(key.length);
   
      if ((c >= 65) && (c <= 90)) {        
        if((key.charCodeAt(temp)>=65) && (key.charCodeAt(temp)<=90)){
        output += String.fromCharCode((c - 65 + key.charCodeAt(temp)-65) % 26 + 65);
        }
        else if((key.charCodeAt(temp)>=97) && (key.charCodeAt(temp)<=122)){
          output += String.fromCharCode((c - 65 + key.charCodeAt(temp)-97) % 26 + 65);
        }
        j++;
      } else if ((c >= 97) && (c <= 122)) {
        if((key.charCodeAt(temp)>=65) && (key.charCodeAt(temp)<=90)){
          output += String.fromCharCode((c - 97 + key.charCodeAt(temp)-65) % 26 + 97);
          }
          else if((key.charCodeAt(temp)>=97) && (key.charCodeAt(temp)<=122)){
            output += String.fromCharCode((c - 97 + key.charCodeAt(temp)-97) % 26 +97);
          }
          j++;
      } else {
        output += input.charAt(i);
      }
    }
  }
    this.setState({ciphertext:output});

  }
  toPlain = (CipherText,key)=>{
    this.scroll.scrollToEnd({animated:true});
    this.setState({ciphertext: CipherText});
    this.setState({key: key});
    var output = "";
    for (var i = 0, j = 0; i < CipherText.length; i++) {
      if (CipherText[i].match(/[a-z]/i)){
      var c = CipherText.charCodeAt(i);
      var temp=j%(key.length);
      if ((c >= 65) && (c <= 90)) {        
        if((key.charCodeAt(temp)>=65) && (key.charCodeAt(temp)<=90)){
        output += String.fromCharCode((c - 65 - key.charCodeAt(temp)) % 26 + 65);
        }
        else if((key.charCodeAt(temp)>=97) && (key.charCodeAt(temp)<=122)){
          output += String.fromCharCode((c - 65 - key.charCodeAt(temp)) % 26 + 65);
        }
        j++;
      } else if ((c >= 97) && (c <= 122)) {
        if((key.charCodeAt(temp)>=65) && (key.charCodeAt(temp)<=90)){
          output += String.fromCharCode((c - 97 - key.charCodeAt(temp)) % 26 + 97);
          }
          else if((key.charCodeAt(temp)>=97) && (key.charCodeAt(temp)<=122)){
            output += String.fromCharCode((c - 97 - key.charCodeAt(temp)) % 26 +97);
          }
          j++;
      } else {
        output += input.charAt(i);
      }
    }
    else{
      output +=CipherText[i];
    }
  }
    this.setState({plaintext:output});

  }
  onSliderChange = (Key)=>{
    if(this.state.isOnPlain){
      // this.toPlain(this.state.ciphertext,Key);
      this.toCipher(this.state.plaintext,Key);
    }
    else{
      // this.toCipher(this.state.plaintext,Key);
      this.toPlain(this.state.ciphertext,Key);
    }
  }


  render(){
      return(
        <ScrollView ref={ref => this.scroll = ref}>
          <View style={this.styles.container}>
            <Text style={{fontSize:responsiveFontSize(3)}}>Plain Text:</Text>
            <TextInput
              style={this.styles.textarea}
              placeholder={"Type Plain text in here"}
              placeholderTextColor={"#e0e0e0"}
              multiline={true}
              autoFocus={true}
              onChangeText={PlainText => this.toCipher(PlainText,this.state.key)}
              value={this.state.plaintext}
              onFocus={()=>{this.setState({isOnPlain:true});}}
            />
            <Text style={{fontSize:responsiveFontSize(3),}}>Key :</Text>
            <TextInput
            style={this.styles.keyinput}
            multiline={true}
            onChangeText={(key)=>this.toCipher(this.state.plaintext,key)}
            />
            <Text style={{fontSize:responsiveFontSize(3)}}>Cipher Text:</Text>
            <TextInput
              style={this.styles.textarea}
              placeholder={"Type Cipher text in here"}
              placeholderTextColor={"#e0e0e0"}
              multiline={true}
              onChangeText={CipherText => this.toPlain(CipherText,this.state.key)}
              value={this.state.ciphertext}
              onFocus={()=>{this.setState({isOnPlain:false});}}
            />
            <KeyboardSpacer/>
          </View>
        </ScrollView>
      );
  }
}
export{
    CeaserCipher,
    MultiplicativeCipher,
    AffineCipher,
    AutoKeyCipher,
    PlayfairCipher,
    VigenereCipher
}
