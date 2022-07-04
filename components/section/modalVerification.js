import React , { useState } from "react";
import { StyleSheet, Modal, StatusBar, TouchableOpacity,Platform ,SafeAreaView, Text, View, Image, TouchableHighlight } from 'react-native';
import Verification from './verification';

export default function VerificationModal(props) {
  
  const [modalVisible, setModalVisible] = useState(false);

  const left = require('../../assets/left.png')


  const pression =()=>{  
    if(modalVisible === false){
      setModalVisible(true)
    }else{
      setModalVisible(false)
    }
  }


  return (

    <View style={{borderRadius:10 ,}}>
       <Modal visible={props.modalVisible} transparent={true} animationType='slide' >
       <SafeAreaView barStyle='light-content' style={{backgroundColor:'#263d7f'}} />
        <View style={{ flexDirection:'row', backgroundColor:'#3ba1c3',borderTopWidth:0.3, borderTopColor:'lightblue' , height:50 }}> 
            <TouchableOpacity onPress={props.modalClose} style={{width:40,   borderRadius:25, height:40,marginTop:10, marginLeft:10 }}>
                <Image style={{position:'absolute', width:30, height:30, }} source={left}  />
            </TouchableOpacity>

            <TouchableHighlight style={{flex:1, justifyContent:'center'}}>
                <Text style={{ fontWeight:'bold', textShadowRadius:3 ,textShadowColor:'blue', fontSize:25, color:'white' , justifyContent:'center', alignItems:'center', alignSelf:'center'}}>BaraCash</Text>
            </TouchableHighlight>

        </View>

          
            <View style={{flex:1, justifyContent:'center',  textAlign:'center', backgroundColor:'lightblue' }}>
                <Verification  />
            </View>


            <StatusBar barStyle = "light-content"  backgroundColor = "#263d7f" translucent />
        </Modal> 

    </View>

  )
}
  

const styles = StyleSheet.create({
  
});


