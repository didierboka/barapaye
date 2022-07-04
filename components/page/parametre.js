import React , { useState, useEffect, useCallback }from 'react';
import { StyleSheet, Platform, Text, View,  FlatList, SafeAreaView, StatusBar , TouchableOpacity, Linking } from 'react-native';

import {Modal, Portal, Button, Provider, } from 'react-native-paper';

import { useNavigation, useFocusEffect} from '@react-navigation/native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en} from '../../i18n/supportedLanguages';
import { useSelector , useDispatch } from 'react-redux'

import { actionId, actionNom, actionPrenom ,actionDate, actionTelephone,actionSexe, actionPseudo, actionCommune,  actionQuartier, actionVille, actionEmail, actionPays } from '../../store/reducers/reducerProfil';
import { Shadow } from 'react-native-shadow-2'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import { BallIndicator, DotIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog from "react-native-dialog";
import call from 'react-native-phone-call'
import email from 'react-native-email'
import Icons from 'react-native-vector-icons/FontAwesome';

export default function Parametre({props}) {

  const dispatch = useDispatch()
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  const dataProfilUser = useSelector(state=> state.reducerProfil.profil)
  const [visible, setVisible] = useState(false);

  i18n.fallbacks = true;
  i18n.translations = { en, fr };
    
  console.log(i18n.locale)

  i18n.locale = dta.languageCode

  const navigation = useNavigation();

const deconnexion = ()=>{
  
  dispatch(actionPseudo({pseudoUtilisateur:''}))
  dispatch(actionId({idUtilisateur:''}))
  dispatch(actionNom({nomUtilisateur:''}))
  dispatch(actionPrenom({prenomUtilisateur:''}))
  dispatch(actionPays({paysUtilisateur:''}))
  dispatch(actionEmail({emailUtilisateur:''}))
  dispatch(actionSexe({sexeUtilisateur:''}))
  dispatch(actionTelephone({telephoneUtilisateur:''}))
  dispatch(actionDate({dateUtilisateur:''}))
  dispatch(actionCommune({communeUtilisateur:''}))
  dispatch(actionVille({villeUtilisateur:''}))
  dispatch(actionQuartier({quartierUtilisateur:''}))
  AsyncStorage.clear()
  navigation.reset({
    index:0,
    routes:[{ name:'Home' }]
  })
 
}

const urlFr = `https://barapaye.com/politique-confidentialite-fr/`
const urlAng = `https://barapaye.com/politique-confidentialite-ang/`

const lienFr =()=>{
  Linking.openURL(urlFr)
}

const lienAng =()=>{
  Linking.openURL(urlAng)
}

const lien =()=>{
  if (i18n.locale === 'fr') {
    Linking.openURL(urlFr)
  } else {
    Linking.openURL(urlAng)
  }
}

const back= ()=>{
    return navigation.pop()
  }

  const args = {
    number: '+2250506363591', // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
    skipCanOpen: true // Skip the canOpenURL check
  }


  const appeler =()=>{
    call(args).catch(console.error)
  }
  
  const handleEmail = () => {
      const to = ['barapaye.assistant@hotmail.com'] // string or array of email addresses
      email(to, {
         // Optional additional arguments
           cc: [], // string or array of email addresses
           subject: 'Objet',
           body: ''
       }).catch(console.error)

    }
  
  const modalView =()=>{
    setVisible(true);
  }

  const handleCancel = () => {
    setVisible(false);
  };

  return (

    <Provider>
    <View style={{flex:1, }}>
      <SafeAreaView style={{ backgroundColor:'#003060', }} >
        <StatusBar translucent barStyle='light-content' />
      </SafeAreaView>
      <View style={{ flex:1, marginTop:(Platform.OS === 'ios'? 0 :15),  backgroundColor:'#E9F9FF', }} >

            <Animatable.View  animation="slideInUp" style={{ flex:1 , backgroundColor:'#E9F9FF', paddingBottom:10, paddingTop:12 , borderTopWidth:1, borderColor:'#cccccc'}}>
         
                <View style={{ flexDirection:'row' , padding:15, paddingTop:15,  }}>
                    <TouchableOpacity onPress={back} style={{ flexDirection:'row'  }}>
                        <Icon name="arrow-left" size={30} color="#003060" />
                        <Text style={{ fontWeight:'bold', paddingLeft:5, color:'#003060', fontSize:19, marginLeft:15  }}>{i18n.t('Parametres')} </Text>
                    </TouchableOpacity>
                   
                </View>
                <View style={{ flex:1, paddingLeft:15,  }}>

                    <TouchableOpacity onPress={appeler} style={{ flexDirection:'row' ,  marginTop:5 }}>
                        <View style={{ width:40 }}>
                            <Icon name="phone" size={30} color="black" />
                        </View>
                        <Text style={{ fontWeight:'bold', color:'#4c4c4c', fontSize:15, marginLeft:10 , marginTop:3 }}>{i18n.t('Appelez')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleEmail} style={{ flexDirection:'row' ,  marginTop:15 }}>
                        <View style={{ width:40 }}>
                            <Icon name="mail" size={30} color="black" />
                        </View>
                        <Text style={{ fontWeight:'bold', color:'#4c4c4c', fontSize:15, marginLeft:10 , marginTop:3 }}>{i18n.t('contacter')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={modalView} style={{ flexDirection:'row' ,  marginTop:15 }}>
                        <View style={{ width:40 }}>
                            <Icon name="map-pin" size={30} color="black" />
                        </View>
                        <Text style={{ fontWeight:'bold', color:'#4c4c4c', fontSize:15, marginLeft:10 , marginTop:3 }}>{i18n.t('localisation')} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={deconnexion} style={{ flexDirection:'row' ,  marginTop:15  }}>
                        <View style={{ width:40 }}>
                            <Icon name="log-out" size={30} color="red" />
                        </View>
                        <Text style={{ fontWeight:'bold', color:'red', fontSize:15, marginLeft:10 , marginTop:3 }}>{i18n.t('deconnecter')} </Text>
                    </TouchableOpacity>
                   
                </View>
                <View style={{ height:130, justifyContent:'flex-end', paddingBottom :10 }}>
                    <Text style={{ height:20, textAlign:'center', color:'#003060', fontWeight:'bold',  }}>{i18n.t('Partenaires')} </Text>  
                    <View style={{ flexDirection:'row',  alignSelf:'center' }}>
                      <Text style={{ width:70, textAlign:'center', color:'gray', fontWeight:'bold',  }}>Ligdicash</Text> 
                       <Text style={{ width:10, textAlign:'center', color:'gray', fontWeight:'bold',  }}>|</Text>  
                      <Text style={{ width:70, textAlign:'center' ,  color:'gray', fontWeight:'bold', }}>UBA Bank</Text>  
                    </View>

                    <TouchableOpacity onPress={lien}>
                      <Text style={{ height:20, textAlign:'center', color:'green', fontWeight:'bold' }}> {i18n.t('PolitiqueConfidentialite')}</Text>  
                    </TouchableOpacity> 
                   
                    <Text style={{ height:20, textAlign:'center', color:'#003060', }}>Version 1.0</Text>
                </View>
            </Animatable.View>

          </View>


          <Dialog.Container visible={visible} contentStyle={{  padding:15, backgroundColor:'#E9F9FF', borderRadius:15, borderWidth:1, borderColor:'white', justifyContent:'center', alignContent:'center' , alignItems:'center'}}>
            <Dialog.Title > <Text style={{ color:'#192f6a', fontWeight:'bold' }}>BaraPaye</Text> </Dialog.Title>
            <View style={{  }}>
              <Text style={{  color: 'green', textAlign:'center', fontSize:17 }}>Cote d'Ivoire</Text>
              <View style={{ flexDirection:'row', marginTop:0 }}>
                  <View style={{ width:40 }}>
                    <Icons name="map-marker" size={25} color="#192f6a" />  
                  </View>
                  <View style={{ marginTop:0 }}>
                    <Dialog.Description contentStyle={{ flex:1, marginLeft:20,  }}>
                      <Text style={{ color:'#192f6a', fontSize:17  }}>
                        Abidjan - Yopougon
                      </Text>
                    </Dialog.Description>
                  </View>

              </View>

            </View>

            <View style={{ width:'100%', alignItems:'flex-end', alignContent:'flex-end', justifyContent:'flex-end' }}>
              <Dialog.Button label={i18n.t('fermer')}  onPress={handleCancel} />
            </View>
          </Dialog.Container>
      </View>

  
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'lightblue', 
    flex:1, 
    alignSelf:'center',  
    justifyContent:'center', 
    flexDirection:'column', 
    width:'100%'
  },

});