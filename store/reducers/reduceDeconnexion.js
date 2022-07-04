import update from 'react-addons-update'

const initialState ={
    mode: 'deconnecter',

}
// ---------- Inscription de nouvelle utilisateur
const CREATE_MODE = 'CREATE_MODE'



export const actionMode = (a)=>{
    return{
        type: CREATE_MODE,
        payload: a,
    }
}



// ------------------------------------------

function reducerMode(state = initialState, action){
    // let nextState
    switch (action.type) {
        case CREATE_MODE:

            return update( 
                state, {
                        mode:{$set:action.payload.payloadMode },
                }
                
            )


        default: return state 
    }
}

export default reducerMode;