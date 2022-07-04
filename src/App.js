import React,  {  useEffect, } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/page/home';
import Ajouter from '../components/page/ajouter';
import Connexion from '../components/page/connexion';
import Inscription from '../components/page/inscription';
import InscriptionP from '../components/page/inscriptionP';
import Profil from '../components/page/profil';
import Parametre from '../components/page/parametre';
import Visa from '../components/page/paiement/visa';
import WebComponent from '../components/page/paiement/webComponent';
import { Provider, useDispatch } from 'react-redux';
import store from '../store/configureStore';
import Infos from '../components/page/infos';
import Traitement from '../components/page/traitement';
import AsyncStorage from '@react-native-community/async-storage';
import { actionPseudo } from '../store/reducers/reducerProfil';
import Loading from '../components/page/loading';
import { LogBox } from 'react-native';


const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs()

function App() {
 
  return (

    <Provider store={store}>
      <Integration />
    </Provider>

  );
};

const Integration=()=>{
 
 useEffect(() => {
   readData()
   }, [])
  const dispatch = useDispatch()
  const readData = async () => {
  const pseudo = await AsyncStorage.getItem('pseudo');

  try {
     if (pseudo !== null ) {
       
       console.log('Mise a jour effectuee !' +pseudo)
       dispatch(actionPseudo({pseudoUtilisateur: pseudo}))
     }
    
   } catch (e) {
     console.log('Failed to fetch the input from storage');
   }
 }

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Loading'>
        <Stack.Screen
         name="Home"
         component={Home}
         options={{
           title: null, headerShown: false, headerVisible: false 
           }}
       />

      <Stack.Screen
        name="Connexion"
        component={Connexion}
        options={{
           title: null, 
           headerShown: false,
           headerVisible: false ,
           animation: 'slide_from_right',
         }}
        />
 
      <Stack.Screen
        name="Profil"
        component={Profil}
        options={{
           title: null, 
           headerShown: false,
           headerVisible: false ,
           animation: 'slide_from_right',
         }}
        />

      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{
           title: null, 
           headerShown: false,
           headerVisible: false ,

         }}
      />

       <Stack.Screen
        name="Ajouter"
        component={Ajouter}
        options={{
           title: null, 
           headerShown: false,
           headerVisible: false ,
           animation: 'slide_from_right',
         }}
        />

      <Stack.Screen
        name="Inscription"
        component={Inscription}
        options={{
           title: null, 
           headerShown: false,
           headerVisible: false ,
           animation: 'slide_from_right',
         }}
        />

      <Stack.Screen
        name="InscriptionNext"
        component={InscriptionP}
        options={{
           title: null, 
           headerShown: false,
           headerVisible: false ,
           animation: 'slide_from_right',
         }}
        />

     <Stack.Screen
        name="Infos"
        component={Infos}
        options={{
           title: null, 
           headerShown: false,
           headerVisible: false ,
           animation: 'slide_from_right',
         }}
        />

     <Stack.Screen
        name="Traitement"
        component={Traitement}
        options={{
           title: null, 
           headerShown: false,
           headerVisible: false ,
           animation: 'slide_from_right',
         }}
        />

      <Stack.Screen
        name="Parametre"
        component={Parametre}
        options={{
           title: null, 
           headerShown: false,
           headerVisible: false ,
         }}
      />

     <Stack.Screen
        name="Web"
        component={WebComponent}
        options={{
           title: null, 
           headerShown: false,
           headerVisible: false ,
           animation: 'slide_from_right',
         }}
        />

     <Stack.Screen 
       name="visa" 
       component={Visa} 
       options={{
           title: null, 
           headerShown: false, 
           headerVisible: false ,
           headerLeft:null,
           animation: 'slide_from_right',  
           
         }} 
       />

     </Stack.Navigator>
   </NavigationContainer>

  )
}

export default App;