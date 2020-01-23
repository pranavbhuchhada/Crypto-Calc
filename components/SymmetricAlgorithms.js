import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Slider,
    Picker
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
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
        // borderRadius: 20 ,
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
          c = String.fromCharCode(((code - 65 + Key) % 26) + 65);
        else if ((code >= 97) && (code <= 122))
          c = String.fromCharCode(((code - 97 + Key) % 26) + 97);
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
              onChangeText={PlainText => this.toCipher(PlainText,this.state.key)}
              value={this.state.plaintext}
              onFocus={()=>this.state.isOnPlain=true}
            />
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
              onFocus={()=>this.state.isOnPlain=false}
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
        // borderRadius: 20 ,
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
              onFocus={()=>this.state.isOnPlain=true}
            />
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
              onFocus={()=>this.state.isOnPlain=false}
            />
            <KeyboardSpacer/>
          </View>
        </ScrollView>
      );
  }
}
export{
    CeaserCipher,
    MultiplicativeCipher
}