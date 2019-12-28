import React from 'react';
import StyleSheet from 'react-native';
class Card {
  render() {
    return (
      <View style={cardStyle.card}>
        <TouchableHighlight onPress={this.color='red'} underlayColor={"#f1f1f1"}>
        </TouchableHighlight>   
      </View>
    );
  }
}
const cardStyle = StyleSheet.create({
  card: {
    // flex: 1,
    width:"50%",
    alignItems: 'center',
    borderColor:'black',
    borderWidth:3
  },
  card_text: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});