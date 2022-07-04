
import React , { useState } from "react";
import { StyleSheet, Text, View  } from 'react-native';

export default function DataProfil(props) {

return (
    <View style={styles.container}>
        <Text style={{flex:1}}>{props.titre} :</Text>
        <Text style={{flex:1, fontWeight:'bold'}}> {props.data} </Text>
    </View>
  )
}
  

const styles = StyleSheet.create({

   container: {
    flex:1, 
    flexDirection:'row', 
    paddingLeft:40,
    marginTop:3,
    backgroundColor:'lightblue',
    paddingTop:7,
    paddingBottom:7,
   },



  
});


