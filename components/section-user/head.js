import React , { useState, useEffect } from "react";
import { StyleSheet,TouchableOpacity , Text, View, Image, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector , useDispatch } from 'react-redux'
import { actionId } from '../../store/reducers/reducerProfil';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Head(props) {

  const dispatch = useDispatch()

  const left = require('../../assets/left.png')
  const navigation = useNavigation();
 
  const actionVisibilite =()=>{
    return navigation.push('Profil')
  }

return (
        <View style={{ flexDirection:'row', backgroundColor:'#3ba1c3',borderTopWidth:0.3, borderTopColor:'lightblue' , height:50 }}> 

            <TouchableOpacity onPress={props.arriere} style={{width:40,  display:props.d1, borderRadius:25, height:40,marginTop:10, marginLeft:10, }}>
                <Image style={{position:'absolute', width:30, height:30, }} source={left}  />
            </TouchableOpacity>

            <TouchableHighlight style={{flex:1, justifyContent:'center'}}>
              <Text style={{ fontWeight:'bold', textShadowRadius:3 ,textShadowColor:'blue', fontSize:25, color:'white' , justifyContent:'center', alignItems:'center', alignSelf:'center'}}>BaraPaye</Text>
            </TouchableHighlight>

            <TouchableOpacity onPress={actionVisibilite} style={{width:40, display:props.d2, borderRadius:25, height:40,marginTop:5,  justifyContent:'center', alignItems:'center'}}>
                {/* <Image style={{position:'absolute', width:30, height:30}} source={oups}  /> */}
                <Icon name="person-circle-outline" size={30} color="lightblue" />
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

