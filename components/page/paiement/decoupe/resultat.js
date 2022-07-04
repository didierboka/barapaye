import React , { useState , useEffect, } from "react";
import { StyleSheet, Text, View, Image , SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { useSelector , useDispatch } from 'react-redux'
import { fr, en } from '../../../../i18n/supportedLanguages';
import axios from 'axios';
import { parseInt } from "lodash";
import { UIActivityIndicator, } from 'react-native-indicators';
import { actionFiles, actionItems,} from '../../../../store/reducers/reducerProfil';
import Icon from 'react-native-vector-icons/Feather';

export default function Resultat(props) {
  const dataPaiement = useSelector(state=> state.reducerPaiement.depot)
  const formule = useSelector(state=> state.reducerInitiale.depot)
  const dataProfil = useSelector(state=> state.reducerProfil.profil)
  const urlData =`https://www.barapaye.com/status/${dataProfil.pseudo}/`
  const urlMonnaie = 'https://www.barapaye.com/monnaie/';  
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  i18n.locale = dta.languageCode
  const toSend = require('../../../../assets/errorpayment.png');
  i18n.fallbacks = true;
  i18n.translations = { en, fr  };
  

  i18n.locale = dta.languageCode
  const dispatch = useDispatch()
  const navigation = useNavigation();


  const[chargement, setChargement]= useState(false)
  const [loading, setLoading]= useState(true)


  setTimeout(() => {
    setLoading(false)
  }, 600);

   useEffect(() => {
    res()
    monnaie()
   }, [ res])

   useFocusEffect(
    React.useCallback(() => {
      console.log('Home Screen was focused');
      setChargement(false)
      return () => {
        console.log('Home Screen was unfocused');
      };
    }, [])
  );


  const monnaie=()=>{
    axios.get(urlMonnaie)
    .then(resMonnaie => {
        const dataMon = resMonnaie.data
        const dataM = dataMon.find(c => c.code === 'valeur')
        console.log('devise '+ dataM.livre)
        dispatch(actionLivre({livreUtilisateur:dataM.livre}))
        dispatch(actionDollar({dollarUtilisateur:dataM.dollar}))
        dispatch(actionEuro({euroUtilisateur:dataM.euro}))       
        })
        .catch((e)=>{
       
        console.log('echec !')
        })
  }
  
const getTrans = ()=>{
  setChargement(true)
  axios.get(urlData)
  .then(res => {
    const dataRes = res.data
     const finder= dataRes.filter(e => {
       
      return (e.payment_status === 'completed' && e.clientLastname === dataProfil.pseudo) || (e.payment_status === 'pending' && e.clientLastname === dataProfil.pseudo)

     } )     
     const inverser = finder.reverse()
    dispatch(actionFiles({filesUtilisateur:inverser}))
    dispatch(actionItems({itemsUtilisateur:finder.length}))

    setTimeout(() => {
      setChargement(false)
      return navigation.push('visa')
    }, 600);
  })
  .catch((e)=>{

    console.log('echec !')
  })
  
} 

const goToHome =()=>{
  setChargement(true)
  getTrans()
}

const charger=()=>{
  if (chargement === true) {
    return (
      <View style={{ width: (chargement === true ? 30:27 ), }}>
        <UIActivityIndicator size={20} color='#002040' />
      </View>
    )
  } else {
    return (
      <Text style={{  color: (chargement === true ? 'black':'black' ), fontSize:16,  fontWeight:'bold',  marginTop:(Platform.OS === 'ios'? 3 :0 ),  textAlign:'center'  }}>{i18n.t('Reesayer')} </Text>
    )
  }
}

const res=()=>{
  if (dataPaiement.statut === 'notcompleted') {
    // condition pour l'operation echouer
    return (
    <View style={{ backgroundColor:'#ff4c4c', borderRadius:10, position:'absolute',width:'95%', justifyContent:'center',  paddingTop:19, paddingBottom:19 , fontWeight:'bold', alignContent:'center', alignItems:'center' }}>
       <Icon name="alert-triangle" size={55} color="yellow" />
    
      <Text style={{ color:'white' , fontSize:18 }} >{i18n.t('montant')} : {dataPaiement.montant+' '+ (dataPaiement.devise === 'livre'?'£': (dataPaiement.devise === 'dollar'?'$': '€') ) } = {parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota)} XOF </Text>
      <Text  style={{ color:'white', fontSize:18 }}  >{i18n.t('clientPhone')} : +225 {dataPaiement.numero} </Text>
      <Text  style={{ color:'white', fontSize:18 }}  > {i18n.t('numeroTikect')} : {dataPaiement.date} </Text>
      <Text  style={{ color:'white', fontSize:18 }}> {i18n.t('TransfertEchec')} </Text>

      <TouchableOpacity onPress={goToHome} disabled={chargement} style={{ backgroundColor:'lightblue', padding:10, paddingTop:10,  marginTop:40, borderRadius:10, flex:1  }} >
        {charger()}
      </TouchableOpacity>
    </View>
    )
  }
  if (dataPaiement.statut === 'pending') {
    return (
      <View style={{ backgroundColor:'#ff4c4c', borderRadius:10, position:'absolute',width:'95%', justifyContent:'center',  paddingTop:19, paddingBottom:19 , fontWeight:'bold', alignContent:'center', alignItems:'center' }}>
      {/* <Image style={styles.image} source={toSend} /> */}
      <Icon name="alert-triangle" size={55} color="yellow" />
      <Text style={{ color:'white' , fontSize:18, marginTop:20 }} >{i18n.t('montant')} : {dataPaiement.montant+' '+ (dataPaiement.devise === 'livre'?'£': (dataPaiement.devise === 'dollar'?'$': '€') ) } = {parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota)} XOF </Text>
      <Text  style={{ color:'white', fontSize:18 }}  >{i18n.t('clientPhone')} : +225 {dataPaiement.numero} </Text>
      <Text  style={{ color:'white', fontSize:18 }}  > {i18n.t('numeroTikect')} : {dataPaiement.date} </Text>
      <Text  style={{ color:'white', fontSize:18 }}> {i18n.t('TransfertEchec')} </Text>

      <TouchableOpacity onPress={goToHome} disabled={chargement} style={{ backgroundColor:'lightblue', padding:10, paddingTop:10,  marginTop:40, borderRadius:10, flex:1  }}>
        {charger()}
      </TouchableOpacity>
    </View>
    )
  }if (dataPaiement.statut === 'completed') {
    return (
      <View style={{ backgroundColor:'green', borderRadius:10, position:'absolute',width:'95%', justifyContent:'center',  paddingTop:19, paddingBottom:19 , fontWeight:'bold', alignContent:'center', alignItems:'center' }}>
        <Icon name="check-circle" size={55} color="white" />
      
      <Text style={{ color:'white' , fontSize:18 }} >{i18n.t('montant')} : {dataPaiement.montant+' '+ (dataPaiement.devise === 'livre'?'£': (dataPaiement.devise === 'dollar'?'$': '€') ) } = {parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota)} XOF </Text>
      <Text  style={{ color:'white', fontSize:18 }} >{i18n.t('clientPhone')} : +225 {dataPaiement.numero} </Text>
      <Text  style={{ color:'white', fontSize:18 }}  > {i18n.t('numeroTikect')} : {dataPaiement.date} </Text>
      <Text  style={{ color:'white', fontSize:18 }}> {i18n.t('TransfertWin')} </Text>

      <TouchableOpacity onPress={goToHome} disabled={chargement} style={{ backgroundColor:'lightblue', padding:10, paddingTop:10,  marginTop:40, borderRadius:10, flex:1  }}>
        {charger()}
      </TouchableOpacity>
      </View>
      )
  } 
   else {
     return(
       <View style={{ flex:1, backgroundColor:'white', borderRadius:10,width:'95%', justifyContent:'center',  paddingTop:19, paddingBottom:19 , fontWeight:'bold', alignContent:'center', alignItems:'center' }}>
           <View style={{ height:80 }}>
             <UIActivityIndicator size={90} color='#002040' />
           </View>
       </View>
     )
   }
}


return (
  <View style={{flex:1,  backgroundColor:'#002040'}}>
      <SafeAreaView style={{ backgroundColor:'#003060', }}>
        <StatusBar translucent barStyle='light-content' />
      </SafeAreaView>

        <View style={{ flex:1,  backgroundColor:'#002040',position:'absolute',width:'100%', height:'100%', justifyContent:'center', fontWeight:'bold', alignContent:'center', alignItems:'center' }} >
           
          {res()} 

      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  image:{
    marginTop:10,
    width:77,
    height:70,
    justifyContent:'center',
    alignContent:'center',
    alignSelf:'center',
    marginBottom:14
  },
});


