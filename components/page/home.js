import React , { useState , useEffect} from "react";
import Body from '../forme/body';
import { StyleSheet, Platform, ImageBackground, View ,  StatusBar, SafeAreaView, Text} from 'react-native';
import { SkypeIndicator,} from 'react-native-indicators';
import { WebView } from 'react-native-webview';
import { useSelector , useDispatch } from 'react-redux'
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function Home(props) {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true)
  const dataProfilUser = useSelector(state=> state.reducerProfil.profil)
  useEffect(() => {

  }, [isFocused])
  

  const data =()=>{
    if (loading === false) {
      return (
    <View style={styles.bodyS}>


      <View style={{flex:1}}>
         <Body /> 
      </View>
     
    </View>
      )
    } else {
      return(
        <View style={{ flex:1, justifyContent:'center', backgroundColor:'#002040', borderWidth:3, alignItems:'center' }}>
          
            <SkypeIndicator color='white' size={80} style={{ flex:1  }}/> 
            <Text style={{ marginBottom:20 , fontWeight:'bold' , color:'white' }}>BaraPaye</Text>
  
        </View>
      )
    }
  }
  return (
    
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor:'#003060', }}>
        <StatusBar translucent barStyle='light-content' backgroundColor='#003060' />
      </SafeAreaView>
      <View style={styles.bodyS}>

        <View style={{flex:1}}>
          <Body /> 
        </View>

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
    backgroundColor:'white'
  },

});

