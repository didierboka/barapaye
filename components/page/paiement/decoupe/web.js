import React , { useState , useEffect, } from "react";
import { StyleSheet, Text, View,  } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { useSelector , useDispatch } from 'react-redux'
import { fr, en } from '../../../../i18n/supportedLanguages';
import { WebView } from 'react-native-webview';
import { BallIndicator, } from 'react-native-indicators';
import Resultat from "./resultat";
import axios from 'axios';
import { actionEmailP , actionNomP ,actionMontantConvertir, actionStatut, actionPrenomP, actionDate ,actionToken, actionDeviseP, actionPseudoP , actionNumeroP,  actionMontant, actionQuota, actionUrlWeb} from '../../../../store/reducers/paiement';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from "react-native-paper";

export default function Web(props) {
  
 
  const dispatch = useDispatch()
  const dataPaiement = useSelector(state=> state.reducerPaiement.depot)
  const navigation = useNavigation();
  const user = useSelector(state=> state.reducerProfil.profil)
  const isFocused = useIsFocused();
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  i18n.locale = dta.languageCode
  i18n.fallbacks = true;
  i18n.translations = { en, fr };
    
  i18n.locale = dta.languageCode
  const [ordre , setOrdre] = useState(false)
  const [nbrs , setNbrs] = useState(0)
  const [nbrsData , setNbrsData] = useState(0)
  const [nbrsUpdate , setNbrsUpdate] = useState(0)
  const [loading, setLoading]= useState(false)
  const [statut , setStatut] = useState(false)
  const [textChargement , setTextChargement] = useState('loading')
  const [index, setIndex]= useState(true)
  const [convertir, setConvertir]= useState(parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota))
  const urlCreate=`https://www.barapaye.com/touch/touchTake/`

  const [retour, setRetour]= useState(false)
  const [pStatut, setPStatut]= useState('')

  useEffect(() => {

    
    setLoading(true)
    calcluler()
    setTextChargement('loading')
  
  },[isFocused, calcluler])



  const calcluler=()=>{
    setConvertir(parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota))
  }

  const getData ='https://app.ligdicash.com/pay/v01/redirect/checkout-invoice/confirm/?invoiceToken='+dataPaiement.token
  const firstSet = `https://client.ligdicash.com/directpayment/invoice/${dataPaiement.token}` 
  const ecoute=(e)=>{
  
try {
  console.log(e)

  switch (e.title) {

    case firstSet:

      setTimeout(() => {
        setRetour(true)
        setTextChargement('Votre connexion internet est trop lente ')
      }, 65000);

      break;

    case 'https://bf.instantbillspay.com/instant/preview':
      setIndex(true)
      setTextChargement(i18n.t('Initialisation'))
      break;

    case '':
      setIndex(true)
      setTextChargement(i18n.t('Verification'))
      if( textChargement === 'Verification' ){
        setTextChargement(i18n.t('Initialisation'))
      }else{
        setTextChargement(i18n.t('Verification'))
      }
      break;

    case 'https://bf.instantbillspay.com/instantpay/payload/bill/payment':
      setIndex(true)
      setTextChargement(i18n.t('Verification'))
      
      setNbrs(nbrs+1)
      console.log('ok')
      break;

    case 'TW Payment Gateway':
      setIndex(true)
      setTextChargement(i18n.t('Preparation'))
      setTextChargement('Preparation')
      break;

    case 'Processing transaction':
      setIndex(true)
      setTextChargement(i18n.t('VeriificationTrans'))
      break;

    case 'Redirecting...':
      setIndex(true)
      setTextChargement(i18n.t('Redirection'))
    
      break;
    
    case 'Send response':
      setIndex(true)
      setTextChargement(i18n.t('Redirection'))
      
      break;

    case 'https://mpi.unifiedpaymentsnigeria.com/mpirun.jsp?action=mpi':
      setIndex(true)
      setTextChargement(i18n.t('preparationRes1'))
      
      break;

    case 'https://mpi.unifiedpaymentsnigeria.com/mpirun.jsp?action=mpi':
      setIndex(true)
      setTextChargement(i18n.t('preparationRes1'))
      break;
  
      case 'HTTP Status 500 – Internal Server Error':
        setIndex(true)
        setRetour(true)
        setTextChargement(i18n.t('erreur'))
        break;
  
    default:
      setIndex(false)
      break;
  }

 switch (e.loading) {
   case true:
     setIndex(true)
     break;
  
   default:
     break;

 }


    switch (e.title) {
    case `BaraPaye`:

      axios.get(getData, { headers: { 
        Apikey : '56YT3ZQLNL9SOMIMM',
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF9hcHAiOiIzNjEyIiwiaWRfYWJvbm5lIjoxMzA1NzEsImRhdGVjcmVhdGlvbl9hcHAiOiIyMDIyLTA1LTEyIDE2OjU5OjQwIn0._wZkLB52k0fdtot_RCzdfxGA-qweglO6XkyRjOEVJ1c'
       } })
      .then(response => {
         
        if(nbrsData === 0){
          const statut =  response.data.status
          dispatch(actionStatut({paiementStatut:statut}))
          axios.post(urlCreate, {
            payment_mode: 'Card',
            somme_b: dataPaiement.montant,
            devise_b: dataPaiement.devise,
            payer: 'No',
            paid_sum: response.data.montant,
            paid_amount: response.data.montant,
          
            payment_token: dataPaiement.token,
            payment_status: response.data.status,
            command_number: dataPaiement.date,
            payment_validation_date: response.headers.date,
            clientFirstname: user.nom,
            clientLastname: user.pseudo,
          
            clientPhone:dataPaiement.numero,
            email: 'livetube225@gmail.com',
        
        })
        .then(res => {
          setNbrsData(nbrsData+1)
        
        
        }).catch((e) =>{ 
          setRetour(true)
          setTextChargement(i18n.t('erreur'))
        })
         }

        })
      .catch((error) => {
        
        });

        setStatut(true)
        console.log('etape')
      break;

    case 'https://www.google.com':
      return navigation.push('Traitement')
      break;

    default:
      break;
    }
} catch (error) {
  console.log('erreur '+error)
}




}

const messageErreur=(e)=>{
     console.log(e)
     setRetour(true)
     setIndex(true)
     setTextChargement(i18n.t('erreur'))
  
}

const homeScreen =()=>{
  navigation.reset({
    index:0,
    routes:[{ name:'Traitement' }]
  })
}

const programme=()=>{
    if(statut === true){
        return <Resultat/>
    }
    else{
      return (
        <WebView
          
        originWhitelist={['*']}
        onNavigationStateChange={ecoute}
        style={{  flex:1, borderRadius:25 ,position:'relative' , zIndex:5 }} 
        //source={{ uri: `https://www.barapaye.com/touch/${convertir}/${user.pseudo}/${dataPaiement.numero}/${dataPaiement.montant}/${dataPaiement.devise}/${user.nom}/${user.email}/` }}
        // source={{ uri: `https://www.barapaye.com/touch/1500/jonathan/0945865798/1599/dollqr/livre/livetube225@gmail.com/` }}
        source={{ uri: dataPaiement.url }}
        onloadStart={e=> setOrdre(true)}
        onError={messageErreur}
        onloadEnd={ e=> setOrdre(false) }
        javaScriptEnabled={true}
        scrollEnabled={true}
        domStorageEnabled={true}
        cacheEnabled={true}
      /> 
      )
    }
}

const retourner =()=>{
  if (retour === false) {
    return (

      <View style={{  overflow:'hidden', marginTop:(Platform.OS === 'ios'? 0 :0 ),  zIndex:(index === true ? 3:1), borderRadius:15 , backgroundColor:'#E9F9FF',position:'absolute',width:'100%', height:'100%', justifyContent:'center', fontWeight:'bold', alignContent:'center', alignItems:'center' }}>
      <View style={{ height:80,  }}>
          <BallIndicator size={70} color='#003060' />
        </View> 
         
        <Text style={{ marginTop:15, color:'#003060', fontWeight:'bold' }}>{textChargement} ... </Text>
      </View> 
    )
  } else {
    return (
    <View style={{  overflow:'hidden', marginTop:(Platform.OS === 'ios'? 0 :0 ),  zIndex:(index === true ? 3:1), borderRadius:15 , backgroundColor:'#E9F9FF',position:'absolute',width:'100%', height:'100%', justifyContent:'center', fontWeight:'bold', alignContent:'center', alignItems:'center' }}>
      <View style={{ height:60,  }}>
        <Icon name="wifi-remove" size={60} color="red" />
      </View> 
     
      <Text style={{ marginTop:15, color:'#003060', fontWeight:'bold' }}>{textChargement} </Text>
      <Button onPress={homeScreen} color='white' style={{ backgroundColor:'#003060', color:'white', marginTop:10, }}>{i18n.t('webRetour')}</Button>
    </View> 
    )
  }
}

return (
  <View style={{flex:1,}}>
    <View style={{ flex:1, zIndex:2 }}>
      {programme()}
    </View>
      {retourner()}
    </View>

  );
}


