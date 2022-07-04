import React , { useState, Animated,  useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default function Verification(props) {

  i18n.fallbacks = true;
  i18n.translations = { en, fr };
    
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  
  i18n.locale = dta.languageCode


  const [commande , setCommande] = useState('')
  const [listeData , setListData] = useState('')
  const [ma , setMa] = useState('')
  const [load , setLoad] = useState(false)
  const urlVerification='https://barapaye.com/verification/'

  const verification =()=>{
          setLoad(true)
          axios.get(urlVerification)
          .then(res => {
            const dataNew = res.data
            const verification = dataNew.find((e) =>  e.command_number ===  commande)
            if ( verification ){
              setMa('')
              console.log('La commande existe bien !')
              console.log(dataNew)
              setListData(res.data)
              setLoad(false)
            } else {
              setLoad(false)
              setMa('Numero de la commande invalide ')
            }
      })
      .catch((e)=>{
        setLoad(false)
        console.log('Une erreur est survvenu lors de la verifiaction de la commande')
        console.log(e)
      })
    }

    const fonctionCommande =(e)=>{
      setCommande(e)
    }

    const afficheResultat=()=>{
      if (listeData === '') {
        return <Text style={{ fontWeight:'bold', textAlign:'center'}}>Entrez le code CRX </Text>
      } else {
        const dataA = listeData.find(e =>e.command_number === commande)

        return (
          <View style={{ backgroundColor:(dataA.payement_status === '200' ? 'lightgreen':'#cd5c5c') , padding:10, borderRadius:10, }}>
            <Text>Montant : {dataA.paid_amount} xof</Text>
            <Text>Transferer par : {dataA.clientFirstname} vers {dataA.clientLastname} </Text>
            <Text>Transfert : {dataA.payement_status} </Text>
          </View>
        )

      }
    }

    const button = ()=>{
      if(load === true){
        return  <SkypeIndicator style={{ fontWeight:'bold' }} size={28} color='white'  />
      }else{
        return  <Text style={{color:'white', fontWeight:'bold', fontSize:16}}> Verifier </Text>
      }
    }

  return (

    <View style={{ flex:1, padding:15, width:'100%', overflow:'scroll' , justifyContent:'center'}}>
    <View style={{borderWidth:1, padding:20, borderRadius:15, backgroundColor:'#a3d4e3', borderColor:'#3ba1c3' }}>
        
        {afficheResultat()}
          <TextInput
            onChangeText={fonctionCommande}
            name='Code'
            placeholder='Entre votre code ici'
            theme={{ colors: {label: 'red'} }}
            label='Numero de la commande'
            style={{ fontSize:15, marginTop:20, paddingTop:0, paddingLeft:0, borderColor:'blue', backgroundColor:'#a3d4e3', borderBottomWidth:1, }}
        />
       <Text style={{ fontWeight:'bold', textAlign:'center', color:'red', marginTop:15}}>{ma}</Text>
        <TouchableHighlight onPress={verification} style={{backgroundColor:'blue', height:45, justifyContent:'center', alignItems:'center', marginTop:20, borderRadius:20,}}>
         {button()}
        </TouchableHighlight>
    </View>
</View>
  )
}
  
const styles = StyleSheet.create({

   fa: {
    flex:1,
    alignItems: 'baseline',
    justifyContent:'center',
    width: '100%', 
    flexDirection:'row',
    position:'absolute',
    top:80,
  
   },

});


