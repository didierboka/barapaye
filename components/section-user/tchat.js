
import { StyleSheet ,ScrollView, TouchableOpacity, Text,TextInput,Alert, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios';
import { useSelector , useDispatch } from 'react-redux'
export default function Tchat(props) {

  const dataProfil = useSelector(state=> state.reducerProfil.profil)
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [panels, setPanels] = useState(false);
  const [expediteur, setExpediteur] = useState(dataProfil.pseudo);
  const [verification, setVerification] = useState();
  const [verificationListe, setVerificationListe] = useState();
  const [ajout, setAjout] = useState('');

  const user = require('../../assets/user.png')
  const urlInvitation = 'https://www.barapaye.com/cash/invitation/'
  const urlListe = 'https://www.barapaye.com/cash/users/'

  console.log('Pseudo est '+dataProfil.pseudo)
  const periode = new Date()
  const dataUser={
    pseudo_expediteur: expediteur,
    pseudo_recepteur: ajout,
    periode: periode,
    demande:'Invitation',
    autorisation_tchat:expediteur+'.and.'+ajout,
  }

const lienUser=()=>{
  axios.get(urlListe)
    .then(res => {

      const dataA = res.data
      const datam = dataA.map((e)=>{ return e.username === ajout})
  
      const vh = datam.findIndex(e=> e === true)
      setVerificationListe(vh)
    })
    .catch(()=>{
      console.log('erreur au niveau de la liste !')

  })
}

const lienInvitation =()=>{
  axios.get(urlInvitation)
  .then(res => {

    const dataA = res.data
    const datam = dataA.map((e)=>{ return (e.pseudo_expediteur === dataProfil.pseudo && e.pseudo_recepteur === ajout) })
 
    const one = datam.findIndex(e=> e === true)

    setVerification(one)
   
  })
  .catch(()=>{
    console.log('Erreur au niveau de l invitation !')
  })
}



  useEffect(() => {
    setMessages([
      {
        _id: 2,
        text: 'How are you ?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Jonas dev',
          avatar: 'https://placeimg.com/140/140/any',
        },
        
      },
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Jonas dev',
          avatar: 'https://placeimg.com/140/140/any',
        },
        
      },

    ])
  }, [])
 


  const invitation= ()=>{
      lienUser()
      lienInvitation()
      
      if (verification === -1) {
        
        if ( verificationListe === -1) {
          Alert.alert('le client doit etre deja inscrire')
        } else {
          axios.post(urlInvitation, dataUser)
          .then(res => {
            Alert.alert('Invitation creée avec succes')
              // navigation.push('UserHome')
          }).catch((e) =>{ 
              Alert.alert('une erreur est survenue lors de la conception de votre invitation !')
          })
        }
      } else {
        Alert.alert('cet invitation a ete deja cree au paravant ')
      }
    
  }


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

const contenu =()=>{
  if(panels === true){
    return (        
        <GiftedChat
            isTyping={true}
            // renderFooter={()=>{return <Text>....</Text>}}
            renderUsernameOnMessage={true}
            isCustomViewBottom={true}
            scrollToBottom={true}
            isKeyboardInternallyHandled={false}
            alwaysShowSend={true}
            placeholder='Votre message'
            // onLoadEarlier={()=>console.log('chargement des messages')}
            textInputStyle={{color:'black', backgroundColor:'white', marginLeft:0, marginBottom:0, marginTop:0}}
              messages={messages}
              onSend={messages => onSend(messages)}
              user={{
                _id: 1,
            
              }}
          />
         

      )
  }else{
    return(
   
          <View style={{ height:'100%', width:'100%', alignItems:'center', alignSelf:'center', alignContent:'center', justifyContent:'center' }}>
            <Text style={{fontSize:20, fontWeight:'bold',flexWrap:'wrap',  }}>Messagerie vide !</Text>
          </View>
          
    )
  }
}

const valeur =(e)=>{
  setAjout(e)
  console.log(ajout)
}

  return (

         <View style={{flex:1,padding:3 , paddingBottom:5, }}>
           
           <ScrollView contentContainerStyle={{flex:1, justifyContent:'center', alignItems:'center', alignSelf:'center', alignContent:'center', textAlign:'center'}} style={{ borderWidth:0.5, borderColor:'gray',borderRadius:5, padding:2,}}>
           {contenu()}
           </ScrollView>
           <View style={{flexDirection:'row', height:50, width:'100%', borderBottomRightRadius:5, borderTopRightRadius:5, borderBottomEndRadius:5,  borderTopEndRadius:5, borderBottomRightRadius:5, bottom:0}}>
              <TextInput placeholder="Ajouter un contact" onChangeText={valeur} style={{ flex:1, marginLeft:10, borderRadius:5, marginTop:5, textAlign:'center', justifyContent:'center', fontWeight:'bold', borderWidth:0.3, backgroundColor:'white'}} />
                      
              <TouchableOpacity onPress={invitation}>
                <Image style={{ resizeMode:'center' , width:30, height:30,marginTop:13, marginLeft:5 , marginRight:5 }} source={user} />
              </TouchableOpacity>            
      
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


