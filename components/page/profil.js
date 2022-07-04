import React , { useState, useEffect, useRef }from 'react';
import { StyleSheet, Platform, ScrollView,Modal, Text, View, Picker, FlatList, Pressable, Image , SafeAreaView, StatusBar , TouchableOpacity, TouchableHighlight, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import Suivant from '../section/suivant';
import Head from '../section-user/head';
import { TextInput, Menu, Button, Portal, Provider  } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';
import { Header } from 'react-navigation-stack';
import axios from 'axios';
import { useSelector , useDispatch } from 'react-redux'
import { actionEmailP , actionNomP , actionPrenomP , actionDeviseP, actionPseudoP , actionNumeroP,  actionMontant} from '../../store/reducers/paiement';
import {actionSommeB, actionSommeC ,actionDeviseB, actionDeviseC , actionQuota} from '../../store/reducers/initiale'
import { actionId, actionNom, actionPrenom , actionTelephone,actionSexe, actionPseudo, actionCommune, actionDate, actionQuartier, actionVille, actionEmail, actionPays } from '../../store/reducers/reducerProfil';
import { Shadow } from 'react-native-shadow-2'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';

export default function Profil({props}) {
  const urlListe = 'https://www.barapaye.com/liste/';
  const [checked, setChecked] = useState(false);
  const dataPaiement = useSelector(state=> state.reducerPaiement.depot)
  const [modalVisible, setModalVisible] = useState(true);
  const [monnaie, setMonnaie] = useState('GBP')
  const [refreshing, setRefreshing] = React.useState(false)
  const dispatch = useDispatch()
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  i18n.locale = dta.languageCode
  const dataProfilUser = useSelector(state=> state.reducerProfil.profil)
  const formule = useSelector(state=> state.reducerInitiale.depot)


  i18n.fallbacks = true;
  i18n.translations = { en, fr};
    
  i18n.locale = dta.languageCode

  const navigation = useNavigation();
  let [load, setLoad]= useState(false)
  
 

  const [somme, setSomme] = useState(formule.sommeB)
  const [dActive, setDActive]= useState(formule.quota)
  const [numero , setNumero]=useState('098')
  const [deviseName, setDeviseName]= useState(dataPaiement.devise)


const back= ()=>{
    return navigation.pop()
  }

  const handleRefresh = () => {
    setRefreshing(prevState => !prevState)
  }


const manager =(e)=>{
    console.log(e.name)
    console.log(e)
}

function isNumeric(num){
  return !isNaN(num)
}

 const methodNumero=(e)=>{

    setNumero(e)
    setMessageNumero('')
    console.log(e)
  }






const connexion = () => {

if (isNumeric(numero)){
  if (numero.length >= 12 ) {
    if(parseInt(somme) >= 5){
      liaison()
      return navigation.push('Web')
    }
    else{
      setMessageMontant('entrer un montant superieur 5 '+ deviseName)
    }
} 
else {
setMessageNumero('verifier le numero de telephone 2 ')
}
} else {
  setMessageNumero('Numero Invalide ')
}




}

const lien =()=>{
  return navigation.push('Infos')
}

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

  return navigation.popToTop()
}


const renderItem = ({item}) => {

const url = ()=>{
  if (item.lien === 'deconnexion') {
    return deconnexion()
  }
  if (item.lien === 'Infos') {
    return lien()
  }
}

  return (
    <Shadow viewStyle={{ flex:1, marginLeft:12, marginBottom:2, marginRight: 5 , flexDirection:'row', padding:10, backgroundColor:item.color, borderRadius:4, marginTop:2, borderWidth:1, borderColor:'#e5e5e5'  }} containerViewStyle={{ flex:1 }} >
      
      <TouchableOpacity onPress={url} style={{ flex:1, flexDirection:'row', padding:10, paddingLeft:6, backgroundColor:item.color, marginTop:2,  borderRadius:4, }}>
       
        <View style={{ paddingLeft:8, paddingRight:14, alignSelf:'center', alignItems:'center' }}>
           <Icon name={item.icon} size={30} color="black" />
        </View>

        <View style={{ flex:1 , flexDirection:'row' }}>
         
              <Text style={{ flex:1, fontWeight:'bold', color:"#002040", marginTop:4, }}>{item.title}</Text>

        </View>

        <View style={{alignSelf:'center', alignItems:'center' }}>
          <Icon name='chevron-right' size={25} color="black" />
        </View>
      
      </TouchableOpacity>
  
    </Shadow>
    )
}
const myKeyExtractor = (item) => {
  return item.id.toString()
}




const MarvelList = [
  {id: 1, title: 'My Info', lien:'Infos', icon:'user', color:'#E9F9FF' },
  {id: 2, title: 'My card' ,  lien:'Infos',  icon:'user' ,  color:'#E9F9FF'},
  {id: 3, title: 'Settings' ,  lien:'Infos' ,  icon:'user',  color:'#E9F9FF'},
  {id: 4, title: 'Help center' ,  lien:'Infos' ,  icon:'user',  color:'#E9F9FF'},
  {id: 5, title: 'Fac' ,  lien:'Infos',  icon:'user' ,  color:'#E9F9FF'},
  {id: 6, title: 'Deconnecter' ,  lien:'deconnexion', icon:'log-out',  color:'#E9F9FF' },
  ];

  return (

    <View style={{flex:1, backgroundColor:'#002040', }}>
      <SafeAreaView style={{ backgroundColor:'#003060', }} >
        <StatusBar translucent barStyle='light-content' />
      </SafeAreaView>
      <View style={{ flex:1, marginTop:(Platform.OS === 'ios'? 0 :0),  backgroundColor:'#002040', }} >
          <Animatable.View animation="slideInUp"  style={{ height:190,  }}>
          <TouchableOpacity style={{marginTop:20 }} onPress={back}>
            <View style={{ flexDirection:'row' }}>
              <Icon name="arrow-left" size={30} color="#E9F9FF" />
              <Text style={{ color:'white', fontSize:17 }}>Profil </Text>
            </View>

          </TouchableOpacity>

            <View style={{ flex:1, justifyContent:'flex-end',  paddingLeft:5, fontSize:14, color:'white',  }}>
              <View style={{ alignContent:'center', alignItems:'center' }}>
                <Icon name="user" size={60} color="white" />
              </View>
              <Text style={{ color:'white', fontSize:25 , marginTop:20, textAlign:'center', marginBottom:15}}> {dataProfilUser.pseudo}</Text>
            </View>
          </Animatable.View>
          <View style={{ flex:1,  backgroundColor:'#E9F9FF', borderRadius:15 }}>
 

            <View>
                <FlatList data={MarvelList} renderItem={renderItem}
                ItemSeparatorComponent={
                  Platform.OS !== 'android' &&
                  (({ highlighted }) => (
                    <View style={ styles.separator } />
                  ))
                }
                keyExtractor={myKeyExtractor}
                refreshing={refreshing}
                onRefresh={handleRefresh}
              /> 

            </View>
 
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
    },
});