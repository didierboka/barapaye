import React from 'react';
import { StyleSheet, Text, View,  } from 'react-native';

export default function TermeCondition(props) {


  return (
    <View style={styles.container}>
          <Text style={{ fontWeight:'bold', color:'#750000', textAlign:'center' }}>
            {props.texte}
          </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position:'relative',
    justifyContent:'center',
    bottom:0,
    width:'100%',
    textAlign:'center',
    alignContent:'center',
    padding:5,
    fontSize:13,
  },
 

});
