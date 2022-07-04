
// import React , { useState } from "react";
// import { StyleSheet,ScrollView, KeyboardAvoidingView,SafeAreaView,Keyboard, StatusBar , TouchableOpacity,Platform , Text, View, Image, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import DataProfil from './dataProfil';
// import { useSelector , useDispatch } from 'react-redux'
// import { actionId, actionNom, actionPrenom , actionTelephone,actionSexe, actionPseudo, actionCommune, actionDate, actionQuartier, actionVille, actionEmail, actionPays } from '../../store/reducers/reducerProfil'
// import { actionMode } from '../../store/reducers/reduceDeconnexion';
// import { actionModeButton } from '../../store/reducers/reducerButton';
// import * as RNLocalize from "react-native-localize";
// import i18n from 'i18n-js';
// import { fr, en, es } from '../../i18n/supportedLanguages';
// import FormInscription from '../section/formInscription';
// import axios from 'axios';
// import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator,  PulseIndicator,  SkypeIndicator,  UIActivityIndicator,  WaveIndicator,} from 'react-native-indicators';
// import { Header } from 'react-navigation-stack';

// export default function ModalUser(props) {
//   i18n.fallbacks = true;
//   i18n.translations = { en, fr, es };
    
//   const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  
//   i18n.locale = dta.languageCode
//   const navigation = useNavigation();
//   const dispatch = useDispatch()


//   const dataProfilUser = useSelector(state=> state.reducerProfil.profil)
//   const [id , setId]=useState(dataProfilUser.id)
//   const [nom , setNom]=useState(dataProfilUser.nom)
//   const [commune , setCommune]=useState(dataProfilUser.commune)
//   const [prenom , setPrenom]=useState(dataProfilUser.prenom)
//   const [pseudo , setPseudo]=useState(dataProfilUser.pseudo)
//   const [numero , setNumero]=useState(dataProfilUser.telephone)
//   const [pays, setPays] = useState(dataProfilUser.pays)

//   const [date , setDate]=useState(dataProfilUser.date)
//   const [sexe , setSexe]=useState(dataProfilUser.sexe)
//   const [ville, setVille] = useState(dataProfilUser.ville);
//   const [email , setEmail]=useState(dataProfilUser.email)
//   const [quartier , setQuartier]=useState(dataProfilUser.quartier)
//   let [load, setLoad]= useState(false)
//   const [affiche, setAffiche] = useState(false);



// const deconnexion = ()=>{
//   setLoad(true)
//   dispatch(actionMode({payloadMode:'deconnexion'}))
//   dispatch(actionPseudo({pseudoUtilisateur:''}))
//   dispatch(actionId({idUtilisateur:''}))
//   dispatch(actionNom({nomUtilisateur:''}))
//   dispatch(actionPrenom({prenomUtilisateur:''}))
//   dispatch(actionPays({paysUtilisateur:''}))
//   dispatch(actionEmail({emailUtilisateur:''}))
//   dispatch(actionSexe({sexeUtilisateur:''}))
//   dispatch(actionTelephone({telephoneUtilisateur:''}))
//   dispatch(actionDate({dateUtilisateur:''}))
//   dispatch(actionCommune({communeUtilisateur:''}))
//   dispatch(actionVille({villeUtilisateur:''}))
//   dispatch(actionQuartier({quartierUtilisateur:''}))

//   return navigation.popToTop()
// }
// console.log('votre ID :'+id)
// const urlEdit= 'https://www.barapaye.com/update/';
// const urlListe = 'https://www.barapaye.com/liste/';
// const ep ='/';

// const dataUpdate={
//   nom: nom,
//   prenom: prenom,
//   pseudo: pseudo,
//   pays: pays,
//   ville: ville,
//   age: date,
//   commune: commune,
//   quartier: quartier,
//   email: email,
//   sexe:sexe,
//   telephone: numero,
//   langue: "F"
// }
// const urlFinale= urlEdit+id+ep

// const updateAction=()=>{
//   dispatch(actionNom({nomUtilisateur:nom}))
//   dispatch(actionPrenom({prenomUtilisateur:prenom}))
//   dispatch(actionPays({paysUtilisateur:pays}))
//   dispatch(actionEmail({emailUtilisateur:email}))
//   dispatch(actionSexe({sexeUtilisateur:sexe}))
//   dispatch(actionTelephone({telephoneUtilisateur:numero}))
//   dispatch(actionDate({dateUtilisateur:date}))
//   dispatch(actionCommune({communeUtilisateur:commune}))
//   dispatch(actionVille({villeUtilisateur:ville}))
//   dispatch(actionQuartier({quartierUtilisateur:quartier}))
// }

// const pressChargement=()=>{
//   if (load === true) {
//     return (
//        <Text style={{color:'white', fontSize:15, fontWeight:'bold'}}>
//             <BarIndicator color='white' />
//         </Text> 
//       )
//   }
//   else{
//     return (
//       <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>
//            {i18n.t('enregistrerModalUser')}
//       </Text> 
//      )
//   }
// }

// const updater = ()=>{
//   setLoad(true)
//   axios.put(urlFinale, dataUpdate)
//   .then((e)=>{
//     dispatch(actionModeButton({payloadChargementHome:true}))
//     setLoad(false)
//     setAffiche(false)
//     updateAction()
//     console.log('mise a jour effectuer avec succes')
//   })
//   .catch((e)=>{
//     setLoad(false)
//     console.log('echec de mise a jour !')
//   })
// }

// const edit = ()=>{
//   return(

//     <View style={{ flex:1,backgroundColor:'#9ed0e1' , borderWidth:1,borderColor:'#71bad3',   marginLeft:15, marginRight:15, borderRadius:10 }}>

//     <View style={{flexDirection:'row', height:50}}>
 
//     <Text style={{flex:1, marginTop:10, fontWeight:'bold' , color:'black',textAlign:'center', textShadowColor:'white',fontSize:20,  textShadowRadius:4, }}>Mise a jour </Text>
//     </View>

//   <ScrollView style={{flex:1, marginBottom:5,  }}>

//     <View>

//         <FormInscription icone='account' valeur={nom} couleur={'black'} label={i18n.t('nomInscription')} changement={(e)=> setNom(e)} />
       
//         <FormInscription icone='account' valeur={prenom} couleur={'black'} label={i18n.t('prenomInscription')} changement={(e)=> setPrenom(e)} />
//         <FormInscription icone='account' valeur={pays} couleur={'black'} label={i18n.t('paysInscription')} changement={(e)=> setPays(e)} />
//         <FormInscription icone='account' valeur={date} couleur={'black'} label={i18n.t('ageInscription')} changement={(e)=> setDate(e)} />
//         <FormInscription icone='account' valeur={ville} couleur={'black'} label={i18n.t('villeInscription')} changement={(e)=> setVille(e)} />
//         <FormInscription icone='account' valeur={commune} couleur={'black'} label={i18n.t('communeInscription')} changement={(e)=> setCommune(e)} />
//         <FormInscription icone='account' valeur={quartier} couleur={'black'} label={i18n.t('quartierInscription')} changement={(e)=> setQuartier(e)} />
//         <FormInscription icone='account' valeur={numero} couleur={'black'} label={i18n.t('numeroInscription')} changement={(e)=> setNumero(e)} />
       
//         <FormInscription icone='account' valeur={email} couleur={'black'} label={i18n.t('emailInscription')} changement={(e)=> setEmail(e)} />

//     </View>
 
// </ScrollView>

//     <View style={{flexDirection:'row', borderBottomLeftRadius:10, borderBottomRightRadius:10, justifyContent:'center', alignItems:'center', bottom:0, height:50, width:'100%'}}>
//       <TouchableOpacity style={{flex:1, backgroundColor:'green', borderRadius:10, justifyContent:'center', alignItems:'center', bottom:0, height:45, margin:3}}  onPress={updater}>
//         {pressChargement()}
//       </TouchableOpacity>
//     </View>

// </View>
 
//   )
// }

// const functionProfile=()=>{
  
//   dispatch(actionModeButton({payloadChargementHome:false}))
//   setAffiche(true)
// }

// const profile =()=>{
//   return(
 
//         <View style={{ flex:1,backgroundColor:'#9ed0e1' , borderWidth:1,borderColor:'#71bad3',   marginLeft:15, marginRight:15, borderRadius:10 }}>
//           <ScrollView style={{flex:1, }} >
//             {/* <View style={{ justifyContent:'center', alignItems:'center' , zIndex:9}}>
//               <Image style={{width:100, height:100,}} source={user} />
//             </View> */}

//           <View style={{ marginTop:25 }}>
//             <DataProfil titre='Identifiant ' data={id} />
//             <DataProfil titre='Pseudo ' data={pseudo} />
//             <DataProfil titre='Nom ' data={nom} />
//             <DataProfil titre='Prenom ' data={prenom} />
//             <DataProfil titre='Age ' data={date} />
//             <DataProfil titre='Pays ' data={pays} />
//             <DataProfil titre='Ville ' data={ville} />
//             <DataProfil titre='Commune ' data={commune} />
//             <DataProfil titre='Quartier ' data={quartier} />
//             <DataProfil titre='E-mail ' data={email} />
//             <DataProfil titre='Sexe ' data={sexe} />
//             <DataProfil titre='Telephone ' data={numero} />

//             <View style={{backgroundColor:'green',flexDirection:'row', borderRadius:10, justifyContent:'center', alignItems:'center',  marginLeft:'30%', marginTop:40, height:35, width:'40%'}}> 
//             <TouchableOpacity style={[styles.bt , {backgroundColor:props.couleur}]}  onPress={functionProfile}>
//                 {/* <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>
//                     {i18n.t('editerModalUser')}                           
//                     <Image style={{width:20, height:20}} source={editer}  /> 
//                 </Text>  */}
//               </TouchableOpacity>
//             </View>

//           </View>

//           </ScrollView> 
          
//             <TouchableOpacity onPress={deconnexion} style={{backgroundColor:'red', borderBottomLeftRadius:10, borderBottomRightRadius:10, justifyContent:'center', alignItems:'center', bottom:0, height:40, width:'100%'}}> 
//               <Text style={{fontWeight:'bold', color:'white', fontSize:17}}>{i18n.t('deconnexionModalUser')} </Text>  
//             </TouchableOpacity>
//       </View>
//   )
// }


// const affichage = ()=>{
//   if(affiche === true ){
//    return (
//      <>
//         {edit()}
//      </>
//      )
//   }else{
//     return (
//       <>
//           {profile()}
//       </>
//       )
//   }
// }

// const affichageHeder = ()=>{
//   if(affiche === false ){
//    return (
  
//     <View style={{ flexDirection:'row', backgroundColor:'#3ba1c3',borderTopWidth:0.3, borderTopColor:'lightblue' , height:50 }}> 

//         {/* <TouchableOpacity onPress={(e)=>{return navigation.pop()}} style={{width:40,   borderRadius:25, height:40,marginTop:10, marginLeft:10 }}>
//             <Image style={{position:'absolute', width:30, height:30, }} source={left}  />
//         </TouchableOpacity> */}

//         <TouchableHighlight style={{flex:1, justifyContent:'center'}}>
//           <Text style={{ fontWeight:'bold', textShadowRadius:3 ,textShadowColor:'blue', fontSize:25, color:'white' , justifyContent:'center', alignItems:'center', alignSelf:'center'}}>BaraCash</Text>
//         </TouchableHighlight>

//     </View>
     
//      )
//   }else{
//     return (
//     <View style={{ flexDirection:'row', backgroundColor:'#3ba1c3',borderTopWidth:0.3, borderTopColor:'lightblue' , height:50 }}> 
//         {/* <TouchableOpacity onPress={(e)=>{setAffiche(false)}} style={{width:40,   borderRadius:25, height:40,marginTop:10, marginLeft:10 }}>
//             <Image style={{position:'absolute', width:30, height:30, }} source={left}  />
//         </TouchableOpacity> */}

//       <TouchableHighlight style={{flex:1, justifyContent:'center'}}>
//         <Text style={{ fontWeight:'bold', textShadowRadius:3 ,textShadowColor:'blue', fontSize:25, color:'white' , justifyContent:'center', alignItems:'center', alignSelf:'center'}}>BaraCash</Text>
//       </TouchableHighlight>

//     </View>
      
//       )
//   }
// }


//   return (
//     <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={(Platform.OS ==='ios'? 0:Header.height + 20)} behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }>
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex:1 }}>

//       <View style={{flex:1, backgroundColor:'lightblue'}} >
//           <SafeAreaView style={{ backgroundColor:'#003060', }}>
//             <StatusBar translucent barStyle='light-content' />
//           </SafeAreaView>
       
//        <View style={{ marginTop:(Platform.OS === 'ios' ? 0 :26 ) }}> 
//           {affichageHeder()}
//        </View>
                  
//           <View style={{flex:1, backgroundColor:'lightblue' , marginTop:5}}>
          
//             {affichage()}
          
//           </View>
//       </View>
//     </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   )
// }
  
// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//   },
//    fa: {
//     flex:1,
//     alignItems: 'baseline',
//     justifyContent:'center',
//     width: '100%', 
//     flexDirection:'row',
//     position:'absolute',
//     top:80,
  
//    },

//    image1:{
//     width:28,
//     height:28,
//     marginTop: Platform.OS === 'ios' ? 25 : 50,
//     marginLeft:'80%',
  
//   }, 

//   imageIn:{
//     width:25,
//     height:25,
//     marginRight:0,
//     position:'relative',
//   },

// });


