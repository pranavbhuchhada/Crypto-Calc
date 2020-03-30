import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Picker,
    Clipboard
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {responsiveFontSize,responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';
var hash = require('hash.js');
var md5 = require('md5');
class HashingAlgorithm extends React.Component{
  static navigationOptions = {
    title: 'Hashing Algorithms',
  };
  constructor(props){
    super(props);
    this.state={
      plaintext:"",
      hashtext:"",
      algo:1
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
        padding:responsiveWidth(2),
        fontSize:responsiveFontSize(2.5)
      },
      cipherout:{
        textAlign:"center",
        height: responsiveHeight(33),
        borderColor: '#9E9E9E',
        backgroundColor : "#FFFFFF",
        padding:responsiveWidth(2),
        fontSize:responsiveFontSize(2.5)
      },
    });
  }
  toHash = (PlainText)=>{
      this.setState({plaintext:PlainText},()=>{
        switch(this.state.algo){
          case 1:
            this.setState({hashtext:md5(PlainText)});
            break;
          case 2:
            this.setState({hashtext:hash.sha1().update(PlainText).digest("hex")});
            break;
          case 3:
            this.setState({hashtext:hash.sha224().update(PlainText).digest("hex")});
            break;
          case 4:
            this.setState({hashtext:hash.sha256().update(PlainText).digest("hex")});
            break;
          case 5:
            this.setState({hashtext:hash.sha384().update(PlainText).digest("hex")});
            break;
          case 6:
            this.setState({hashtext:hash.sha512().update(PlainText).digest("hex")});
            break;
        }
      });
  }
  temp = ()=>{
    alert("Hello");
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
              onChangeText={(PlainText)=>{this.toHash(PlainText)}}
              value={this.state.plaintext}
            />
            <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
                <Text style={{fontSize:responsiveFontSize(2.25)}}>Hashing Algorithm : </Text>
                <Picker
                    selectedValue={this.state.algo}
                    onValueChange={(itemValue, itemIndex) => this.setState({algo: itemValue},()=>this.toHash(this.state.plaintext))} 
                    style={{width:150}}>
                    <Picker.Item label="MD-5" value={1} />
                    <Picker.Item label="SHA-1" value={2} />
                    <Picker.Item label="SHA-224" value={3} />
                    <Picker.Item label="SHA-256" value={4} />
                    <Picker.Item label="SHA-384" value={5} />
                    <Picker.Item label="SHA-512" value={6} />
                </Picker>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
              <Text style={{fontSize:responsiveFontSize(3),}}>Hashed Output:</Text>
              <TouchableHighlight onPress={()=>{alert("Copied to clipboard");Clipboard.setString(this.state.hashtext);}} underlayColor = {"#FFF"}><Text>Copy to clipboard</Text></TouchableHighlight>
            </View>
            <TextInput
              style={this.styles.cipherout}
              placeholder={"Hashed output appears here."}
              placeholderTextColor={"#e0e0e0"}
              multiline={true}
              editable={false}
              value={this.state.hashtext}
            />
          </View>
        </ScrollView>
      );
  }
}
export{
    HashingAlgorithm
}