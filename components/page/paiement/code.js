import React , { useState , useEffect, useCallback} from "react";
import { StyleSheet, Platform, Text, View, Image , SafeAreaView, StatusBar, TouchableHighlight, Linking, TouchableOpacity } from 'react-native';
import Suivant from '../../section/suivant';
import Head from '../../section-user/head';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { useSelector , useDispatch } from 'react-redux'
import { fr, en, es } from '../../../i18n/supportedLanguages';
import { WebView } from 'react-native-webview';
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator,  PulseIndicator,  SkypeIndicator,  UIActivityIndicator,  WaveIndicator,} from 'react-native-indicators';

import { actionEmail , actionNom , actionPrenom , actionPseudo , actionNumero , actionMontant} from '../../../store/reducers/paiement';
import { parseInt } from "lodash";



export default function WebComponent() {
  
  const dispatch = useDispatch()
  const dataPaiement = useSelector(state=> state.reducerPaiement.depot)
  const formule = useSelector(state=> state.reducerInitiale.depot)
  const dataProfil = useSelector(state=> state.reducerProfil.profil)
  const urlData =`http://www.barapaye.com/status/${dataProfil.pseudo}/`
  const isFocused = useIsFocused();
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  i18n.locale = dta.languageCode
  const toSend = require('../../../assets/errorpayment.png');
  i18n.fallbacks = true;
  i18n.translations = { en, fr, es };
    

  i18n.locale = dta.languageCode

  const navigation = useNavigation();
  let [visibilite, setVisibilite]= useState(false)
  let [action, setAction]= useState(false)
  const [nbrs , setNbrs] = useState(1)
  const [statut , setStatut] = useState(false)
  const [sommeB , setSommeB] = useState()
  const [deviseName , setDeviseName] = useState()
  const[commandeN, setCommandeN ] = useState(0)
  const [clientPhone, setClientPhone]= useState()

  const[clientSommeB, setClientSommeB]= useState()
  const[clientDevise, setClientDevise]= useState(dataPaiement.devise)
  const[operationsStatut, setOperationStatut]= useState('En_cours')
  const[clientPayer, setClientPayer]= useState('Non')
  const[operationDate, setOperationDate]= useState()
  const[localSomme, setLocalSomme]= useState()
  const [loading, setLoading]= useState(false)
  useEffect(() => {
    setLoading(true)
    setNbrs(0)

  },[isFocused])

   const back= ()=>{
     return navigation.pop()
   }


const requete =()=>{
  axios.get(urlData)
  .then(res => {
    const dataNew= res.data
    const verification = dataNew.map(e => parseInt(e.command_number))
    const dc= Math.max.apply(null, verification)
    setCommandeN(dc)
    console.log('verifi ' +  dc)
    if( commandeN !== 0 ){
      takeData()
    }
  })
  .catch((e)=>{

    console.log('Impossible de recuperer les donnees !')
  })
}


const takeData =()=>{
  axios.get(urlData)
  .then(a => {
    const dataNew= a.data
    const verification = dataNew.find(e => parseInt(e.command_number) === commandeN )
    const beneficiaire = JSON.stringify(verification.clientPhone)
    setClientPhone(JSON.parse(beneficiaire))
    setClientDevise(JSON.parse(JSON.stringify(verification.devise_b)))
    setClientSommeB(JSON.parse(JSON.stringify(verification.somme_b)))
    setOperationStatut(JSON.parse(JSON.stringify(verification.payment_status)))
    setClientPayer(JSON.parse(JSON.stringify(verification.payer)))
    setOperationDate(JSON.parse(JSON.stringify(verification.dates)))
    setLocalSomme(JSON.parse(JSON.stringify(verification.paid_amount)))
    
    console.log('derniere valeur  ' +  beneficiaire)
  })
  .catch((e)=>{

    console.log('Valeur irrecuperable !')
  })
}


 useEffect(() => {
    if (statut === true) {
      requete()
  }

}, [requete])



const ecoute=(e)=>{
  requete()
  
  console.log(e)
  if(e.url=== 'https://touchpay.gutouch.com/touchpay/#!/cbfailed'  ){
    setStatut(true)
    }
    
    if(e.title === 'TouchPay'){
           console.log('jonas 1'+e.title )
      setTimeout(() => {
        setLoading(false)
      }, 2000);
     }
}

const goToHome =()=>{
  return navigation.push('Ajouter')
}


const charger=()=>{
  if(dataPaiement.devise !== '' && dataPaiement.montant !=='' && dataPaiement.pseudo !=='' && dataPaiement.numero !== '' && formule.sommeB !== '' && dataPaiement.nom !== '' && dataPaiement.email !== ''){
      return(
        <>
          <View style={{flex:1,  marginTop:(nbrs === 0 ? -30:40), zIndex:(loading === true ? 12:0), }}>
              <WebView
                  onNavigationStateChange={ecoute}
                  style={{  flex:1, backgroundColor:'black' , marginTop:(loading === false ? 50:40)}} 
                  source={{ uri: `https://www.barapaye.com/touch/${dataPaiement.montant}/${dataPaiement.pseudo}/${dataPaiement.numero}/${formule.sommeB}/${dataPaiement.devise}/${dataPaiement.nom}/${dataPaiement.email}/` }}
                  javaScriptEnabled={true}
                  scrollEnabled={true}
                  domStorageEnabled={true}
              /> 
          
              <View style={{ flex:1, backgroundColor:'#002040',position:'absolute',width:(loading === true ? '100%':'0%'), height:(loading === true ? '100%':'0%'), justifyContent:'center', fontWeight:'bold', alignContent:'center', alignItems:'center' }} >
              
              <View style={{ height:80 }}>
                <BallIndicator size={(loading === true ? 70: 0)} color='white' />
              </View>
              
              <Text style={{ marginTop:20, color:'white', fontWeight:'bold' }}>Please wait ...</Text>
                
            </View> 
          </View>

      </>
    )
  
  
  }else{
    return(
      <View style={{  flexDirection:'column', backgroundColor:'#003060', height:35 , paddingTop:(loading === true ? -15:4) , }}>
        <IconFontAwesome name="info-circle" size={10} style={{ color:'yellow', fontSize:20, width:50, paddingTop:5 , marginLeft:10 }} />  
        <Text style={{ textAlign:'center',  marginTop:-25, color:'white', fontWeight:'bold', fontSize:17,}}>
            {formule.sommeB +' '+ formule.deviseB} = {formule.sommeC} XOF 
        </Text>
      </View>
    )
  }

}

const information =()=>{
    if (loading === false) {
        return (
          <View style={{  flexDirection:'column', backgroundColor:'#003060', height:35 , paddingTop:4 , }}>
              <IconFontAwesome name="info-circle" size={10} style={{ color:'yellow', fontSize:20, width:50, paddingTop:5 , marginLeft:10 }} />  
              <Text style={{ textAlign:'center',  marginTop:-25, color:'white', fontWeight:'bold', fontSize:17,}}>
                  {formule.sommeB +' '+ formule.deviseB} = {formule.sommeC} XOF 
              </Text>
          </View>
        )
    }
}


const programme =()=>{
  if (statut === false) {
    return (
      <>
        <View style={{ height:50, marginTop:(Platform.OS === 'ios'? 0 :27) ,  zIndex:19 ,}}>
        <Head arriere={back} d2='none' />
          {information()}
        </View>

        {charger()}


      </>
    )
  }
  else{
    return(
      <>
      <View style={{ height:50, marginTop:(Platform.OS === 'ios'? 0 :27) ,  zIndex:19,}}>
        <Head  arriere={back} />
      </View>

        <View style={{ flex:1,  backgroundColor:'#002040',position:'absolute',width:'100%', height:'100%', justifyContent:'center', fontWeight:'bold', alignContent:'center', alignItems:'center' }} >
          
          <View style={{ backgroundColor:'#ff4c4c', borderRadius:10, position:'absolute',width:'95%', justifyContent:'center',  paddingTop:19, paddingBottom:19 , fontWeight:'bold', alignContent:'center', alignItems:'center' }}>
            <Image style={styles.image} source={toSend} />
            <Text  style={{ color:'white', fontSize:19, marginBottom:15 }}> Transfert echoué ! </Text>
            <Text style={{ color:'white' , fontSize:18 }} >Montant : {clientSommeB} {formule.deviseB} = {localSomme} XOF </Text>
            <Text  style={{ color:'white', fontSize:18, fontSize:18 }}  > Client Number : +{clientPhone} </Text>
            <Text  style={{ color:'white', fontSize:18 }}  > Numero de Ticket : {commandeN} </Text>
            <Text  style={{ color:'white', fontSize:18 }}> Transfert echoué ! </Text>

            <TouchableOpacity onPress={goToHome} style={{ backgroundColor:'lightblue', height:50 , padding:20, paddingTop:12,  marginTop:40, borderRadius:10,  }}>
              <Text style={{ color:'black', fontSize:16,  fontWeight:'bold' }}> Resseyer encore  </Text>
            </TouchableOpacity>
          </View>
          

        </View>
      </>
    )
  }
}


return (
  <View style={{flex:1,  backgroundColor:'#002040'}}>
      <SafeAreaView style={{ backgroundColor:'#003060', }}>
        <StatusBar translucent barStyle='light-content' />
      </SafeAreaView>

     { programme()}
     <Text>Je suis un texte </Text>
      {/* <View style={{ position:'absolute', width:'100%', height:'100%', zIndex:10, flexDirection:'column', backgroundColor:'#003060', paddingTop:4 , }}>
            <Text style={{ color: 'white' }}>Please wait ...</Text>

          </View> */}
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


