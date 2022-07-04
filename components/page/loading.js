import React , { useState , useEffect, useRef} from "react";
import { StyleSheet, Platform,  View ,  StatusBar, SafeAreaView, Text} from 'react-native';
import { SkypeIndicator,} from 'react-native-indicators';
import { useSelector , useDispatch } from 'react-redux'
import { useNavigation, useIsFocused, } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { actionNom, actionPrenom , actionTelephone, actionPseudo, actionCommune, actionEmail, actionPays, actionFiles, actionItems, actionDollar , actionEuro , actionLivre } from '../../store/reducers/reducerProfil';
import NetInfo from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/Feather';
import { Button } from "react-native-paper";
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';
import * as RNLocalize from "react-native-localize";

export default  function  Loading(props) {
  const navigation = useNavigation();
  const [one, setOne] = useState(0)
  const [connecter, setConnecter] = useState(true)

  const dispatch = useDispatch()
  const cpt = useRef(true)
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  i18n.fallbacks = true;
  i18n.translations = { en, fr };
  i18n.locale = dta.languageCode
  const urlMonnaie = 'https://www.barapaye.com/monnaie/';  

  useEffect(() => {
     
      NetInfo.isConnected.fetch().then(isConnected => {
          if(isConnected === true){
            monnaie()
            setConnecter(isConnected)
            console.log('connecter a internet')
            readData()
          }
          else{
            setConnecter(false)
            setConnecter(isConnected)
          }
      });
      chargement()
    return()=>{
      cpt.current= false
    }
  }, [chargement, readData])

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
          // setConnecter(false)
          console.log('Une erreur est survenue !')
        })
  }

    const readData = async () => {
      // monnaie()
      try {
       const pseudo = await AsyncStorage.getItem('pseudo');

       if (cpt.current === true) {
        if (pseudo !== null ) {
          const urltrans =`https://www.barapaye.com/status/${pseudo}/`
          const urlListe = 'https://www.barapaye.com/liste/';
          

          axios.get(urlListe).then((e)=>{

            const dataA = e.data
            const dataM = dataA.find(e =>e.pseudo ===  pseudo)
            dispatch(actionNom({nomUtilisateur:dataM.nom}))
            dispatch(actionPrenom({prenomUtilisateur:dataM.prenom}))
            dispatch(actionPseudo({pseudoUtilisateur:pseudo}))
            dispatch(actionPays({paysUtilisateur:dataM.pays}))
            dispatch(actionEmail({emailUtilisateur:dataM.email}))
            dispatch(actionTelephone({telephoneUtilisateur:dataM.telephone}))
            dispatch(actionCommune({communeUtilisateur:dataM.commune}))

            axios.get(urltrans)
            .then(res => {
                const dataRes = res.data
                const finder= dataRes.filter(e => {
                    return (e.payment_status === 'completed' && e.clientLastname === pseudo) || (e.payment_status === 'pending' && e.clientLastname === pseudo)
                } )     
                const inverser = finder.reverse()
                  dispatch(actionFiles({filesUtilisateur:inverser}))
                  dispatch(actionItems({itemsUtilisateur:finder.length}))
              
                
                  if (one === 0) {
                    navigation.reset({
                    index:0,
                    routes:[{ name:'visa' }],
        
                  })

                }
              
                })
                .catch((e)=>{
              
                  console.log('echec Data !')
                })

          })

         }else{
         if(cpt.current=== true){
            if (one === 0) {
            
              navigation.reset({
               index:0,
               routes:[{ name:'Home' }]
             })
             
             
           }
          }

  
        }
       }
      
     
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  }

const recharger =()=>{
  navigation.reset({
    index:0,
    routes:[{ name:'Loading' }]
  })
}

  const chargement=()=>{
    if(connecter === true){
      return(
            <SkypeIndicator color='white' size={80} style={{ flex:1  }}/> 
      )
    }else{
        return(
          <View style={{ flex:1, justifyContent:'center', alignItems:'center', alignContent:'center' }}>
              <Icon name='wifi-off' size={50} color="white" />
              <Text style={{ color:'white', marginTop:10 }}>{i18n.t('messageInternet')}! </Text>
              <Button color='#003060' onPress={recharger} style={{ backgroundColor:'white', marginTop:10 }}>{i18n.t('RechargePage')} !</Button>
          </View>
        )
    }
  }

  return (
    
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor:'#003060', }}>
        <StatusBar translucent barStyle='light-content' backgroundColor='#003060' />
      </SafeAreaView>
      <View style={{ flex:1, justifyContent:'center', backgroundColor:'#002040', borderWidth:3, alignItems:'center' }}>
          
          {chargement()}
          <Text style={{ marginBottom:20 , fontWeight:'bold' , color:'white' }}>BaraPaye</Text>
         
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  head:{
    flex:1,
  },

  bodyS:{
    flex:25,
    paddingBottom: Platform.OS === 'ios' ? 15 :2 ,
    // backgroundColor:'white'
  },

});

