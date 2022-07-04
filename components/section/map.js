import React from 'react'
import { Text, View } from 'react-native';

export default function Map() {

  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>


    <View style={{flexDirection:'column', marginTop:20, borderWidth:0.3, borderColor:'#3185a1', padding:20, borderRadius:15,backgroundColor:'#8bd0db' }}>
      <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center'}}>Nos contacts :</Text>
     

          <Text style={{fontWeight:'bold', color:'blue', fontSize:15 ,  marginTop:5}}>Telephonique :</Text>
          <Text style={{fontWeight:'bold', marginLeft:15 , marginTop:5 }}> +225 05 06 36 35 91</Text>
          <Text style={{fontWeight:'bold', marginLeft:15 , }}> +225 05 06 36 35 91</Text>


          <Text style={{fontWeight:'bold', color:'blue', fontSize:15 ,  marginTop:5}}> Mail</Text>
          <Text style={{fontWeight:'bold', marginLeft:15 , marginTop:5 }}> developpeur.web@hotmail.com</Text>
          <Text style={{fontWeight:'bold', marginLeft:15 , }}> livetube225@gmail.com</Text>


          <Text style={{fontWeight:'bold', color:'blue', fontSize:15 ,  marginTop:5}}> Nous trouver</Text>
          <Text style={{fontWeight:'bold', marginLeft:15 ,  marginTop:5 }}> Abobo </Text>
          <Text style={{fontWeight:'bold', marginLeft:15 , }}> Yopougon sicogie</Text>

      </View>


    

</View>
  )
}
  



