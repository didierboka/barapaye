import React from 'react'
import { StyleSheet,Text, View,  TouchableHighlight } from 'react-native';
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';


export default function Version() {

  return (
        <View> 
            <TouchableHighlight>
              <Text  style={styles.version}>Version 1.0</Text>
            </TouchableHighlight>
        </View>
  )
}
  

const styles = StyleSheet.create({
  version: {
    color:'gray', 
    paddingBottom:5,
    paddingTop:25,
  }
});

