import React , { useState, useEffect , useRef}from 'react';
import { StyleSheet, Platform, ScrollView,Modal, Text, View, Pressable, Image , SafeAreaView, StatusBar , TouchableHighlight, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { TextInput, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en } from '../../../i18n/supportedLanguages';
import { useSelector , useDispatch } from 'react-redux'

export default function ModaleVisa({props}) {


  const equi = require('../../../assets/equi.png');
  const devises = [<Image style={styles.image} source={equi} />, 'Euro', 'livre ' , 'Dollard', 'Xof']  
  const [modalVisible, setModalVisible] = useState(false);

  const [devise, setDevise] = useState('$')
  const [position, setPosition] = useState()

  const dispatch = useDispatch()
  const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
  i18n.locale = dta.languageCode
  const dataProfilUser = useSelector(state=> state.reducerProfil.profil)


  i18n.fallbacks = true;
  i18n.translations = { en, fr};
    
  i18n.locale = dta.languageCode

  const navigation = useNavigation();


  const data =  ['Euro', 'Dollarrd', 'Livre', 'Xof'];
  const  childRef  =  useRef ( ) ;



  return (
<>
    <Modal animationType="slide" transparent={true}  visible={modalVisible}
        style={{ margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
          // alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5  }}
        >
        <View style={{ flex: 1,
    justifyContent: "flex-end",
    alignItems: "botton",
    
    marginTop: 22 }}>
          <View style={{ backgroundColor:'white', padding:20 , borderRadius:10}}>
            <Text>Hello World!</Text>

          </View>
        </View>
      </Modal>

      <Pressable
     
        onPress={() => setModalVisible(true)}
      >
        <Text>Show Modal</Text>
      </Pressable>

</>



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
      width:37,
      height:20,
      justifyContent:'center',
      // alignContent:'center',
      alignSelf:'center'
    },
});