import React from 'react'
import { StyleSheet,TouchableOpacity , Platform , View, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { useSelector , useDispatch } from 'react-redux';
import { actionOnglet } from '../../store/reducers/reducerFooter';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FooterUser(props) {
  
  const dataFooter = useSelector(state=> state.reducerFooter.onglet)
  const dataMode = useSelector(state=> state.reducerMode.mode)
  const dispatch = useDispatch()
  

  const acceuil =()=>{
    dispatch(actionOnglet({payloadOnglet:'acceuil'}))
  }
    const historique =()=>{
    dispatch(actionOnglet({payloadOnglet:'historique'}))
  }
    const verification =()=>{
    dispatch(actionOnglet({payloadOnglet:'verification'}))
  }

   


  return (
        <View style={{ flexDirection:'row', backgroundColor:'lightblue', height:(Platform.OS ==='ios'? 55 : 50), borderBottomColor:'white', borderBottomWidth:2 }}> 
            <TouchableOpacity onPress={acceuil} style={{  backgroundColor:(dataFooter === 'acceuil' ? 'white' : 'lightblue'), flex:1, justifyContent:'center', alignItems:'center', borderBottomLeftRadius:5,  borderColor:'lightblue'}}>
                {/* <Image style={{ width:35, height:35, marginTop: (Platform.OS === 'ios' ? 0 : 0)  }} source={home}  /> */}
                <Icon name="home" size={30} color="#3ba1c3" />
            </TouchableOpacity>

            <TouchableOpacity onPress={verification} style={{ backgroundColor:(dataFooter === 'verification' ?'white' : 'lightblue'), flex:1, justifyContent:'center',borderBottomLeftRadius:10, alignItems:'center', borderBottomRightRadius:5, borderLeftWidth:1,  borderBottomLeftRadius:5, borderColor:'lightblue',}}>
               {/* <Image style={{ width:35, height:35, marginTop: (Platform.OS === 'ios' ? 0 : 0) }} source={loupe}  /> */}
               <Icon name="search" size={30} color="#3ba1c3" />
            </TouchableOpacity>

            <TouchableOpacity onPress={historique} style={{  backgroundColor:(dataFooter === 'historique' ? 'white' : 'lightblue'), flex:1,borderLeftWidth:0.3, borderRightWidth:1, borderBottomLeftRadius:10, borderColor:'lightblue', justifyContent:'center', alignItems:'center', borderBottomRightRadius:5, }}>
                {/* <Image style={{ width:35, height:35,marginTop: (Platform.OS === 'ios' ? 0 : 0)  }} source={history}  />  */}
                <Icon name="document-text-sharp" size={30} color="#3ba1c3" />
            </TouchableOpacity>

        </View>
  )
}
  

const styles = StyleSheet.create({
  version: {
    color:'gray', 
    paddingBottom:5
  
  }
});

