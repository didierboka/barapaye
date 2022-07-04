import React , { useState , useEffect, } from "react";
import { Platform, Text, View , SafeAreaView, StatusBar } from 'react-native';
import Web from './decoupe/web';
import { useNavigation } from '@react-navigation/native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { useSelector , useDispatch } from 'react-redux'
import { fr, en} from '../../../i18n/supportedLanguages';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { BallIndicator, } from 'react-native-indicators';
import { Button } from "react-native-paper";

export default function WebComponent() {
  
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  i18n.locale = dta.languageCode
  i18n.fallbacks = true;
  i18n.translations = { en, fr};
    
  const dataPaiement = useSelector(state=> state.reducerPaiement.depot)

  const [convertir, setConvertir]= useState(parseInt(dataPaiement.montant) * parseInt(dataPaiement.quota))
  i18n.locale = dta.languageCode

  const navigation = useNavigation();
  const [ordre , setOrdre] = useState(false)
  const [loading, setLoading]= useState(false)

  const back= ()=>{
    return navigation.pop()
  }

  setTimeout(() => {
    setOrdre(true)
  }, 5000);


const information =()=>{
    if (loading === false) {
        return (
          <View style={{  flexDirection:'row', height:35 , paddingTop:0 ,  zIndex:19, marginTop:(Platform.OS === 'ios'? 15 :35),  }}>
            <Button onPress={back} style={{ marginTop:-9 }}>
              <IconFontAwesome name="arrow-left" size={10} style={{ color:'#E9F9FF', fontSize:20, width:50, marginLeft:10, }} /> 
            </Button>
              
              <Text style={{ flex:1, textAlign:'center',  color:'#E9F9FF', fontWeight:'bold', fontSize:17,}}>
                {dataPaiement.montant+' '+ (dataPaiement.devise === 'livre'?'£': (dataPaiement.devise === 'dollar'?'$': '€') ) } = {convertir} XOF
              </Text>
              <IconFontAwesome name="info-circle" size={10} style={{ color:'#E9F9FF', fontSize:20, width:50, marginLeft:10, marginTop:4, }} />  
          </View>
        )
    }
}

return (
  <View style={{flex:1,  backgroundColor:'#003060'}}>
      
      <SafeAreaView style={{ backgroundColor:'#003060', }}>
        <StatusBar translucent barStyle='light-content' />
      </SafeAreaView>
      
        {information()}

      <View style={{  overflow:'hidden', marginTop:(Platform.OS === 'ios'? 37 :5),  zIndex:5, borderRadius:15 , backgroundColor:'#003060',position:'absolute',width:'100%', height:'100%', justifyContent:'center', fontWeight:'bold', alignContent:'center', alignItems:'center' }}>
 
      </View> 

        <View style={{  overflow:'hidden', marginTop:(Platform.OS === 'ios'? 85 :65),  zIndex:(ordre === true ? 4 : 9 ), borderRadius:15 , backgroundColor:'#E9F9FF',position:'absolute',width:'100%', height:'100%', justifyContent:'center', fontWeight:'bold', alignContent:'center', alignItems:'center' }}>
             <View style={{ height:80,  }}>
                <BallIndicator size={70} color='#003060' />
              </View>
              
              <Text style={{ marginTop:15, color:'#003060', fontWeight:'bold' }}>Please wait ...</Text>
        </View> 
  
        <View style={{ flex:1, zIndex:(ordre === true ? 6 : 1 ), overflow:'hidden',  top:0,  borderRadius:10 ,   }}>
           <Web />  
       </View> 
    
  </View>

  );
}


