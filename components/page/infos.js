import React , { useState, useEffect, useRef }from 'react';
import { StyleSheet, Platform, ScrollView,Modal, Text, View, Picker, FlatList, Pressable, Image , SafeAreaView, StatusBar , TouchableOpacity, TouchableHighlight, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { TextInput, Menu, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';
import { Header } from 'react-navigation-stack';
import axios from 'axios';
import { useSelector , useDispatch } from 'react-redux'
import { Shadow } from 'react-native-shadow-2'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';

export default function Infos({props}) {
  const urlListe = 'https://www.barapaye.com/liste/';
  const [checked, setChecked] = useState(false);
  const dataPaiement = useSelector(state=> state.reducerPaiement.depot)
  const dispatch = useDispatch()
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  i18n.locale = dta.languageCode
  const dataProfilUser = useSelector(state=> state.reducerProfil.profil)
  const formule = useSelector(state=> state.reducerInitiale.depot)


  i18n.fallbacks = true;
  i18n.translations = { en, fr };
    
  i18n.locale = dta.languageCode

  const navigation = useNavigation();

  const back= ()=>{
      return navigation.pop()
  }


  return (

    <View style={{flex:1, backgroundColor:'#002040', }}>
      <SafeAreaView style={{ backgroundColor:'#003060', }} >
        <StatusBar translucent barStyle='light-content' />
      </SafeAreaView>
      <View style={{ flex:1, marginTop:(Platform.OS === 'ios'? 0 : 15) }} >
          <Animatable.View animation="slideInUp"  style={{ height:190,  backgroundColor:'#002040', }}>
          <TouchableOpacity style={{marginTop:20 }} onPress={back}>
            <View style={{ flexDirection:'row' }}>
              <Icon name="arrow-left" size={30} color="#E9F9FF" />
              <Text style={{ color:'white', fontSize:17 }}>Profil </Text>
            </View>

          </TouchableOpacity>

            <View style={{ flex:1, justifyContent:'flex-end',  paddingLeft:5, fontSize:14, color:'white', }}>
              <View style={{ alignContent:'center', alignItems:'center' }}>
                <Icon name="user" size={60} color="white" />
              </View>
              <Text style={{ color:'white', fontSize:25 , marginTop:20, textAlign:'center', marginBottom:15}}> {dataProfilUser.pseudo}</Text>
            </View>
          </Animatable.View>
          <View style={{ flex:1,  backgroundColor:'#E9F9FF',  borderRadius:15 }}>
 

            <View style={{ justifyContent:'center', alignItems:'center', paddingTop:10}}>
                <Button style={{ borderRadius:20, borderColor:'gray', borderWidth:1, padding:10, paddingTop:2, paddingBottom:2 }}> Edit Profil </Button> 
            </View>
            <ScrollView style={{ flex:1 , paddingLeft:20, paddingRight:20, marginTop:30, }}>
               
               {/*  first data  */}
                <View style={{ flexDirection:'row', borderBottomWidth:1, borderColor:'#cccccc' , paddingBottom:9 }}>
                    <View style={{ justifyContent:'center', height:90  }}>
                         <Icon name="user" size={35} color="black" />
                    </View>
                   
                    <View style={{ flex:1, marginLeft:20 , paddingRight:10}}>
                        <Text style={{ fontWeight:'bold' }}>Name </Text>
                       
                        <View style={{ flexDirection:'row' }}>
                            <Text  style={{ flex:1, color:"#1919ff" }}>{dataProfilUser.nom}  {dataProfilUser.prenom}  </Text>
                            <Icon name="edit-2" size={20} color="black" />
                        </View>

                        <Text style={{ fontWeight:'bold', marginTop:10 }}>Pseudo </Text>
                        <View style={{ flex:1, flexDirection:'row' }}>
                            <Text style={{ flex:1 , color:"#1919ff"}}>{dataProfilUser.pseudo} </Text>
                            {/* <Icon name="edit-2" size={20} color="black" /> */}
                        </View>
                    </View>
                </View>
             {/*  end data  */}


                {/*  email data  */}
                <View style={{ flexDirection:'row', paddingTop:20, borderBottomWidth:1, borderColor:'#cccccc' , paddingBottom:9 }}>
                    <View style={{ justifyContent:'center', }}>
                         <Icon name="mail" size={35} color="black" />
                    </View>
                   
                    <View style={{ flex:1, marginLeft:20 , paddingRight:10}}>
                        <Text style={{ fontWeight:'bold' }}>E-mail </Text>
                       
                        <View style={{ flexDirection:'row' }}>
                            <Text  style={{ flex:1, color:"#1919ff" }}>{dataProfilUser.email} </Text>
                            <Icon name="edit-2" size={20} color="black" />
                        </View>

                    </View>
                </View>
             {/*  end email  */}

                {/*  tel data  */}
                <View style={{ flexDirection:'row', paddingTop:20, borderBottomWidth:1, borderColor:'#cccccc' , paddingBottom:9 }}>
                    <View style={{ justifyContent:'center', }}>
                         <Icon name="phone" size={35} color="black" />
                    </View>
                   
                    <View style={{ flex:1, marginLeft:20 , paddingRight:10}}>
                        <Text style={{ fontWeight:'bold' }}> Numero </Text>
                       
                        <View style={{ flexDirection:'row' }}>
                            <Text  style={{ flex:1, color:"#1919ff" }}>+{dataProfilUser.telephone} </Text>
                            <Icon name="edit-2" size={20} color="black" />
                        </View>

                    </View>
                </View>
             {/*  end tel  */}


            {/*  first data  */}
               <View style={{ flexDirection:'row', borderBottomWidth:1, borderColor:'#cccccc' , paddingBottom:9 , paddingTop:20 }}>
                    <View style={{ justifyContent:'center', height:90  }}>
                         <Icon name="map-pin" size={35} color="black" />
                    </View>
                   
                    <View style={{ flex:1, marginLeft:20 , paddingRight:10}}>
                        <Text style={{ fontWeight:'bold' }}>Country </Text>
                       
                        <View style={{ flexDirection:'row' }}>
                            <Text  style={{ flex:1,  color:'#1919ff' }}>Vide </Text>
                            <Icon name="edit-2" size={20} color="black" />
                        </View>

                        <Text style={{ fontWeight:'bold', marginTop:10 }}>Ville</Text>
                        <View style={{ flex:1, flexDirection:'row' }}>
                            <Text style={{ flex:1, color:'#1919ff' }}>Vide</Text>
                            <Icon name="edit-2" size={20} color="black" /> 
                        </View>
                    </View>
                </View>
            {/*  end data  */}


            </ScrollView>
 
          </View>
   
      </View>

    </View>
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
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
    pickerStyle:{  
        height: 60,  
        width: 100,  
        color: '#344953',  
        justifyContent: 'center',  
        fontWeight:'bold',
        backgroundColor:'white',
    },
    image:{
      marginTop:0,
      width:30,
      height:20,
      justifyContent:'center',
      alignContent:'center',
      alignSelf:'center'
    },
    separator: {
      height: 1,
      width: "100%",
      backgroundColor: '#ff0000',
    },
});