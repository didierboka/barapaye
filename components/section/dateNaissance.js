import React , { useState }from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

 export default function DateNaissance(props) {


   return (
     <View>
          <Text style={{ textAlign:'left', marginTop:10, marginLeft:10}}>Date de naissance </Text>
          <View style={{flex:1, flexDirection:'row', }}>
            
            <TextInput
                keyboardType="numeric"
                maxLength = {2}
                underlineColor='black'
                label='Jour'
                style={{ flex:1, fontSize:15,paddingTop:0, color:'black', borderColor:'#2f829a', backgroundColor:'#94cdde', borderBottomWidth:2, marginTop:5 , marginLeft:6}}
            />

            <TextInput
                keyboardType="numeric"
                maxLength = {2}
                underlineColor='black'
                label='Mois'
                style={{ flex:1,   fontSize:15,paddingTop:0,  color:'black', borderColor:'#2f829a', backgroundColor:'#94cdde', borderBottomWidth:2, marginLeft:10, marginRight:10, marginTop:5}}
            />

            <TextInput
            
                keyboardType="numeric"
                maxLength = {4}
                underlineColor='black'
                label='Année'
                value={props.value}
                style={{ flex:2,  fontSize:15 , paddingTop:0, color:'black', borderColor:'#2f829a', backgroundColor:'#94cdde', borderBottomWidth:2, marginTop:5, marginRight:5}}
            />
      </View>
     </View>

   )


 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor:'lightblue',
     flexDirection:'row',
   },

 });



