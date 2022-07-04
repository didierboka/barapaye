
import React from 'react'
import { Text, View } from 'react-native';

export default function Fac(props) {

  return (
    <View style={{ height:'auto', margin:5, }}>

      <View style={{borderWidth:1, padding:5, borderRadius:10, backgroundColor:'#82c5d9', borderColor:'#3187a1' }}>
          <Text style={{ fontSize:16, alignContent:'center', color:'black', marginTop:5, fontWeight:'bold' }}>
            {props.question}
          </Text>
        <View style={{ marginRight:3, marginTop:15,}}>
            <Text> {props.reponse}</Text>
        </View>
      </View>

    </View>
  )
}

