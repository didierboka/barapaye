import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight } from 'react-native';

export default function MenuBottom(props) {
 const openAlert=()=>{
    Alert.alert('ok')
  }
  return (
    <View style={styles.container}>
       
        <TouchableHighlight style={styles.bt} onPress={()=>Alert.alert(props.titre)}>
        <Text> {props.titre}</Text>
        </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign:'center',
  },
  bt:{
    flex:1,
    color:'black',
    fontWeight:'900',
    backgroundColor:'white',
    width:'100%',
    flexBasis:'100%',
    alignItems: "center",
    justifyContent:'center'
  },
});
