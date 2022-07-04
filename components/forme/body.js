
import React , { useState, Animated,  useEffect } from "react";
import { StyleSheet, Platform ,View, Image , Text } from 'react-native';
import CIT from '../section/CIT';
import  Version from '../section/version' 
import TextAceuil from '../section/textAcceuil';
import AcceuilModal from '../section/modalAcceuil';
import Icon from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import Dialog from "react-native-dialog";

export default function Body(props) {

  const [hauteurH1 , setHauteurH1] = useState()
  const [visible, setVisible] = useState(false);
  const logo = require('../../assets/logo.png');
  const onLayout=(event)=> {
    const {x, y, height, width} = event.nativeEvent.layout;
    setHauteurH1(height)
  }

  return (
      <View style={styles.container}>
         
          <View style={styles.f1}> 
            <AcceuilModal />
            
            <View style={{ flex:1, alignContent:'center', alignSelf:'center', alignItems:'center', width:'100%' , }}>
              <View style={{ flex:1 }}></View>
              <Animatable.Image animation="slideInRight" style={styles.image} source={logo} />
              <Animatable.Text animation="slideInLeft" style={{ fontSize:55, color:'white', fontWeight:'bold', marginTop:10, }}>BaraPaye</Animatable.Text>
              <View style={{ flex:1 }}></View>
            </View>
        

          </View>

          <Animatable.View animation="zoomInUp" style={[styles.fm, {height:hauteurH1}] } onLayout={onLayout}>
            <TextAceuil />
            <CIT  /> 
          </Animatable.View>
          
          <Version />

    </View>
  )
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'column',
    padding:0,
   backgroundColor:'#E9F9FF'
  },

  f1:{
    flex:1,
    width:'100%',
    marginTop:0,
    alignItems:'center',
    position:'relative',
    backgroundColor:'#002040',
    padding:5,
    borderBottomLeftRadius:45,
    borderBottomRightRadius:45,

    
    }, 
     fm:{
      alignItems:'center',
      justifyContent:'center',
      marginTop:40,
      },

  image:{
    marginTop:20,
    width:107,
    height:70,
    justifyContent:'center',
    alignContent:'center',
    alignSelf:'center'
  },

});

