import React from 'react';
import {View, StyleSheet } from 'react-native';
import { TextInput,  } from 'react-native-paper';

export default function FormInscription(props) {


  return (
    <View style={{ padding:6 }}>
      
            <TextInput
                name={props.name}
                
                autoCorrect={false}
                // selectionColor={props.selectionner}
                theme={{ colors: {label: 'red'} }}
                keyboardType={props.clavierType}
                // keyboardType='visible-password'
                autoFocus={props.focus}
                underlineColor={props.couleur}
                autoComplete={'off'}
                secureTextEntry={props.securite}
                label={props.label}
                theme={{colors:{text: props.couleur, fontWeight:'bold'}}}
                left={<TextInput.Icon name={props.icone} size={20} color={props.couleur} />}
                right={props.droite}
                value={props.valeur}
                onChangeText={props.changement}
                style={{ fontSize:15, paddingTop:0, height:55, paddingLeft:0, borderColor:props.couleur, backgroundColor:'#a3d4e3', borderBottomWidth:1, }}
            />
     
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign:'center',

  },
});
