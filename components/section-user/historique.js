
import React , { useState, useEffect } from "react";
import { StyleSheet, Text,FlatList, View, Platform } from 'react-native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';
import { Button } from "react-native-paper";


export default function Historique(props) {
  i18n.fallbacks = true;
  i18n.translations = { en, fr };
    
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  i18n.locale = dta.languageCode

  const [contacts, setContacts] = useState([]);

  return (
        <View style={{flex:1, padding:10, alignItems:'center',  justifyContent:'center' }}>   
            <Text>La page historique </Text>
            <Button> Press </Button>
        </View>
  )
}
  
const styles = StyleSheet.create({

   fa: {
    flex:1,
    alignItems: 'baseline',
    justifyContent:'center',
    width: '100%', 
    flexDirection:'row',
    position:'absolute',
    top:80,
  
   },

});


