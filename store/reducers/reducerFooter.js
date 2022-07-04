import update from 'react-addons-update'

const initialState ={
    onglet: 'acceuil',

}
// ---------- Inscription de nouvelle utilisateur
const CREATE_ONGLET = 'CREATE_ONGLET'



export const actionOnglet = (a)=>{
    return{
        type: CREATE_ONGLET,
        payload: a,
    }
}



// ------------------------------------------

function reducerFooter(state = initialState, action){
    // let nextState
    switch (action.type) {
        case CREATE_ONGLET:

            return update( 
                state, {
                        onglet:{$set:action.payload.payloadOnglet },
                }
                
            )


        default: return state 
    }
}

export default reducerFooter;