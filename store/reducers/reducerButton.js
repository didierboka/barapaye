import update from 'react-addons-update'

const initialState ={
    Home: false,

}
// ---------- Inscription de nouvelle utilisateur
const CREATE_MODE = 'CREATE_MODE'

export const actionModeButton= (a)=>{
    return{
        type: CREATE_MODE,
        payload: a,
    }
}


// ------------------------------------------

function reducerModeButton(state = initialState, action){
    // let nextState
    switch (action.type) {
        case CREATE_MODE:

            return update( 
                state, {
                        HomeConnexion:{$set:action.payload.payloadConnexionHome },
                }
                
            )


        default: return state 
    }
}

export default reducerModeButton;