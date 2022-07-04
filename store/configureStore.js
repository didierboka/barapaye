import {combineReducers, createStore } from 'redux'
import reducerProfil from './reducers/reducerProfil'
import reducerFooter from './reducers/reducerFooter'
import reducerMode from './reducers/reduceDeconnexion'
import reducerModeButton from './reducers/reducerButton'
import reducerPaiement from './reducers/paiement'
import reducerInitiale from './reducers/initiale'
// const store = createStore(reducerProfil)



const rootReducer = combineReducers({
    reducerProfil,
    reducerFooter,
    reducerMode,
    reducerModeButton,
    reducerPaiement,
    reducerInitiale,
  })

const store = createStore(rootReducer)
export default store