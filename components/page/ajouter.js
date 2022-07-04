import React , { useState, useEffect }from 'react';
import { StyleSheet, Platform, ScrollView, Text, View, TouchableOpacity, Image ,TouchableHighlight, SafeAreaView, StatusBar, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-paper';
import { actionId, actionNom, actionPrenom , actionTelephone,actionFiles, actionPseudo, actionCommune, actionItems, actionQuartier, actionVille, actionEmail, actionPays } from '../../store/reducers/reducerProfil';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';
import { Header } from 'react-navigation-stack';
import { useSelector , useDispatch } from 'react-redux'
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import { UIActivityIndicator,} from 'react-native-indicators';
import NetInfo from "@react-native-community/netinfo";
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Ajouter(props) {
  const urlListe = 'https://www.barapaye.com/liste/';
  const urlVisa = 'https://www.barapaye.com/cb/';

  const dispatch = useDispatch()
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  i18n.locale = dta.languageCode
  const dataProfilUser = useSelector(state=> state.reducerProfil.profil)
  let [load, setLoad]= useState(false)
  i18n.fallbacks = true;
  i18n.translations = { en, fr };
    
  i18n.locale = dta.languageCode
  const urltrans =`https://www.barapaye.com/status/${dataProfilUser.pseudo}/`
  const navigation = useNavigation();
  let [message , setMessage] = useState('')
  const [numeroCarte, setNumeroCarte] = useState('');
  const [nCarte, setNcarte] = useState('');
  const [code, setCode] = useState('');
  const [cardName, setCardName] = useState('')
  const [permission, setPermission]= useState(false)
  const [loading, setLoading] = useState(false)
  const [messageErreur, setMessageErreur] = useState(true)
  const [jour, setJour] = useState('')
  const [mois, setMois] = useState('')
  let [showAlert, setShowAlert]= useState(false)

  useEffect(() => {
    getTrans()
   
    permission
  }, [ permission])
  
  const [name, setName] = useState('');
 
  useFocusEffect(
    React.useCallback(() => {
      console.log('Home Screen was focused');
      setLoad(false)
      return () => {
        console.log('Home Screen was unfocused');
      };
    }, [])
  );




  const carte =(e)=>{
   
    var v = e.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,24}/g);
    var match = matches && matches[0] || ''
    var parts = []
    for (i=0, len=match.length; i<len; i+=4) {
      parts.push(match.substring(i, i+4))
    }
    if (parts.length) {
      // const v = parts.join(' ')
      setNumeroCarte(parts.join(' '))
      setNcarte(parts.join(''))
    } else {
      setNumeroCarte(e)
    }

  }

  const moisFonction =(e)=>{
    let formattedText = e.split(' ').join('')
    if(formattedText.length >0){
        formattedText=  formattedText.replace(/[^0-9]/g, '')
      }
    setJour(formattedText)
   
  }

  const anneeFonction =(e)=>{
    let formattedText = e.split(' ').join('')
    if(formattedText.length >0){
        formattedText=  formattedText.replace(/[^0-9]/g, '')
      }
    setMois(formattedText)
   
  }

  const codeFonction =(e)=>{
    let formattedText = e.split(' ').join('')
    if(formattedText.length >0){
        formattedText=  formattedText.replace(/[^0-9]/g, '')
      }
    setCode(formattedText)
   
  }

  const nameFonction =(e)=>{

    setName(e)
   
  }

  const isNumeric=(val)=>{
    return /^-?\d+$/.test(val)
  }
  
  const add =  (event) => {
    console.log(nCarte)
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected === true){
        setLoad(true)
        setLoading(true)
          if (isNumeric(nCarte)) {
            if(numeroCarte !== '' &&  code !== '' & jour !== '' && mois !=='' ){
              console.log( dataProfilUser.pseudo)
              console.log( cardName)
              console.log(code)
              console.log(numeroCarte)
              setMessage('')
              cb()
              
            }else{
              setLoad(false)
              setLoading(false)
              setMessage(i18n.t('verifierBien'))
              
            }
          } else {
            setLoad(false)
            setLoading(false)
            setMessage(i18n.t('verifierBien'))
          }

      }
      else{
        setShowAlert(true)
      }
    })



  }

  const cb =()=>{
  
      const formData = new FormData();
      formData.append('pseudo', dataProfilUser.pseudo);
      formData.append('cardName', cardName);
      formData.append('cardNumber', numeroCarte);
      formData.append('cardCode', code );
      formData.append('cardDate',  jour+'/'+mois );
     
      axios({
        url : urlVisa ,
        method : 'POST',
        data : formData,
        headers: {
            Accept: 'application/json',  
          }
      })
      .then(function (response) {
      
        setLoad(false)
        setLoading(false)
        setMessageErreur(false)
        recup()
        getTrans()
       
        navigation.reset({
          index:0,
          routes:[{ name:'visa' }]
       })
      })
      .catch(function (error) {
        setLoad(false)
        setMessageErreur(true)
       
      })

  }


  const recup =()=>{
    axios.get(urlListe).then((e)=>{

        const dataA = e.data
        const dataM = dataA.find(e =>e.pseudo ===  dataProfilUser.pseudo)

        dispatch(actionNom({nomUtilisateur:dataM.nom}))
        dispatch(actionPrenom({prenomUtilisateur:dataM.prenom}))
        dispatch(actionPseudo({pseudoUtilisateur:dataProfilUser.pseudo}))
        dispatch(actionPays({paysUtilisateur:dataM.pays}))
        dispatch(actionEmail({emailUtilisateur:dataM.email}))
        dispatch(actionTelephone({telephoneUtilisateur:dataM.telephone}))
        dispatch(actionCommune({communeUtilisateur:dataM.commune}))
    
    })
  }
  

  const getTrans = ()=>{
   
    axios.get(urltrans)
    .then(res => {
      const dataRes = res.data
      const finder= dataRes.filter(e => {
        return (e.payment_status === 'completed' && e.clientLastname === dataProfilUser.pseudo) || (e.payment_status === 'pending' && e.clientLastname === dataProfilUser.pseudo)
      } )     
      const inverser = finder.reverse()
      dispatch(actionFiles({filesUtilisateur:inverser}))
      dispatch(actionItems({itemsUtilisateur:finder.length}))

    })
    .catch((e)=>{
 
    })
    
  }

const vision=()=>{
  if (loading === false) {
    return (
    <>
      <Icon name="plus-circle" size={20} color="white" />
      <Text style={{ textAlign:'center', fontWeight:'bold', fontSize:17, color:'white', marginLeft:5 }}>{i18n.t('ajouter')}</Text>
    </>
    )
  } else {
    return  <UIActivityIndicator color='white' size={30} /> 
  }
}
  

  return (
    // <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={(Platform.OS ==='ios'? 0:Header.height + 20) } behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }>

    // <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex:1 }}>
    <View style={{flex:1, backgroundColor:'#002040'}}>
      <SafeAreaView style={{ backgroundColor:'#003060', }}>
        <StatusBar translucent barStyle='light-content' />
      </SafeAreaView>

      <View style={{ height:160,  backgroundColor:'#002040', }}>
          <View style={{ flexDirection:'row' , padding:15, paddingTop:27,  justifyContent:'center' }}>
            <Text style={{ flex:1,  paddingLeft:5, color:'white', fontSize:15 }}>Add Card </Text>
          </View>
          <TouchableOpacity style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
            <Icon name="user" size={50} color="white" />
          </TouchableOpacity>
          <View style={{ flex:1, justifyContent:'flex-end',  paddingLeft:5, fontSize:25, color:'white', }}>
            <Text style={{ color:'white', fontSize:25 , textAlign:'center', marginBottom:15}}> Hello , {dataProfilUser.pseudo} </Text>
          </View>
        </View>

      <Animatable.View  animation="slideInUp" style={{ flex:1,  backgroundColor:'#E9F9FF', borderTopStartRadius:25, borderTopEndRadius:25 }}>
      <ScrollView keyboardShouldPersistTaps='always' style={{ overflow:'scroll' }}>
        <View style={{ flex:1, padding:30,  }}>
         
            <View style={{  width:'100%', }}>
              <Text style={{ marginTop:15 }}>Card Number :</Text>
                  <TextInput 
                    autoCorrect={false}
                    spellCheck={false}
                    underlineColorAndroid='transparent'
                    placeholder='Card Number'
                    autoCapitalize='none'
                    value={numeroCarte}
                    
                    onChangeText={carte}
                    right={<TextInput.Icon name="card" />}
                      style={{  height:45,  backgroundColor:'#E9F9FF', borderWidth:2, borderRadius:8, borderColor:'#cccccc',  }}
                  />
              </View>

          <View style={{ width:'100%', flexDirection:'row', marginTop:15  }}>
          <View style={{  flex:1  }}>
                  <Text style={{ marginTop:0 }}>Expiry Month </Text>
                      <TextInput 
                        autoCorrect={false}
                        spellCheck={false}
                        underlineColorAndroid='transparent'
                        placeholder='MM'
                        value={jour}
                        autoCapitalize='none'
                       onChangeText={moisFonction}
                        style={{  height:45,  backgroundColor:'#E9F9FF', borderWidth:2, borderRadius:8, borderColor:'#cccccc',}}
                      />
                  </View>

                  <View style={{  flex:1 , marginLeft:3 , marginRight:3 }}>
                  <Text style={{ marginTop:0 }}> Expiry Year</Text>
                      <TextInput 
                        autoCorrect={false}
                        spellCheck={false}
                        underlineColorAndroid='transparent'
                        placeholder='YY'
                        value={mois}
                        autoCapitalize='none'
                        onChangeText={anneeFonction} 
                        style={{  height:45,  backgroundColor:'#E9F9FF', borderWidth:2, borderRadius:8, borderColor:'#cccccc',}}
                      />
                  </View>

                  <View style={{  flex:1  }}>
                  <Text style={{ marginTop:0 }}>CVC/CVD</Text>
                      <TextInput 
                        autoCorrect={false}
                        spellCheck={false}
                        underlineColorAndroid='transparent'
                        placeholder='CVC'
                        value={code}
                        autoCapitalize='none'
                        onChangeText={codeFonction} 
                        style={{  height:45,  backgroundColor:'#E9F9FF', borderWidth:2, borderRadius:8, borderColor:'#cccccc',}}
                      />
                  </View>

          </View>

          <View style={{  width:'100%', marginTop:15  }}>
            <Text>Card Name : </Text>
                <TextInput 
                  autoCorrect={false}
                  spellCheck={false}
                  underlineColorAndroid='transparent'
                  placeholder='Card Name'
                  autoCapitalize='none'
                  onChangeText={nameFonction} 
                  style={{  height:45,  backgroundColor:'#E9F9FF', borderWidth:2, borderRadius:8, borderColor:'#cccccc',}}
                />
          </View>
          <Text style={{ color:'red', textAlign:'center' }}> {message} </Text>

          <View style={{ justifyContent:'center', alignItems:'center', alignContent:'center', marginTop:20 }}>
              <TouchableOpacity onPress={add} disabled={load} style={{ flexDirection:'row', backgroundColor:'#191970', padding:10,  borderRadius:10 ,  justifyContent:'center', alignItems:'center', alignContent:'center',  paddingLeft:15 , paddingRight:20}}>
                  {vision()}
              </TouchableOpacity>
          </View>

        </View>
       
        </ScrollView>
    </Animatable.View> 
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

    </View>
    // </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor:'#002040',
    height:'100%',
    padding:0,
  },

});
