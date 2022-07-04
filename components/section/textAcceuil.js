import React,  { useState, Animated,  useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';
// import Icon from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';


export default function TextAceuil() {
  // Icon.loadFont();
i18n.fallbacks = true;
i18n.translations = { en, fr };
const [hauteurH1 , setHauteurH1] = useState()
const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})

i18n.locale = dta.languageCode

const onLayout=(event)=> {
    const {x, y, height, width} = event.nativeEvent.layout;
    setHauteurH1(height)
}

  return (
    <View onLayout={onLayout} style={[styles.container, {height:hauteurH1}]}> 
        <Text style={styles.titre}>{i18n.t('h1Acceuil')}</Text>
        <Text style={styles.txt}>{i18n.t('textAcceuil')}</Text>
    </View>
  )
}
  

const styles = StyleSheet.create({
    container:{
      padding:12, 
    },
    titre:{
      fontWeight:'bold',
        color:'green',
        fontSize:20,
        textShadowColor:'white',
        textShadowRadius:2,
        // fontFamily:'Quintessential',
    },

    txt:{
        color:'#003060',
        fontWeight:'bold',
        fontSize:18,
    },

});

