import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import MenuBottom from '../section/menuBottom'


export default function Footer() {
  return (
   
        <View style={styles.txt}>
             <MenuBottom titre={'Se connecter'} />
             <MenuBottom titre={"S'inscrire"} />
             <MenuBottom titre={'Aide'} />
        </View>

  );
}

const styles = StyleSheet.create({

  txt:{
    flex:1,
    flexDirection:'row',
    color:'lightgreen',
    color:'white',
    fontWeight:'600',
    
  },
});
