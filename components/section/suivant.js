import React from 'react';
import { ActivityIndicator, Platform, Image, StyleSheet, Text, View,  Alert, TouchableHighlight } from 'react-native';
import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator,  PulseIndicator,  SkypeIndicator,  UIActivityIndicator,  WaveIndicator,} from 'react-native-indicators';

export default function Suivant(props) {
const loader = ()=>{
  if (props.loading=== true) {
    const mouvement = props.moove
  return (<Text style={[styles.suivant, {color:props.c}]}>
           <UIActivityIndicator color='white' />
        </Text> )

  } else{
   return <Text style={[styles.suivant, {color:props.c}]}> {props.titre}  </Text> 
  }
}
  return (
    <View  style={styles.container} >
        <TouchableHighlight  style={[styles.bt , {backgroundColor:props.couleur}]}  onPress={props.appel} disabled={props.desactiver}>
         {loader()}
        </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:Platform.OS === 'ios' ? 45 : 45,
    borderRadius:20,
 
  
  },
  bt:{
     backgroundColor:'#191970',
     borderTopColor:'lightblue',
     borderTopWidth:2,
     width:'90%',
     flexBasis:'100%',
     alignItems: "center",
     justifyContent:'center',
     left:'5%',
     borderRadius:10,
     paddingTop:(Platform.OS === 'ios' ? 10:0 ),
  },
  suivant:{
    fontSize:19,
    fontWeight:'bold',
    textShadowColor:'orange',
    paddingBottom:(Platform.OS === 'ios' ? 7 : 0 )
  },


});
