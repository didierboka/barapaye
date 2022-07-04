// import React from "react";
// import { StyleSheet, Platform,  View, SafeAreaView , StatusBar } from 'react-native';
// import FooterUser from "../section-user/footer";
// import Head from "../section-user/head";
// import { useSelector , useDispatch } from 'react-redux'
// import { useNavigation } from '@react-navigation/native';
// import Historique from "../section-user/historique";
// import Verification from "../section-user/verification";
// import Tchat from "../section-user/tchat";

// export default function UserHome(props) {
  

//   const navigation = useNavigation()
//   const dataProfil = useSelector(state=> state.reducerFooter.onglet)
//   const dataMode = useSelector(state=> state.reducerMode.mode)


  

//   const affichageMenu = ()=>{
//     if(dataProfil === 'acceuil'){
//       return <ModulePaiement/>
//     } if(dataProfil === 'historique'){
//       return <Historique/>
//     }    if(dataProfil === 'verification'){
//       return <Verification/>
//     }    if(dataProfil === 'tchat'){
//       return <Tchat/>
//     }
//   }

//   return (
    
//     <View style={styles.container}>
//       <SafeAreaView style={{ backgroundColor:'#003060', }}>
//         <StatusBar translucent barStyle='light-content' />
//       </SafeAreaView>
//         <View style={{ height:50, bottom:0, marginTop:(Platform.OS === 'ios'? 0 :27) }}>
//           <Head d1='none' />
//         </View>

//         {affichageMenu()}
     
//         <View style={{ height:(Platform.OS ==='ios'? 55 : 50),  bottom:0}}>
//           <FooterUser />
//         </View>
        
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'lightblue',    
//   },

// });
