import React , { useState, useEffect, useCallback }from 'react';
import { StyleSheet, Platform, Text, View,  FlatList, SafeAreaView, StatusBar , TouchableOpacity, } from 'react-native';

import {Modal, Portal, Button, Provider, } from 'react-native-paper';

import { useNavigation, useFocusEffect} from '@react-navigation/native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en} from '../../../i18n/supportedLanguages';
import { useSelector , useDispatch } from 'react-redux'
import { actionDeviseP } from '../../../store/reducers/paiement';
import { actionSommeC ,actionDeviseB, actionQuota} from '../../../store/reducers/initiale'
import { actionId, actionNom, actionPrenom ,actionDate, actionTelephone,actionSexe, actionPseudo, actionCommune,  actionQuartier, actionVille, actionEmail, actionPays,  actionDollar , actionEuro , actionLivre } from '../../../store/reducers/reducerProfil';
import { Shadow } from 'react-native-shadow-2'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/FontAwesome';
import { BallIndicator, DotIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import axios from 'axios';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import 'moment/locale/fr'
import AwesomeAlert from 'react-native-awesome-alerts';



export default function Visa({props}) {

  const dataPaiement = useSelector(state=> state.reducerPaiement.depot)
  const [modalVisible, setModalVisible] = useState(true);
  const [monnaie, setMonnaie] = useState('GBP')
  const [chargement, setChargement] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false)
  const dispatch = useDispatch()
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  const dataProfilUser = useSelector(state=> state.reducerProfil.profil)
  const formule = useSelector(state=> state.reducerInitiale.depot)
  const [nbrAdd, setNbrAdd] = useState(5)
  const [db, setDb] = useState(0)
  const [visible, setVisible] = useState(false);
  const [activation, setActivation] = useState(false);
  const [itemsNbrs, setItemsNbrs] = useState(dataProfilUser.items);
  const [contactsData, setContactsData] = useState([]);
  const [imite, setImite] = useState(true);
  const [des, setDes] = useState(false);
  let [showAlert, setShowAlert]= useState(false)
  i18n.fallbacks = true;
  i18n.translations = { en, fr };
    
  i18n.locale = dta.languageCode

  const navigation = useNavigation();
  const [somme, setSomme] = useState(formule.sommeB)
  const [dActive, setDActive]= useState(formule.quota)
  const [deviseName, setDeviseName]= useState(dataPaiement.devise)
  const [sc, stSc]= useState((parseInt(somme) * parseInt(dActive)) )
  const [cfa, setCfa]= useState((parseInt(somme) * parseInt(dActive)) )
  const [value, setValue] = useState(dataPaiement.devise);
  const [refraichir, setRefraichir] = useState(true);
  const hideModal = () => setVisible(false);
  let listViewRef
  const urlMonnaie = 'https://www.barapaye.com/monnaie/'; 
  
  useEffect(() => {
    updating()
    useContacts()
    dispatch(actionDeviseB({deviseB:deviseName}))
    dispatch(actionSommeC({sommeC: parseInt(somme) * parseInt(dActive) }))
    console.log(dataPaiement.devise)
    setTimeout(() => {
      setModalVisible(false)
    }, 3000);
}, [ updating, useContacts ])

useEffect(() => {

  if (refraichir === true) {
    if(db === 10){

      new Promise(function(resolve, echec){
      setTimeout(() => {
        resolve('ok')
        listViewRef.scrollToEnd({ animated: true})
     
      }, 1000)
     })
     .then((e)=>{
      setDb(0)
      setChargement(false)
      setImite(false)
      setDes(false)
      console.log('super')
    })
    .catch((e)=>{
      console.log('dommage !')
    })
  }


  return () => { 
    setRefraichir(false)
  }

  }
})





useFocusEffect(
  React.useCallback(() => {
    setDb(0)
    setRefraichir(false)
    setChargement(false)
    setImite(false)
    return () => {
      console.log('Home Screen was unfocused');
    };
  }, [])
);

const TraitementGo=()=>{
  setChargement(true)

  axios.get(urlMonnaie)
  .then(resMonnaie => {
      const dataMon = resMonnaie.data
      const dataM = dataMon.find(c => c.code === 'valeur')
      console.log('devise '+ dataM.livre)
      dispatch(actionLivre({livreUtilisateur:dataM.livre}))
      dispatch(actionDollar({dollarUtilisateur:dataM.dollar}))
      dispatch(actionEuro({euroUtilisateur:dataM.euro}))    
      
      setTimeout(() => {
        setChargement(false)
        return navigation.push('Traitement')
      }, 500);
    
      })
      .catch((e)=>{
        setChargement(false)
        console.log('echec !')
        setShowAlert(true)
      })
  
}

const ParametreGo=()=>{

  return navigation.push('Parametre')

}


const updating=()=>{
  if(value ==='GBP' ){
    dispatch(actionDeviseP({paiementDevise:'GBP'}))
    setDeviseName('£')
    setDActive(750)
    dispatch(actionQuota({quota:750}))
    setMonnaie('GBP')
    setModalVisible(!modalVisible)
    stSc((parseInt(somme) * parseInt(750)) )
    setCfa((parseInt(somme) * parseInt(750)))
  }
  if(value ==='Dollar' ){
    dispatch(actionDeviseP({paiementDevise:'Dollar'}))
    setDeviseName('$')
    setMonnaie('Dollar')
    setDActive(550)
    dispatch(actionQuota({quota:550}))
    setModalVisible(!modalVisible)
    stSc((parseInt(somme) * parseInt(550)))
    setCfa((parseInt(somme) * parseInt(550)))
  }
  if(value ==='Euro' ){
    dispatch(actionDeviseP({paiementDevise:'Euro'}))
    setDeviseName('€')
    setMonnaie('Euro')
    setDActive(650)
    dispatch(actionQuota({quota:650}))
    setModalVisible(!modalVisible)
    stSc((parseInt(somme) * parseInt(650)))
    setCfa((parseInt(somme) * parseInt(650)))
   
  }
  if(value ==='PESO' ){
    dispatch(actionDeviseP({paiementDevise:'Peso'}))
    setDeviseName('peso')
    setMonnaie('Peso')
    setDActive(1000)
    dispatch(actionQuota({quota:1000}))
    setModalVisible(!modalVisible)
    stSc((parseInt(somme) * parseInt(1000)))
    setCfa((parseInt(somme) * parseInt(1000)))
    
  }
}

const useContacts =  async ()=> {
  if (Platform.OS === 'ios') {
      Contacts.getAll((a, b)=>{
       
        setContactsData(b)
      });
  
    }
  else if(Platform.OS === 'android') {
      try {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );
  
         if (permission === 'granted') {
            Contacts.getAll((a, b)=>{
              setContactsData(b)
             });
           
         } 
        } 
        catch(errors){
         
        }
    }
  }  


const renderItem = ({item}) => {
    Moment.locale(i18n.locale);

    const dates = new Date(item.payment_validation_date)
    const numi = item.clientPhone
    
    const name = contactsData.find(e =>{
      return (e.phoneNumbers.find(a => { return a.number === `${numi}` || a.number === `+225${numi}` || a.number === `+225 ${numi}`  }) )
    })
    
        
    if (name != null) {
      console.log('get  ' + name.givenName )
    }
 
    const statut = ()=>{
      if (item.payment_status === 'completed') {
          return  <Icon name="check-circle" size={20} color="green" />
      } else {
        
        return  (
          <View style={{ marginTop:0 }}>
              <Icon name="alert-triangle" size={20} color="red" />
          </View>
          )
      }
    }


    const iconesStatut = ()=>{
      if (item.payment_status === 'completed') {
          return  <Icon name="user-check" size={35} color="green" />
      } else {
        
        return  (
            <Icon name="user-x" size={35} color="#002040" />  
          )
      }
    }

  
    const statutAmount = ()=>{
      if (item.payment_status === 'completed') {
          return  <Text style={{ flex:1, fontWeight:'bold', color:'green', marginTop:20, fontSize:17 }}>{item.somme_b} {(item.devise_b === 'livre'?'£': (item.devise_b === 'dollar'?'$': '€') ) }  </Text>
      } else {
          return <Text style={{ flex:1, fontWeight:'bold', color:'red', marginTop:20, fontSize:17 }}>{item.somme_b} {(item.devise_b === 'livre'?'£': (item.devise_b === 'dollar'?'$': '€') ) }  </Text>
      }
    }
  
    const numeroClient =()=>{
        if(name != null && name.givenName != 'null' && name.givenName != null && name.givenName != '' && name.givenName != ' '){
          return  name.givenName
        }
        else{
          return `+225 ${item.clientPhone}`
        }
    }


    return (
          
      <Shadow viewStyle={{ flex:1, marginLeft:5, marginBottom:2, marginRight: 5 , flexDirection:'row', padding:10, paddingLeft:0, backgroundColor:'#E9F9FF', borderRadius:4, marginTop:2, borderWidth:1, borderColor:'#e5e5e5'  }} containerViewStyle={{ flex:1 }} >
        
        <View style={{ flex:1, }}>
         <View  style={{ flex:1, marginLeft:5, marginBottom:2, marginRight: 1 , flexDirection:'row', padding:10, paddingLeft:3, backgroundColor:'#E9F9FF', marginTop:2,  }}>
            <View style={{ marginRight:15, marginTop:15, alignSelf:'flex-start', alignItems:'center', alignItems:'flex-start', justifyContent:'flex-start' }}>
                {iconesStatut()}
              </View>
      
              <View style={{ flex:2  , flexDirection:'row', }}>
                  <View style={{ flexDirection:'column' }}>
                    <Text style={{ flex:1, fontSize:16, fontWeight:'bold', color:"#008FC2" }}>{numeroClient()}</Text>
                    <Text style={{ flex:1,  color:"#666666", fontSize:15, fontWeight:'bold' }}>
                      {Moment(dates).format('DD MMM Y')} 
                    </Text> 
            
                    <Text style={{ flex:1,  color:"#666666", fontSize:15, fontWeight:'bold'  }}>
                      {Moment(dates).format('HH:mm:ss')}
                    </Text> 
                    
                  </View>
              </View>
      
              <View style={{flex:1, alignSelf:'center', marginRight:0, justifyContent:'center', alignItems:'center' }}>
                {statutAmount()} 
              </View>
      
              <View style={{alignSelf:'center', alignItems:'center' }}>
                {statut()}
              </View>
         </View>
        
        </View>
 
      </Shadow>
  
      )
  }


const myKeyExtractor = (item) => {
  return item.payment_token
}


const dataListe= dataProfilUser.files
const MarvelList = dataListe.slice(0,nbrAdd)

const containerStyle = { padding: 20, marginLeft:10, marginRight:10, borderRadius:10};

const dataView = ()=>{
  if (dataProfilUser.items === 'loading') {
    return (
      <View style={{  flex:1,  backgroundColor:'#E9F9FF', borderRadius:4, marginTop:2, borderWidth:1, borderColor:'#e5e5e5', justifyContent:'center', alignItems:'center'   }}>
        <View style={{ height:80 }}>
          <BallIndicator size={20} color='#002040' />
        </View>
      </View>
    )
  } 

  if ( dataProfilUser.items === 0) {
    return (
      <View style={{  flex:1,  backgroundColor:'#E9F9FF', borderRadius:4, marginTop:2,   }}>
        <View style={{ height:80, flexDirection:'column', alignContent:'center', alignItems:'center', justifyContent:'center', marginTop:50 }}>
            <Icon name="trash-2" size={45} color="green" />
            <Text style={{ textAlign:'center', fontWeight:'bold', marginTop:10, color:'green' }}>{i18n.t('TransTable')}</Text>
        </View>
      </View>
    )
  } else {
    
    return(
      <FlatList 
        data={MarvelList} 
        renderItem={renderItem}
        ref={(ref) =>{
          listViewRef = ref
        }}
        disableVirtualization ={true} 
        ItemSeparatorComponent={
        Platform.OS !== 'android' &&
        (({ highlighted }) => (
          <View
              style={
                styles.separator
            }
          />
        ))
      }
      keyExtractor={myKeyExtractor}
      refreshing={refreshing}
     
    /> 
    )
  }

}

const goEnd =  ()=>{
  setImite(true)
  setRefraichir(true)
  setNbrAdd(nbrAdd + 5)
  setDb(10)
}


const interne =()=>{
  if(imite === false ){
    return (
      <Text style={{ flex:1,  borderColor:'#008FC2',  color:'#008FC2', textAlign:'center', marginTop:10, fontSize:17, fontWeight:'bold'}} > Voir Plus  </Text>
    )
  }else{
      return(
        <DotIndicator size={10} color='#008FC2' /> 
      )
  }
}

const plus =()=>{
  if(parseInt(nbrAdd) <= parseInt(itemsNbrs)){
    if(imite === true ){
      return (
        <TouchableOpacity  disabled={true} style={{  justifyContent:'center', height:45, backgroundColor:'#E9F9FF' , borderWidth:1, borderColor:'#008FC2',  margin:10, borderRadius:5 }}>
          <DotIndicator size={10} color='#008FC2' /> 
        </TouchableOpacity>
      )
    }else{
      return (
       <TouchableOpacity delayPressIn={0} onPress={goEnd} disabled={chargement} style={{  justifyContent:'center', height:45, backgroundColor:'#E9F9FF' , borderWidth:1, borderColor:'#008FC2',  margin:10,  borderRadius:5 }}>
         {interne()}
       </TouchableOpacity>
      )
    }

  }
}

const icones =()=>{
  if(chargement === false){
    return(
      <Icon name="send" size={20} color="white"  />  
    )
  }
}

  return (
    // <Root>

    <Provider>
    <View style={{flex:1, }}>
      <SafeAreaView style={{ backgroundColor:'#003060', }} >
        <StatusBar translucent barStyle='light-content' />
      </SafeAreaView>
      <View style={{ flex:1, marginTop:(Platform.OS === 'ios'? 0 :15),  backgroundColor:'#002040', }} >
          <View style={{ height:160,  }}>
            <View style={{ flexDirection:'row' , padding:15, paddingTop:25,  justifyContent:'center' }}>
              <TouchableOpacity  onPress={(activation === false ? ParametreGo : '') } style={{ paddingRight:15, paddingTop:5 }}>
                  <Icon name="settings" size={25} color="white" />
              </TouchableOpacity> 
              <Text style={{ flex:1, fontWeight:'bold', paddingLeft:5, color:'white', fontSize:19 }}>
                 
              </Text>
              
            </View>
              <View style={{ flex:1, flexDirection:'column', justifyContent:'flex-end',  paddingLeft:5, fontSize:14, color:'white',  }}>
                  <View style={{ fontWeight:'bold', marginBottom:10, paddingLeft:5, color:'white', fontSize:19, justifyContent:'center', alignContent:'center', alignItems:'center' }}>
                      <Icon name="user" size={55} color="white" />
                  </View>
                  <Text style={{  color:'white', fontSize:25 , textAlign:'center', paddingBottom:20 }}>{i18n.t('welcome')} , <Text style={{ color:'yellow' }}>{(dataProfilUser.pseudo).charAt(0).toUpperCase() + (dataProfilUser.pseudo).slice(1)} </Text> </Text>

              </View>

          </View>
          <View style={{ flex:1,  backgroundColor:'#E9F9FF', borderRadius:15 }}>
            <View style={{ flexDirection:'row' , padding:5, justifyContent:'center' }}>
                <TouchableOpacity delayPressIn={0} onPress={TraitementGo} disabled={chargement} style={{  flex:1, backgroundColor:'orange' ,  margin:5, height:45, borderRadius:5 }}>
                  <Text style={{ textAlign:'center', fontSize:18, marginTop:10, color:'white', fontWeight:'bold' }}>
                  {i18n.t('transferer')}   {icones()}
                  </Text>
                  <View style={{ position:'absolute', right:25, top:13 }}>
                      <BallIndicator size={20} color={(chargement === true ? 'white':'orange')} /> 
                  </View>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection:'row' , padding:5, justifyContent:'center' }}>
              <Text style={{ flex:1, fontWeight:'bold', paddingLeft:5, fontSize:16, color:'#003060' }}>
                <Icons name="sort-amount-desc" size={15} color="#003060" /> {i18n.t('dernierTrans')}  
              </Text>                
            </View>
            <Animatable.View  animation="slideInUp" style={{ flex:1 , backgroundColor:'#E9F9FF', paddingBottom:10, paddingTop:2 , borderTopWidth:1, borderColor:'#cccccc'}}>

                {dataView()}
                
                {plus()}              
      
            </Animatable.View>
         
            <Portal>
              <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>

                <View style={{  color:'transparent', borderColor:'gray' , flex:1}}>

                <BallIndicator size={50} color='#002040' /> 

                </View>
                             
              </Modal>
            </Portal>
          </View>

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

    </View>
  
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
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});