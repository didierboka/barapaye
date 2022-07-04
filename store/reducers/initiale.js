import update from 'react-addons-update'

const initialState ={
    depot:{
        sommeB:'50',
        sommeC:'1',
        deviseB: 'GBP',
        deviseC: 'xof',
        quota:'750'
    },

}
// ---------- Inscription de nouvelle utilisateur
const CREATE_SOMME_B = 'CREATE_SOMME_B'
const CREATE_SOMME_C = 'CREATE_SOMME_C'
const CREATE_DEVISE_B = 'CREATE_DEVISE_B'
const CREATE_DEVISE_C = 'CREATE_DEVISE_C'
const CREATE_QUOTA = 'CREATE_QUOTA'

export const actionSommeB= (a)=>{
    return{
        type: CREATE_SOMME_B,
        payload: a,
    }
}
export const actionSommeC= (a)=>{
    return{
        type: CREATE_SOMME_C,
        payload: a,
    }
}

export const actionDeviseB = (a)=>{
    return{
        type: CREATE_DEVISE_B,
        payload: a,
    }
}

export const actionDeviseC = (a)=>{
    return{
        type: CREATE_DEVISE_C,
        payload: a,
    }
}

export const actionQuota = (a)=>{
    return{
        type: CREATE_QUOTA,
        payload: a,
    }
}




// ------------------------------------------

function reducerInitiale(state = initialState, action){

    switch (action.type) {
        case CREATE_SOMME_B:
            return update( 
                state, {
                    depot:{
                        sommeB:{$set:action.payload.sommeB },
                    }
                }   
            )

            case CREATE_SOMME_C:
                return update( 
                    state, {
                        depot:{
                            sommeC:{$set:action.payload.sommeC },
                        }
                    }   
                )

        case CREATE_DEVISE_B:
            return update( 
                state, {
                    depot:{
                        deviseB:{$set:action.payload.deviseB },
                    }
                }
            )

        case CREATE_DEVISE_C:
            return update( 
                state, {
                    depot:{
                        deviseC:{$set:action.payload.deviseC },
                    }
                }
            )

        case CREATE_QUOTA:
            return update( 
                state, {
                    depot:{
                        quota:{$set:action.payload.quota },
                    }
                }
            )

        default: return state 
    }
}

export default reducerInitiale;