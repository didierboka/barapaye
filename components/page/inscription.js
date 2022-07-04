import React , { useState , useEffect , useRef}from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, TouchableOpacity, Platform,  TouchableWithoutFeedback, StatusBar, SafeAreaView, Text, View, TouchableHighlight } from 'react-native';
import Suivant from '../section/suivant';
import FormInscription from '../section/formInscription';
import { TextInput } from 'react-native-paper';
import { useNavigation ,  useIsFocused , useFocusEffect} from '@react-navigation/native';
import TermeCondition from '../section/termeInscription';
import { useSelector , useDispatch } from 'react-redux'
import { actionId, actionNom, actionPrenom , actionTelephone,actionSexe, actionPseudo, actionCommune, actionDate, actionQuartier, actionVille, actionEmail, actionPays } from '../../store/reducers/reducerProfil';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';
import axios from 'axios';
import { Header } from 'react-navigation-stack';
import PhoneInput from "react-native-phone-number-input";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import { WebView } from 'react-native-webview';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Inscription(props) {

  i18n.fallbacks = true;
  i18n.translations = { en, fr};
    
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  
  i18n.locale = dta.languageCode

  const dataProfil = useSelector(state=> state.reducerProfil.profil)
  const dispatch = useDispatch()
  const navigation = useNavigation();
  let [load, setLoad]= useState(false)
  const [pseudoExiste , setPseudoExiste]=useState('')
  const [nom , setNom]=useState(dataProfil.nom) 
  const [prenom , setPrenom]=useState(dataProfil.prenom)
  const [pseudo , setPseudo]=useState(dataProfil.pseudo)
  const [numero , setNumero]=useState(dataProfil.telephone)
  const [email , setEmail]=useState(dataProfil.email)
  const [pays , setPays]=useState(dataProfil.pays)
  let [showAlert, setShowAlert]= useState(false)

  const [showPassword1, setShowPassword1]= useState(true)
  const [showPassword2, setShowPassword2]= useState(true)
  const [Alerter, setAlerter] = useState('')
  const [colorError, setColorError] = useState('black')
  const [zip , setZip]=useState(dataProfil.zip)
  const [couleurNom, setCouleurNom] = useState('black');
  const [couleurPrenom, setCouleurPrenom] = useState('black');
  const [couleurPseudo, setCouleurPseudo] = useState('black');
  const [couleurNumero, setCouleurNumero] = useState('black');
  const [couleurEmail, setCouleurEmail] = useState('black');
  const [couleurZip, setCouleurZip] = useState('black');
  const [telephone, setTelephone] = useState('');
  const [mdp, setMdp] = useState('');
  const [mdp1, setMdp1] = useState('');
  const [contactsData, setContactsData] = useState([]);

  const urlUserData = 'https://www.barapaye.com/users/'
  const urlListe = 'https://www.barapaye.com/liste/';
  const createUser = 'https://www.barapaye.com/createuser/';

    useEffect(() => {
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
    
   const formulairePseudo =(e)=>{    
   
    const format= e.replace(/\s+/g, '')
    setPseudo(format)
    if(e.length >= 2){
      setCouleurPseudo('black')
    }
 }
 const formulaireNom=(e)=>{
   setNom(e)
   console.log(e)
   if(e.length >= 2){
    setCouleurNom('black')
  }
 }

  const formulairePrenom=(e)=>{
   setPrenom(e)
   if(e.length >= 2){
    setCouleurPrenom('black')
  }
 }

   const formulaireEmail=(e)=>{
   setEmail(e)
   if(e.length >= 2){
    setCouleurEmail('black')
  }
 }

const formulaireNumero=(e)=>{
  const traiter = e.replace('+', '')
   setNumero(traiter)
   if(e.length >= 2){
    setCouleurNumero('black')
  }
 }

 const formulaireZip=(e)=>{
  const traiter = e.replace('+', '')
   setNumero(traiter)
   if(e.length >= 2){
    setCouleurNumero('black')
  }
 }

 const pass1=(e)=>{
  setMdp(e)
}

const pass2=(e)=>{
  setMdp1(e)
}

 const dataInscription={
  nom: nom.toLowerCase(),
  prenom: prenom.toLowerCase(),
  pseudo: pseudo.toLowerCase(),
  pays:'N.A',
  ville:'N.A',
  age: 'N.A',
  commune: 'N.A',
  quartier: 'N.A',
  email: email,
  sexe: 'N.A',
  telephone: zip +' '+ numero,
  langue: 'N.A',
} 

const dataUser={
  username: pseudo,
  email: email,
  password: mdp,
}

const verification = ()=>{
  if(nom.length < 2){
    setCouleurNom('#880808')
  }
  if(prenom.length < 2){
    setCouleurPrenom('#880808')
  }
  if(pseudo.length < 2){
    setCouleurPseudo('#880808')
  }
  if(email.length < 2){
     setCouleurEmail('#880808')
   }

}

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
     
       setLoad(false)

          navigation.reset({
            index:0,
            routes:[{ name:'Ajouter' }]
         })
   })
   .catch(function (error) {
    
     setLoad(false)
    
        navigation.reset({
            index:0,
            routes:[{ name:'Ajouter' }]
         })
   })
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



const userAccount =()=>{

  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected === true){
      setLoad(true)
      verification()
      if (mdp === mdp1 ) {  
            if (mdp.length < 5 ) {
              setColorError('#750000')
              setAlerter(i18n.t('passCondition'))
              setLoad(false)
            } else {
        
                  axios.get(urlUserData)
                  .then(res => {
    
                    const dataRes = res.data
                    const finder= dataRes.filter(e => {
                      return (e.username === pseudo )
                    } )      
                    console.log(finder.length)
                    const nombre = finder.length
                    if (nombre === 0) {
                       
                        insertion()
                        setAlerter('')
                        setColorError('black')
                        
                    } else {
                      
                      setLoad(false)
                      setAlerter(i18n.t('pseudoExiste'))
                    }
    
              })
              .catch((e)=>{
                setLoad(false)
                setAlerter(i18n.t('connexionImpossible'))
                setColorError('#750000')
               
              })
            }
    
      }
      else{
        setAlerter(i18n.t('passDif'))
        setLoad(false)
      }
    }else{
      setLoad(false)
      setShowAlert(true)
    }
  })



}

 const insertion1= async()=>{
   axios.post(urlListe, dataInscription)
   .then(res => {

    dispatch(actionNom({nomUtilisateur:nom}))
    dispatch(actionPrenom({prenomUtilisateur:prenom}))
    dispatch(actionPseudo({pseudoUtilisateur:pseudo}))
    dispatch(actionEmail({emailUtilisateur:email}))
    dispatch(actionTelephone({telephoneUtilisateur:zip +' '+ numero}))
    const telephone= zip +' '+ numero
    AsyncStorage.setItem('pseudo',pseudo)
   
    sendEmail()
  }).catch((e) =>{ 
    setLoad(false)
    setAlerter(i18n.t('oups'))
  })
}



const insertion=()=>{
  axios.post(createUser, dataUser)
  .then(res => {
    setAlerter('')
    insertion1()
  
  }).catch((e) =>{ 
    setLoad(false)
    setAlerter(i18n.t('oups'))
  })
}

const back= ()=>{
  return navigation.pop()
}

  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={(Platform.OS ==='ios'? 0:Header.height + 20) } behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }>

    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex:1 }}> */}
    <View style={styles.container} keyboardVerticalOffset={(Platform.OS ==='ios'? 0:Header.height + 20) }>
        <View style={{ flex:1,}}>
        <SafeAreaView style={{ backgroundColor:'#003060', }}>
          <StatusBar translucent barStyle='light-content' backgroundColor='#003060' />
        </SafeAreaView>
        <View style={{ height:120, marginTop:37 , justifyContent:'flex-end', marginBottom:15 }}>
          <TouchableOpacity style={{ position:'absolute', top:5, left:9 ,paddingLeft:3, height:40, width:50 }} onPress={back}>
            <Icon name="arrow-left" size={30} color="#E9F9FF" />
          </TouchableOpacity>
          <Text style={{ color:'white', fontSize:30, width:'100%', textAlign:'center' }}>{i18n.t('inscriptionAcceuil')}</Text>
        </View>

        <ScrollView keyboardShouldPersistTaps='always' style={{  backgroundColor:'#E9F9FF', flex:1,  borderTopStartRadius:25, borderTopEndRadius:25 }}>

        <Animatable.View  animation="slideInUp" style={{ flex:1, backgroundColor:'#E9F9FF', padding:30, borderTopStartRadius:25, borderTopEndRadius:25 }}>
         
       
          <View style={{ width:'100%', flexDirection:'row', height:50 }}>
              <View style={{ width:40, marginTop:15, }}>
                  <Icon name="user" size={30} color="black" />
              </View>
             
              <TextInput 
                onChangeText={formulaireNom}
                autoCorrect={false}
                spellCheck={false}
                
                placeholder={i18n.t('nomInscription')}
                theme={{ colors:{ text: couleurNom , primary:couleurNom } }}
                autoCapitalize='none'
                style={{  flex:1, backgroundColor:'none'}}
              />
          </View>

  
          <View style={{ width:'100%', flexDirection:'row', height:50, marginTop:10  }}>
              <View style={{ width:40, marginTop:15, }}>
                  <Icon name="user" size={30} color="black" />
              </View>
             
              <TextInput 
                onChangeText={formulairePrenom}
                allowFontScaling={false}
                autoComplete={false}
                underlineColorAndroid='orange'
                activeOutlineColor='transparent'
                outlineColor='red'
                placeholder={i18n.t('prenomInscription')}
                autoCapitalize='none'
                style={{  flex:1, padding:0, backgroundColor:'none'}}
              />
          </View>


          <View style={{ width:'100%', flexDirection:'row', height:50, marginTop:10 }}>
              <View style={{ width:40, marginTop:15, }}>
                  <Icon name="user" size={30} color="black" />
              </View>
             
              <TextInput 
                onChangeText={formulairePseudo}
                allowFontScaling={false}
                autoComplete={false}
                value={pseudo}
                theme={{ colors:{ text: couleurPseudo,  primary:couleurPseudo } }}
                activeOutlineColor='transparent'
                outlineColor={colorError}
                placeholder='Pseudo'
                autoCapitalize='none'
                style={{  flex:1, padding:0, backgroundColor:'blac', color:'orange',}}
              />
          </View>
          <Text style={{ color:'red', textAlign:'center' }}> {pseudoExiste}</Text>
          <View style={{ width:'100%', flexDirection:'row', height:50, marginTop:10  }}>
              <View style={{ width:40, marginTop:15, }}>
                  <Icon name="mail" size={30} color="black" />
              </View>
             
              <TextInput
                
                theme={{ colors:{ text: couleurEmail,  primary: couleurEmail  } }}
                onChangeText={formulaireEmail}
                placeholder='E-mail'
                autoCapitalize='none'
                style={{  flex:1, padding:0, backgroundColor:'none'}}
              />
          </View>

        
          <View style={{ width:'100%', flexDirection:'row', height:50 , marginTop:10 }}>
              <View style={{ width:40, marginTop:15, }}>
                  <Icon name="phone" size={30} color="black" />
              </View>
             
              <TextInput
                
                theme={{ colors:{ text: couleurZip,  primary: couleurZip } }}
                onChangeText={formulaireZip}
                placeholder='Zip'
                autoCapitalize='none'
                style={{  width:80, padding:0, backgroundColor:'none'}}
              />

              <TextInput
                
                theme={{ colors:{ text: couleurNumero,  primary: couleurNumero  } }}
                onChangeText={formulaireNumero}
                placeholder={i18n.t('numeroInscription')}
                autoCapitalize='none'
                style={{  flex:1, padding:0, backgroundColor:'none'}}
              />
          </View>


        
          <View style={{ width:'100%', flexDirection:'row', height:50, marginTop:10  }}>
              <View style={{ width:40, marginTop:15, }}>
                  <Icon name="key" size={30} color="black" />
              </View>
             
              <TextInput
                autoCorrect={false}
              
                secureTextEntry={showPassword1}
                onChangeText={pass1}
                placeholder='Password'
                autoCapitalize='none'
                style={{  flex:1, padding:0, backgroundColor:'none'}}
              />
              <TouchableOpacity onPress={e=>setShowPassword1(!showPassword1)} style={{ width:30, marginTop:20, }}>
                  {/* <Icon name="eye" size={20} color="black" /> */}
                  {(showPassword1 === false ? <Icon name="eye" size={20} color="black" /> : <Icon name="eye-off" size={20} color="black" /> )}
              </TouchableOpacity >
          </View>

       
          <View style={{ width:'100%', flexDirection:'row', height:50, marginTop:10  }}>
              <View style={{ width:40, marginTop:15, }}>
                  <Icon name="key" size={30} color="black" />
              </View>
             
              <TextInput 
                secureTextEntry={showPassword2}
                onChangeText={pass2}
                placeholder='Password'
                autoCapitalize='none'
                style={{  flex:1, padding:0, backgroundColor:'none'}}
              />
              <TouchableOpacity onPress={e=>setShowPassword2(!showPassword2)} style={{ width:30, marginTop:20, }}>
                {/* <Icon name="eye" size={20} color="black" /> */}
                {(showPassword2 === false ? <Icon name="eye" size={20} color="black" /> : <Icon name="eye-off" size={20} color="black" /> )}
              </TouchableOpacity>
          </View>
          <Text style={{ color:'red', textAlign:'center' }}> {Alerter} </Text>

        </Animatable.View>
        </ScrollView>
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
        <View style={{ height:55,  width:'100%' , bottom:0 , backgroundColor:'#E9F9FF',}}>
          <Suivant titre={i18n.t('Inscription')} desactiver={load} c='white' loading={load} couleur='#191970' appel={userAccount}  />
        </View>
       
      </View>

  
      
    </View>
    {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#002040',
    flexDirection:'row',
  },

  FooterS:{
    flex:1,
    justifyContent:'flex-end',
  },
});
