import React , { useState, useEffect, useRef }from 'react';
import { StyleSheet, Platform, ScrollView, Text, View, SafeAreaView, StatusBar , TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Provider, TextInput, Modal , Portal} from 'react-native-paper';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';
import axios from 'axios';
import { useSelector , useDispatch } from 'react-redux'
import { actionMontantConvertir, actionDate ,actionToken, actionDeviseP, actionNumeroP,  actionMontant, actionQuota, actionUrlWeb} from '../../store/reducers/paiement';
import { Shadow } from 'react-native-shadow-2'
import Icon from 'react-native-vector-icons/Entypo';
import Icons  from 'react-native-vector-icons/Feather';
import PhoneInput from 'react-native-phone-number-input';
import Suivant from '../section/suivant';
import Flag from 'react-native-flags';
import NetInfo from "@react-native-community/netinfo";
import AwesomeAlert from 'react-native-awesome-alerts';
import { Header } from 'react-navigation-stack';
import { BallIndicator, DotIndicator} from 'react-native-indicators';

export default function Traitement({props}) {

  const dataPaiement = useSelector(state=> state.reducerPaiement.depot)
  const dispatch = useDispatch()
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  i18n.locale = dta.languageCode

  i18n.fallbacks = true;
  i18n.translations = { en, fr };
    
  i18n.locale = dta.languageCode

  const navigation = useNavigation();
  let [load, setLoad]= useState(false)
  const dataProfil = useSelector(state=> state.reducerProfil.profil)
  const [amount, setAmount] = useState(dataPaiement.montant)
  const [numero , setNumero]=useState('')
  const [quota , setQuota] = useState(parseInt(dataPaiement.quota))
  const [messagePassword, setMessagePassword] = useState('');
  const [messageAmount, setMessageAmount] = useState('');
  const [tokens, setTokens] = useState('');
  const [sommeConvertir, setSommeConvertir] = useState(amount * quota);
  const [convertir, setConvertir]= useState(parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota))
  const [modalVisible, setModalVisible] = useState(true);
  let [showAlert, setShowAlert]= useState(false)
  let [desactiver, setDesactiver]= useState(false)
  let [livreValue, setLivreValue]= useState(dataProfil.livre)
  let [dollarValue, setDollarValue]= useState(dataProfil.dollar)
  let [euroValue, setEuroValue]= useState(dataProfil.euro)
  const [visible, setVisible] = useState(false);
  const [green, setGreen] = useState('green');

  
  const hideModal = () => setVisible(false);
  const containerStyle = { padding: 20, marginLeft:10, marginRight:10, borderRadius:10};
  useEffect(() => {
    pg()
    calcluler()
    setTimeout(() => {
      setModalVisible(false)
    }, 3000);
  }, [])
  
  useFocusEffect(
    React.useCallback(() => {
      console.log('Home Screen was focused');
      setDesactiver(false)
      return () => {
        console.log('Home Screen was unfocused');
      };
    }, [])
  );

  const calcluler=()=>{
    setConvertir(parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota))
  }

  const currentDate = new Date()
  const dateNow= currentDate.getTime()

  const payload = {
    "commande": {
      "invoice": {
        "items": [
          {
            "name": "depot",
            "description": "Paiement en ligne",
            "quantity": 1,
            "unit_price": parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota),
            "total_price": parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota)
          }
      ],
      "total_amount": parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota),
      "devise": "xof",
      "description": "Description du contenu de la facture",
      "customer": "",
      "customer_firstname":dataPaiement.nom,
      "customer_lastname":dataPaiement.prenom,
      "customer_email":dataPaiement.email, 
      "otp":""   
      },
      "store": {
        "name": "BaraPaye",
        "website_url": "https://www.barapaye.com"
      },
      "actions": {
        "cancel_url": "https://www.google.com",
        "return_url": "https://www.barapaye.com",
        "callback_url": "https://www.barapaye.com"
      },
      "custom_data": {
        "transaction_id": dateNow,
        'pseudo':dataPaiement.pseudo
        }
      }
  }


  const urlView =()=>{
    setDesactiver(true)
    NetInfo.isConnected.fetch().then(isConnected => {
     
      if(isConnected === true){
       
        setLoad(true)
            axios({
              url : 'https://app.ligdicash.com/pay/v01/redirect/checkout-invoice/create' ,
             method : 'POST',
             data : payload,
             headers: {
                 Apikey : '56YT3ZQLNL9SOMIMM',
                 Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF9hcHAiOiIzNjEyIiwiaWRfYWJvbm5lIjoxMzA1NzEsImRhdGVjcmVhdGlvbl9hcHAiOiIyMDIyLTA1LTEyIDE2OjU5OjQwIn0._wZkLB52k0fdtot_RCzdfxGA-qweglO6XkyRjOEVJ1c'
               }
           })
           .then(function (response) {
             const res= response.data.response_text
            const token = response.data.token
            setTokens(token)
            dispatch(actionToken({paiementToken:token}))
            dispatch(actionUrlWeb({paiementUrl:res}))
            dispatch(actionDate({paiementDate:dateNow}))
            dispatch(actionMontantConvertir({ paiementMontantConvertir:parseInt(amount) * parseInt(quota) }))
            connexion()
           })
           .catch(function (error) {
            setLoad(false)
            setShowAlert(true)
            setDesactiver(false)
           })
      }
      else{
        setShowAlert(true)
        setDesactiver(false)
      }
    })
  }

  
  const back= ()=>{
    return navigation.pop()
  }

  const isNumeric=(val)=>{
    return /^-?\d+$/.test(val)
  }
  
 const methodNumero=(e)=>{

    setNumero(e)

    calcluler()
    setSommeConvertir(parseInt(amount) * parseInt(quota))
    dispatch(actionNumeroP({paiementNumero:e}))
   
  }

const methodeAmount =(e)=>{
    setAmount(e)
    setConvertir(parseInt(e) * parseInt(dataPaiement.quota))
    dispatch(actionMontant({paiementMontant:e}))
    dispatch(actionMontantConvertir({ paiementMontantConvertir:parseInt(e) * parseInt(quota) }))
    
    setGreen('lightgreen')
    setTimeout(() => {
      setGreen('green')
    }, 200);
}



const connexion = () => {
    dispatch(actionNumeroP({paiementNumero:numero}))
    console.log(dataPaiement.numero)
    setLoad(true)
  if(isNumeric(numero)){
    if (isNumeric(amount)) {
      if(numero.length < 10 ){
        setDesactiver(false)
        setMessagePassword(i18n.t('remplirBien'))
        setLoad(false)
      }else{
        if(parseInt(amount) > 0 ){
          if (parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota) >= 1000000) {
            setMessageAmount(i18n.t('montantinferieur'))
            setLoad(false)
            setDesactiver(false)
          } else {
            setDesactiver(false)
            setMessagePassword('')
            setLoad(false)
            return navigation.push('Web')
          }
  
        }else{
          setDesactiver(false)
          setLoad(false)
          setMessageAmount(i18n.t('montantsuperieur'))
        }
      }
    } else {
      setDesactiver(false)
      setLoad(false)
      setMessagePassword(i18n.t('remplirBien'))
    }
  }
  else{
    setDesactiver(false)
    setLoad(false)
    setMessagePassword(i18n.t('remplirBien'))
  }

}

const pg=()=>{
  if(messageAmount !== '' && messagePassword !== '' ){
    return(
      <View>
        <Text style={{ color:'red', textAlign:'center', marginTop:5, marginBottom:3 }} > {messagePassword} </Text>
        <Text style={{ color:'red', textAlign:'center', marginTop:5, marginBottom:3 }} > {messageAmount} </Text>
      </View>
    )
  }
  if(messageAmount === '' && messagePassword !== '' ){
    return(
      <Text style={{ color:'red', textAlign:'center', marginTop:5, marginBottom:3 }} > {messagePassword} </Text>
    )
  }
  if(messageAmount !== '' && messagePassword === '' ){
    return(
      <Text style={{ color:'red', textAlign:'center', marginTop:5, marginBottom:3 }} > {messageAmount} </Text>
    )
  }else{

      return(
        <View style={{ height:25 }}>

        </View>
      )
  }
}


const dollarD =()=>{
  calcluler()
  dispatch(actionDeviseP({paiementDevise:'dollar'}))
  dispatch(actionQuota({paiementQuota:dollarValue }))

  setGreen('lightgreen')
  setTimeout(() => {
    setGreen('green')
  }, 200);
}

const livreD =()=>{
   calcluler()
  dispatch(actionDeviseP({paiementDevise:'livre'}))
  dispatch(actionQuota({paiementQuota:livreValue}))

  setGreen('lightgreen')
  setTimeout(() => {
    setGreen('green')
  }, 200);
}

const euroD =()=>{
  calcluler()
  dispatch(actionDeviseP({paiementDevise:'euro'}))
  dispatch(actionQuota({paiementQuota:euroValue}))

  setGreen('lightgreen')
  setTimeout(() => {
    setGreen('green')
  }, 200);
}


  return (
   
    <Provider>
    <KeyboardAvoidingView style={{flex:1, }} keyboardVerticalOffset={(Platform.OS ==='ios'? 0:Header.height + 20) } behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }>
      <SafeAreaView style={{ backgroundColor:'#003060', }} >
        <StatusBar translucent barStyle='light-content' />
      </SafeAreaView>
      <View style={{ zIndex:2, flex:1, marginTop:(Platform.OS === 'ios'? 0 :18),  backgroundColor:'#002040', }} >
          <View style={{ height:120,  backgroundColor:'#002040', }}>
            <View style={{ flexDirection:'row' , padding:15, paddingTop:15,  justifyContent:'flex-start' }}>
                <TouchableOpacity onPress={back}>
                  <Icons name="arrow-left" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ flex:1, paddingLeft:5, fontSize:14, color:'white', marginTop:-20 }}>
            <Text style={{ color:'white', fontSize:25 , textAlign:'center', marginBottom:10}}>{i18n.t('configuration')} </Text>

             <View style={{  marginBottom:10, flexDirection:'row', alignSelf:'center' }}>
                <TouchableOpacity onPress={back} style={{ marginRight:10, marginTop:2 }}>
                    <Icon name="info" size={16} color={green} />
                  </TouchableOpacity>
                <Text style={{ textAlign:'center',  fontSize:17, fontWeight:'bold', color:'lightgreen' }}> 
                    {(amount === ''? '' : amount +' '+ (dataPaiement.devise === 'livre' ? '£': (dataPaiement.devise === 'dollar'? '$':'€')) +' = '+ parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota) +' XOF' )}
                </Text>
              </View>
            </View>

          </View>
          
          <ScrollView  keyboardShouldPersistTaps='always' style={{ flex:1,  backgroundColor:'#E9F9FF', borderTopRightRadius:15, borderTopLeftRadius:15, overflow:'scroll' }}>
          <Text style={{ textAlign:'center', fontSize:15 , marginTop:10, fontWeight:'bold' }}>{i18n.t('ChoixDevise')}</Text>
             <View style={{ flexDirection:'row' , padding:5, justifyContent:'center' , padding:20 , paddingTop:5 }}>
               <View style={{ flex:1, margin:5, }}>
                  <Shadow viewStyle={{ flex:1, width:'100%'}}>
                      <TouchableOpacity  onPress={livreD} style={{flex:1, borderWidth:1, borderColor:'#e5e5ff', borderRadius:5, padding:10, flexDirection:'row' , margin:2, backgroundColor:(dataPaiement.devise === 'livre'? 'orange' : 'white'  ) , justifyContent:'center', }}>
                          <Flag code="GB" size={24} />
                          <Text style={{ marginLeft:10, marginTop:4 }}>Livre</Text>
                      </TouchableOpacity>
                  </Shadow>
               </View>

               <View style={{ flex:1, margin:5, }}>
                    <Shadow viewStyle={{ flex:1,  width:'100%' }}>
                        <TouchableOpacity  onPress={dollarD} style={{flex:1, borderWidth:1, borderColor:'#e5e5ff',  borderRadius:5, padding:10, flexDirection:'row' ,  margin:2, backgroundColor:(dataPaiement.devise === 'dollar'? 'orange' : 'white'  ) , justifyContent:'center', }}>
                            <Flag code="US" size={24} />
                            <Text style={{ marginLeft:10,  marginTop:4 }}>Dollar</Text>
                        </TouchableOpacity>
                  </Shadow>
               </View>

              <View style={{ flex:1, margin:5, }}>
                <Shadow viewStyle={{ flex:1,  width:'100%' }}>
                  <TouchableOpacity  onPress={euroD} style={{flex:1, borderWidth:1, borderColor:'#e5e5ff',  borderRadius:5, padding:10, flexDirection:'row' ,  margin:2, backgroundColor:(dataPaiement.devise === 'euro'? 'orange' : 'white'  ) , justifyContent:'center', }}>
                      <Flag code="FR" size={24} />
                      <Text style={{ marginLeft:10,  marginTop:4 }}>Euro</Text>
                  </TouchableOpacity>
                </Shadow>
               </View>

            </View> 
            <View style={{ flex:1, flexDirection:'row' }}>

            </View>
        
                <View style={{   color:'transparent', borderColor:'gray' , padding:20,  paddingTop:0, }}>

                  <TextInput
                    style={{ fontSize:18 , backgroundColor:'white', paddingBottom:4 ,   }}
                    theme={{ colors :{ primary:'gray', text:'black', underlineColor:'blue', height:50   } }}
                    underlineColor='white'
                    mode='outlined'
                    dense={true}
                    value={amount}
                    onChangeText={methodeAmount}
                    label={i18n.t('montant')}
                    placeholder={i18n.t('montant')}
                    left={<TextInput.Affix textStyle={{ marginTop: (Platform.OS ==='ios'? 9 : 2 )  }} text={(dataPaiement.devise === 'livre' ? '£': (dataPaiement.devise === 'dollar'? '$':'€'))} />}
                  />  
                 {/* <Text style={{ color:'red', textAlign:'center', marginBottom:4 }} > {messageAmount} </Text> */}

                  <View style={{ marginTop:8 }}>
                     <Text style={{ textAlign:'left', fontSize:15 }}>{i18n.t('clientPhone')}</Text>
                      <PhoneInput 
                        style={{ marginTop:10 }}
                        defaultCode="CI"
                        layout="first"
                        withShadow
                        onChangeText={methodNumero}
                        value={numero}
                        displayInitialValueAsLocalNumber
                        addInternationalOption={false}
                        autoFormat={true}
                      />
                  </View>
                  {/* <Text style={{ color:'red', textAlign:'center', marginTop:5, marginBottom:3 }} > {messagePassword} </Text>
                  <Text style={{ color:'red', textAlign:'center', marginTop:5, marginBottom:3 }} > {messageAmount} </Text> */}

                    {pg()}

                  {/* <Text style={{ textAlign:'center',  fontSize:17, fontWeight:'bold', color:'#660000' }}> 
                   {(amount === ''? '' : amount +' '+ (dataPaiement.devise === 'livre' ? '£': (dataPaiement.devise === 'dollar'? '$':'€')) +' = '+ parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota) +' XOF' )}
                  </Text> */}

                  <View style={{ flex:1 }}>
                    <Suivant  titre={i18n.t('demarrer')} c='white' loading={load} desactiver={desactiver} couleur='green' appel={urlView}  />
                  </View>

                {/* <View style={{ height:50,  width:'100%' }}>
             
            </View> */}

          </View>

          </ScrollView>
          {/* <View style={{ width:'100%', position:'absolute', bottom:9 }}>
            <Suivant  titre={i18n.t('demarrer')} c='white' loading={load} desactiver={desactiver} couleur='green' appel={urlView}  />
          </View> */}
    </View>

        <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title={i18n.t('TitleInternet')}
              message={i18n.t('messageInternet')}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={false}
              cancelText="Ok"
              confirmText="Yes, delete it"
              cancelButtonColor="#003060"
              onCancelPressed={() => {
                setShowAlert(!showAlert)
              }}
              onConfirmPressed={() => {
                this.hideAlert();
              }}
            />  

      </KeyboardAvoidingView>

         <Portal>
           <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>

             <View style={{  color:'transparent', borderColor:'gray' , flex:1}}>

             <BallIndicator size={50} color='#002040' /> 

             </View>
                          
           </Modal>
         </Portal>

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
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});