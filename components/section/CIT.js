import React , { useState , useEffect} from "react";
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity  } from 'react-native';
import { useNavigation, useIsFocused, useFocusEffect }  from '@react-navigation/native';
import { useSelector , useDispatch } from 'react-redux';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { fr, en } from '../../i18n/supportedLanguages';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Dialog from "react-native-dialog";
import call from 'react-native-phone-call'
import email from 'react-native-email'

export default function CIT() {

const isFocused = useIsFocused();

i18n.fallbacks = true;
i18n.translations = { en, fr };
const dispatch = useDispatch()
const dta = RNLocalize.getLocales().find(e=> {return e.languageCode})
i18n.locale = dta.languageCode
const navigation = useNavigation();
const [modalVisible, setModalVisible] = useState(false);
const [connecter, setConnecter] = useState(false)
const [desactiver, setDesactiver] = useState(false)
const [clickInscription, setClickInscription] = useState(false)
const [flexible, setFlexible]= useState(1)
const [visible, setVisible] = useState(false);

useEffect(() => {
  setTimeout(() => {
    setFlexible(1)
    setModalVisible(false)
    setClickInscription(false)
    setConnecter(false)
  }, 800);

},[isFocused])


useFocusEffect(
  React.useCallback(() => {
    console.log('Home Screen was focused');
    setDesactiver(false)
    return () => {
      console.log('Home Screen was unfocused');
    };
  }, [])
);



const args = {
  number: '+2250506363591', // String value with the number to call
  prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
  skipCanOpen: true // Skip the canOpenURL check
}

const appeler =()=>{
  call(args).catch(console.error)
}

const handleEmail = () => {
    const to = ['barapaye.assistant@hotmail.com'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        cc: [], // string or array of email addresses
        // bcc: 'mee@mee.com', // string or array of email addresses
        subject: 'Objet',
        body: ''
    }).catch(console.error)
  }



const connexion=(e)=>{
  setFlexible(0)
  setConnecter(true)
  setDesactiver(true)
  // setTimeout(() => {
  //   setConnecter(true)
  //  }, 2000);
  navigation.push('Connexion')    
}

const inscription=(e)=>{
  setClickInscription(true)
  setFlexible(0)
  setConnecter(true)
  setDesactiver(true)
  // setTimeout(() => {
  //   setConnecter(true)
  //  }, 2000);

  navigation.push('Inscription')
     
}

const modalView =()=>{
  setVisible(true);
}

const handleCancel = () => {
  setVisible(false);
};

  return (
      <View style={styles.container}>

          <View style={styles.f2}>

            <TouchableHighlight underlayColor='#cae6ef' onPress={connexion}  style={styles.input1} disabled={desactiver}>
              <LinearGradient colors={['#4c669f', '#192f6a']} style={{ height:'100%',  alignItems:'center', position:'absolute', width:'100%', top:0, borderRadius:7, }}>
                    <View style={{ flex:1, flexDirection:'row', marginTop:10 }}>
                    <Icon name="login" size={30} color="#D9F5FF" />
                    <Text style={styles.tC}>{i18n.t('connexionAcceuil')} </Text>
                    </View>
                </LinearGradient>
            </TouchableHighlight>
            
            
              <TouchableHighlight underlayColor='#263d7f' onPress={inscription}  style={styles.input2} disabled={desactiver}>            
                <LinearGradient colors={['#4c669f', '#192f6a']} style={{ height:'100%', alignItems:'center', position:'absolute', width:'100%', top:0, borderRadius:7, }}>
                  <View style={{ flex:1, flexDirection:'row', marginTop:8,  }}>
                    <Icon name="app-registration" size={30} color="#D9F5FF" />
                    <Text style={styles.tC}>{i18n.t('inscriptionAcceuil')} </Text>
                  </View>
                </LinearGradient>
              </TouchableHighlight>
                        
          </View>
          <Dialog.Container visible={visible} contentStyle={{  padding:15, backgroundColor:'#E9F9FF', borderRadius:15, borderWidth:1, borderColor:'white', justifyContent:'center', alignContent:'center' , alignItems:'center'}}>
            <Dialog.Title > <Text style={{ color:'#192f6a', fontWeight:'bold' }}>BaraPaye</Text> </Dialog.Title>
            <View style={{  }}>
              <View style={{ flexDirection:'row', }}>
                  <View style={{ width:40 }}>
                    <Icon name="mail" size={25} color="#192f6a" />  
                  </View>
                  <View style={{ marginTop:-10 }}>

                    <Dialog.Description contentStyle={{ flex:1, marginLeft:20,  }}>
                      <TouchableOpacity onPress={handleEmail} style={{ marginTop:-10 }}>
                        <Text style={{ color:'#192f6a',  }}>
                        barapaye.assistant@hotmail.com
                        </Text>
                      </TouchableOpacity>
                    </Dialog.Description>
                  </View>

              </View>

              <View style={{ flexDirection:'row', marginTop:10 }}>
                  <View style={{ width:40 }}>
                    <Icon name="phone" size={25} color="#192f6a" />  
                  </View>
                  <TouchableOpacity onPress={appeler} style={{ marginTop:-10 }}>
                    <Dialog.Description contentStyle={{ flex:1, marginLeft:20,  }}>
                     <Text style={{ color:'#192f6a',  }}>
                      +225 05 0636 3595
                     </Text>
                    </Dialog.Description>
                  </TouchableOpacity>

              </View>


              <View style={{ flexDirection:'row', marginTop:10 }}>
                  <View style={{ width:40 }}>
                    <Icon name="phone" size={25} color="#192f6a" />  
                  </View>
                  <View style={{ marginTop:-10 }}>
                    <Dialog.Description contentStyle={{ flex:1, marginLeft:20,  }}>
                      <Text style={{ color:'#192f6a',  }}>
                        +225 07 0212 2960
                      </Text>
                    </Dialog.Description>
                  </View>

              </View>


              <View style={{ flexDirection:'row', marginTop:10 }}>
                  <View style={{ width:40 }}>
                    <Icons name="map-marker" size={25} color="#192f6a" />  
                  </View>
                  <View style={{ marginTop:-10 }}>
                    <Dialog.Description contentStyle={{ flex:1, marginLeft:20,  }}>
                      <Text style={{ color:'#192f6a',  }}>
                        Abidjan - Yopougon
                      </Text>
                    </Dialog.Description>
                  </View>

              </View>

            </View>

            <View style={{ width:'100%', alignItems:'flex-end', alignContent:'flex-end', justifyContent:'flex-end' }}>
              <Dialog.Button label={i18n.t('fermer')}  onPress={handleCancel} />
            </View>
          </Dialog.Container>

          <View style={styles.fa}> 
            <TouchableHighlight underlayColor='#7dc2d8' onPress={modalView}   style={styles.an} disabled={desactiver}>
            <LinearGradient  colors={['#4c669f', '#192f6a']} style={{ height:'100%', position:'absolute', width:'100%', top:0, borderRadius:7,  alignItems:'center' }}>
                <View style={{ flex:1, flexDirection:'row', marginTop:10 }}>
                <Icon name="perm-contact-cal" size={30} color="white" />
                <Text style={styles.tC}>{i18n.t('contactAcceuil')} </Text>
              </View>
              </LinearGradient>
            </TouchableHighlight>
          </View>
                
    </View>
  )
}
  

const styles = StyleSheet.create({
  container: {
    height:150,
    alignItems: 'center',
    width:'100%',
    flexDirection:'column',
  
  },
  
    f2:{
      flex:2,
      alignItems: 'baseline',
      justifyContent:'center',
      width: '100%', 
      flexDirection:'row',
    
  },
    input1: {
    flex:1,
    margin: 12,
    marginBottom:0,
    borderWidth: 1,
    justifyContent:'center',
    height:50,
    borderRadius:7,
    alignItems:'center',
    borderColor:'black',
   
    width:'100%',
    backgroundColor:'#003060',
  },
  input2: {
    flex:1,
    margin: 12,
    marginBottom:0,
    borderWidth: 1,
    justifyContent:'center',
    borderColor:'white',
    height:50,
    borderRadius:7,
    alignItems:'center',
    backgroundColor:'#003060'
   },
   


   an: {
    flex:1,
    backgroundColor:'#003060',
    margin: 12,
    marginTop: 0,
    borderWidth: 1,
    justifyContent:'center',
    height:50,
    alignItems: 'baseline',
    borderRadius:7,
    alignItems:'center',
   },

   aM: {
    flex:1,
    backgroundColor:'#003060',
    margin: 12,
    marginTop: 0,
    borderWidth: 1,
    justifyContent:'center',
    height:50,
    alignItems: 'baseline',
    borderRadius:7,
    alignItems:'center',
    borderColor:'lightblue'
   },

   fa: {
    width: '100%', 
    position:'absolute',
    top:80
   
   },

   tC:{
     color:'white',
     fontWeight:'bold',
     fontSize: 17,
     marginLeft:5,
     marginTop:3
   }, 

   tM:{
    color:'#192f6a',
    fontWeight:'bold',
    fontSize: 17,
    marginLeft:5,
    marginTop:3
  }, 

   tI:{
    color:'white',
    fontWeight:'bold',
    fontSize: 17
  },

  tA:{
    color:'white',
    fontWeight:'bold',
    fontSize: 17
  }
});

