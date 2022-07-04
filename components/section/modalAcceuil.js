

import React , { useState } from "react";
import { StyleSheet, Modal,ScrollView, Linking,  TouchableOpacity,Platform ,SafeAreaView, Text, View, Image, TouchableHighlight } from 'react-native';
import Map from './map'
import Faq from './faq'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import Dialog from "react-native-dialog";
import { Button } from "react-native-paper";
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';
import * as RNLocalize from "react-native-localize";

export default function AcceuilModal(props) {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
 
  const url = `https://barapaye.com/politique-confidentialite-fr/`
  const modalView =()=>{
    setVisible(true);
  }

  const handleCancel = () => {
    setVisible(false);
  };

  const lien =()=>{
    Linking.openURL(url)
  }

  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  i18n.fallbacks = true;
  i18n.translations = { en, fr };
  i18n.locale = dta.languageCode


  return (

    <View style={{borderRadius:10, backgroundColor:'#002040', width:'100%', alignContent:'flex-end', alignItems:'flex-end' }}>
        <TouchableOpacity onPress={modalView}  style={[styles.image1 , {display: modalVisible === false ?  null :'none' }]} >
            <Animatable.View  animation="bounceIn">
             <Icon name="info-with-circle" size={25} color="#E9F9FF" />
            </Animatable.View>            
        </TouchableOpacity>
        <Dialog.Container visible={visible} contentStyle={{ backgroundColor:'#E9F9FF', borderRadius:15, borderWidth:1, borderColor:'white', justifyContent:'center', alignContent:'center' , alignItems:'center',  padding:15}}>
            <Dialog.Title > <Text style={{ color:'#192f6a', fontWeight:'bold', width:'100%', textAlign:'center', borderWidth:1, borderColor:'red', fontSize:25 }}>BaraPaye</Text> </Dialog.Title>
            <View style={{  }}>
            <Text>{i18n.t('information')}</Text>
            <Button onPress={lien} color='black' style={{ backgroundColor:'lightgreen', marginTop:15 }}>{i18n.t('lire')}</Button>

            </View>

            <View style={{ width:'100%', alignItems:'flex-end', alignContent:'flex-end', justifyContent:'flex-end' }}>
              <Dialog.Button label={i18n.t('fermer')}  onPress={handleCancel} />
            </View>
          </Dialog.Container>
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
    // position:'absolute',
    
  
   },

   image1:{
    width:35,
    height:35,
    marginTop: Platform.OS === 'ios' ? 25 : 35,
    marginEnd:20,
    top:10,
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center'
  }
  , 
  imageIn:{
    width:25,
    height:25,

  },


  
});


